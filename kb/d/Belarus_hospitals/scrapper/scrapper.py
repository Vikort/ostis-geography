from typing import Dict, List
from transliterate import translit
import requests
import re

def create_query_by_amenity(
    query_part: str,
    amenities: List[str]
) -> str:
    return "".join([
        query_part.format(
            amenity
        ) for amenity in amenities
    ])


def build_url(
    source: str, query: str
) -> str:
    return source.format(
        query
    )


def get_data(url: str) -> List[Dict]:
    return requests.get(url).json().get("elements")


def filter_elements_by_requires(
    elements: List[Dict],
    requires: List[str]
) -> List[Dict]:
    return list(
        filter(
            lambda element:
                element.get("tags").get("name") != None
                and element.get('tags').get("amenity") in requires,
            elements
        )
    )


def add_kb_names(elements: List[Dict]) -> List[Dict]:
    [element.get("tags").update(
        kb_name=re.sub("[\([{})\]'/\.,`\"#№-]",
            "",
            (translit(
                u"{}".format(
                    element.get(
                    "tags").get("name")
                ),
                "ru",
                reversed=True
            ).lower().replace(" ", "_")
        ))) for element in elements
    ]
    return elements


def create_kb_fragments(
    elements: List[Dict],
    template: str
) -> List[Dict]:
    return [
        {
            "name": element.get("tags").get("kb_name"), 
            "body": template.format(**element.get("tags"))
        }
        for element in elements
    ]


def save_fragments(
    fragments: List[str], path: str
) -> None:
    for fragment in fragments:
        with open('{}{}.scs'.format(path,
                fragment.get("name")), 'w') as file:
            file.write(fragment.get("body"))


def main() -> None:
    template = """
{kb_name}<-concept_hospital;
=> nrel_main_idtf:
[{name}]
(* <-lang_ru;;<- name_ru;;<- name;;*);
=>nrel_search_area: Belarus;;
    """
    amenities = ['hospital', 'clinic']
    query_part = "area[name='Беларусь'];node(area)[amenity={}];"
    source = "http://overpass-api.de/api/interpreter?data=[out:json];({});out;"
    save_path = "../"

    # try to read it =)))
    save_fragments(
        fragments=create_kb_fragments(
            elements=add_kb_names(
                filter_elements_by_requires(
                    get_data(
                        build_url(
                            source=source,
                            query=create_query_by_amenity(
                                query_part=query_part,
                                amenities=amenities
                            )
                        )
                    ),
                    requires=amenities
                )
            ),
            template=template
        ),
        path=save_path
    )


main()


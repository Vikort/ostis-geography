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


def add_kb_data(elements: List[Dict]) -> List[Dict]:
    [element.get("tags").update(
        language_info=format_language_info(
            element.get("tags")),
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


def format_language_info(tags: Dict) -> str:
    lang_tags_mapper = {
        "name:en": ["lang_en", "name_en"],
        "name": ["lang_ru", "name_ru", "name"]
    }
    structure = "[{}]\n(* <- {};;*)"
    return ";\n".join([
        structure.format(tags.get(lang_tag), ";; <- ".join(
            lang_values
        ))
        for lang_tag, lang_values in lang_tags_mapper.items()
        if tags.get(lang_tag) != None
    ])


def save_fragments(
    fragments: List[str], path: str
) -> None:
    for fragment in fragments:
        with open('{}{}.scs'.format(path,
                fragment.get("name")), 'w') as file:
            file.write(fragment.get("body"))


def process(
    template: str,
    amenities: List[str],
    query_part: str,
    source: str,
    save_path: str
) -> None:
    # try to read it =)))
    save_fragments(
        fragments=create_kb_fragments(
            elements=add_kb_data(
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


if __name__ == "__main__":
    template =\
"""{kb_name} <- concept_sport_construction;
=> nrel_main_idtf:
{language_info};;
"""
    amenities = ['public_bath','sports','sport_school','sports_centre']
    query_part = "area[name='Беларусь'];node(area)[amenity={}];"
    source = "http://overpass-api.de/api/interpreter?data=[out:json];({});out;"
    save_path = "../from_translator/"

    process(
        template=template,
        amenities=amenities,
        query_part=query_part,
        source=source,
        save_path=save_path
    )

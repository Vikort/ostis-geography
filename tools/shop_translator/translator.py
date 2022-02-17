import requests
from transliterate import translit
import os


def search(city_name: str,
           shop_name: str) -> list:
    source = f"""http://overpass-api.de/api/interpreter?data=[out:json];""" \
             f"""(area[name="{city_name}"];nwr(area)[name="{shop_name}"][name];);out;"""
    data = requests.get(source).json().get("elements", [])
    return data


def russian_line_to_concept_style(word: str) -> str:
    return translit(word, "ru", reversed=True) \
                .replace("'", '') \
                .replace(" ", "_") \
                .replace("-", "_") \
                .lower()


def build_relation(rel_name: str, element: dict, tag_name: str) -> str:
    relation = """=>nrel_{}:\n[{}]\n(* <- lang_ru;; <- {};;*);\n"""
    if element.get(tag_name, None):
        relation = relation.format(rel_name, element[tag_name], rel_name)
    else:
        relation = ""
    return relation


def translate(city_name: str, shop_name: str, data: list) -> None:
    shop_name_translit = russian_line_to_concept_style(shop_name)
    city_name_translit = russian_line_to_concept_style(city_name)
    directory = f"./{shop_name_translit}"
    if not os.path.exists(directory):
        os.makedirs(directory)
    for element in data:
        latitude_relation = build_relation('latitude', element, 'lat')
        longitude_relation = build_relation('longitude', element, 'lon')
        street_relation = ""
        house_number_relation = ""
        tags = element.get("tags", None)
        if tags:
            street_relation += build_relation('street', tags, 'addr:street')
            house_number_relation = build_relation("house_number", tags, 'addr:housenumber')
        search_area = f'=>nrel_search_area:\n{city_name_translit};;\n'
        concept_name = f"{shop_name_translit}_shop_{element['id']}"
        result = f"{concept_name}<-concept_{shop_name_translit}_shop;\n=>nrel_main_idtf:\n" \
                 f"[{shop_name.title()}]\n(* <- lang_ru;; <- name_ru;; <- name;;*);\n[{shop_name_translit.title()}]\n" \
                 f"(* <- lang_en;; <- name_en;;*);\n{latitude_relation}" \
                 f"{longitude_relation}=>nrel_country:\nbelarus;\n{street_relation}" \
                 f"{house_number_relation}{search_area}"

        with open(f"./{shop_name_translit}/{concept_name}.scs", encoding='utf-8', mode='w+') as output_scs:
            output_scs.write(result)


def main(shop_name: str, city_name: str) -> None:
    search_result = search(shop_name=shop_name, city_name=city_name)
    if search_result:
        translate(shop_name=shop_name, city_name=city_name, data=search_result)
    else:
        print(shop_name, city_name)
        print("There is no data for your request. Make sure you entered the data correctly. "
              "If everything is correct, then try another store / city")


if __name__ == '__main__':
    print("Enter shop name:")
    shop_name = input()
    print("Enter Belarus city name:")
    city_name = input()
    main(shop_name=shop_name, city_name=city_name)

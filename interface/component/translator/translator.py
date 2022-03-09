from io import StringIO

import pandas as pd
import textwrap


def translate(data):
    results = []

    for index, item in data.iterrows():
        name = f"bus_station_{item['name']}.scs"
        sc_text = textwrap.dedent(f"""
            bus_station_{item['name']} <- concept_bus_station;
            <- concept_bus_station_of_the_{item['city']};
            =>nrel_main_idtf:
                [{item['main_idtf']}]
                (* <- lang_ru;; <- name_ru;; <- name;; *);
            =>nrel_country:
                {item['country']};
            =>nrel_region:
                {item['region']};
            =>nrel_district:
                {item['district']};
            =>nrel_city:
                {item['city']};
            =>nrel_search_area:
                {item['search_area']};;
        """)

        results.append((name, sc_text))

    return results


def translate_file(path):
    data = pd.read_csv(path, sep=';')
    return translate(data)


def translate_text(text):
    data = pd.read_csv(StringIO(text), sep=';')
    return translate(data)


if __name__ == '__main__':
    import argparse

    parser = argparse.ArgumentParser()
    parser.add_argument('-i', help='Input csv file path', required=True)
    parser.add_argument('-o', help='Output directory path', required=False)

    args = parser.parse_args()

    results = translate_file(args.i)

    for fname, sctext in results:
        with open(f'{args.o}\\{fname}' if args.o else f'{fname}', 'w') as f:
            f.write(sctext)

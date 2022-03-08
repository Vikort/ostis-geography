import os

import pandas as pd
from transliterate import translit
import re
from tqdm import tqdm

import pathlib

def clean_name(text):
    text = text.replace("ул.", "")
    text = text.replace("пер.", "")
    text = text.replace("п.", "")
    text = text.replace("б-р", "")
    text = text.replace("тр-т", "")

    text = text.replace('  ', ' ')
    text = text.replace('/', '').strip()

    return text


def get_street_class(text):
    if 'ул.' in text or 'улица' in text:
        result = 'улица'
    elif 'пер.' in text or 'п.' in text:
        result = 'переулок'
    elif 'пр. ' in text:
        result = 'проспект'
    elif "б-р" in text:
        result = 'бульвар'
    elif "тр-т" in text:
        result = 'тракт'
    elif "пл." in text:
        result = 'площадь'
    else:
        result = ''

    return result


def get_eng(text):
    translated = translit(text, language_code='ru', reversed=True)
    translated = translated.replace("`", "")
    translated = translated.replace("'", "")

    return translated.strip()


def get_eng_identifier(identifier):
    identifier = identifier.lower()
    identifier = identifier.replace(".", "_")
    identifier = identifier.replace(" ", "_")
    identifier = identifier.replace("-", "_")

    identifier = identifier.replace("__", "_")
    identifier = identifier + "_street_moghilev"

    return identifier


def main():
    current_path = str(pathlib.Path(__file__).parent.resolve())
    data_path = current_path + '/data/'

    csv_path = data_path + 'streets.csv'
    external_csv_path = data_path + 'external_data.csv'
    output_dir = current_path + '/streets_moghilev_output/'

    if not os.path.exists(data_path):
        os.makedirs(data_path)

    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    # Разделяем улицы по районам
    df = pd.read_csv(csv_path)
    df['Локация'] = df['Район']
    df['Район'] = ''

    indicies_to_delete = []
    for index, row in df.iterrows():
        if not pd.isna(row['Название']) and pd.isna(row['Локация']) and pd.isna(row['Почтовый индекс']):
            district_name = row['Название']
            if '\n' in district_name:
                district_name = district_name.split('\n')[1]

            df['Район'][index:] = district_name

            indicies_to_delete.append(index)

    df = df.drop(index=indicies_to_delete)

    # Добавляем колонку класаа
    df['Класс'] = df['Название'].apply(get_street_class)

    # Убираем класс из имени
    df['Название'] = df['Название'].apply(clean_name)

    # Добавляем английское название и системный идентификатор
    df['Название англ.'] = df['Название'].apply(get_eng)
    df['Идентификатор'] = df['Название англ.'].apply(get_eng_identifier)

    # Загрузка таблицы с данными о длине
    external_df = pd.read_csv(external_csv_path)[1:]
    external_df = external_df.rename(columns={"Название улицы": "Название"})

    external_df['Название'] = external_df['Название'].astype('str')
    df['Название'] = df['Название'].astype('str')
    df = df.merge(external_df, on='Название')

    # Фильтурем данные
    df = df[df['Класс'] == 'улица'][:217]

    # Создаем понятия
    for index, row  in tqdm(df.iterrows(), total=len(df)):
        street_name_idf = row['Идентификатор']
        translated = row['Название англ.']
        prefix = row['Класс']
        street_name_rus = row['Название']
        length = row['Длина, м']
        number = row['Количество домов, шт']

        with open(output_dir + street_name_idf + "_" + str(index) + ".scs", "w",
                  encoding='utf-8') as dest_file:
            dest_file.write(
                '''{street_name_idf} <- concept_way;
                =>nrel_main_idtf:
                [{street_name_eng} street]
                (* <- lang_en;; <- name_en;;*);
                [{prefix} {street_name_rus}]
                (* <- lang_ru;; <- name_ru;; <- name;;*);
                =>nrel_street_length:{length};
                =>nrel_number_of_house:{number};
                =>nrel_search_area:
                moghilev;;
                '''.format(
                    street_name_idf=street_name_idf,
                    street_name_eng=translated,
                    prefix=prefix,
                    street_name_rus=street_name_rus,
                    length=length,
                    number=number,

                ))


if __name__ == '__main__':
    main()

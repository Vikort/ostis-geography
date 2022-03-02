import googletrans

from transliterate import translit
import csv
import random

counter = 0

with open('zhd2.csv', "r", newline="") as file:
    reader = csv.reader(file)
    for row in reader:

        counter += 1

        ru_name = row[0].replace('ст. ', '').split(" ")[0].replace('.','')
        en_name = translit(ru_name, language_code='ru', reversed=True)
        distr = ""
        distr_name = ""
        if "область" in row[1]:
            distr = "oblast",
            distr_name = translit(row[1].split(" ")[0].replace("('","").replace("',')",""), language_code='ru', reversed=True)
        elif "район" in row[1]:
            distr = "rajon",
            distr_name = translit(row[1].split(" ")[0], language_code='ru', reversed=True)
        
        else:
            distr = "gorod",
            distr_name = translit(row[1], language_code='ru', reversed=True).replace("'","")   
        with open("stations\\" + en_name.replace("'","") + "_" + str(counter) + "_.scs", "w", encoding='utf-8') as dest_file:
            dest_file.write(
                '''{en_name} <- concept_way;
                =>nrel_main_idtf:
                [{en_name}]
                (* <- lang_en;; <- name_en;;*);
                [{ru_name}]
                (* <- lang_ru;; <- name_ru;; <- name;;*);
                =>nrel_country:Belarus;
                =>nrel_number_of_passengers:{num_of_pas};
                =>nrel_number_of_employees: {num_of_emp};
                =>nrel_number_of_trains:{num_of_trains};
                =>nrel_{distr}:{distr_name};;
                '''.format(
                    en_name = en_name.replace("'",""),
                    ru_name = ru_name.replace("'",""),
                    num_of_pas=row[2],
                    num_of_trains=row[3],
                    num_of_emp = row[4],
                    distr = str(distr).replace("('","").replace("',)","").replace("'",""),
                    distr_name = distr_name.replace("('","").replace("',')","").replace("'","")
                    ))

            print(counter)



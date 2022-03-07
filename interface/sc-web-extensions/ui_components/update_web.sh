#!/bin/bash

green="\e[0;32m"
rst="\e[0m"     # Text reset

prepare()
{
    echo -en $green$1$rst"\n"
}

prepare "Update web component"

cd search_villages_by_region
npm install
grunt build

cd ../search_villages_by_distict
npm install
grunt build

cd ../search_villages_by_selsoviet
npm install
grunt build

cd ../search_region_by_village
npm install
grunt build

cd ../../../../scripts
#!/bin/bash

green="\e[0;32m"
rst="\e[0m"     # Text reset

prepare()
{
    echo -en $green$1$rst"\n"
}

prepare "Update web component"

cd search_avg_count
npm install
grunt build

cd ../search_district
npm install
grunt build

cd ../search_avg_length
npm install
grunt build

cd ../../../../scripts
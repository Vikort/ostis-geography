sc_web_path=../../ostis-web-platform/sc-web/client
rivers_js_path=components/js/rivers/rivers.js
rivers_css_path=components/css/rivers.css

append_line()
{
    if grep -Fxq "$3" $1
    then
        echo -en "Link to " $blue"$2"$rst "already exists in " $blue"$1"$rst "\n"
    else
        echo -en "Append '" $green"$2"$rst "' -> " $green"$1"$rst "\n"
        echo $3 >> $1
    fi
}

append_js()
{
    append_line $1 $2 "<script type=\"text/javascript\" charset=\"utf-8\" src=\"/static/$2\"></script>"
}

append_css()
{
    append_line $1 $2 "<link rel=\"stylesheet\" type=\"text/css\" href=\"/static/$2\" />"
}

append_js $sc_web_path/templates/components.html $rivers_js_path
append_css $sc_web_path/templates/components.html $rivers_css_path

echo ls
cd interface/sc-web-extensions/way_interface/
cp -R ./way ../../../ostis-web-platform/sc-web/components/
#mv ./Gruntfile.js ../../../ostis-web-platform/sc-web/Gruntfile.js
paste -d"\n" ./Gruntfile.js ../../../ostis-web-platform/sc-web/Gruntfile.js > ../../../ostis-web-platform/sc-web/Gruntfile.js
cd ../../../ostis-web-platform/sc-web/client/templates
echo "COMPLETE"

cat <<EOT >> ./components.html
<script type="text/javascript" charset="utf-8" src="/static/components/js/way/way.js"></script>
EOT

cd ../../scripts
cd ..
grunt build
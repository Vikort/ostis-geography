echo ls
cd interface/sc-web-extensions/estates_interface/
cp -R ./estates_ui ../../../ostis-web-platform/sc-web/components/
paste -d"\n" ./Gruntfile.js ../../../ostis-web-platform/sc-web/Gruntfile.js > ../../../ostis-web-platform/sc-web/Gruntfile.js
cd ../../../ostis-web-platform/sc-web/client/templates
echo "COMPLETE"

cat <<EOT >> ./components.html
<script type="text/javascript" charset="utf-8" src="static/components/js/estates_ui/estates.js"></script>
EOT

cd ../../scripts
cd ..
grunt build
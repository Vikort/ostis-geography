echo ls
cd interface/sc-web-extensions/driving_schools_interface/
cp -R ./driving_schools_ui ../../../ostis-web-platform/sc-web/components/
paste -d"\n" ./Gruntfile.js ../../../ostis-web-platform/sc-web/Gruntfile.js > ../../../ostis-web-platform/sc-web/Gruntfile.js
cd ../../../ostis-web-platform/sc-web/client/templates
echo "COMPLETE"

cat <<EOT >> ./components.html
<script type="text/javascript" charset="utf-8" src="static/components/js/driving_schools_ui/driving-schools.js"></script>
EOT

cd ../../scripts
cd ..
grunt build
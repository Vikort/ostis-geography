echo ls
cd interface/sc-web-extensions/catering_organizations_interface/
cp -R ./catering_organizations_ui ../../../ostis-web-platform/sc-web/components/
paste -d"\n" ./Gruntfile.js ../../../ostis-web-platform/sc-web/Gruntfile.js > ../../../ostis-web-platform/sc-web/Gruntfile.js
cd ../../../ostis-web-platform/sc-web/client/templates
echo "COMPLETE"

cat <<EOT >> ./components.html
<script type="text/javascript" charset="utf-8" src="static/components/js/catering_organizations_ui/catering-organizations.js"></script>
EOT

cd ../../scripts
cd ..
grunt build
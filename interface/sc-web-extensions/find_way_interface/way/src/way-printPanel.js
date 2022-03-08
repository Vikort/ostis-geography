/**
 * Paint panel.
 */
Way.PaintPanel = function (containerId) {
    this.containerId = containerId;
};

Way.PaintPanel.prototype = {

    init: function () {
        this._initMarkup(this.containerId);
    },

    _initMarkup: function (containerId) {
        var container = $('#' + containerId);

        var self = this;
        container.append('<div class="sc-no-default-cmd">Way Image component</div>');
		
		container.append('<label for="pn1" id="name-pn1">Название первого автовокзала</label>');
		container.append('<input id="pn1" type="text" class="form-control-plaintext" placeholder="Name for first bus station">');
		container.append('<label for="pd1" id="name-pd1">Название города первого автовокзала </label>');
		container.append('<input id="pd1" type="text" class="form-control-plaintext" placeholder="Name for first city">');
		container.append('<label for="pn2" id="name-pn2">Название второго автовокзала</label>');
		container.append('<input id="pn2" type="text" class="form-control-plaintext" placeholder="Name for second bus station">');
		container.append('<label for="pd2" id="name-pd2">Название города второго автовокзала</label>');
		container.append('<input id="pd2" type="text" class="form-control-plaintext" placeholder="Name for second city">');
		container.append('<script src="https://requirejs.org/docs/release/2.3.6/minified/require.js"></script>');
		//button
		container.append('<button id="showPicture" type="button">Показать путь</button>');
      
		$('#showPicture').click(function () {
			if(document.getElementById('pn1').value && document.getElementById('pn2').value && document.getElementById('pd1').value && document.getElementById('pd2').value){
				self._watchPicture(document.getElementById('pn1').value, document.getElementById('pn2').value, document.getElementById('pd1').value, document.getElementById('pd2').value, container);
			}
		});
    },

	_watchPicture: function (bus1, bus2, city1, city2, container)
	{
		async function getCoord(bus1, bus2, city1, city2) {
  			try {
    			const url = "https://api.allorigins.win/get?url=" + encodeURIComponent("https://www.openstreetmap.org/geocoder/search_osm_nominatim?query=" + bus1 + "%2C" + city1 + "&callback?=");
				xmlhttp = new XMLHttpRequest();
				xmlhttp.onreadystatechange=function(){
					if(xmlhttp.readyState==4 && xmlhttp.status==200)
					{
						const url2 = "https://api.allorigins.win/get?url=" + encodeURIComponent("https://www.openstreetmap.org/geocoder/search_osm_nominatim?query=" + bus2 + "%2C" + city2 + "&callback?=");
						console.log(xmlhttp.responseText);
						var array1 = parseText(xmlhttp.responseText);
						xmlhttp = new XMLHttpRequest();
						xmlhttp.onreadystatechange=function(){
							if(xmlhttp.readyState==4 && xmlhttp.status==200)
							{
								console.log(xmlhttp.responseText);
								var array2 = parseText(xmlhttp.responseText);
								console.log(array1);
								console.log(array2);
								Promise.all([array1, array2]).then(coord => {
									console.log(coord);
									getPhoto(coord[0], coord[1], container);
								});
								return array2;
							}
						}
						xmlhttp.open("GET", url2, false );
						xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
						xmlhttp.send();
						return array1;	
					}
				}
				xmlhttp.open("GET", url, false );
				xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
				xmlhttp.send();
  			} catch (error) {
    			console.error(error);
  			}
		}
		
		async function parseText(responseText) {
  			try {
    			var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(xmlhttp.responseText, "text/html");
				var list = xmlDoc.evaluate("//a/@data-lat", xmlDoc, null, XPathResult.ANY_TYPE, null);
				var array = [list.iterateNext().textContent.replaceAll('\\', '').replaceAll('\"', '')];
				var list = xmlDoc.evaluate("//a/@data-lon", xmlDoc, null, XPathResult.ANY_TYPE, null);
				array.push(list.iterateNext().textContent.replaceAll('\\', '').replaceAll('\"', ''));
				return array;
  			} catch (error) {
    			console.error("Invalid bus station or city");
  			}
		}
		
		async function getPhoto(coord1, coord2, container) {
  			try {
				if(coord1 && coord2){
    				const image_url = "http://image.thum.io/get/width/4096/crop/3072/" + "https://www.openstreetmap.org/directions?engine=graphhopper_car&route=" + coord1[0] + "%2C" + coord1[1] + "%3B" + coord2[0] + "%2C" + coord2[1];
					console.log(image_url);
					image_src = "<img src=\"" + image_url + "\" id=\"img_id\"></img>";
					if(document.getElementById("img_id")){
						document.getElementById("img_id").src=image_url
					}
					else{
						container.append(image_src);
					}
				}
  			} catch (error) {
    			console.error("Invalid bus station or city");
  			}
		}

		async function start(bus1, bus2, city1, city2) {
			try{
				await getCoord(encodeURIComponent(bus1), encodeURIComponent(bus2), encodeURIComponent(city1), encodeURIComponent(city2));
			} catch (error) {
    			console.error("Invalid bus station or city");
  			}
		}
		start(bus1, bus2, city1, city2);
	}	
};
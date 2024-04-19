var map;


	

var init_map = function() {	

    const RD = new L.Proj.CRS(
		'EPSG:28992',
		'+proj=sterea +lat_0=52.15616055555555 +lon_0=5.38763888888889 +k=0.9999079 +x_0=155000 +y_0=463000 +ellps=bessel +units=m +towgs84=565.2369,50.0087,465.658,-0.406857330322398,0.350732676542563,-1.8703473836068,4.0812 +no_defs', {		
		resolutions: [3440.640, 1720.320, 860.160, 430.080, 215.040, 107.520, 53.760, 26.880, 13.440, 6.720, 3.360, 1.680, 0.840, 0.420, 0.210, 0.105],
		origin: [-285401.920, 903401.920],
		bounds: L.bounds([-285401.920, 903401.920], [595401.920, 22598.080]),
		transformation: L.Transformation(-1, -1, 0, 0),
	});

	
	map = new L.map('map', {minZoom: 4, 
                            maxZoom: 15, 
                            scrollWheelZoom: true, 
                            drawControl: true, 
                            crs: RD, 
                            layers: [basemaps.bgt, basemaps.brt]}
                    ).setView(pickRandomPlace(), 13);	 
					
					
	map.on('load', getPercelen());
	map.on('moveend', function() {

			console.log(map.getCenter());

	});
}

function pickRandomPlace() {

	const stedenGeometrie = {
		"Amsterdam": [52.3720, 4.9024], 
		"Rotterdam": [51.9241, 4.5134],   
		"Den Haag": [52.0705, 4.3007],
		"Utrecht": [52.0907, 5.1214],
		"Eindhoven": [51.4381, 5.4776],
		"Tilburg": [51.5555, 5.0913],
		"Groningen": [53.2194, 6.5665],
		"Almere": [52.3586, 5.2843],
		"Breda": [51.5748, 4.7710], 
		"Nijmegen": [51.8426, 5.8380],
		"Apeldoorn": [ 52.2049, 5.9682], 
		"Enschede": [52.2200, 6.8958],
		"Haarlem": [52.3818, 4.6370], 
		"Arnhem": [51.9811, 5.9088],  
		"Amersfoort": [52.1561, 5.3878],
		"Zaanstad": [52.4524, 4.8123], 
		"Haarlemmermeer": [52.3060, 4.6900],
		"'s-Hertogenbosch": [51.6876, 5.30380],
		"Zoetermeer": [52.0399, 4.4925], 
		"Zwolle": [52.5224, 6.0802]
	};	
	const stedenArray = Object.keys(stedenGeometrie);
	const randomIndex = Math.floor(Math.random() * stedenArray.length);
	const randomStadNaam = stedenArray[randomIndex];
	console.log(randomStadNaam);
	$('#stadNaam').html(randomStadNaam);
	return stedenGeometrie[randomStadNaam];
}
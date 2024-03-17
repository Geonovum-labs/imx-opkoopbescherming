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
                            layers: [basemaps.bgt]}
                    ).setView(pickRandomPlace(), 13);	 
					
					
	map.on('load', getPercelen());
}

function pickRandomPlace() {

	const stedenGeometrie = {
		"Amsterdam": [52.3676, 4.9041],
		"Rotterdam": [51.9225, 4.4792],
		"Den Haag": [52.0705, 4.3007],
		"Utrecht": [52.0907, 5.1214],
		"Eindhoven": [51.4416, 5.4697],
		"Tilburg": [51.5555, 5.0913],
		"Groningen": [53.2194, 6.5665],
		"Almere": [52.3508, 5.2647],
		"Breda": [51.5719, 4.7683],
		"Nijmegen": [51.8426, 5.8380],
		"Apeldoorn": [52.2112, 5.9699],
		"Enschede": [52.2215, 6.8937],
		"Haarlem": [52.3874, 4.6462],
		"Arnhem": [51.9851, 5.8987],
		"Amersfoort": [52.1561, 5.3878],
		"Zaanstad": [52.4534, 4.8133],
		"Haarlemmermeer": [52.3060, 4.6900],
		"'s-Hertogenbosch": [51.6978, 5.3037],
		"Zoetermeer": [52.0570, 4.4910],
		"Zwolle": [52.5168, 6.0830]
	};	
	const stedenArray = Object.keys(stedenGeometrie);
	const randomIndex = Math.floor(Math.random() * stedenArray.length);
	const randomStadNaam = stedenArray[randomIndex];
	console.log(randomStadNaam);
	return stedenGeometrie[randomStadNaam];
}
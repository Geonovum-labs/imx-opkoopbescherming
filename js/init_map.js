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
                    ).setView([51.984917662596786, 4.667935645022338], 13);	 
					
					
	map.on('load', get_percelen());

}
function geoJSONtoGML(polygonGeoJSON) {
    let gml = '<?xml version="1.0" encoding="UTF-8"?>';
    gml += '<gml:Polygon xmlns:gml="http://www.opengis.net/gml">';
    gml += '<gml:exterior>';
    gml += '<gml:LinearRing>';
    gml += '<gml:posList>';

    const coordinates = polygonGeoJSON.geometry.coordinates[0]; // Assuming it's a simple polygon (no holes)

    for (let i = 0; i < coordinates.length; i++) {
        gml += coordinates[i][1] + ' ' + coordinates[i][0] + ' ';
    }
    gml += '</gml:posList>';
    gml += '</gml:LinearRing>';
    gml += '</gml:exterior>';
    gml += '</gml:Polygon>';

    return gml;
}
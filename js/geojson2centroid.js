function geoJSON2Centroid(feature) {
    if (!feature || !feature.geometry) {
        return null; // Return null if feature or geometry is missing
    }

    let totalPoints = 0;
    let centerX = 0;
    let centerY = 0;

    const geometry = feature.geometry;

    if (geometry.type === 'Point') {
        totalPoints++;
        centerX += geometry.coordinates[0];
        centerY += geometry.coordinates[1];
    } else if (geometry.type === 'MultiPoint') {
        geometry.coordinates.forEach(coord => {
            totalPoints++;
            centerX += coord[0];
            centerY += coord[1];
        });
    } else if (geometry.type === 'LineString') {
        geometry.coordinates.forEach(coord => {
            totalPoints++;
            centerX += coord[0];
            centerY += coord[1];
        });
    } else if (geometry.type === 'MultiLineString') {
        geometry.coordinates.forEach(line => {
            line.forEach(coord => {
                totalPoints++;
                centerX += coord[0];
                centerY += coord[1];
            });
        });
    } else if (geometry.type === 'Polygon') {
        geometry.coordinates[0].forEach(coord => {
            totalPoints++;
            centerX += coord[0];
            centerY += coord[1];
        });
    } else if (geometry.type === 'MultiPolygon') {
        geometry.coordinates.forEach(polygon => {
            polygon[0].forEach(coord => {
                totalPoints++;
                centerX += coord[0];
                centerY += coord[1];
            });
        });
    }

    // Calculating the average centroid
    centerX /= totalPoints;
    centerY /= totalPoints;

    // Returning the centroid as an array with longitude (x) and latitude (y)
    return [centerX, centerY];
}
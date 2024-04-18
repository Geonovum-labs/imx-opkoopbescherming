function calcAreaGeoJSON(feature) {
    if (!feature || !feature.geometry || feature.geometry.type !== 'Polygon') {
        return null; // Return null if feature is missing, has no geometry or geometry type is not Polygon
    }

    const polygonCoords = feature.geometry.coordinates[0]; // De buitenste ring van de polygon

    let oppervlakte = 0;

    // Berekenen van de oppervlakte van de sferische polygon
    for (let i = 0; i < polygonCoords.length - 1; i++) {
        const coord1 = polygonCoords[i];
        const coord2 = polygonCoords[i + 1];
        oppervlakte += (haversine(coord1, coord2) ** 2);
    }

    // Laatste zijde verbinden met de eerste zijde om de polygon te sluiten
    const coord1 = polygonCoords[polygonCoords.length - 1];
    const coord2 = polygonCoords[0];
    oppervlakte += (haversine(coord1, coord2) ** 2);

    // Berekenen van de oppervlakte van de sferische polygon
    oppervlakte *= Math.PI / (180 ** 2);

    return oppervlakte;
}


function haversine(coord1, coord2) {
    const [lon1, lat1] = coord1;
    const [lon2, lat2] = coord2;

    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = 6371e3 * c; // Earth radius in meters
    return distance;
}

    


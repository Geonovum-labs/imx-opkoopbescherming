// Functie om de oppervlakte van een GeoJSON-feature in lat/lon-coördinaten te berekenen met behulp van de trapeziumregel
function calculateArea(geometry) {
    const R = 6371000; // Straal van de aarde in meters
    let area = 0;

    // Loop door de coördinaten van de GeoJSON-feature
    for (let i = 0; i < geometry.length - 1; i++) {
        const lat1 = geometry[i][1] * Math.PI / 180; // Omzetten naar radialen
        const lon1 = geometry[i][0] * Math.PI / 180;
        const lat2 = geometry[i + 1][1] * Math.PI / 180;
        const lon2 = geometry[i + 1][0] * Math.PI / 180;

        // Bereken het oppervlak van het trapezium gevormd door de twee punten en de polen
        const a = Math.sin(lat2 - lat1) / 2 * Math.sin(lon2 - lon1) / 2;
        const b = Math.sin(lat2 - lat1) / 2 * Math.sin(lon2 - lon1) / 2;
        const c = Math.sin(lat2 - lat1) / 2 * Math.cos(lon2 + lon1) / 2;
        const d = Math.cos(lat2 + lat1) / 2;

        // Bereken de oppervlakte van het trapezium met de haversine-formule
        const areaSegment = 2 * R * Math.asin(Math.sqrt(a + b * c * d));

        // Voeg het oppervlak van het trapezium toe aan de totale oppervlakte
        area += areaSegment;
    }

    // Geef de totale oppervlakte terug in vierkante meters
    return area;
}

// Voorbeeld GeoJSON-feature met een reeks coördinaten
const feature = {
    "type": "Feature",
    "geometry": {
        "type": "Polygon",
        "coordinates": [
            [
                [4.89191, 52.37403],
                [4.89191, 52.37919],
                [4.90229, 52.37919],
                [4.90229, 52.37403],
                [4.89191, 52.37403]
            ]
        ]
    }
};

// Bereken de oppervlakte van de GeoJSON-feature
const area = calculateArea(feature.geometry.coordinates[0]); // Coördinaten van de buitenste ring van de veelhoek

console.log("Oppervlakte:", area, "vierkante meters");
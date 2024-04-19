let percelen, percelenLayer, verkochtePercelen, verkochtePercelenLayer, controleLayer;

function getPercelen() {
    console.log('ophalen Percelen');
    const bounds = map.getBounds();
    const bbox = `${bounds._southWest.lat},${bounds._southWest.lng},${bounds._northEast.lat},${bounds._northEast.lng}`;
    const url = `https://geodata.nationaalgeoregister.nl/kadastralekaart/wfs/v4_0?SERVICE=WFS&REQUEST=GetFeature&VERSION=2.0.0&TYPENAMES=kadastralekaartv4:perceel&STARTINDEX=0&COUNT=2000&OUTPUTFORMAT=application/json&SRSNAME=urn:ogc:def:crs:EPSG::4326&BBOX=${bbox},urn:ogc:def:crs:EPSG::4326`;

    $.getJSON(url, function(data) {
        console.log(data);
        percelenLayer = L.geoJSON(data, { style: {
                                            color: '#444',
                                            weight: 1,
                                            opacity: 0.5,
                                            fillOpacity: 0,
                                        }
        }).addTo(map);
        percelen = data;          
    });  
}

function getVerkochtePercelen(percelen) {    

    if (map.hasLayer(verkochtePercelenLayer) == true) {
        map.removeLayer(verkochtePercelenLayer);
    }

    features = [];
    $.getJSON('https://raw.githubusercontent.com/imx-org/imx-fieldlab/main/data/brk/OnroerendeZaak.json', function(data) { 
    
    const idx = getRandomIndexes(percelen.features.length);  
    i = 0;
    while (features.length < data.length) {
        j= features.length;
        feature = percelen.features[idx[i]];             
        if (feature.properties.kadastraleGrootteWaarde != 'undefined' && feature.properties.kadastraleGrootteWaarde > 100 && feature.properties.kadastraleGrootteWaarde < 250) {
            console.log(data);
            feature.id = data[j].identificatie;
            feature.properties = null;
            feature.properties = { controle : null }
            features.push(feature);                    
        }          
        i++;
    }  

    verkochtePercelenLayer = L.geoJSON(features, {                
            style: function(feature) {
                    switch (feature.properties.controle) {
                        case true: return {color: "#00ff00"};
                        case false:   return {color: "#ff0000"};
                        case 'selected': return {color: '#ffff000'};
                    }
                },
            onEachFeature: showData,            
        }
        ).addTo(map);
        map.fitBounds(verkochtePercelenLayer.getBounds());  
        verkochtePercelen = features;       
        return features;
    });    
}

function getRandomIndexes (length) {    
    const idx = [];
    for (i=0; i<= length-1; i++) { idx.push(i)}
    function randomSort() { return 0.5 - Math.random(); }
    idx.sort(randomSort);
    return idx;
}

function checkPercelen(verkochtePercelen){   
    verkochtePercelenLayer.clearLayers();
    $.each(verkochtePercelen, function(i, feature) {         
        checkOpkoopbescherming(feature,feature.id);     
    });
}

async function checkOpkoopbescherming(feature, identificatie) {
    const url = 'https://raw.githubusercontent.com/Geonovum-labs/imx-opkoopbescherming/main/graphql/opkoopbescherming.gql';    
    $.ajax({
        url: url,
        async: false
     }).done(function(graphql){        
        graphql = graphql.replace("%%id%%", identificatie);        
        queryOrkestratie(feature, graphql);
     });
}; 

async function queryOrkestratie(feature, graphql) {   
    var url= 'https://proxy.gewoongoedegeodata.nl/orkestratie/?url=https://imx.apps.digilab.network/fieldlab/api';       
    let gql = {"query" : JSON.stringify(graphql)};   
    $.post(url, gql, function(response) {     
        checkBewonerEigenaar(feature, response.data, graphql);
    });
}

function checkBewonerEigenaar(feature,data, graphql) {     
   const bewoner = data.kadastraalOnroerendeZaak.bewoner;
   const eigenaar = data.kadastraalOnroerendeZaak.eigenaar;
   const matches = bewoner.some(value => eigenaar.includes(value));  
   feature.properties = data.kadastraalOnroerendeZaak; 
   feature.properties.graphql = graphql;     
   feature.properties.controle = matches;     
   verkochtePercelenLayer.addData(feature);
}

function showData(feature, layer) {

    if (mapclick == false) {
        return false;
    }
   
    layer.on('click', function() { 
        document.getElementById('feature-properties').style.display='block';        
        const lineage = feature.properties.geregistreerdMet;
        const properties = feature.properties;

        formatProperties(properties);
        formatLineage(lineage);
        //$('#lineage').html('<h1>LINEAGE</h1>' + formatLineage(lineage));
        $('#properties').html('<h4>Georkestreerde gegevens</h4>' + formatProperties(properties));        


    });
}

function formatProperties (props) {

    var html = '<table><thead><tr><th>Attribuut</th><th>Waarde</th></tr></thead><tbody>';
    $.each(props, function(key, val) {
         if (key != 'geregistreerdMet') {
            html = html + '<tr><td>'+key+'</td><td>'+val+'</td></tr>';
        }
    });
    html = html + '</tbody></table>';
    return html;
}

function formatLineage (lineage) {

   var diagram =  createLineageDiagram(lineage);
  
   $('#lineageDiagram').html(diagram).removeAttr('data-processed');
   mermaid.init(undefined, $("#lineageDiagram"));   
   initPanZoom();  
}

function featureArray2Object(featureArray) {

// Omzetten naar een object zonder indexen
const featureObject = featureArray.reduce((acc, value) => {
    acc[value] = true; // Hier kun je elke waarde of eigenschap toewijzen aan de objecten zonder indexen
    return acc;
}, {});

}








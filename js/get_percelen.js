let percelen, percelenLayer, verkochtePercelen, verkochtePercelenLayer, controleLayer;

function getPercelen() {
    console.log('ophalen Percelen');
    const bounds = map.getBounds();
    const bbox = `${bounds._southWest.lat},${bounds._southWest.lng},${bounds._northEast.lat},${bounds._northEast.lng}`;
    const url = `https://geodata.nationaalgeoregister.nl/kadastralekaart/wfs/v4_0?SERVICE=WFS&REQUEST=GetFeature&VERSION=2.0.0&TYPENAMES=kadastralekaartv4:perceel&STARTINDEX=0&COUNT=2000&OUTPUTFORMAT=application/json&SRSNAME=urn:ogc:def:crs:EPSG::4326&BBOX=${bbox},urn:ogc:def:crs:EPSG::4326`;

    $.getJSON(url, function(data) {
        percelenLayer = L.geoJSON(data, { style: {
                                            color: '#000',
                                            weight: 2,
                                            fillOpacity: 0
                                        }
        }).addTo(map);
        percelen = data;          
    });  
}

function getVerkochtePercelen(percelen) {
    features = {};
    $.getJSON('https://raw.githubusercontent.com/imx-org/imx-fieldlab/main/data/brk/OnroerendeZaak.json', function(data) {                
        const idx = getRandomIndexes(percelen.features.length);   
        verkochtePercelenLayer = L.geoJSON(null, {
            style: function(feature) {
                switch (feature.properties.controle) {
                    case true: return {color: "#00ff00"};
                    case false:   return {color: "#ff0000"};
                    case 'selected': return {color: '#ffff000'};
                }
            }, 
            onEachFeature: showData
        }
        ).addTo(map);             
        for (i=0; i<data.length; i++) {                        
                features[i] = percelen.features[idx[i]];
                features[i].id = data[i].identificatie;
                features[i].properties = null;
                features[i].properties = { controle : null }
                verkochtePercelenLayer.addData(percelen.features[idx[i]]);            
            }         
        
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

    console.log(feature);
    // add yellow overlay;
    layer.on('click', function() {         
        const lineage = feature.properties.geregistreerdMet;
        const properties = feature.properties;

        formatProperties(properties);
        formatLineage(lineage);
        //$('#lineage').html('<h1>LINEAGE</h1>' + formatLineage(lineage));
        $('#properties').html('<h1>DATA</h1>' + formatProperties(properties));        
    });
}

function formatProperties (props) {

    var html = '<table><th><td>Attribuut<td></td>Waarde</td></th>';
    $.each(props, function(key, val) {
         if (key != 'geregistreerdMet') {
            html = html + '<tr><td>'+key+'</td><td>'+val+'</td></tr>';
        }
    });
    html = html + '</table>';
    return html;
}

function formatLineage (lineage) {

   var diagram =  createLineageDiagram(lineage);
   
   $('#lineageDiagram').html(diagram).removeAttr('data-processed');
   mermaid.init(undefined, $("#lineageDiagram"));   
   $.each(lineage, function(key, val) {

           // console.log(key,val);
          //  val.kenmerk

            


    });



}









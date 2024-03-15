var percelen;
var percelenLayer;

var verkochtePercelen;
var verkochtePercelenLayer

function get_percelen() {
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

function verkochtePercelen(percelen) {
    features = {};
    $.getJSON('https://raw.githubusercontent.com/imx-org/imx-fieldlab/main/data/brk/OnroerendeZaak.json', function(data) {
                
        const idx = getRandomIndexes(percelen.features.length);   
        verkochtePercelenLayer = L.geoJSON().addTo(map);
        
        for (i=0; i<data.length; i++) {
            features[i] = percelen.features[idx[i]];
            features[i].id = data[i].identificatie
            //console.log(percelen.features[idx[i]]);

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

function controleerPercelen(verkochtePercelen){
    console.log(verkochtePercelen);
    $.each(verkochtePercelen, function(i, feature) {
        
        opkoopBescherming(feature.id);        

        
    });
}

function opkoopBescherming(identificatie) {
    const url = 'https://raw.githubusercontent.com/Geonovum-labs/imx-opkoopbescherming/main/graphql/opkoopbescherming.gql';
    
    $.ajax({
        url: url,
        async: false
     }).done(function(graphql){       

        graphql.replace("%%id%%", identificatie);        
        vraagOrkestratie(graphql);        

         });
     //return toReturn;
}; 

function vraagOrkestratie(graphql) {

   
    var url= 'https://imx.apps.digilab.network/fieldlab/api';
    const query = JSON.stringify({ query: graphql});
    console.log(query);
    
    $.ajax({

        url: url,
        data: query,
        headers: {  'Content-Type' : 'application/json' },
        type: 'POST',
        //dataType: 'json',
        success: function() { alert("Success"); },
        error: function() { alert('Failed!'); },
    });

  




}




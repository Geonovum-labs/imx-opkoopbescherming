wmtslayer_bgt = L.tileLayer('https://service.pdok.nl/lv/bgt/wmts/v1_0/achtergrondvisualisatie/EPSG:28992/{z}/{x}/{y}.png', {		
                        WMTS: false,
                        attribution: '<a href="https://www.pdok.nl/">PDOK</a>',
                        opacity: 1, 
                        minZoom: 12,
                        
                    }); 


basemaps = {"bgt" : wmtslayer_bgt};


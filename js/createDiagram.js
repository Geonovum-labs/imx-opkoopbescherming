function createLineageDiagram(lineage) {

   // console.log(lineage.bestaatUit);
 var diagram = `graph RL;`;
   for (const i in lineage.bestaatUit) {       
        console.log(lineage.bestaatUit[i]);
        
        let kenmerk = lineage.bestaatUit[i].kenmerk;    
        for (const j in lineage.bestaatUit[i].waarde){            
            if ( lineage.bestaatUit[i].waarde[j] != null) {
                //console.log(lineage.bestaatUit[i].waarde[j]);
                var waarde = lineage.bestaatUit[i].waarde[j];                                  
            }
        }       
        diagram = diagram + `\nDoel${i}["Doel gegeven \n ${kenmerk}=${waarde}"];`;  
        
        path = [];
        
        for (const j in lineage.bestaatUit[i].wasGeneratedBy.used.pathMappings[0].path.segments) {
            if (j == 0) {
                path.push(`Pad${i}["`+lineage.bestaatUit[i].wasGeneratedBy.used.pathMappings[0].path.segments[j]+'"]');
            }
            else {
                path.push(lineage.bestaatUit[i].wasGeneratedBy.used.pathMappings[0].path.segments[j]);
            }
        }

        
        path=path.reverse().join('-->');
        //path=path.join('-->');
        diagram = diagram + `\n${path}-->Doel${i};`;

       // let path = lineage.bestaatUit[i].wasGeneratedBy.used.pathMappings[0].path.segments.join('-->');

        // EERSTE MOET B als varaiabele hebben
        // maxEdges exceed tot 500
        
       

        //console.log(lineage.bestaatUit[i].isAfgeleidVan);

        for (const j in lineage.bestaatUit[i].isAfgeleidVan) {

            console.log(j, lineage.bestaatUit[i].isAfgeleidVan[j]);

            let type = lineage.bestaatUit[i].isAfgeleidVan[j].onderwerp.type
            let identificatie = lineage.bestaatUit[i].isAfgeleidVan[j].onderwerp.identificatie

            for (const k in lineage.bestaatUit[i].isAfgeleidVan[j].waarde) {
                if ( lineage.bestaatUit[i].isAfgeleidVan[j].waarde[k] != null) {
                    //console.log(lineage.bestaatUit[i].waarde[j]);
                    var bronwaarde = lineage.bestaatUit[i].isAfgeleidVan[j].waarde[k];
                }
            }  

            diagram = diagram + `\nBron${type}${identificatie}["Brongegeven \n ${type} ${identificatie} \n ${bronwaarde}"]-->Pad${i}`;
            
            //if (diagram.includes(`\nD${j}["${waarde}"]-->Doel${j}["${type} id=${identificatie}\n"]-->Pad${i};`) == false) {
               //diagram = diagram + `\nD${j}["${waarde}"]-->Doel${i}["${type} id=${identificatie} \n ${waarde}"]-->Pad${i};`;
          //  }              

        }

        //diagram = diagram + `\nA${i}["${kenmerk}=${waarde}"];`;
        
      //  for (const j in lineage.bestaatUit[i].isAfgeleidVan) {
      //      console.log(lineage.bestaatUit[i].isAfgeleidVan[j]);
      //  }

      
        
        //for (const j in lineage.bestaatUit[i].wasGeneratedBy.used.pathMappings[0].path.segments)

        //console.log(diagram);
        


}
   
   return diagram;







}
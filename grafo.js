console.log ("Hola desde grafo")

d3.json("https://gist.githubusercontent.com/mbostock/4062045/raw/5916d145c8c048a6e3086915a6be464467391c62/miserables.json").then (function(data){

          console.log ("Estamos dentro")   
    
        // ESCALA DE COLORES
        var escalaColor = d3.scaleOrdinal(d3.schemeCategory10)
        
    
       
        var layout = d3.forceSimulation()
            .force("link", d3.forceLink().id(d=>d.id))
            .force("charge", d3.forceManyBody())
            .force("center", d3.forceCenter(250,250))
        
        layout
            .nodes(data.nodes)
            .on("tick",onTick)
    
        layout  
            .force("link")
            .links(data.links)
    
        
        // 1 CREAR NUESTRO SVG
        var svg = d3.select("body")
            .append("svg")
            .attr("width", 600)
            .attr("height", 600)
        
        // 2. PINTAMOS LINEAS Y DESPUES NODOS
        var links= svg
            .append ("g")
            .selectAll("line")
            .data(data.links)
            .enter()
            .append("line")
            .style ("stroke-width", d=>d.value/5)
            //.style ("stroke", "#aaa")
        
        // 8. PINTAMOS LOS ENLACES CON COLORES
            .style ("stroke", d => {
                if (d.source.group == d.target.group)
                    return (escalaColor(d.source.group))
                else
                    return ("#aaa")       
            })
        
        
        
        
        // 3. PINTAMOS LOS NODOS
        var nodes = svg 
            .append("g")
            .selectAll("circle")
            .data(data.nodes)
            .enter()
            .append("circle")
            .attr("r",5)
            //.attr("fill", "blue")
        
        // 7. APLICAR UNA ESCALA DE COLORES
            .attr("fill", d=>escalaColor(d.group))
        
                
                  
        // FUNCION ONTICK
        function onTick(){
          nodes
            .attr("cx", d => d.x)
            .attr("cy", d => d.y)
           links
            .attr("x1", d => d.source.x)
            .attr("x2", d => d.target.x)
            .attr("y1", d => d.source.y)
            .attr("y2", d => d.target.y)
         }         
                  
                  
                  
                  
                  
                  
})
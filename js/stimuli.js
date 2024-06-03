$(document).ready(function(){
   drawLine();
   drawCJBar();
   drawDisBar();
   drawPie();
   drawTree();
   drawWaffle();
   drawStackedBar();
});


// Helper function for Isotype
function range(start, stop, step) {
    if (typeof stop == 'undefined') {
        // one param defined
        stop = start;
        start = 0;
    }

    if (typeof step == 'undefined') {
        step = 1;
    }

    if ((step > 0 && start >= stop) || (step < 0 && start <= stop)) {
        return [];
    }

    var result = [];
    for (var i = start; step > 0 ? i < stop : i > stop; i += step) {
        result.push(i);
    }

    return result;
};

 // Case Study 1 - DrawLine
     function drawLine(){
         d3.csv("data1.csv", function(error, data) {
         var c = "community";
         const margin = 50;
         const width = 750 - 2 * margin;
         const height = 600 - 2 * margin;
         const svg = d3.select('#svg1')
                       .attr('width',width + 100)
                       .attr('height', height + 100);

         const svg2 = d3.select('#svg2')
                       .attr('width',width + 100)
                       .attr('height', height + 100); 

        const svg3 = d3.select('#svg3')
                       .attr('width',width + 100)
                       .attr('height', height + 100);  


        const svg4 = d3.select('#svg4')
                       .attr('width',width + 100)
                       .attr('height', height + 100);  
         const maxVal = 5.0;
         const chart = svg.append('g')
                          .attr('transform', `translate(${margin}, 30)`);
         const chart2 = svg2.append('g')
                          .attr('transform', `translate(${margin}, 30)`);

         const chart3 = svg3.append('g')
                          .attr('transform', `translate(${margin}, 30)`);
                                        
         const chart4 = svg4.append('g')
                          .attr('transform', `translate(${margin}, 30)`);     

         const xScale = d3.scaleBand()
                          .range([0, width])
                          .domain(data.map((d) => d.year))

         const yScale = d3.scaleLinear()
                          .range([height, 0])
                          .domain([0, maxVal]);

         chart.append('g')
              .attr('transform', `translate(0, ${height})`)
              .call(d3.axisBottom(xScale));

         chart.append('g')
              .call(d3.axisLeft(yScale));

         function line(c,data){
         	var line = d3.line(c, data)
                     	 .x(function(d) {return xScale(d.year); })
                       	 .y(function(d) {return yScale(d[c]); })        
                      	 .curve(d3.curveBasis);
                      	 return line(data);
         }; 
     
         chart.append('path')
            .attr('class', 'line')
            .attr('fill',"none")
            .attr('d', line('community',data))
            .attr('stroke', '#a50026');

         chart.append('path')
            .attr('class', 'line')
            .attr('fill',"none")
            .attr('d', line('institutional',data))
            .attr('stroke', 'steelblue');

         svg.append('text')
            .attr('class', 'label')
            .attr('x', -(height / 2) - margin)
            .attr('y', margin / 3)
            .attr('transform', 'rotate(-90)')
            .attr('text-anchor', 'middle')
            .text('Billion ($)')
            .attr("font-size", "12px")
            .attr("font-family", "arial");

         svg.append('text')
            .attr('class', 'label')
            .attr('x', width / 2 + margin)
            .attr('y', 580)
            .attr('text-anchor', 'middle')
            .text('Fiscal Year')
            .attr("font-size", "12px")
            .attr("font-family", "arial");

          svg.append('text')
            .attr('class', 'label')
            .attr('x', width)
            .attr('y', 580)
            .attr('text-anchor', 'middle')
            .text('INACCESSIBLE')
            .attr("font-size", "15px")
            .attr("fill","black")
            .attr("font-weight", "bold")
            .attr("font-family", "arial");

          var rect = svg.selectAll('rect')
          				.data([data])
          				.enter();

          var rect2 = svg2.selectAll('rect')
                  .data([data])
                  .enter();   

          var rect3 = svg3.selectAll('rect')
                  .data([data])
                  .enter();  

          var rect4 = svg4.selectAll('rect')
                  .data([data])
                  .enter();                    

         rect.append("rect")
   			     .attr("x", 520)
    		     .attr("y", 35)
    	       .attr("width", 50)
    		     .attr("height", 5)
   	  	     .style("fill", "#a50026");

   	  	 rect.append('text')
   	  	     .attr("x", 580)
    		     .attr("y", 40)
   	  	     .text('Community/Family Services')
   	  	     .attr('font-family',"arial")
   	  	     .attr('font-size','12px')
   	  	     .attr('font-weight','bold');

   	  	 rect.append("rect")
   			      .attr("x", 520)
    		      .attr("y", 55)
    	        .attr("width", 50)
    		      .attr("height", 5)
   	  	     .style("fill", "steelblue");

   	  	 rect.append('text')
   	  	     .attr("x", 580)
    		     .attr("y", 60)
   	  	     .text('Institutional Services')
   	  	     .attr('font-family',"arial")
   	  	     .attr('font-size','12px')
   	  	     .attr('font-weight','bold');


       var seriesNames = d3.keys(data[0])
                           .filter(function(d) { return d !== "total" && d !=="year"; })
                           .sort();

       var series = seriesNames.map(function(series) {
                     return data.map(function(d) {
                     return {x: +d.year, y: +d[series]};
        });
     });
  
       var color = d3.scaleOrdinal() // D3 Version 4
                     .domain(["community", "institutional"])
                     .range(["#a50026" , "steelblue"]);

         rect2.append("circle")
              .attr('r',6)
              .attr("cx", 570)
              .attr("cy", 35)
              .attr("width", 50)
              .attr("height", 5)
              .style("fill", "#a50026")
              .style("opacity", 1);

         rect2.append('text')
             .attr("x", 580)
             .attr("y", 40)
             .text('Community/Family Services')
             .attr('font-family',"arial")
             .attr('font-size','12px')
             .attr('font-weight','bold');

         rect2.append("circle")
              .attr('r',6)
              .attr("cx", 570)
              .attr("cy", 55)
              .style("fill", "steelblue")
              .style("opacity", 1);

         rect2.append('text')
             .attr("x", 580)
             .attr("y", 60)
             .text('Institutional Services')
             .attr('font-family',"arial")
             .attr('font-size','12px')
             .attr('font-weight','bold');             

         chart2.append('g')
               .attr('transform', `translate(0, ${height})`)
               .call(d3.axisBottom(xScale));

         chart2.append('g')
               .call(d3.axisLeft(yScale));

         chart2.selectAll(".series")
               .data(series)
               .enter().append("g")
               .attr('class','series')       
               .style("fill",function(d,i){return color(i);})
               .selectAll(".point")
               .data(function(d) { return d; })
               .enter().append("circle")
               .attr("class", "point")
               .attr("r", 10)
               .attr("cx", function(d) { return xScale(d.x);})
               .attr("cy", function(d) { return yScale(d.y);});

         svg2.append('text')
            .attr('class', 'label')
            .attr('x', -(height / 2) - margin)
            .attr('y', margin / 3)
            .attr('transform', 'rotate(-90)')
            .attr('text-anchor', 'middle')
            .text('Billion ($)')
            .attr("font-size", "12px")
            .attr("font-family", "arial");

         svg2.append('text')
            .attr('class', 'label')
            .attr('x', width / 2 + margin)
            .attr('y', 580)
            .attr('text-anchor', 'middle')
            .text('Fiscal Year')
            .attr("font-size", "12px")
            .attr("font-family", "arial");

         svg2.append('text')
            .attr('class', 'label')
            .attr('x', width)
            .attr('y', 580)
            .attr('text-anchor', 'middle')
            .text('ACCESSIBLE')
            .attr("font-size", "15px")
            .attr("font-weight", "bold")
            .attr("fill","black")
            .attr("font-family", "arial");

        chart3.append('g')
              .attr('transform', `translate(0, ${height})`)
              .call(d3.axisBottom(xScale));

        chart3.append('g')
              .call(d3.axisLeft(yScale));

        chart3.append('path')
            .attr('class', 'line')
            .attr('fill',"none")
            .attr('d', line('total',data))
            .attr('stroke', 'steelblue');

         svg3.append('text')
            .attr('class', 'label')
            .attr('x', -(height / 2) - margin)
            .attr('y', margin / 3)
            .attr('transform', 'rotate(-90)')
            .attr('text-anchor', 'middle')
            .text('Billion ($)')
            .attr("font-size", "12px")
            .attr("font-family", "arial");

         svg3.append('text')
            .attr('class', 'label')
            .attr('x', width / 2 + margin)
            .attr('y', 580)
            .attr('text-anchor', 'middle')
            .text('Fiscal Year')
            .attr("font-size", "12px")
            .attr("font-family", "arial");

          svg3.append('text')
            .attr('class', 'label')
            .attr('x', width)
            .attr('y', 580)
            .attr('text-anchor', 'middle')
            .text('INACCESSIBLE')
            .attr("font-size", "15px")
            .attr("fill","black")
            .attr("font-weight", "bold")
            .attr("font-family", "arial");


         rect3.append("rect")
             .attr("x", 520)
             .attr("y", 35)
             .attr("width", 50)
             .attr("height", 5)
             .style("fill", "steelblue");

         rect3.append('text')
             .attr("x", 575)
             .attr("y", 40)
             .text('Total (All Services Combined)')
             .attr('font-family',"arial")
             .attr('font-size','12px')
             .attr('font-weight','bold');


        chart4.append('g')
              .attr('transform', `translate(0, ${height})`)
              .call(d3.axisBottom(xScale));

        chart4.append('g')
              .call(d3.axisLeft(yScale));

        chart4.append('path')
              .data([data])
              .attr('class', 'line')
              .attr('class', 'iconline')
              .attr('fill',"none")
              .attr('d', line('total',data))
              .attr('stroke', 'grey');

        chart4.selectAll(".dot")
              .data(data)
              .enter().append("image")
              .attr("xlink:href", "img/dollar.png")
              .attr("x", function(d) { return xScale(d.year) - 16})
              .attr("y", function(d) { return yScale(d.total) - 15})
              .attr("width", 28)
              .attr("height", 28);
    
         svg4.append('text')
            .attr('class', 'label')
            .attr('x', -(height / 2) - margin)
            .attr('y', margin / 3)
            .attr('transform', 'rotate(-90)')
            .attr('text-anchor', 'middle')
            .text('Billion ($)')
            .attr("font-size", "12px")
            .attr("font-family", "arial");

         svg4.append('text')
            .attr('class', 'label')
            .attr('x', width / 2 + margin)
            .attr('y', 580)
            .attr('text-anchor', 'middle')
            .text('Fiscal Year')
            .attr("font-size", "12px")
            .attr("font-family", "arial");

          svg4.append('text')
            .attr('class', 'label')
            .attr('x', width)
            .attr('y', 580)
            .attr('text-anchor', 'middle')
            .text('ACCESSIBLE')
            .attr("font-size", "15px")
            .attr("fill","black")
            .attr("font-weight", "bold")
            .attr("font-family", "arial");

         rect4.append("rect")
             .attr("x", 520)
             .attr("y", 35)
             .attr("width", 50)
             .attr("height", 5)
             .style("fill", "grey")
             .style("opacity",.5);

         rect4.append('text')
             .attr("x", 575)
             .attr("y", 40)
             .text('Total (All Services Combined)')
             .attr('font-family',"arial")
             .attr('font-size','12px')
             .attr('font-weight','bold');
});
     };

 // Case Study 2 - DrawBar

function drawDisBar(){
  d3.csv("data2.csv", function(error, data) {
         const margin = 50;
         const width = 750 - 2 * margin;
         const height = 600 - 2 * margin;
         const svg = d3.select('#svg5')
                       .attr('width',width + 100)
                       .attr('height', height + 100);

         const svg2 = d3.select('#svg6')
                       .attr('width',width + 100)
                       .attr('height', height + 100);                  

         const maxVal = 80.0;
         const chart = svg.append('g')
                          .attr('transform', `translate(${margin}, 30)`);

         const chart2 = svg2.append('g')
                          .attr('transform', `translate(${margin}, 30)`);                    

         const xScale = d3.scaleBand()
                          .range([0, width])
                          .domain(data.map((s) => s.year))
                          .padding(0.4)

         const yScale = d3.scaleLinear()
                          .range([height, 0])
                          .domain([0, maxVal]);

         const barGroups = chart.selectAll()
                                .data(data)
                                .enter()
                                .append('g')


         barGroups.append('rect')
                  .attr('class', 'bar')
                  .attr('fill', 'steelblue')
                  .attr('x', (g) => xScale(g.year))
                  .attr('y', (g) => yScale(g.total))
                  .attr('height', (g) => height - yScale(g.total))
                  .attr('width', xScale.bandwidth())


         chart.append('g')
              .attr('transform', `translate(0, ${height})`)
              .call(d3.axisBottom(xScale));

         chart.append('g')
              .call(d3.axisLeft(yScale));

         svg.append('text')
           .attr('class', 'label')
           .attr('x', -(height / 2) - margin)
           .attr('y', margin / 3)
           .attr('transform', 'rotate(-90)')
           .attr('text-anchor', 'middle')
           .text('Billion ($)')
           .attr("font-size", "12px")
           .attr("font-family", "arial");

         svg.append('text')
             .attr('class', 'label')
             .attr('x', width / 2 + margin)
             .attr('y', 580)
             .attr('text-anchor', 'middle')
             .text('Fiscal Year')
             .attr("font-size", "12px")
             .attr("font-family", "arial");


          svg.append('text')
            .attr('class', 'label')
            .attr('x', width)
            .attr('y', 580)
            .attr('text-anchor', 'middle')
            .text('INACCESSIBLE')
            .attr("font-size", "15px")
            .attr("fill","black")
            .attr("font-weight", "bold")
            .attr("font-family", "arial");


          svg.append('text')
             .attr("x", 410)
             .attr("y", 40)
             .text('Total IDD Expenditures (Federal, State, Local Combined)')
             .attr('font-family',"arial")
             .attr('font-size','12px')
             .attr('font-weight','bold');

          chart2.append('g')
                .attr('transform', `translate(0, ${height})`)
                .call(d3.axisBottom(xScale));

          chart2.append('g')
                .call(d3.axisLeft(yScale));


          var groups = chart2.selectAll('.groups')
                      .data(data)
                      .enter()
                      .append('g')
                      .attr('transform', function(d) {
                        return "translate(" + (xScale(d.year)) +  ")";});              

          svg2.append('text')
              .attr('class', 'label')
              .attr('x', -(height / 2) - margin)
              .attr('y', margin / 3)
              .attr('transform', 'rotate(-90)')
              .attr('text-anchor', 'middle')
              .text('Billion ($)')
              .attr("font-size", "12px")
              .attr("font-family", "arial");
 
          svg2.append('text')
             .attr('class', 'label')
             .attr('x', width / 2 + margin)
             .attr('y', 580)
             .attr('text-anchor', 'middle')
             .text('Fiscal Year')
             .attr("font-size", "12px")
             .attr("font-family", "arial")

          svg2.append('text')
            .attr('class', 'label')
            .attr('x', width)
            .attr('y', 580)
            .attr('text-anchor', 'middle')
            .text('ACCESSIBLE')
            .attr("font-size", "15px")
            .attr("fill","black")
            .attr("font-weight", "bold")
            .attr("font-family", "arial"); 

          svg2.append('text')
             .attr("x", 410)
             .attr("y", 40)
             .text('Total IDD Expenditures (Federal, State, Local Combined)')
             .attr('font-family',"arial")
             .attr('font-size','12px')
             .attr('font-weight','bold');


    //  Defining a clipping pane, let the clip-path iterate on each column (year),
   //     assigning on the index of one set of dots
   //     applying clip0 to the first column, clip2 to the second, clip3 to the third...
    var clipPath = groups.append("svg:clipPath")  
                         // .append("svg:clipPath")  
                         .attr('id', function(d,i){
                                return "clip" + d.year;})
                         .append('rect')
                         .attr('id','rect-clip')
                         .attr("y", function(d) {
                               return yScale(d.total);})
                         .attr("width", 50)
                         .attr("height", function(d) {
                          return height - yScale(d.total);});

    //DS: adding code in here to fix y-position ******************************************
    var dots = groups.selectAll("circle")
                     .data(function(d){
                       //Loop over the range output and pair them with d.name
                       //Put them in a json object and add that to the data array
                       var data = [];
                       //var range_output = range(d.amount,0,-14000);
                       // DS: If I'm understanding correctly, we want to add a datapoint
                       // for each step in the value range. Atttempting here
                       // var stepSize = maxVal / (height / (2 * iconSize + iconPad));
                       var stepSize = maxVal / (height / (2 * 10));
                       var range_output = range(0,d.total, stepSize);
                       for(var i = 0; i < range_output.length; i++){
                         var temp = {name: d.year, total: range_output[i]};
                         data.push(temp);
                       }
                       return data;})
                     .enter()
                     .append("circle")
                     .attr("class", "dot")
                     .attr("r", 10)
                     .attr("cx", function(d) {
                       return (width/data.length)/2 - 6;})
                     .attr("cy", function(d) {
                       return yScale(d.total) - 10;})
                     .style("fill", "steelblue")
                     .style("opacity", .5)
                     .attr('clip-path', function(d){
                      // console.log(d);
                        return 'url(' + "#clip" + d.name + ')';});             

      });
};


 function drawCJBar(){
      d3.csv("data2.csv", function(error, data) {
         const margin = 50;
         const width = 750 - 2 * margin;
         const height = 600 - 2 * margin;
         const svg = d3.select('#svg7')
                       .attr('width',width + 100)
                       .attr('height', height + 100);

         const svg2 = d3.select('#svg8')
                       .attr('width',width + 100)
                       .attr('height', height + 100);                  

         const maxVal = 50.0;
         const chart = svg.append('g')
                          .attr('transform', `translate(${margin}, 30)`);

         const chart2 = svg2.append('g')
                          .attr('transform', `translate(${margin}, 30)`);                          

         const xScale = d3.scaleBand()
                          .range([0, width])
                          .domain(data.map((s) => s.year))
                          .padding(0.4)

         const yScale = d3.scaleLinear()
                          .range([height, 0])
                          .domain([0, maxVal]);

         const barGroups = chart.selectAll()
                                .data(data)
                                .enter()
                                .append('g')

         const barGroups2 = chart2.selectAll()
                                .data(data)
                                .enter()
                                .append('g')

         barGroups.append('rect')
                  .attr('class', 'bar')
                  .attr('fill', 'steelblue')
                  .attr('x', (g) => xScale(g.year))
                  .attr('y', (g) => yScale(g.federal))
                  .attr('height', (g) => height - yScale(g.federal))
                  .attr('width', xScale.bandwidth())

         barGroups2.append('svg:image')
            .attr("xlink:href", "img/dollar.png")
            .attr('width', 36)
            .attr('height', (g) => height - yScale(g.federal))
            .style('max-width', 10)
            .style('max-height', (g) => height - yScale(g.federal))
            .attr("preserveAspectRatio", "none")
            .attr("viewBox", "0, 0," + 10 + "," + height)
            .attr('x', (g) => xScale(g.year) - 5)
            .attr('y', (g) => yScale(g.federal))


         chart.append('g')
              .attr('transform', `translate(0, ${height})`)
              .call(d3.axisBottom(xScale));

         chart.append('g')
              .call(d3.axisLeft(yScale));


        // DS: Repositioning the image
        const imgWidth = 125;
        var img = chart.append("svg:image")
                             .attr("xlink:href", "img/banknote.svg")
                             .attr("width", imgWidth)
                             .attr("height", imgWidth)
                             .attr("x", width/2-imgWidth/2)
                             .attr("y",390)
                             .attr('opacity', .7);

         svg.append('text')
           .attr('class', 'label')
           .attr('x', -(height / 2) - margin)
           .attr('y', margin / 3)
           .attr('transform', 'rotate(-90)')
           .attr('text-anchor', 'middle')
           .text('Billion ($)')
           .attr("font-size", "12px")
           .attr("font-family", "arial");

         svg.append('text')
             .attr('class', 'label')
             .attr('x', width / 2 + margin)
             .attr('y', 580)
             .attr('text-anchor', 'middle')
             .text('Fiscal Year')
             .attr("font-size", "12px")
             .attr("font-family", "arial");


          svg.append('text')
            .attr('class', 'label')
            .attr('x', width)
            .attr('y', 580)
            .attr('text-anchor', 'middle')
            .text('INACCESSIBLE')
            .attr("font-size", "15px")
            .attr("fill","black")
            .attr("font-weight", "bold")
            .attr("font-family", "arial");


          svg.append('text')
             .attr("x", 540)
             .attr("y", 40)
             .text('IDD Federal Expenditures')
             .attr('font-family',"arial")
             .attr('font-size','12px')
             .attr('font-weight','bold');

          chart2.append('g')
                .attr('transform', `translate(0, ${height})`)
                .call(d3.axisBottom(xScale));

          chart2.append('g')
                .call(d3.axisLeft(yScale));


          svg2.append('text')
              .attr('class', 'label')
              .attr('x', -(height / 2) - margin)
              .attr('y', margin / 3)
              .attr('transform', 'rotate(-90)')
              .attr('text-anchor', 'middle')
              .text('Billion ($)')
              .attr("font-size", "12px")
              .attr("font-family", "arial");
 
          svg2.append('text')
             .attr('class', 'label')
             .attr('x', width / 2 + margin)
             .attr('y', 580)
             .attr('text-anchor', 'middle')
             .text('Fiscal Year')
             .attr("font-size", "12px")
             .attr("font-family", "arial")

          svg2.append('text')
            .attr('class', 'label')
            .attr('x', width)
            .attr('y', 580)
            .attr('text-anchor', 'middle')
            .text('ACCESSIBLE')
            .attr("font-size", "15px")
            .attr("fill","black")
            .attr("font-weight", "bold")
            .attr("font-family", "arial"); 

          svg2.append('text')
             .attr("x", 540)
             .attr("y", 40)
             .text('IDD Federal Expenditures')
             .attr('font-family',"arial")
             .attr('font-size','12px')
             .attr('font-weight','bold');

      });
};

 // Case Study 3 - DrawPie
 function drawPie(){
      d3.csv("data3.csv", function(error, data){
      // parse the Data
      data.forEach(function(d){
        d.state = d.state;
        d.total = +d.total;
      });

          // Color
          var color = d3.scaleOrdinal()
                        .range(['#a50026','#f46d43','#fee090','#74add1','#313695', '#c967c6']);

          // Arc generator
          var arc = d3.arc()
                      .outerRadius(220)
                      .innerRadius(0);

          var labelArc = d3.arc()
                           .outerRadius(220)
                           .innerRadius(0);

          // Pie generator
          var pie = d3.pie()
                      .sort(null)
                      .value(function(d){return d.total});

          // Define svg
          var svg = d3.select('#svg9')
                      .attr('width',750)
                      .attr('height', 600)
                      .append('g')
                      .attr('transform', 'translate(0'+300+','+320+')');

          var Colors = [];

      // Formatting the number into percentage
      var total = d3.sum(data, function(d){
        return d.total;});

      var toPercent = d3.format("0.1%");

      // append g elemnets arc
      var g = svg.selectAll('.arc')
                 .data(pie(data))
                 .enter()
                 .append('g')
                 .attr('class','arc');
      // append g elemnets path
      g.append('path')
       .attr('d', arc)
       .style('opacity', .9)
       .attr('class','cateArc')
       // assign an id to each slice to add text in the next block
       .attr('id', function(d,i) {return "cateArc_" + i;})
       .style('fill', function(d,i) {
         Colors.push(color(d.data.state));
         return color(d.data.state);
       })
       .style('opacity',1);

      // Loop through the data and add a new color key
      let legend_data = pie(data);
      for (var i =  0; i < legend_data.length; i++) {
        legend_data[i]["color"] = Colors[i];
      }

     // Loop through the new data and get all the pieces we need + draw the legend
      for (var i = 0; i < legend_data.length; i++) {

        svg.append('rect')
            .attr('x',350)
            .attr('y',-250 + i*20)
            .attr('width',15)
            .attr('height',15)
            .attr('fill',legend_data[i]["color"]);

        svg.append('text')
            .attr('class','key')
            .attr('x',370)
            .attr('y',-238 + i*20)
            .attr('font-weight','bold')
            .attr('font-size','12px')
            .attr('fill','black')
            .attr('font-family','arial')
            .text(legend_data[i]["data"]["state"] /**+ toPercent(legend_data[i]["data"]["value"] / total)**/);

        svg.append('text')
            .attr('x',290)
            .attr('y',-270)           
            .text("Rocky Mountain Area")
            .attr('font-weight','bold')
            .attr('font-size','12px')
            .attr('fill','black')
            .attr('font-family','arial'); 

        svg.append('text')
            .attr('x', 350)
            .attr('y', 270)
            .attr('text-anchor', 'middle')
            .text('INACCESSIBLE')
            .attr("font-size", "15px")
            .attr("fill","black")
            .attr("font-weight", "bold")
            .attr("font-family", "arial");           
      }
    });
 }


// Case Study 3: Draw Stacked Bar
 function drawStackedBar(){
    d3.csv("data3.csv", function(error, data){
          if(error) throw error;
              data.forEach(function(d){
                  d.total = +d.total;
                  });

    const margin = {
                    top: 20,
                    right: 20,
                    bottom: 20,
                    left: 0
                  }
    const width = 750 - 2 * 50;
    const height = 600 - 2 * 50;

    var svg = d3.select('#svg10')
                 .attr('width',width + 100)
                 .attr('height',height + 100);


    var x = d3.scaleBand()
              .range([margin.left, width - margin.right])
              .domain([0, width]);

    var y = d3.scaleLinear()
              .range([height - margin.top, margin.bottom])
              .domain([height, 0]);

    var xAxis = d3.axisBottom()
                  .scale(x);

    var yAxis = d3.axisLeft()
                  .scale(y)
                  .tickFormat(d3.format(".2s"));

    var y0 = 0;
    var y1 = 0;
              
    data.forEach(function (d) {
          d.color = d.color
          d.y0 = y0;
          d.y1 = y0 + d.total;
          y0 = y0+d.total;
                    });
          
      x.domain("0.00");
      y.domain([0, y0]);

     var mygroups = svg.selectAll("g")
                        .data(data)
                        .enter().append("g")
                        .attr('transform', `translate(350)`);

          mygroups.append("rect")
                  .attr("width", 20)
                  .attr("y", function (d) {
                     return y(d.y1) + 60;})
                  .attr("height", function (d) {
                      return y(d.y0) - y(d.y1);})
                  .attr("class", "rectangle")
                  .style("fill", function (d) {
                      return d.color;})
                  .style('opacity',1);

         // Add the legends
         // Loop through the new data and get all the pieces we need + draw the legend
          const legend_data = data;

          for (var i = 0; i < legend_data.length; i++) {

          svg.append('rect')
             .attr('x',650)
             .attr('y',65 + i*20)
             .attr('width',15)
             .attr('height',15)
             .attr("fill",legend_data[i]["color"]);

          svg.append('text')
             .attr('class','key')
             .attr('x',670)
             .attr('y',78 + i*20)
            .attr('font-weight','bold')
            .attr('font-size','12px')
            .attr('fill','black')
            .attr('font-family','arial')
            .text(legend_data[i]["state"]);

         svg.append('text')
            .attr('x',590)
            .attr('y',50)           
            .text("Rocky Mountain Area")
            .attr('font-weight','bold')
            .attr('font-size','12px')
            .attr('fill','black')
            .attr('font-family','arial'); 

        svg.append('text')
            .attr('x', width)
            .attr('y', 590)
            .attr('text-anchor', 'middle')
            .text('ACCESSIBLE')
            .attr("font-size", "15px")
            .attr("fill","black")
            .attr("font-weight", "bold")
            .attr("font-family", "arial");    
          }
    });
};


// Case Study 3: Draw Waffle
function drawWaffle(){
    const margin = 50;
    const width = 750 - 2 * margin;
    const height = 600 - 2 * margin;
    const svg = d3.select('#svg11')
                .attr('width',width + 100)
                .attr('height',height + 100)
                .attr('transform', function(d,i){return "translate(0," + "0)"; });


        d3.csv("data3.csv", function(error, data){
        var chart = d3waffle()
                    .rows(8)
                    .adjust(0.4)
                    .height(340)
                    .icon("")
                    .scale(6);

        d3.select('#svg11')
          .datum(data)
          .call(chart);

      var legend = svg.selectAll('.legend')
          .data(data)
          .enter().append('g')
          .attr('class', 'legend')
          .attr('transform', function(d,i){return "translate(10," + i*20 + ")"; })      

       legend.append('circle')
             .attr('r', 8)
             .attr('cx', width+5)
             .attr('cy', 60)
             .attr('fill',function(d){return d.color; });

       legend.append('text')
             .attr('x', width+20)
             .attr('y', 65)
             .style('font-weight','bold')
             .style("font-size", "12px")
             .style("font-family", "arial")
             .attr('text-anchor', "center")
             .attr('fill','black')
             .text(function(d) {return d.state;});

        svg.append('text')
           .attr('x',width - 40)
           .attr('y',40)           
           .text("Rocky Mountain Area")
           .attr('font-weight','bold')
           .attr('font-size','12px')
           .attr('fill','black')
           .attr('font-family','arial');  

        svg.append('text')
            .attr('x', width)
            .attr('y', 590)
            .attr('text-anchor', 'middle')
            .text('INACCESSIBLE')
            .attr("font-size", "15px")
            .attr("fill","black")
            .attr("font-weight", "bold")
            .attr("font-family", "arial");    
             
      });

};


// Case Study 3: Draw Treemap
 function drawTree(){

    const margin = 50;
    const width = 750 - 2 * margin;
    const height = 600 - 2 * margin;
    const svg = d3.select('#svg12')
                .attr('width',width + 100)
                .attr('height',height + 100)
                .attr('transform', function(d,i){return "translate(0," + "0)"; });
  
           
   d3.csv("data4.csv", function(error, data){
              if(error) throw error;
          // stratify the data: reformatting for d3.js
          var root = d3.stratify()
                      .id(function(d) { return d.name; })   // Name of the entity (column name is name in csv)
                      .parentId(function(d) { return d.parent; })   // Name of the parent (column name is parent in csv)
                      (data);
          root.sum(function(d) { return +d.value })   // Compute the numeric value for each entity

          // Then d3.treemap computes the position of each element of the hierarchy
          // The coordinates are added to the root object above
          d3.treemap()
            .size([width-110, height-220])
            .padding(2)
            (root)
        // console.log(root.leaves())
          // use this information to add rectangles:
          svg.selectAll("rect")
              .data(root.leaves())
              .enter()
              .append("rect")
              .attr('width', function (d) { return (d.x1 - d.x0); })
              .attr('height', function (d) { return (d.y1 - d.y0); })
              .attr('x', function (d) { return d.x0 + 60; })
              .attr('y', function (d) { return d.y0 + 180; })
              .style("fill", d => { while (d.depth > 1) d = d.parent; return d.data.color; });


          // Add legend
            var legend = svg.selectAll('.legend')
                             .data(root.leaves())
                             .enter().append('g')
                             .attr('class', 'legend')
                             .attr('transform', function(d,i){return "translate(10," + i*20 + ")"; })

            legend.append('rect')
                  .attr('width', 15)
                  .attr('height',15)
                  .attr('x', width)
                  .attr('y', 55)
                  .attr('fill',function(d){return d.data.color; });

             legend.append('text')
                   .attr('x', width+20)
                   .attr('y', 65)
                   .style('font-weight','bold')
                   .style("font-size", "12px")
                   .style("font-family", "arial")
                   .attr('text-anchor', "center")
                   .attr('fill','black')
                   .text(function(d) {return d.data.name;});

              svg.append('text')
                    .attr('x',width - 40)
                    .attr('y',40)           
                    .text("Rocky Mountain Area")
                    .attr('font-weight','bold')
                    .attr('font-size','12px')
                    .attr('fill','black')
                    .attr('font-family','arial');  

            svg.append('text')
               .attr('x', width)
               .attr('y', 590)
               .attr('text-anchor', 'middle')
               .text('ACCESSIBLE')
               .attr("font-size", "15px")
               .attr("fill","black")
               .attr("font-weight", "bold")
               .attr("font-family", "arial");    
                          
        });
};
  
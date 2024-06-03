function d3waffle() {
  var margin = {top: 10, right: 10, bottom: 10, left: 10},
      icon = "&#9632;",
      scale = 100,
      rows = 10,
      adjust = 0.8,
      range = ['#a50026','#f46d43','#fee090','#74add1','#313695', 'c967c6'];
      colorscale = d3.scaleOrdinal(range),
      // appearancetimes = function(d, i){ return 500; },
      // height = 200,
      magic_padding = 5;

  function chart(selection) {

    selection.each(function(data) {

      selection.selectAll("*").remove();

      /* setting parameters and data */
      var idcontainer = selection[0]; // I need to change thiz plz
      var total = d3.sum(data, function(d) { return d.total; });

      /* updating data */
      data.forEach(function(d, i){
        data[i].class = slugify(d.state);
        data[i].scalevalue = Math.round(data[i].total*scale);
        data[i].percent = data[i].total/total;
      });

      var totalscales = d3.sum(data, function(d){ return d.scalevalue; })
      var cols = Math.ceil(totalscales/rows);
      var griddata = cartesianprod(d3.range(cols), d3.range(rows));
      var detaildata = [];

      data.forEach(function(d){
        d3.range(d.scalevalue).forEach(function(e){
          detaildata.push({ category: d.state, class: d.class })
        });
      });

        detaildata.forEach(function(d, i){
        detaildata[i].col = griddata[i][0];
        detaildata[i].row = griddata[i][1];
      })

      // console.log(detaildata)

      var gridSize = ((height - margin.top - margin.bottom) / rows)
      //
      // /* setting the container */
      var svg = selection.append("svg")
            .attr("width",  "750")
            .attr("height", "600")
            .append("g")
            .attr("transform", "translate(" + margin.left*4 + "," + margin.top*18 +")")
            .style("cursor", "default");

      // var tooltip = d3.select("body")
      //       .append("div")
      //       .attr("class", "waffle-tooltip")
      //       .style("position", "absolute")
      //       .style("text-align", "right")
      //       .style("background", "#333")
      //       .style("margin", "3px")
      //       .style("color","white")
      //       .style("padding","3px")
      //       .style("border","0px")
      //       .style("border-radius","3px") // 3px rule
      //       .style("opacity",0)
      //       .style("cursor", "default");

      var nodes = svg.selectAll(".node")
            .data(detaildata)
            .enter().append("g")
            .attr("class", "node")
            .attr("transform", function(d) { return "translate(" + (d.col)*gridSize/1.2 + "," + (rows - d.row)*gridSize /1.2 + ")"; });

      /* this is necesary, when the icons are small/thin activate mouseout */
      nodes.append("text")
            .style("opacity", 0)
            .html(icon)
            .attr('class', function(d){ return d.class; })
            .attr('font-family', 'FontAwesome')
            // .attr("transform", function(d) { return "translate(" + gridSize*0.1 + "," + gridSize  + ")"; })
            .style("text-anchor", "middle")
            .style('fill', function(d){ return colorscale(d.class); })
            .style("font-size", function(d) {
              val = 50;
              val2 = 2;
              textsize = Math.min(val2 * gridSize, (val2 * gridSize  - val) / this.getComputedTextLength() * val);
              return textsize * adjust + "px";
            })
            .style("opacity", 1);

      // var legend = svg.selectAll('.legend')
      //     .data(data)
      //     .enter().append('g')
      //     .attr('class', function(d){ return "legend" + " " + d.class; })
      //     .attr("transform", function(d) { return "translate(" + (cols*gridSize*0.75) + "," + magic_padding + ")"; })

      // legend.append('text')
      //       .attr('x', gridSize*1.8)
      //       .attr('y', function(d, i){ return i * gridSize*0.5 + 20;})
      //       .style("opacity", 1)
      //       .html(function(d){ return icon; })
      //       .attr('class', function(d){ return d.class; })
      //       .attr('font-family', 'FontAwesome')
      //       // .attr("transform", function(d) { return "translate(" + gridSize + ","  + ")"; })
      //       .style('fill', function(d){ return colorscale(d.class); })
      //       .style("font-size", function(d) {
      //         val = 6;
      //         val2 = 2.2;
      //         textsize = Math.min(val2 * gridSize, (val2 * gridSize - val) / this.getComputedTextLength() * val);
      //         return textsize * adjust + "px";
      //       });

      // legend.append('text')
      //       .attr('x', gridSize*2.4 )
      //       .attr('y', function(d, i){ return i * gridSize*0.5 + 20;})
      //       .style("opacity", 1)
      //       .html(function(d){ return d.state; })
      //       .attr('class', function(d){ return "waffle-legend-text" + " " + d.class; })
      //       .style('font-size',12)
      //       .style('font-weight',"bold")
      //       .style('font-family','arial');


      // legend.append('text')
      //       .attr('x', gridSize)
      //       .attr('y', 0)
      //       .text('Rocky Mountain Area')
      //       .attr('class', function(d){ return "waffle-legend-text" + " " + d.class; })
      //       .style('font-size','12px')
      //       .style('font-weight',"bold")
      //       .style('font-family','arial')
            // .attr("transform", function(d) { return "translate(" + gridSize + "," + ")"; })

      // function mouseover(d){
      //   tooltip.transition().duration(100).style("opacity", .9);
      //   el = data.filter(function(e){ return e.name == d.name})[0]
      //   txt = "<b>" +el.name + "</b><br>" + d3.format(',')(el.value) + "<br>(" + d3.format(".0%")(el.percent) + ")"
      //   tooltip.html(txt);
      //
      //   d3.select("#" + idcontainer).selectAll("text").transition().duration(100).style("opacity", 0.2);
      //   d3.select("#" + idcontainer).selectAll("text." + d.class).transition().duration(100).style("opacity", 1);
      // }
      //
      // function mouseout(d){
      //   tooltip.transition().duration(100).style("opacity", 0);
      //   d3.select("#" + idcontainer).selectAll("text").transition().duration(100).style("opacity", 1);
      // }
      //
      // function mousemove(d){
      //   tooltip
      //       .style("left", (d3.event.pageX + 0 ) + "px")
      //       .style("top", (d3.event.pageY + - 70) + "px");
      // }

    });
  }

  chart.width = function(_) {
    if (!arguments.length) return width;
    width = _;
    return chart;
  };

  chart.height = function(_) {
    if (!arguments.length) return height;
    height = _;
    return chart;
  };

  chart.rows = function(_) {
    if (!arguments.length) return rows;
    rows = _;
    return chart;
  };

  chart.icon = function(_) {
    if (!arguments.length) return icon;
    icon = _;
    return chart;
  };

  chart.scale = function(_) {
    if (!arguments.length) return scale;
    scale = _;
    return chart;
  };

  chart.colorscale = function(_) {
    if (!arguments.length) return colorscale;
    colorscale = _;
    return chart;
  };

chart.appearancetimes = function(_) {
    if (!arguments.length) return appearancetimes;
    appearancetimes = _;
    return chart;
  };

chart.adjust = function(_) {
    if (!arguments.length) return adjust;
    adjust = _;
    return chart;
  };

  return chart;

}

function slugify(text){
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .trim();                        // Trim - from end of text
}

/* http://stackoverflow.com/questions/12303989/cartesian-product-of-multiple-arrays-in-javascript */
function cartesianprod(paramArray) {

  function addTo(curr, args) {

    var i, copy,
        rest = args.slice(1),
        last = !rest.length,
        result = [];

    for (i = 0; i < args[0].length; i++) {

      copy = curr.slice();
      copy.push(args[0][i]);

      if (last) {
        result.push(copy);

      } else {
        result = result.concat(addTo(copy, rest));
      }
    }

    return result;
  }


  return addTo([], Array.prototype.slice.call(arguments));
}

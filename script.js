var d3;

var svg = d3.select("svg"),
 width = svg.attr("width"),
 height = svg.attr("height");

var simulation = d3.forceSimulation()
    .force("link", d3.forceLink().id(function(d) { return d.id; }))
    .force("charge", d3.forceManyBody())
    .force("center", d3.forceCenter(width / 2, height / 2));

d3.json("https://raw.githubusercontent.com/DealPete/forceDirected/master/countries.json", function(err, data) {
  if (err)
  {
    throw err;
  }

var nodes = svg.append("g")
        .attr("class", "nodes")
        .selectAll(".nodes")
        .data(data.nodes)
        .enter()
        .append("circle")
        .attr("r", 5)
        .attr("fill", "red");
  
  var link = svg.append("g")
      .attr("class", "links")
    .selectAll("line")
    .data(data.links)
    .enter().append("line")
      .attr("stroke-width", 2);    
  
  simulation.nodes(nodes).on("tick", ticked);
  
  
  function ticked() {
    /*links.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });*/

    nodes.attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });
  }

});
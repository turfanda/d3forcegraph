var d3;

var svg = d3.select("svg"),
 width =+svg.attr("width"),
 height =+svg.attr("height");

  var simulation = d3.forceSimulation()
  .force("charge", d3.forceManyBody())
  .force("center", d3.forceCenter(width / 2, height / 2))
  .force("link", d3.forceLink().id(function(d) { return d.index}));

function dragstarted(d) {
  if (!d3.event.active) simulation.alphaTarget(0.3).restart();
  d.fx = d.x;
  d.fy = d.y;
}

function dragged(d) {
  d.fx = d3.event.x;
  d.fy = d3.event.y;
}

function dragended(d) {
  if (!d3.event.active) simulation.alphaTarget(0);
  d.fx = null;
  d.fy = null;
}

d3.json("https://raw.githubusercontent.com/DealPete/forceDirected/master/countries.json", function(err, data) {
  if (err)
  {
    throw err;
  }
  
var node = svg.append("g")
        .attr("class", "nodes")
        .selectAll(".nodes")
        .data(data.nodes)
        .enter()
        .append("circle")
        .attr("r", 10)
        .attr("fill", "red").call(d3.drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended));
  
  var link = svg.append("g")
      .attr("class", "links")
    .selectAll("line")
    .data(data.links)
    .enter().append("line")
    .attr("stroke-width", 2);  
  
 node.append("title").data(data.nodes)
      .text(function(d) { return d.country});
  
  simulation.nodes(data.nodes).on("tick", ticked);
  simulation.force("link").links(data.links)
  
  
  function ticked() {
    link.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    node.attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });
  }

});
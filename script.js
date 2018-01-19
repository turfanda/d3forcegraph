var d3;

var svg = d3.select("svg"),
 margin =100,
 width = svg.attr("width")-margin,
 height = svg.attr("height")-margin;

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
        .attr("fill", "red").call(d3.drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended));
  
  simulation.node()
  
  
  function ticked() {
    /*links.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });*/

    nodes.attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });
  }

});

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
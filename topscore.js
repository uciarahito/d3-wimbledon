/* global d3 */

// Our canvas
// var width = 750, height = 500

let fill = d3.scaleOrdinal(d3.schemeCategory20)
let leaderScale = d3.scaleLinear()
  .range([5, 40])

function draw(words) {
  // Draw your data here...
  d3.select("#top-score").append("svg")
    .attr('width', 750)
    .attr('height', 500)
    .append("g")
    .attr("transform", "translate(" + 750 / 2 + "," + 500 / 2 + ")")
    .selectAll("text")
    .data(words)
    .enter().append("text")
    .style("font-size", function(d) { return d.size + "px"; })
    .style("font-family", "Impact")
    .style("fill", function(d, i) { return fill(i); })
    .attr("text-anchor", "middle")
    .attr("transform", function(d) {
      return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
    })
    .text(function(d) { return d.text; });
}

const load = () => {
  // Load your data here...
  d3.tsv('afcw-results.tsv', (rows) => {
    console.log('ini rows', rows);
    // draw(layout.words)
    d3.layout.cloud()
      .size([750, 500])
      .words(rows.map(function(d) {
        return {text: d.Opponent, size: 10 + Math.random() * 90, test: "haha"};
      }))
      .padding(5)
      .rotate(function() { return ~~(Math.random() * 2) * 90; })
      .font("Impact")
      .fontSize(function(d) { return d.size; })
      .on("end", draw)
      .start();
  })
}

load()
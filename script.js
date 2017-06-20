/* global d3 */

// Our canvas
const width = 750,
  height = 300,
  margin = 20,
  marginLeft = 40,
  multiplier = 20

// Drawing area
let svg = d3.select('#results')
  .append('svg')
  .attr('width', width)
  .attr('height', height)
  .style('background', '#cacaca')

// Data reloading
let reload = () => {
  // Your data parsing here...
  d3.tsv('afcw-results.tsv', (rows) => {
    console.log('ini rows', rows);
    redraw(rows)
  })
}

// redraw function
let redraw = (data) => {
  // Your data to graph here
  const yScale = d3.scaleLinear()
    .domain([0, 4])
    // .domain([0, d3.max(data.map(dataItem => dataItem.GoalsScored))])
    .range([0, height - marginLeft])

  const xScale = d3.scaleLinear()
    .domain([0, data.length])
    .range([0, width - (2*marginLeft)])

  const colorScale = d3.scaleLinear()
    .domain([0, d3.max(data.map(dataItem => dataItem.GoalsScored))])
    .range(['peru', 'teal'])

  // add the x Axis
  var scaleX = d3.scaleLinear()
    .domain([0, data.length])
    .range([0, width - (2*marginLeft)])

  var x_axis = d3.axisBottom()
    .scale(scaleX)

  svg.append("g")
    .attr("transform", `translate(${marginLeft}, ${height-margin})`)
    .call(x_axis.ticks(data.length))

  // add the y Axis
  var scaleY = d3.scaleLinear()
    .domain([0, 4])
    // .domain([0, d3.max(data.map(dataItem => dataItem.GoalsAllowed))])
    .range([height - marginLeft, 0])

  var y_axis = d3.axisLeft()
    .scale(scaleY)

  svg.append("g")
    .attr("transform", `translate(${marginLeft}, ${margin})`)
    .call(y_axis)

  svg.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('class', 'bar')
    .attr('x', (d, index) => {
      return xScale(index) + marginLeft
    })
    .attr('y', (d, index) => {
      return height - yScale(d.GoalsScored) - margin
    })
    .attr('width', (d) => {
      return xScale(1) - 2
    })
    .attr('height', (d) => {
      return yScale(d.GoalsScored)
    })
    .attr('fill', colorScale)
    .on('mouseover', function (d, index) {
      d3.select(this).style('fill', '#bada55')
    })
    .on('mouseout', function (d, index) {
      d3.select(this).style('fill', 'teal')
    })

}

reload()
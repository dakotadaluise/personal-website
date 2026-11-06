// D3 bar chart for my volleyball page.
// Adapted from the class tutorial and https://d3-graph-gallery.com/graph/barplot_basic.html

// Set the dimensions and margins of the graph
const margin = {top: 30, right: 30, bottom: 70, left: 70};
const width = 800 - margin.left - margin.right;
const height = 450 - margin.top - margin.bottom;

// Append the svg object to the chart div on the page
const svg = d3.select("#chart")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

// Make the tooltip div that shows up when you hover over a bar
const tooltip = d3.select("body")
    .append("div")
    .attr("id", "tooltip");

// Read in the data and then draw the chart
d3.csv("data/volleyball-popularity.csv").then(function(data) {

    // The CSV reads everything in as text, so turn the attendance into a number
    data.forEach(function(d) {
        d.ncaa_attendance = +d.ncaa_attendance;
    });

    // X axis: one band for each season
    const x = d3.scaleBand()
        .range([0, width])
        .domain(data.map(d => d.year))
        .padding(0.2);

    svg.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x));

    // Y axis: average attendance per match
    const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.ncaa_attendance)])
        .range([height, 0]);

    svg.append("g")
        .call(d3.axisLeft(y));

    // X axis label
    svg.append("text")
        .attr("class", "axis-label")
        .attr("text-anchor", "middle")
        .attr("x", width / 2)
        .attr("y", height + 50)
        .text("Season");

    // Y axis label
    svg.append("text")
        .attr("class", "axis-label")
        .attr("text-anchor", "middle")
        .attr("transform", "rotate(-90)")
        .attr("x", -height / 2)
        .attr("y", -50)
        .text("Average fans per match");

    // Draw the bars
    svg.selectAll("mybar")
        .data(data)
        .join("rect")
            .attr("class", "bar")
            .attr("x", d => x(d.year))
            .attr("y", d => y(d.ncaa_attendance))
            .attr("width", x.bandwidth())
            .attr("height", d => height - y(d.ncaa_attendance));

    // Interactivity: show the tooltip when the mouse is over a bar
    svg.selectAll(".bar")
        .on("mouseover", function(event, d) {
            tooltip
                .style("visibility", "visible")
                .html(d.year + ": " + d.ncaa_attendance + " fans per match");
        })
        .on("mousemove", function(event) {
            tooltip
                .style("left", (event.pageX + 15) + "px")
                .style("top", (event.pageY - 20) + "px");
        })
        .on("mouseout", function() {
            tooltip.style("visibility", "hidden");
        });

});

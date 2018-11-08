// console.log("testing")
d3.json('log.json').get(function(error, data) {
    console.log(data)
})
d3.select("body").append("svg")
                  .attr("width", "600px")
                  .attr("height", "600px")

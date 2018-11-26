d3.json('log.json').then(function(data) {
    window.data = data // Data in log bestand word opgeslagen in window data property
    createGraph(data, d3.curveLinear, true)
    d3.selectAll("input").on("change", drawGraph)
    function drawGraph(){
      if(d3.select(this).property("checked")){
        createGraph(data, checkValueAdd(this), false)
      }else{
        d3.select(`.${this.value}`).remove()
      }
    }
    function checkValueAdd(d){
      if(d.value == "step"){
        return d3.curveStep
      }else if(d.value == "linear"){
        return d3.curveLinear
      }else{
        return d3.curveCardinal
      }
    }

})

const svg = d3.select("body").append("svg")
const margin = {
  top: 15,
  right: 25,
  bottom: 25,
  left: 10
}
const chart = svg
                  .append("g")
                  .attr("id", "chart")
                  .style("transform", `translate(${margin.left}%,${margin.top}%)`);



let width = window.innerWidth*0.65;
let height = window.innerHeight*0.42;

function testfuction(){
  console.log(" test")
}



function createGraph(data, lineStyle, add){
  let lineClass = function(){
    if(lineStyle === d3.curveLinear){
      return "linear"
    }else if(lineStyle === d3.curveStep){
      return "step"
    }else if(lineStyle === d3.curveCardinal){
      return "cardinal"
    }
  }
  console.log(lineClass())
  const parseDate = d3.timeParse("%Y");

  let y = d3
            .scaleLinear() // Welke type schaal we nodig hebben
            .domain([0, d3.max(data.map(function(d){return d.variatie}))])
            .range([height, 0]);
  let x = d3
            .scaleTime()
            .domain(d3.extent(data, function(d){return parseDate(d.jaartal)}))
            .range([0,width]);

  let yAxis = d3.axisLeft(y).ticks(4)
  let xAxis = d3.axisBottom(x)

  let line = d3
               .line(d3.extent(data, function(d){return d.jaartal}))
               .x(function(d,i){return x(parseDate(d.jaartal))})
               .y(function(d,i){return y(d.variatie)})
               .curve(lineStyle)
  chart
       .append("path")
       .attr("class", lineClass())
       .call(transition)
       .attr("d", line(data))
       .attr("fill", "none")
       .attr("stroke","black");
  if(add === true){ // dit zorgt ervoor dat de axes en circles maar eenmalig worden toegevoegd
    chart
         .append("g")
         .attr("class", "axis y")
         .call(yAxis);
    chart
         .append("g")
         .attr("class", "axis x")
         .attr("transform", `translate(0,${height})`)
         .call(xAxis);
    chart
         .selectAll("circle")
         .data(data)
         .enter().append("circle")
                 .attr("cx", function(d,i){return x(parseDate(d.jaartal))})
                 .attr("cy", function(d,i){return y(d.variatie)})
                 .attr("r", "6")
  }


}


// Code hieronder is van b.locks post
// Link: https://bl.ocks.org/pjsier/28d1d410b64dcd74d9dab348514ed256
// Credits naar mike bostock
// De twee functions hieronder zorgen voor de transtion van de line chart
function transition(path) {
     path.transition()
         .duration(2000)
         .attrTween("stroke-dasharray", tweenDash);
}
function tweenDash() {
     var l = this.getTotalLength(),
         i = d3.interpolateString("0," + l, l + "," + l);
     return function (t) { return i(t); };
}

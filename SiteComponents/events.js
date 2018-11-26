window.addEventListener("resize", ()=>{
  setTimeout(()=>{
    location.reload();
  },1000)
})
document.querySelector("#open").addEventListener("click", ()=>{
  const data = window.data
  d3.select(".axis.y").remove()
  d3.select(".axis.x").remove()
  d3.select("path").remove()
  d3.selectAll("circle").remove()
  createGraph(sortFunction(data), d3.curveLinear, true)
})

function sortFunction(data){
  return data.sort((x,y)=> d3.descending(x.variatie, y.variatie))
}

document.querySelector(".close.header").addEventListener("click", ()=>{
  console.log("test")
  document.querySelector("header").classList.add("hide");
})

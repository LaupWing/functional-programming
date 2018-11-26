window.addEventListener("resize", ()=>{
  setTimeout(()=>{
    location.reload();
  },1000)
})
svg.select("#myRange")
   .on("change", ()=>{console.log("test")})

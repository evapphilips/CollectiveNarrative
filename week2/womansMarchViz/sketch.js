// Define variables
let margin = {top: 0, left: 0, right:0, bottom:0};
let height = 600 - margin.top - margin.bottom;
let width = 1280 - margin.left - margin.right;

// Set Up svg for map
let svg = d3.select("#map")
  .append("svg")
  .attr("height", height + margin.top + margin.bottom)
  .attr("width", width + margin.left + margin.right)
  .append("g")
  .attr("transform", "translate(" + margin.left +"," + margin.top +")");

//load json data
d3.queue()
  .defer(d3.json, "us.json") // load us map
  .defer(d3.csv, "womansMarch1.csv") // load wafflehouse data
  .await(ready)

// setup projection
let projection = d3.geoAlbersUsa()
  .translate([width/2, height/2])
  .scale(1200)
let path = d3.geoPath()
  .projection(projection)


// access and display map
function ready(error, data, womansMarch){
  // s

// Show states
// get states out of json file
let states = topojson.feature(data, data.objects.states).features
// console.log(states);
// add paths for each state
svg.selectAll(".state")
  .data(states)
  .enter().append("path")
  .attr("class", "state")
  .attr("d", path)


  // Show Name
  svg.selectAll(".nameLabel")
  .data(womansMarch)
  .enter().append("text")
  .attr("class", "nameLabel")
  .attr("x", 750)
  .attr("y", 30)
  // Show Number of Cities
  svg.selectAll(".numberCitiesLabel")
  .data(womansMarch)
  .enter().append("text")
  .attr("class", "numberCitiesLabel")
  .attr("x", 750)
  .attr("y", 50)
  svg.selectAll(".attendance")
  .data(womansMarch)
  .enter().append("text")
  .attr("class", "attendance")
  .attr("x", 750)
  .attr("y", 70)



// Show woman's march information

svg.selectAll(".womansMarch")
  .data(womansMarch)
  .enter().append("circle")
  .attr("class", "womansMarch")
  .attr("r", function(d){
    let size = d.cityNumber;
    return size
  })
  .attr("cx", function(d){
    let coords = projection([d.long, d.lat]);
    return coords[0]
  })
  .attr("cy", function(d){
    let coords = projection([d.long, d.lat])
    return coords[1]
  })
  .attr("opacity","0.5")

  .on("mouseover", function(d){  // change circle opacity when you mouse over 
    d3.select(this)
      .attr("opacity", ".7")
      d3.select(".nameLabel")
       .text("State Name: " + d.state)
      d3.select(".numberCitiesLabel")
       .text("Number of Cities with Protests: " + d.cityNumber)
      d3.select(".attendance")
       .text("Number in Attendance: " + d.attendance)
       

      

  })
  .on("mouseout", function(d){  // change circle opacity back
    d3.select(this)
      .attr("opacity", ".5")
      d3.select(".nameLabel")
        .text("")
      d3.select(".numberCitiesLabel")
        .text("")
      d3.select(".attendance")
        .text("")

  })


    

}


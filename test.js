var width = 900,
    height = 105,
    cellSize = 40;
line_height = 0;
text_y = 20;
sel_year = 1800;
padding_top = window.innerHeight * 0.3;
title = ['Nationality', 'Native language', 'Gender']
gender = ['Gender'];
btns = [1800, 1940, 1950, 1960, 1970, 1980, 1990, 2000, 2010];
var data;
var oridata;
d3.csv("code2.csv", function (csv) {

    data = csv;
    oridata = csv;
        render(data);
});

function selectyear(year) {
    console.log(data);
    sel_year = year;
  if (sel_year!=0){
     data = oridata.filter(function (d) {
         return d.time_period == sel_year;
     })
    
    }else{
        data = oridata;
    }


    render(data, sel_year);

}


function render(data) {
$(".code-map").html("");
    // d3.select(".code-map")
    //     .data(data)
    //     .exit()
    //     .remove();
    // var data = data;
   
    var svg = d3.select(".code-map").append("svg")
        .attr("width",
            
         data.length * cellSize + 240

        )

        .attr("height", window.innerHeight)
        // .attr("height", 400)
        .attr("class", "gender")
        // .style("width","1300")
        .append("g");
    var allsvg = svg.selectAll(".gender")
        .data(gender)
        .enter();
    allsvg.append("text")
        .style("text-anchor", "end")
        .attr("fill", "lightgreen")
        .attr("x", "90")
        .attr("y", text_y + padding_top)
        .text(title[0]);
    allsvg.append("text")
        .style("text-anchor", "end")
        .attr("fill", "lightgreen")
        .attr("x", "90")
        .attr("y", text_y + line_height + cellSize + padding_top)
        .text(title[1]);
    allsvg.append("text")
        .style("text-anchor", "end")
        .attr("fill", "lightgreen")
        .attr("x", "90")
        .attr("y", text_y + (line_height + cellSize) * 2 + padding_top)
        .text(title[2]);
    var allgender = svg.selectAll(".gender")
        .data(data)
        .enter();



    allgender.append("text")
        .attr("width", cellSize)
        .attr("height", 30)

        .attr("y", padding_top + 60)
        .style("text-anchor", "start")
        .style("transform", function (d, i) {
            var off_x = i * cellSize+0;
            var st = "translateX(" + off_x + "px) rotate(-45deg)";
            //   console.log(st);
            return st;

        })
        .style("transform-origin", "0% 0%")
        //  .attr("rotate","30")
        .text(function (d, i) {
            return d.Name;
        })
        //  .attr("y", line_height + cellSize)
        .attr("fill", "lightgreen");
    allgender.append("rect")
        .attr("width", cellSize)
        .attr("height", cellSize)
        .attr("x", function (d, i) {
            return i * cellSize + 100;
        })
        .attr("y", padding_top)
        .attr("fill", function (d, i) {
            return d.Nationality_Color;
        });

    allgender.append("rect")
        .attr("width", cellSize)
        .attr("height", cellSize)
        .attr("x", function (d, i) {
            return i * cellSize + 100;
        })
        .attr("y", line_height + cellSize + padding_top)
        .attr("fill", function (d, i) {
            return d.Language_Color;
        });

    allgender.append("rect")
        .attr("width", cellSize)
        .attr("height", cellSize)
        .attr("x", function (d, i) {
            return i * cellSize + 100;
        })
        .attr("y", (line_height + cellSize) * 2 + padding_top)
        .attr("fill", function (d, i) {
            return d.Gender_Color;
        });

    svg.selectAll("svg")
        .data(data)
        .exit().remove();
    /* d3.select("body").selectAll("div.h-bar")
                   .filter(function (d, i) { // <-E
                       return d.category == category;
                   })
                   .classed("selected", true);
          console.log(data);*/


}
// d3.select("body")
//     .data(btns)
//     .enter()
//     .append("button")
//     .text(function (d) {
//         //select new data
//        return d;
//     })
//     .on("click", function (d) {
//         //select new data
//         render(data, d);
//     });

// console.log(data);


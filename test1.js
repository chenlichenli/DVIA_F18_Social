var width = 900,
    height = 105,
    cellSize = 40;
line_height = 0;
text_y = 20;
sel_year = 1800;
padding_top = window.innerHeight * 0.5;
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
    if (sel_year != 0) {
        data = oridata.filter(function (d) {
            return d.time_period == sel_year;
        })
    } else {
        data = oridata;
    }
    render(data, sel_year);
}



function render(data) {

var map_width = data.length * cellSize + 260;
    $(".code-map").html("");
    var svg = d3.select(".code-map").append("div")

        .style("width", map_width + "px")
        .style("height","100vh")
        // .attr("height", window.innerHeight)
        .attr("class", "gender")
        .append("g");

    var allsvg = svg.selectAll(".gender")
        .data(gender)
        .enter();
        
    var allgender = svg.selectAll(".gender")
        .data(data)
        .enter();



    allgender.append("a")
        .attr("href", function (d) {


            return d.Link;

        })
        .attr("target", "_blank")
        .style("position", "absolute")
        .style("text-anchor", "start")
        .style("left", function (d, i) {
            var off_x = i + 180;
            return off_x + "px";
        })
        .style("top", function (d, i) {
            var newtop = padding_top + 30;
            return newtop + "px";
        })
        .style("transform", function (d, i) {
            var off_x = i * (cellSize - 1) + 0;
            var st = "translateX(" + off_x + "px) rotate(-60deg)";
            return st;

        })
        .style("transform-origin", "0% 0%")
        .text(function (d, i) {
            return d.Name;
        })
        .attr("fill", "#lightgreen");

    var clsize = cellSize + "px";
    allgender.append("div")
        .attr("target", "_blank")
        .style("position", "absolute")
        .style("width", clsize)
        .style("height", clsize)
        .style("left", function (d, i) {
            var off_x = i * cellSize + 180;
            return off_x + "px";
        })
        .style("top", function (d, i) {
            var newtop = padding_top + cellSize;
            return newtop + "px";
        })
        .style("background", function (d, i) {
            return d.Nationality_Color;
        })
        .on("mouseover", function(d){
            console.log("working");
            hover1(d);
        });
        // .on("mouseout", function(d){
        //     console.log("mouseout");
        //     hide1(d);
        // });

    allgender.append("div")
        .attr("target", "_blank")
        .style("position", "absolute")
        .style("width", clsize)
        .style("height", clsize)
        .style("left", function (d, i) {
            var off_x = i * cellSize + 180;
            return off_x + "px";
        })
        .style("top", function (d, i) {
            var newtop = padding_top + cellSize * 2;
            return newtop + "px";
        })
        .style("background", function (d, i) {
            return d.Gender_Color;
        })
        .style("background", function (d, i) {
            return d.Language_Color;
        })
        .on("mouseover", function(d){
            console.log("working");
            hover2(d);
        });
        // .on("mouseout", function(d){
        //     console.log("mouseout");
        //     hide2(d);
        // });

    allgender.append("div")
        .attr("target", "_blank")
        .style("position", "absolute")
        .style("width", clsize)
        .style("height", clsize)
        .style("left", function (d, i) {
            var off_x = i * cellSize + 180;
            return off_x + "px";
        })
        .style("top", function (d, i) {
            var newtop = padding_top + cellSize * 3;
            return newtop + "px";
        })
        .style("background", function (d, i) {
            return d.Gender_Color;
        })
        .style("background", function (d, i) {
            return d.Gender_Color;
        })
        .on("mouseover", function(d){
            // console.log("working");
            hover3(d);
        });
        // .on("mouseout", function(d){
        //     // console.log("mouseout");
        //     hide3(d);
        // });

    
var div = d3.select("body").append("div")

function hover2(d, i){
    div.html(d.Native_Language)
    .style("left", (d3.event.pageX) + "px")
    .style("top", (d3.event.pageY) + "px")
    .style("color", "white")
    .style("position", "absolute")
    .style("font-size", "15px")
    .style("opacity", 1)
};

function hide2(d, i){
    div.html(d.Native_Language)
    .style("left", (d3.event.pageX) + "px")
    .style("top", (d3.event.pageY) + "px")
    .style("color", "white")
    .style("position", "absolute")
    .style("font-size", "15px")
    .style("opacity", 0)
};

function hover1(d, i){
    div.html(d.Nationality)
    .style("left", (d3.event.pageX) + "px")
    .style("top", (d3.event.pageY) + "px")
    .style("color", "white")
    .style("position", "absolute")
    .style("font-size", "15px")
    .style("opacity", 1)
};

function hide1(d, i){
    div.html(d.Nationality)
    .style("left", (d3.event.pageX) + "px")
    .style("top", (d3.event.pageY) + "px")
    .style("color", "white")
    .style("position", "absolute")
    .style("font-size", "15px")
    .style("opacity", 0) 
}

function hover3(d, i){
    div.html(d.Gender)
    .style("left", (d3.event.pageX) + "px")
    .style("top", (d3.event.pageY) + "px")
    .style("color", "white")
    .style("position", "absolute")
    .style("font-size", "15px")
    .style("opacity", 1)
};

function hide3(d, i){
    div.html(d.Gender)
    .style("left", (d3.event.pageX) + "px")
    .style("top", (d3.event.pageY) + "px")
    .style("color", "white")
    .style("position", "absolute")
    .style("font-size", "15px")
    .style("opacity", 0)  
};
        
}

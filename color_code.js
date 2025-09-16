var colorcode_data;
var colorcellsize = 15;
var color_top = window.innerHeight * 0.75;

// Responsive color code dimensions
function getResponsiveColorDimensions() {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    
    // Calculate color cell size based on screen width
    let colorcellsize;
    if (screenWidth < 480) {
        colorcellsize = 8; // Mobile
    } else if (screenWidth < 768) {
        colorcellsize = 10; // Tablet
    } else {
        colorcellsize = 15; // Desktop
    }
    
    // Calculate color panel position
    const color_top = Math.max(screenHeight * 0.7, 300);
    
    return {
        colorcellsize: colorcellsize,
        color_top: color_top,
        screenWidth: screenWidth,
        screenHeight: screenHeight
    };
}
d3.csv("Color_code.csv", function (colordata) {

    colorcode_data = colordata;
    // oridata = csv;
    colorRender(colordata);
    // console.log(colordata);
});


function colorRender(data) {
    // Get responsive dimensions
    const colorDimensions = getResponsiveColorDimensions();
    colorcellsize = colorDimensions.colorcellsize;
    color_top = colorDimensions.color_top;
    
    var colorpannel = d3.select(".colorcode-map").append("div")
        .attr("width",
            data.length * colorcellsize + 240
        )
        .attr("height", window.innerHeight)
        .attr("class", "colorcode")
        .append("g");

    var allcolor = colorpannel.selectAll(".colorcode")
        .data(data)
        .enter();


    console.log(data);


    allcolor.append("div")


        .style("position", "fixed")
        .style("text-anchor", "start")
        .style("left", function (d, i) {
            var off_x = i * colorcellsize * 0.3 + 80;
            return off_x + "px";
        })
        .style("top", function (d, i) {
            var newtop = color_top + 40;
            return newtop + "px";
        })
        .style("transform", function (d, i) {
            var off_x = i * cellSize + 0;
            var st = "translateX(" + off_x + "px)";
            return st;

        })
        .style("transform-origin", "0% 0%")
        .text(function (d, i) {
            return d.Nationality_Name;
        })
        .attr("fill", "#lightgreen");







    allcolor.append("div")
        .style("position", "fixed")
        .style("text-anchor", "start")
        .style("left", function (d, i) {
            var off_x = i * colorcellsize * 2 + 80;
            return off_x + "px";
        })
        .style("top", function (d, i) {
            var newtop = color_top + 80;
            return newtop + "px";
        })
        .style("transform", function (d, i) {
            var off_x = i * cellSize + 0;
            var st = "translateX(" + off_x + "px)";
            return st;

        })
        .style("transform-origin", "0% 0%")
        .text(function (d, i) {
            return d.Language_Name;
        })
        .attr("fill", "#lightgreen");









    allcolor.append("div")
        .style("position", "fixed")
        .style("text-anchor", "start")
        .style("left", function (d, i) {
            var off_x = i * (colorcellsize + 10) + 80;
            return off_x + "px";
        })
        .style("top", function (d, i) {
            var newtop = color_top + 120;
            return newtop + "px";
        })
        .style("transform", function (d, i) {
            var off_x = i * cellSize + 0;
            var st = "translateX(" + off_x + "px)";
            return st;

        })
        .style("transform-origin", "0% 0%")
        .text(function (d, i) {
            return d.Gender_Name;
        })
        .attr("fill", "#lightgreen");

    var colorsize = colorcellsize + "px";
    allcolor.append("div")

        .style("position", "fixed")
        .style("width", colorsize)
        .style("height", colorsize)
        .style("left", function (d, i) {
            var off_x = i * (colorcellsize + 30) + 80;
            return off_x + "px";
        })
        .style("top", function (d, i) {
            var newtop = color_top + colorcellsize;
            return newtop + "px";
        })
        .style("background", function (d, i) {
            return d.Nationality_Color;
        });

    allcolor.append("div")
        .attr("target", "_blank")
        .style("position", "fixed")
        .style("width", colorsize)
        .style("height", colorsize)
        .style("left", function (d, i) {
            var off_x = i * (colorcellsize + 55) + 80;
            return off_x + "px";
        })
        .style("top", function (d, i) {
            var newtop = color_top + colorcellsize * 2 + 30;
            return newtop + "px";
        })
        // .style("background", function (d, i) {
        //                 return d.Gender_Color;
        //             })
        .style("background", function (d, i) {
            return d.Language_Color;
        });

    allcolor.append("div")
        .attr("target", "_blank")
        .style("position", "fixed")
        .style("width", colorsize)
        .style("height", colorsize)
        .style("left", function (d, i) {
            var off_x = i * (colorcellsize + 65) + 80;
            return off_x + "px";
        })
        .style("top", function (d, i) {
            var newtop = color_top + colorcellsize * 3 + 60;
            return newtop + "px";
        })
        // .style("background", function (d, i) {
        //                 return d.Gender_Color;
        //             })
        .style("background", function (d, i) {
            // alert(d.Gender_Color);
            return d.Gender_Color;

        });

}

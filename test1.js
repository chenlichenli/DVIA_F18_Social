// Consistent dimensions - keep content size the same
function getResponsiveDimensions() {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    
    // Keep consistent cell size regardless of screen size
    const cellSize = 40;
    
    // Calculate padding based on screen height - more room for better spacing
    const padding_top = Math.max(screenHeight * 0.6, 300);
    
    return {
        cellSize: cellSize,
        padding_top: padding_top,
        screenWidth: screenWidth,
        screenHeight: screenHeight
    };
}

var dimensions = getResponsiveDimensions();
var width = 900,
    height = 105,
    cellSize = dimensions.cellSize;
line_height = 0;
text_y = 20;
sel_year = 1800;
padding_top = dimensions.padding_top;
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

// Function to update label positions to match visualization
function updateLabelPositions() {
    const leftPanelWidth = 180 + 50; // 180px panel + 50px margin
    
    // Position labels to align with visualization rows
    const nationalityTop = padding_top + cellSize + 10;
    const languageTop = padding_top + cellSize * 2 + 10;
    const genderTop = padding_top + cellSize * 3 + 10;
    
    // Update label positions
    d3.select('.label-nationality')
        .style('top', nationalityTop + 'px')
        .style('left', '60px');
    
    d3.select('.label-language')
        .style('top', languageTop + 'px')
        .style('left', '60px');
    
    d3.select('.label-gender')
        .style('top', genderTop + 'px')
        .style('left', '60px');
}

// Function to adjust year selector position based on title height
function adjustYearSelectorPosition() {
    const title = document.querySelector('.title');
    const btnLine = document.querySelector('.btn_line');
    
    if (title && btnLine) {
        // Get the actual height and position of the title
        const titleRect = title.getBoundingClientRect();
        const titleBottom = titleRect.bottom;
        
        // Set year selector to be 20px below the title
        const newTop = titleBottom + 20;
        btnLine.style.top = newTop + 'px';
    }
}

// Add window resize listener for responsive behavior
window.addEventListener('resize', function() {
    if (data && oridata) {
        // Debounce resize events
        clearTimeout(window.resizeTimeout);
        window.resizeTimeout = setTimeout(function() {
            dimensions = getResponsiveDimensions();
            cellSize = dimensions.cellSize;
            padding_top = dimensions.padding_top;
            render(data);
            // Adjust year selector position after render
            setTimeout(adjustYearSelectorPosition, 100);
        }, 250);
    }
});

// Initial adjustment after page load
window.addEventListener('load', function() {
    setTimeout(adjustYearSelectorPosition, 500);
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
    // Update dimensions on each render for responsiveness
    dimensions = getResponsiveDimensions();
    cellSize = dimensions.cellSize;
    padding_top = dimensions.padding_top;
    render(data, sel_year);
}



function render(data) {
    // Update dimensions for responsive rendering
    dimensions = getResponsiveDimensions();
    cellSize = dimensions.cellSize;
    padding_top = dimensions.padding_top;
    
    // Calculate map width - keep consistent left panel width with new margin
    const leftPanelWidth = 180 + 50; // 180px panel + 50px margin
    var map_width = Math.max(data.length * cellSize + leftPanelWidth, dimensions.screenWidth);
    
    // Update label positions to match visualization
    updateLabelPositions();
    
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
            var off_x = i + leftPanelWidth;
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
            var off_x = i * cellSize + leftPanelWidth;
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
            d3.select(this)
                .style("box-shadow", "inset 0 0 0 2px white");
            hover1(d);
        })
        .on("mouseout", function(d){
            d3.select(this)
                .style("box-shadow", "none");
            hide1(d);
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
            var off_x = i * cellSize + leftPanelWidth;
            return off_x + "px";
        })
        .style("top", function (d, i) {
            var newtop = padding_top + cellSize * 2;
            return newtop + "px";
        })
        .style("background", function (d, i) {
            return d.Language_Color;
        })
        .on("mouseover", function(d){
            d3.select(this)
                .style("box-shadow", "inset 0 0 0 2px white");
            hover2(d);
        })
        .on("mouseout", function(d){
            d3.select(this)
                .style("box-shadow", "none");
            hide2(d);
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
            var off_x = i * cellSize + leftPanelWidth;
            return off_x + "px";
        })
        .style("top", function (d, i) {
            var newtop = padding_top + cellSize * 3;
            return newtop + "px";
        })
        .style("background", function (d, i) {
            return d.Gender_Color;
        })
        .on("mouseover", function(d){
            d3.select(this)
                .style("box-shadow", "inset 0 0 0 2px white");
            hover3(d);
        })
        .on("mouseout", function(d){
            d3.select(this)
                .style("box-shadow", "none");
            hide3(d);
        });
        // .on("mouseout", function(d){
        //     // console.log("mouseout");
        //     hide3(d);
        // });

    
var div = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("position", "absolute")
    .style("padding", "8px 12px")
    .style("background", "rgba(255, 255, 255, 0.9)")
    .style("color", "black")
    .style("border-radius", "8px")
    .style("font-size", "14px")
    .style("font-weight", "500")
    .style("box-shadow", "0 2px 8px rgba(0, 0, 0, 0.2)")
    .style("pointer-events", "none")
    .style("z-index", "1000")
    .style("opacity", 0)
    .style("transition", "opacity 0.2s ease");

function hover2(d, i){
    div.html(d.Native_Language)
    .style("left", (d3.event.pageX + 10) + "px")
    .style("top", (d3.event.pageY - 30) + "px")
    .style("opacity", 1)
};

function hide2(d, i){
    div.style("opacity", 0);
};

function hover1(d, i){
    div.html(d.Nationality)
    .style("left", (d3.event.pageX + 10) + "px")
    .style("top", (d3.event.pageY - 30) + "px")
    .style("opacity", 1)
};

function hide1(d, i){
    div.style("opacity", 0);
}

function hover3(d, i){
    div.html(d.Gender)
    .style("left", (d3.event.pageX + 10) + "px")
    .style("top", (d3.event.pageY - 30) + "px")
    .style("opacity", 1)
};

function hide3(d, i){
    div.style("opacity", 0);
};
        
}

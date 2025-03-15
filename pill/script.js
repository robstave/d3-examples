// Helper functions
function arc(r, sign) {
    return r ? `a${r * sign[0]},${r * sign[1]} 0 0 1 ${r * sign[2]},${r * sign[3]}` : '';
}

function roundedRect(x, y, width, height, r) {
    r = [
        Math.min(r[0], height, width),
        Math.min(r[1], height, width),
        Math.min(r[2], height, width),
        Math.min(r[3], height, width)
    ];
    return `M${x + r[0]},${y
        }h${width - r[0] - r[1]}${arc(r[1], [1, 1, 1, 1])
        }v${height - r[1] - r[2]}${arc(r[2], [1, 1, -1, 1])
        }h${-width + r[2] + r[3]}${arc(r[3], [1, 1, -1, -1])
        }v${-height + r[3] + r[0]}${arc(r[0], [1, 1, 1, -1])
        }z`;
}

function curvedRect(x, y, width, height, radius) {
    width = width + radius;
    const x1 = x - radius / 2;
    const y1 = y;
    const y2 = y + height;
    const x2 = x + width - radius / 2;
    return 'M' + x1 + ',' + y1
        + ' Q' + (x1 + (width * (1 / 4))) + ',' + (y1 + radius)
        + ' ' + (x1 + (width * (2 / 4))) + ',' + (y1)
        + ' T' + (x1 + (width * (4 / 4))) + ',' + (y1)
        + 'v' + (height)
        + ' Q' + (x2 - (width * (1 / 4))) + ',' + (y2 - radius)
        + ' ' + (x2 - (width * (2 / 4))) + ',' + (y2)
        + ' T' + (x2 - (width * (8 / 8))) + ',' + (y2)
        + 'Z';
}

function curvedLines(x, y, width, height, radius) {
    width = width + radius;
    const x1 = x - radius / 2;
    const y1 = y;
    const y2 = y + height;
    const x2 = x + width - radius / 2;
    return 'M' + x1 + ',' + y1
        + ' Q' + (x1 + (width * (1 / 4))) + ',' + (y1 + radius)
        + ' ' + (x1 + (width * (2 / 4))) + ',' + (y1)
        + ' T' + (x1 + (width * (4 / 4))) + ',' + (y)
        + 'M' + x2 + ',' + y2
        + ' Q' + (x2 - (width * (1 / 4))) + ',' + (y2 - radius)
        + ' ' + (x2 - (width * (2 / 4))) + ',' + (y2)
        + ' T' + (x2 - (width * (8 / 8))) + ',' + (y2);
}

// Main function to create the pill chart
function createPillChart() {
    const svg = d3.create("svg")
        .attr("viewBox", [0, 0, 500, 250]);
   
    // Add the top part of the bar (red)
    svg
        .append('path')
        .attr('class', 'a-class')
        .attr('d', d => roundedRect(70, 30, 100, 50, [10, 10, 0, 0]))
        .attr('fill', '#e7482e');
    
    // Add the bottom part of the bar (blue/purple)
    svg
        .append('path')
        .attr('class', 'b-class')
        .attr('d', d => roundedRect(70, 80, 100, 100, [0, 0, 10, 10]))
        .attr('fill', '#413f6a');
    
    // Add the curved white "break" in the bar
    svg
        .append('path')
        .attr('class', 'ca-class')
        .attr('d', d => curvedRect(70, 100, 100, 10, 10))
        .attr('fill', 'white');
    
    // Add the curved outlines
    svg
        .append('path')
        .attr('class', 'cl-class')
        .attr('d', d => curvedLines(70, 100, 100, 10, 10))
        .attr('stroke', '#413f6a')
        .attr('fill', 'none');
       
    // Append the SVG to the container
    document.getElementById('chart-container').appendChild(svg.node());
}

// Initialize the chart when the page loads
document.addEventListener('DOMContentLoaded', createPillChart);
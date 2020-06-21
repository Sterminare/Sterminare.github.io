var c = document.getElementById("canvas");
var ctx = c.getContext("2d");

var debug = true;

//circleIntersections() returns an array of all intersections between two circles: [[x,y],[x,y]] (broken and deprecated, unluckers)
// function circleIntersections(center0, radius0, center1, radius1){
//     if(debug){
//         drawCircle([center0[0], center0[1]], radius0, "#ffff00", false);
//         drawCircle([center1[0], center1[1]], radius1, "#00f0ff", false);
//         console.log("Number of intersections: " + CheckCirclesIntersect(center0, radius0, center1, radius1));
//     }

//     if(CheckCirclesIntersect(center0, radius0, center1, radius1) == 0){
//         return;
//     } else {
//         var intersect0 = [((center0[0] + center1[0]) / 2) + (((center1[0] - center0[0]) * ((radius0**2) - (radius1**2))) / (2 * distance(center0, center1)**2)) + 2 * ((center0[1] - center1[1]) / distance(center0, center1)) * (.25 * Math.sqrt((distance(center0, center1) + radius0 + radius1) * (distance(center0, center1) + radius0 - radius1) * (distance(center0, center1) - radius0 + radius1) * ((distance(center0, center1) * -1) + radius0 + radius1))), ((center0[1] + center1[1]) / 2) + (((center1[1] - center0[1]) * ((radius0**2) - (radius1**2))) / (2 * distance(center0, center1)**2)) - 2 * ((center0[0] - center1[0]) / distance(center0, center1)) * (.25 * Math.sqrt((distance(center0, center1) + radius0 + radius1) * (distance(center0, center1) + radius0 - radius1) * (distance(center0, center1) - radius0 + radius1) * ((distance(center0, center1) * -1) + radius0 + radius1)))];
//         var intersect1 = [((center0[0] + center1[0]) / 2) + (((center1[0] - center0[0]) * ((radius0**2) - (radius1**2))) / (2 * distance(center0, center1)**2)) - 2 * ((center0[1] - center1[1]) / distance(center0, center1)) * (.25 * Math.sqrt((distance(center0, center1) + radius0 + radius1) * (distance(center0, center1) + radius0 - radius1) * (distance(center0, center1) - radius0 + radius1) * ((distance(center0, center1) * -1) + radius0 + radius1))), ((center0[1] + center1[1]) / 2) + (((center1[1] - center0[1]) * ((radius0**2) - (radius1**2))) / (2 * distance(center0, center1)**2)) + 2 * ((center0[0] - center1[0]) / distance(center0, center1)) * (.25 * Math.sqrt((distance(center0, center1) + radius0 + radius1) * (distance(center0, center1) + radius0 - radius1) * (distance(center0, center1) - radius0 + radius1) * ((distance(center0, center1) * -1) + radius0 + radius1)))];
//     }
    
//     var intersects = [intersect0, intersect1];
//     return intersects;
// }

//drawCircle() draws a circle on the canvas.
function drawCircle(center, radius, color, fill){
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.arc(center[0], center[1], radius, 0, 2*Math.PI, false);
    if(fill){
        ctx.fill();
    } else {
        ctx.stroke(); 
    }  
}

//CheckCirclesIntersect() returns the number of intersections between two circles.
function CheckCirclesIntersect(center0, radius0, center1, radius1){
    if(distance(center0, center1) > (radius0 + radius1)){
        return 0;
    } else if(distance(center0, center1) == (radius0 + radius1)){
        return 1;
    } else {
        return 2;
    }
}

//distance() returns the distance between two points.
function distance(point0, point1){
    var distance = Math.sqrt((point0[0] - point1[0])**2 + (point0[1] - point1[1])**2);
    return distance;
}

//calculateTriangles() takes the two segments, to calculate the angles of the joints
function calculateTriangle(){
    //first, calculate the angle (degrees) that the shoulder is down from x-axis:
    angles[0] = Math.acos((upperSegment.length**2 + distance(upperSegment.startPoint, target)**2 - lowerSegment.length**2) / (2 * upperSegment.length * distance(upperSegment.startPoint, target))) * 180 / Math.PI;
    angles[1] = Math.acos((upperSegment.length**2 + lowerSegment.length**2 - distance(upperSegment.startPoint, target)**2) / (2 * upperSegment.length * lowerSegment.length)) * 180 / Math.PI;
    upperSegment.angle = 90 - angles[0] - (Math.tan(((target[0] - upperSegment.startPoint[0]) / (target[1] - upperSegment.startPoint[1]))) * 180 / Math.PI);
    lowerSegment.angle = angles[0] + angles[1];
}

//drawSegment() draws a segment that was defined by the segment class.
function drawSegment(segment){
    if(segment.angle > segment.angleLimits[1] || segment.angle < segment.angleLimits[0]){
      return;
    }
    ctx.strokeStyle = "#FFFFFF";
    ctx.lineWidth = "3";
    ctx.beginPath();
    if(segment.startPoint){
      ctx.moveTo(segment.startPoint[0], segment.startPoint[1]);
    } else {
      ctx.moveTo(segment.parent_endPoint[0], segment.parent_endPoint[1]);
    }
    ctx.lineTo(segment.endPoint[0], segment.endPoint[1]);
    ctx.stroke();
}
const grey = "#808080";


//angle is used for both wings -> wings are symetric, 
// The 2 connection are object with 2 points (cx, cy) that match the line of the body that faces the wing
// The angle of the wings must be between 45-135 Degrees
// connectionsTop {x, y} point to connect the top wing
// connectionPointBottom are used to center the wings on
function drawWings(s, angle, wingLength, wingWidth, connectionsTop, connectionsBottom) {

    // center point for the rotation
    var m2 = s.circle(connectionsTop.x, connectionsTop.y, 5);
    // top midpoint of the wing
    var nacelleTop = s.circle(connectionsTop.x, connectionsTop.y - wingLength, 5);
    var topMatrix = new Snap.Matrix();
    topMatrix.rotate(angle, connectionsTop.x, connectionsTop.y);

    nacelleTop.transform(topMatrix.toTransformString());
    var bbox = nacelleTop.getBBox();
    var nacelleWidth = wingWidth / 2; // half width actually
    var p1 = s.polyline(connectionsTop.x - nacelleWidth, connectionsTop.y,
        bbox.cx - nacelleWidth, bbox.cy,
        bbox.cx + nacelleWidth, bbox.cy,
        connectionsTop.x + nacelleWidth, connectionsTop.y,
        connectionsTop.x - nacelleWidth, connectionsTop.y
    ).attr({ stroke: '#123456', 'strokeWidth': 3, fill: 'grey' });


    // center point for the rotation
    var nacelleBottom = s.circle(connectionsBottom.x, connectionsBottom.y, 5);
    // bottom midpoint of the wing
    var b1 = s.circle(connectionsBottom.x, connectionsBottom.y + wingLength, 5);
    var bottomMatrix = new Snap.Matrix();
    bottomMatrix.rotate(-angle, connectionsBottom.x, connectionsBottom.y);

    b1.transform(bottomMatrix.toTransformString());
    var bbox2 = b1.getBBox();
    var nacelleWidth = wingWidth / 2; // half width actually
    var p2 = s.polyline(connectionsBottom.x - nacelleWidth, connectionsBottom.y,
        bbox2.cx - nacelleWidth, bbox2.cy,
        bbox2.cx + nacelleWidth, bbox2.cy,
        connectionsBottom.x + nacelleWidth, connectionsBottom.y,
        connectionsBottom.x - nacelleWidth, connectionsBottom.y
    ).attr({ stroke: '#123456', 'strokeWidth': 3, fill: 'grey' });

    return { topX: bbox.cx, topY: bbox.cy, bottomX: bbox2.cx, bottomY: bbox2.cy };
}

// connectionPoints {topX, topY, bottomX, bottomY}
function drawNacelles(s, connectionPoints, width, length) {
    // We use half sizes a lot here to center every element.
    var halfLength = length / 2;
    var halfWidth = width / 2;
    var plasmaGlowWidth = width * 0.45;

    var plasmaGlowHalfWidth = plasmaGlowWidth / 2;
    // top nacelle
    // Draw bussard collector (red)
    s.circle(connectionPoints.topX - halfLength, connectionPoints.topY - halfWidth, halfWidth).attr({ stroke: '#123456', 'strokeWidth': 3, fill: 'red',});
    // Draw main warp nacelle
    s.rect(connectionPoints.topX - halfLength, connectionPoints.topY - width, length, width, 3, 3).attr({ stroke: '#123456', 'strokeWidth': 3, fill: 'grey' });
    // Draw warp plasma glow (blue)
    s.rect(connectionPoints.topX - halfLength, connectionPoints.topY - width + plasmaGlowHalfWidth, length, plasmaGlowWidth, 3, 3).attr({ stroke: '#123456', 'strokeWidth': 3, fill: '#0099ff' });

    // bottom nacelle
    // Draw bussard collector (red)
    s.circle(connectionPoints.bottomX - halfLength, connectionPoints.bottomY + halfWidth, halfWidth).attr({ stroke: '#123456', 'strokeWidth': 3, fill: 'red'});
    // Draw main warp nacelle
    s.rect(connectionPoints.bottomX - halfLength, connectionPoints.bottomY, length, width, 3, 3).attr({ stroke: '#123456', 'strokeWidth': 3, fill: 'grey' });
    // Draw warp plasma glow (blue)
    s.rect(connectionPoints.bottomX - halfLength, connectionPoints.bottomY + plasmaGlowHalfWidth, length, plasmaGlowWidth, 3, 3).attr({ stroke: '#123456', 'strokeWidth': 3, fill: '#0099ff' });
}

function makeSaucer(s, xCenter, yCenter, rx, ry, shape) {
    // draw a circle at coordinate x, y, radius
    var dish = s.ellipse(xCenter, yCenter, rx, ry).attr({
        fill: grey,
        stroke: "#000",
        strokeWidth: 3
    });

    return s.group(dish);
}

// function makeBody() {

// }

function renderStarship(s) {




    // Determine the center of the saucer section
    var xOrigin = 255;
    var yOrigin = 250;
    var saucerXRadius = Math.floor(Math.random() * 10)+40;  //from -35 to + 35;
    var saucerYRadius = Math.floor(Math.random() * 10)+40;;
    


     
    // Find 1 connection-point on the x-origin axis for single neck within the saucer that does not intersect with bridge
    // OR
    // we stay classic for nw --> single neck only // Find 2 connection-points top and bottom of the x-origin for double neck within the saucer that does not intersect with bridge
    var saucerEndPoint = {x: xOrigin+saucerXRadius*0.75, y: yOrigin};

    //Grow the neck section(s) towards the right from the connection-point(s)
    var neckWidth = saucerYRadius*0.35;
    var neckHalfWidth = neckWidth/2;
    var neckLength =  Math.floor(Math.random() * 55)+30;
    var neck = s.rect(saucerEndPoint.x, saucerEndPoint.y-neckHalfWidth, neckLength, neckWidth).attr({ stroke: '#123456', 'strokeWidth': 3, fill: 'grey' });
    
    // ship is a group
    var ship = makeSaucer(s, xOrigin, yOrigin, saucerXRadius, saucerYRadius, null);
    var neckEndPoint = {x:saucerEndPoint.x+neckLength, y: saucerEndPoint.y}

    


    // Draw main body
    //     //  rect(neckEndPoint.x, neckEndPoint.y-(height/2), width, height);
    var bodyHeight = Math.floor(Math.random() * 30)+70;;
    var halfBodyHeight = bodyHeight/2;
    var bodyLength = Math.floor(Math.random() * 75)+75;  //from -35 to + 35
    var r1 = s.rect(neckEndPoint.x, neckEndPoint.y-halfBodyHeight, bodyLength, bodyHeight, 12, 12).attr({ stroke: '#123456', 'strokeWidth': 3, fill: 'grey' });
    // s.path(`M100,100 C100,350 250,350 250,100`);


    // Draw connection points for debugging
    s.circle(saucerEndPoint.x, saucerEndPoint.y, 5);

    s.circle(neckEndPoint.x, neckEndPoint.y, 5);

    // Determine 1 connectionPoint on top AND 1 connectionPoint on bottom of the main rect
    var bodyTopWingConnectionPoint = { x: neckEndPoint.x+bodyLength*0.6, y: neckEndPoint.y-halfBodyHeight };
    var bodyBottomWingConnectionPoint = {x: neckEndPoint.x+bodyLength*0.6, y: neckEndPoint.y+halfBodyHeight };
    var wingAngle = Math.floor(Math.random() * 75)-35;  //from -35 to + 35
    var nacelleConnectionPoints = drawWings(s, wingAngle, 80, 50, bodyTopWingConnectionPoint, bodyBottomWingConnectionPoint);
    
    var nacelleLength = Math.floor(Math.random() * 150)+100;  
    drawNacelles(s, nacelleConnectionPoints, 40, nacelleLength);

    // var position = svg.createSVGPoint();


    //     // var body = s.rect(x_center+150, y_center-25, 50, 50);
    //     var body = s.rect(0,0, 50, 50).attr({
    //         fill: "#808080",
    //         stroke: "#000",
    //         strokeWidth: 2
    //     });

    //     saucer.attr({
    //         fill: "#808080",
    //         stroke: "#000",
    //         strokeWidth: 5
    //     });



}

window.onload = function () {
    var s = Snap("#svg");
    renderStarship(s);
    // original rect for reference


    

    // // Transformed rect
    // var r2 = r1.clone();
    // var m2clone = m2.clone();

    // myMatrix.rotate(20, 200+(50/2), 200+150);

    // r2.transform(myMatrix.toTransformString());
    // m2clone.transform(myMatrix.toTransformString());

    // var bb = m2clone.getBBox();
    // s.circle(bb.cx, bb.cy, 10);


    //renderStarship(s);
}




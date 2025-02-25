var canvas = document.getElementById("myCanvas"),
ctx = canvas.getContext("2d");
const rect1 = new Path2D();
const rect2 = new Path2D();
const rect3 = new Path2D();

canvas.width  = window.innerWidth;
canvas.height = window.innerHeight;

function windowResize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  
window.addEventListener('resize', windowResize);

let frameCount = 0;

const scrollContainer = document.getElementById("main");

scrollContainer.addEventListener("wheel", (evt) => {
    evt.preventDefault();
    scrollContainer.scrollLeft += evt.deltaY;
});

function scrollToAnchor() {
    document.getElementById('target').scrollIntoView({ behavior: 'smooth' });
}

animate();
function animate(){
    requestAnimationFrame(animate);
    ctx.clearRect(0,0,canvas.width,canvas.height);

    //Creating J
    drawWorld({
        from: {x:canvas.width/10, y:window.innerHeight/5},
        to: {x:0 , y:window.innerHeight/1.5},
        control: {x:canvas.width/ 5, y:window.innerHeight/1.5},
        trackWidth: 50,
        carLength: 100,
        carCount: 5,
        carSpacing: 10,
    })  
    
    //Creating J_underline
    drawWorld({
        from: {x:0, y:window.innerHeight/2},
        to: {x:canvas.width , y:window.innerHeight/1.5},
        control: {x:canvas.width/20 , y:window.innerHeight/1.1},
        trackWidth: 50,
        carLength: 100,
        carCount: 5,
        carSpacing: 10,
    })  

    //Creating right O
    drawWorld({
        from: {x:canvas.width/6 , y:window.innerHeight/5},
        to: {x:canvas.width/3 , y:window.innerHeight},
        control: {x:canvas.width/2, y:window.innerHeight/3},
        trackWidth: 50,
        carLength: 100,
        carCount: 5,
        carSpacing: 10,
    })  

    //Creating left O
    drawWorld({
        from: {x:canvas.width/3 , y:window.innerHeight/5},
        to: {x:canvas.width/4 , y:window.innerHeight},
        control: {x:canvas.width/10, y:window.innerHeight/3},
        trackWidth: 50,
        carLength: 100,
        carCount: 5,
        carSpacing: 10,
    })  

     //Creating top of s
     drawWorld({
        from: {x:canvas.width/1.9 , y:window.innerHeight/5},
        to: {x:canvas.width/1.35 , y:window.innerHeight/2},
        control: {x:canvas.width/5, y:window.innerHeight/1.8},
        trackWidth: 50,
        carLength: 100,
        carCount: 5,
        carSpacing: 10,
    })  

    //Creating bottom of s
    drawWorld({
        from: {x:canvas.width/2.1 , y:window.innerHeight/2},
        to: {x:canvas.width/2.5 , y:window.innerHeight/1.4},
        control: {x:canvas.width/1.5, y:window.innerHeight/1.8},
        trackWidth: 50,
        carLength: 100,
        carCount: 5,
        carSpacing: 10,
    })  
    
    //Creating left of h
    drawWorld({
        from: {x:canvas.width/1.7 , y:window.innerHeight/5},
        to: {x:canvas.width/1.7 , y:window.innerHeight/1.4},
        control: {x:canvas.width/1.6, y:window.innerHeight/3},
        trackWidth: 50,
        carLength: 100,
        carCount: 5,
        carSpacing: 10,
    })  

    //Creating left of h
    drawWorld({
        from: {x:canvas.width/1.35 , y:window.innerHeight/5},
        to: {x:canvas.width/1.35 , y:window.innerHeight/1.45},
        control: {x:canvas.width/1.4, y:window.innerHeight/3},
        trackWidth: 50,
        carLength: 100,
        carCount: 5,
        carSpacing: 10,
    })  

    
    
    frameCount++;
    if (frameCount > 1500) {
        frameCount = 0;
    }
}

function drawWorld({
    from,
    to,
    control = to,
    trackWidth = 40,
    carLength = 100,
    carCount = 5,
    carSpacing = 10,
    trainSpeed = 2,
}) {

    const offset = frameCount * trainSpeed - carSpacing * carCount - carLength * (carCount + 1);
    drawTrack({from,to,control,width: trackWidth});

    //Carts
    drawTrain({
        from,
        to,
        control,
        width: trackWidth * 0.8,
        carLength,
        carCount,
        carSpacing,
        offset,
        color: "lime",
    });
    const carThicknessFactor = 0.15;
    const inverseCarThicknessFactor = 1-carThicknessFactor;

    //Carts Design
    drawTrain({
        from,
        to,
        control,
        width: trackWidth * inverseCarThicknessFactor - (carLength * carThicknessFactor)/2,
        carLength: carLength * inverseCarThicknessFactor,
        carCount,
        carSpacing: carSpacing + carLength * carThicknessFactor,
        offset: offset + (carSpacing + carThicknessFactor) / 2,
        color: "white"
    });

    //Connectors
    drawTrain({ 
        from,
        to,
        control,
        width: carSpacing,
        carLength: carSpacing,
        carCount: carCount-1,
        carSpacing: carLength,
        offset: offset + carLength,
        color: "black"
    });

    //Locamotive Deisgn
    drawTrain({ 
        from,
        to,
        control,
        width: trackWidth,
        carLength,
        carCount: 0,
        carSpacing,
        offset: offset + (carLength + carSpacing) * (carCount) ,
        color: "darkgreen"
    });

    drawTrain({ 
        from,
        to,
        control,
        width: trackWidth,
        carLength: 0,
        carCount: 0,
        carSpacing,
        offset: offset + carLength * carCount + carSpacing + carLength * 1.4,
        color: "darkgreen",
        roundCap: true,

    });

    drawTrain({ 
        from,
        to,
        control,
        width: trackWidth * 0.7,
        carLength,
        carCount: 0,
        carSpacing,
        offset: offset + (carLength + carSpacing) * (carCount),
        color: getRandomColor()
    });

    drawTrain({ 
        from,
        to,
        control,
        width: trackWidth * 0.7,
        carLength: 0,
        carCount: 0,
        carSpacing,
        offset: offset + carLength * carCount + carSpacing + carLength * 1.4,
        color: getRandomColor(),
        roundCap: true,
    });

    drawTrain({ 
        from,
        to,
        control,
        width: trackWidth * 0.5,
        carLength,
        carCount: 0,
        carSpacing,
        offset: offset + (carLength + carSpacing) * (carCount) + carSpacing,
        color: "white"
    });

    drawTrain({ 
        from,
        to,
        control,
        width: trackWidth * 0.5,
        carLength: 0,
        carCount: 0,
        carSpacing,
        offset: offset + carLength * carCount + carSpacing + carLength * 1.4 + carSpacing,
        color: "white",
        roundCap: true,
    });
}

function drawTrain({
    from,
    to, 
    control, 
    width, 
    carLength, 
    carCount, 
    carSpacing,
    offset,
    color,
    roundCap
}){

    ctx.save();

    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.setLineDash([carLength,10000]);
    ctx.lineDashOffset = -offset;
    ctx.lineCap = roundCap ? "round" : "butt";

    ctx.beginPath();
    ctx.moveTo(from.x,from.y);
    ctx.quadraticCurveTo(control.x,control.y,to.x,to.y);
    ctx.stroke();

    for(let i = 0; i< carCount; i++) {
        ctx.lineDashOffset -= carLength;
        ctx.lineDashOffset -= carSpacing;
        ctx.stroke();
    }


    ctx.restore();
}


function drawTrack({from,to, control, width, color = "gray"}){
    ctx.save();
    ctx.beginPath();
    ctx.lineWidth = width * 0.8;
    ctx.moveTo(from.x,from.y);
    ctx.quadraticCurveTo(control.x,control.y,to.x,to.y);
    ctx.strokeStyle = color;
    ctx.stroke();
    ctx.strokeStyle = 'white';
    ctx.lineWidth = width * 0.6;
    ctx.stroke();
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.setLineDash([width * 0.16, width * 0.4]);
    ctx.stroke();
    ctx.restore();
}

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

addEventListener('mousemove', function(event) {
    event = event || window.event;
    
    if (ball && ctx.isPointInPath(ball, event.offsetX, event.offsetY)) {
        canvas.style.cursor = 'pointer';

    return
    } else {
        canvas.style.cursor = 'default';
    }
    
    });
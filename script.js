var canvas = document.getElementById("myCanvas"),
ctx = canvas.getContext("2d");

canvas.width  = 4 * window.innerWidth;
canvas.height = window.innerHeight;

gsap.registerPlugin(ScrollTrigger);

let sections = gsap.utils.toArray(".panel");

gsap.to(sections, {
  xPercent: -100 * (sections.length - 1),
  ease: "none",
  scrollTrigger: {
    trigger: ".container",
    pin: true,
    scrub: 1,
    snap: {
      snapTo: 1 / (sections.length - 1),
      duration: 0.05
    },
    // base vertical scrolling on how wide the container is so it feels more natural.
    end: "+=3500",
  }
});


function windowResize() {
    canvas.width  = 4 * window.innerWidth;
    canvas.height = window.innerHeight;
  };
  
window.addEventListener('resize', windowResize);

let frameCount = 0;

animate();
function animate(){
    requestAnimationFrame(animate);
    ctx.clearRect(0,0,canvas.width,canvas.height);

    //Creating J
    drawWorld({
        from: {x:canvas.width/19, y:window.innerHeight/5},
        to: {x:0 , y:window.innerHeight/1.5},
        control: {x:canvas.width/15, y:window.innerHeight/1.5},
        trackWidth: canvas.width/ 100,
        carLength: 100,
        direction:1,
    })  
    
    //Creating J_underline
    drawWorld({
        from: {x:0, y:window.innerHeight/2},
        to: {x:canvas.width , y:window.innerHeight/1.5},
        control: {x:canvas.width/20 , y:window.innerHeight/1.1},
        trackWidth: canvas.width/ 100,
        carLength: 100,
        direction:1,
    })  

    //Creating right O
    drawWorld({
        from: {x:canvas.width/17 , y:window.innerHeight/5},
        to: {x:canvas.width/900 , y:window.innerHeight},
        control: {x:canvas.width/5, y:window.innerHeight/2},
        trackWidth: canvas.width/ 100,
        carLength: 100,
        direction:1,
    })  

    //Creating left O
    drawWorld({
        from: {x:canvas.width/11 , y:window.innerHeight/5},
        to: {x:canvas.width/6 , y:window.innerHeight * 1.2},
        control: {x:canvas.width/100, y:window.innerHeight/2},
        trackWidth: canvas.width/ 100,
        carLength: 100,
        direction:1,
    })  

     //Creating top of s
     drawWorld({
        from: {x:canvas.width/6 , y:window.innerHeight/5},
        to: {x:canvas.width/4 , y:window.innerHeight/2},
        control: {x:canvas.width/25, y:window.innerHeight/3},
        trackWidth: canvas.width/ 100,
        carLength: 100,
        direction:1,
    })  

    //Creating bottom of s
    drawWorld({
        from: {x:canvas.width/7 , y:window.innerHeight/2.6},
        to: {x:canvas.width/8 , y:window.innerHeight/1.6},
        control: {x:canvas.width/5, y:window.innerHeight/2},
        trackWidth: canvas.width/ 100,
        carLength: 100,
        direction:1,
    })  
    
    //Creating left of h
    drawWorld({
        from: {x:canvas.width/5.8 , y:window.innerHeight/5},
        to: {x:canvas.width/5.8 , y:window.innerHeight/1.5},
        control: {x:canvas.width/5.5, y:window.innerHeight/3},
        trackWidth: canvas.width/ 100,
        carLength: 100,
        direction:1,
    })  

    //Creating left of h
    drawWorld({
        from: {x:canvas.width/4.3 , y:window.innerHeight/5},
        to: {x:canvas.width/4.3 , y:window.innerHeight/1.45},
        control: {x:canvas.width/4.5, y:window.innerHeight/2},
        trackWidth: canvas.width/ 100,
        carLength: 100,
        direction:1,
    })  

    //Creating parallel track
    drawWorld({
        from: {x:0 , y:window.innerHeight/1.2},
        to: {x:canvas.width * 4 , y:window.innerHeight/1.2},
        control: {x:canvas.width, y:window.innerHeight/1.2},
        trackWidth: canvas.width/ 100,
        carLength: 100,
        direction:1,
    }) 

    //Creating parallel track
    drawWorld({
        from: {x:0 , y:window.innerHeight/1.1},
        to: {x:canvas.width * 4 , y:window.innerHeight/1.1},
        control: {x:canvas.width, y:window.innerHeight/1.1},
        trackWidth: canvas.width/ 100,
        carLength: 100,
        direction:-1,
    })

    
    
    frameCount++;
    if (frameCount > 4100) {
        frameCount = 0;
    }
}

function drawWorld({
    from,
    to,
    control = to,
    trackWidth,
    carLength,
    carCount = 5,
    carSpacing = 10,
    trainSpeed = 2,
    direction,
}) {

    const offset = (frameCount * trainSpeed - carSpacing * carCount - carLength * (carCount + 1));
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
        offset: offset,
        color: "lime",
    });
    const carThicknessFactor = 0.15;
    const inverseCarThicknessFactor = (1-carThicknessFactor);

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


function drawTrack({from,to, control, width, color = "#FDD6E6"}){
    ctx.save();
    ctx.beginPath();
    ctx.lineWidth = width * 0.8;
    ctx.moveTo(from.x,from.y);
    ctx.quadraticCurveTo(control.x,control.y,to.x,to.y);
    ctx.strokeStyle = color;
    ctx.stroke();
    ctx.strokeStyle = '#1D1663';
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

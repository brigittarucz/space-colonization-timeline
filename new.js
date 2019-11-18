let starProperties = {
  color: "#fff",
  minRadius: 0.5,
  maxRadius: 1,
  minSpeed: 0.05,
  maxSpeed: 0.3,
  fps: 60,
  numStars: 700,
  canvas: document.getElementById("canvas"),
  ctx: this.canvas.getContext("2d")
};

function init() {
  fitScreen();
  createCircle();
}

function randomiser(min, max) {
  return Math.random() * (max - min) + min;
}

function fitScreen() {
  starProperties.canvas.width = window.innerWidth;
  starProperties.canvas.height = window.innerHeight;
  window.addEventListener("resize", fitScreen);
}

function createCircle() {
  let allStars = [];

  for (i = 0; i < starProperties.numStars; i++) {
    allStars[i] = {
      radius: randomiser(starProperties.minRadius, starProperties.maxRadius),
      xPos: randomiser(0, starProperties.canvas.width),
      yPos: randomiser(0, starProperties.canvas.height),
      xSpeed: randomiser(starProperties.minSpeed, starProperties.maxSpeed),
      ySpeed: randomiser(starProperties.minSpeed, starProperties.maxSpeed),
      color: starProperties.color
    };
    drawOnCanvas(allStars, i);
  }
  animateStars(allStars);
}

function drawOnCanvas(allStars, i) {
  let ctx = starProperties.ctx;
  ctx.fillStyle = allStars[i].color;
  ctx.beginPath();
  ctx.arc(
    allStars[i].xPos,
    allStars[i].yPos,
    allStars[i].radius,
    0,
    2 * Math.PI,
    false
  );
  ctx.fill();
}

function animateStars(allStars) {
  let ctx = starProperties.ctx;
  setInterval(() => {
    if (!hyperjump) {
      clearCanvas();
    }
    for (i = 0; i < starProperties.numStars; i++) {
      allStars[i].yPos -= allStars[i].ySpeed;

      if (allStars[i].yPos < 0) {
        resetStar(allStars, i);
      } else {
        drawOnCanvas(allStars, i);
      }
    }
  }, 1000 / starProperties.fps);
}

function resetStar(allStars, i) {
  allStars[i].yPos += starProperties.canvas.height + allStars[i].radius;
  allStars[i].xPos = randomiser(0, starProperties.canvas.width);
  drawOnCanvas(allStars, i);
}

function clearCanvas() {
  starProperties.ctx.clearRect(
    0,
    0,
    starProperties.canvas.width,
    starProperties.canvas.height
  );
}

init();

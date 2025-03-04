let circleX = 200;
let circleY = 200;

let currentRadius = 0;
let startRadius = 0;
let endRadus = 100;
let startTime = 0;

gui = new lil.GUI();
const params = {
  easingfunction: "easeOutQuad",
  color: "#ff0000",
};

function setup() {
  createCanvas(400, 400);
  rectColor = color(255, 0, 0);

  let easingfunctions = getEasingFunctionNames();
  console.log(easingfunctions);
  const easingFolder = gui.addFolder("Easing");

  easingFolder.add(params, "easingfunction", easingfunctions);
  const folder = gui.addFolder("Color");
  folder.addColor(params, "color");
}

function draw() {
  background(220);

  // Draw circle
  fill(params.color);
  noStroke();
  currentRadius = ease(startTime, 1000, startRadius, endRadus, params.easingfunction);
  circle(circleX, circleY, currentRadius);
}

function mousePressed() {
  // Check if mouse is inside the circle
  let d = dist(mouseX, mouseY, circleX, circleY);
  if (d < currentRadius / 2) {
    // If inside circle, change the circle color
    //circleColor = color(random(200), random(200), random(200));
    startRadius = currentRadius;
    endRadus = random(50, width);
    startTime = millis();
  }
}

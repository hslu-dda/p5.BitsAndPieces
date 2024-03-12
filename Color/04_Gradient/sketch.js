let startTime = 0;
let startX = 0;
let startY = 0;
let currentX = 0;
let currentY = 0;
let targetX = 200;
let targetY = 200;

let gradient;
let circleGradient;

function setup() {
  createCanvas(400, 400);
  targetX = width;
  targetY = height;

  // Create a linear gradient
  gradient = createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, color(0, 100, 100));
  gradient.addColorStop(1, color(240, 100, 100));

  // creat another gradient
  circleGradient = createLinearGradient(-50, 50, +50, -50);
  circleGradient.addColorStop(0, color(0, 100, 100));
  circleGradient.addColorStop(1, color(240, 100, 100));
}

function draw() {
  background(220);

  // Use the custom fillGradient function
  fillGradient(gradient);

  // Draw a rectangle filled with the gradient
  rect(0, 0, width, height);

  currentX = ease(startTime, 500, startX, targetX, "easeOutQuintic");
  currentY = ease(startTime, 500, startY, targetY, "easeOutQuintic");

  push();
  translate(currentX, currentY);
  // Create a linear gradient

  fillGradient(circleGradient);
  noStroke();
  circle(0, 0, 100);
  pop();
}

function mouseMoved() {
  startTime = millis();
  startX = currentX;
  startY = currentY;
  targetX = mouseX;
  targetY = mouseY;
}

// Function to create a linear gradient
function createLinearGradient(x1, y1, x2, y2) {
  let gradient = drawingContext.createLinearGradient(x1, y1, x2, y2);
  return gradient;
}

// Custom fillGradient function
function fillGradient(gradient) {
  if (typeof gradient === "object") {
    // If the argument is a gradient object, set it as the fill style
    drawingContext.fillStyle = gradient;
  } else {
    // Otherwise, use the regular fill function
    fill(gradient);
  }
}

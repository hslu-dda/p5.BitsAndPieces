//https://github.com/dataarts/dat.gui

var circleObjects = { radius: 5, debugView: false };

let gui = new dat.GUI();
gui.add(circleObjects, "radius", 0, 100);
gui.add(circleObjects, "debugView");

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  circle(width / 2, height / 2, circleObjects.radius);
  if (circleObjects.debugView) {
    circle(width / 2, height / 2, 5);
  }
}

function keyPressed() {
  if (key == "g") {
    gui.show(); // Show
  }
  if (key == "G") {
    gui.hide(); // Show
  }
}

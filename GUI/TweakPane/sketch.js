const PARAMS = {
  backgroundColor: "#3a86ff",
  circleColor: "#ff006e",
  circleSize: 150,
  fill: true,
};

function setup() {
  createCanvas(400, 400);
  pane = new Tweakpane.Pane({
    container: document.getElementById("tweakpane-container"),
  });

  pane.addInput(PARAMS, "backgroundColor", { label: "Background" });
  pane.addSeparator();
  pane.addInput(PARAMS, "circleColor", { label: "Circle" });
  pane.addInput(PARAMS, "circleSize", { min: 10, max: 300, step: 1, label: "Size" });
  pane.addInput(PARAMS, "fill", { label: "Fill" });
}

function draw() {
  background(PARAMS.backgroundColor);
  if (PARAMS.fill) {
    fill(PARAMS.circleColor);
  } else {
    noFill();
  }
  ellipse(width / 2, height / 2, PARAMS.circleSize, PARAMS.circleSize);
}

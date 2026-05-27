// ─── Sketch B: Hintergrundfarbe ──────────────────────────────────────────────
// Tastendruck (lokal ODER vom Controller) → Hintergrundfarbe wechselt.
// Jede Taste hat eine eigene Farbe (über den char-code berechnet).

let socket;
let statusText = "verbinde...";

let targetH = 200;
let keyLabel = "–";

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100);
  textAlign(CENTER, CENTER);
  // local oder render.com
  const isLocal = ["localhost", "127.0.0.1"].includes(window.location.hostname);
  const SERVER_URL = isLocal ? "http://localhost:8080" : window.location.origin;

  socket = io(SERVER_URL);

  socket.on("connect", () => {
    statusText = "⬤ verbunden";
  });
  socket.on("disconnect", () => {
    statusText = "⬤ getrennt";
  });

  socket.on("key", (k) => {
    handleKey(k);
  });
}

function draw() {
  background(targetH, 70, 25);
  fill(targetH, 30, 100);
  noStroke();
  textSize(120);
  text(keyLabel, width / 2, height / 2);

  // Status
  fill(statusText.includes("verbunden") ? 120 : 0, 80, 90);
  textSize(13);
  textAlign(LEFT, BOTTOM);
  text(statusText, 12, height - 10);

  fill(0, 0, 60);
  textAlign(RIGHT, BOTTOM);
  text("beliebige Taste = Farbe wechseln  |  sketch_b.html", width - 12, height - 10);
}

function keyPressed() {
  handleKey(key);
}

function handleKey(k) {
  keyLabel = k;
  // Farbe aus dem char-code ableiten → jede Taste bekommt denselben Ton
  targetH = (k.charCodeAt(0) * 37) % 360;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

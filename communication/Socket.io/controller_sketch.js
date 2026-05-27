// ─── Controller Sketch ───────────────────────────────────────────────────────
// Diese Seite macht nichts ausser Tasten per Socket weiterzuschicken.
// Kein Zeichnen, keine Logik.

let socket;
let statusText = "verbinde...";
let lastKey = "–";

function setup() {
  createCanvas(400, 300);
  textAlign(CENTER, CENTER);

  const isLocal = ["localhost", "127.0.0.1"].includes(window.location.hostname);
  const SERVER_URL = isLocal ? "http://localhost:8080" : window.location.origin;

  socket = io(SERVER_URL);

  socket.on("connect",    () => { statusText = "⬤ verbunden"; });
  socket.on("disconnect", () => { statusText = "⬤ getrennt";  });
}

function draw() {
  background(17);

  // Status
  fill(statusText.includes("verbunden") ? "#44ff88" : "#ff4444");
  noStroke();
  textSize(14);
  text(statusText, width / 2, 30);

  // Anleitung
  fill(180);
  textSize(13);
  text("Drücke eine Taste – sie wird weitergeleitet.", width / 2, height / 2 - 20);

  // Letzte Taste
  fill(255);
  textSize(40);
  text(lastKey, width / 2, height / 2 + 30);

  fill(100);
  textSize(11);
  text("controller.html", width / 2, height - 20);
}

function keyPressed() {
  // Taste an alle anderen Clients schicken
  socket.emit("key", key);
  lastKey = key;
}

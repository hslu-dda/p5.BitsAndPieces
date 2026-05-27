// ─── Sketch A: Kreise ────────────────────────────────────────────────────────
// Tastendruck (lokal ODER vom Controller) → neuer Kreis an zufälliger Position.
// Leertaste löscht alles.

let circles = [];
let socket;
let statusText = "verbinde...";

function setup() {
  createCanvas(windowWidth, windowHeight);

  const isLocal = ["localhost", "127.0.0.1"].includes(window.location.hostname);
  const SERVER_URL = isLocal ? "http://localhost:8080" : window.location.origin;

  socket = io(SERVER_URL);

  socket.on("connect",    () => { statusText = "⬤ verbunden"; });
  socket.on("disconnect", () => { statusText = "⬤ getrennt";  });

  // Taste vom Controller empfangen
  socket.on("key", (k) => {
    handleKey(k);
  });
}

function draw() {
  background(0);

  // Alle Kreise zeichnen
  noStroke();
  for (let c of circles) {
    fill(c.r, c.g, c.b, 180);
    ellipse(c.x, c.y, c.d);
  }

  // Status + Anleitung
  fill(statusText.includes("verbunden") ? "#44ff88" : "#ff4444");
  noStroke();
  textSize(13);
  textAlign(LEFT, BOTTOM);
  text(statusText, 12, height - 10);

  fill(120);
  textAlign(RIGHT, BOTTOM);
  text("beliebige Taste = Kreis  |  Leertaste = löschen  |  sketch_a.html", width - 12, height - 10);
}

// Lokale Tasteneingabe
function keyPressed() {
  handleKey(key);
}

// Gemeinsame Logik für lokale + empfangene Tasten
function handleKey(k) {
  if (k === " ") {
    circles = [];           // Alles löschen
  } else {
    circles.push({
      x: random(width),
      y: random(height),
      d: random(20, 150),
      r: random(255),
      g: random(255),
      b: random(255),
    });
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

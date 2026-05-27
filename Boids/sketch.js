// Beispielverwendung in sketch.js:

// Array zur Speicherung aller Boid-Objekte
let boids = [];

// Zielposition für die Boids
let target;

// Flag für den Wander-Zustand
let wandering = false;

// Startzeit für den Übergang von Wander zu Arrive
let startTime = 0;

// Setup-Funktion wird einmal beim Programmstart ausgeführt
function setup() {
  // Erstelle einen Canvas mit 800x600 Pixeln
  createCanvas(800, 600);

  // Erstelle 20 Boid-Objekte und positioniere sie in der Mitte des Canvas
  for (let i = 0; i < 20; i++) {
    boids.push(new Boid(width / 2, height / 2));

    // Setze das Ziel initial auf die Mitte des Canvas
    target = createVector(width / 2, height / 2);
  }
}

// Draw-Funktion wird kontinuierlich ausgeführt (Animation)
function draw() {
  // Setze die Hintergrundfarbe (dunkelgrau)
  background(51);

  // Aktualisiere die Zielposition mit der Mausposition, wenn die Maustaste gedrückt wird
  if (mouseIsPressed) {
    target.x = mouseX;
    target.y = mouseY;

    // Zeichne das Ziel (roter Kreis)
    fill(255, 0, 0);
    noStroke();
    ellipse(target.x, target.y, 16, 16);

    // Setze die Startzeit für den Übergang vom Wander- zum Arrive-Verhalten
    startTime = millis();
  }

  // Variable für die Steuerungskraft
  let steeringForce;

  // Kommentierter Code (nicht aktiv):
  // if (wandering) {
  //   steeringForce = boid.wander();
  // } else {
  //   // Verwende Arrive-Verhalten mit einem Bremsradius
  //   steeringForce = boid.arrive(target, 100);
  // }

  // Für jeden Boid in unserem Array:
  for (boid of boids) {
    // Berechne die Steuerungskraft als Kombination aus Wander- und Arrive-Verhalten
    // mit zeitlichem Übergang (basierend auf startTime und der individuellen wanderTime)
    steeringForce = boid.wanderAndArrive(target, startTime, boid.wanderTime);

    // Wende die berechnete Kraft auf den Boid an
    boid.applyForce(steeringForce);

    // Überprüfe und reagiere auf Grenzen
    boid.boundaries(width, height);

    // Aktualisiere Position und Geschwindigkeit des Boids
    boid.update();

    // Zeichne den Boid auf dem Canvas
    boid.display();
  }
}

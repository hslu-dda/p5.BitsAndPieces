class Boid {
  constructor(x, y) {
    // Position des Boid in der Simulation
    this.position = createVector(x, y);

    // Geschwindigkeit (Richtung und Tempo der Bewegung)
    this.velocity = createVector(random(-1, 1), random(-1, 1));

    // Beschleunigung (Änderung der Geschwindigkeit)
    this.acceleration = createVector(0, 0);

    // Maximale Geschwindigkeit, die der Boid erreichen kann
    this.maxSpeed = 10;

    // Maximale Kraft, die auf den Boid wirken kann (begrenzt die Beschleunigung)
    this.maxForce = 1;

    // Aktueller Winkel für das Wander-Verhalten
    this.wanderAngle = 0;

    // Größe des Boid für die Darstellung
    this.r = 6;

    // Debug-Modus aktivieren (zeigt Hilfslinien und -kreise)
    this.debug = true;

    // Parameter für das Wander-Verhalten
    this.wanderDistance = 80; // Abstand des Wander-Kreises vom Boid
    this.wanderRadius = 25; // Radius des Wander-Kreises
    this.wanderJitter = 0.5; // Zufallsfaktor für die Änderung des Wander-Winkels

    // Zufällige Zeit für den Übergang von Wander zu Arrive
    this.wanderTime = random(1000, 5000);
  }

  // Aktualisiert die Position des Boid basierend auf Geschwindigkeit und Beschleunigung
  update() {
    // Beschleunigung zur Geschwindigkeit hinzufügen
    this.velocity.add(this.acceleration);

    // Geschwindigkeit auf maxSpeed begrenzen
    this.velocity.limit(this.maxSpeed);

    // Position basierend auf Geschwindigkeit aktualisieren
    this.position.add(this.velocity);

    // Beschleunigung zurücksetzen (Kräfte wirken nur für einen Frame)
    this.acceleration.mult(0);
  }

  // Wendet eine Kraft auf den Boid an (verändert die Beschleunigung)
  applyForce(force) {
    this.acceleration.add(force);
  }

  // Grundlegendes Steuerungsverhalten - direkt auf ein Ziel zusteuern
  seek(target) {
    // Berechne den gewünschten Geschwindigkeitsvektor zum Ziel
    let desired = p5.Vector.sub(target, this.position);
    desired.setMag(this.maxSpeed);

    // Berechne die Lenkungskraft (Unterschied zwischen gewünschter und aktueller Geschwindigkeit)
    let steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxForce);

    return steer;
  }

  // Arrive-Verhalten - beim Annähern an das Ziel abbremsen
  arrive(target, slowingRadius = 200) {
    // Berechne den Vektor zum Ziel
    let desired = p5.Vector.sub(target, this.position);
    let distance = desired.mag();

    // Wenn wir nah genug sind, beginnen wir zu bremsen
    if (distance < slowingRadius) {
      // Proportionale Geschwindigkeit abhängig von der Entfernung
      let speed = map(distance, 0, slowingRadius, 0, this.maxSpeed);
      desired.setMag(speed);
    } else {
      // Volle Geschwindigkeit, wenn wir noch weit entfernt sind
      desired.setMag(this.maxSpeed);
    }

    // Berechne die Lenkungskraft
    let steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxForce);

    return steer;
  }

  // Wander-Verhalten - zufälliges Umherwandern mit flüssiger Bewegung
  wander(wanderRadius = this.wanderRadius, wanderDistance = this.wanderDistance, wanderJitter = this.wanderJitter) {
    // Berechne die Position des Kreises vor dem Boid
    let wanderPoint = this.velocity.copy();
    wanderPoint.setMag(wanderDistance);
    wanderPoint.add(this.position);

    // Berechne einen zufälligen Punkt auf dem Kreis
    this.wanderAngle += random(-wanderJitter, wanderJitter);
    let offset = createVector(wanderRadius * cos(this.wanderAngle), wanderRadius * sin(this.wanderAngle));

    // Füge den Offset zur Kreisposition hinzu
    wanderPoint.add(offset);

    // Steuere auf diesen Punkt zu
    return this.seek(wanderPoint);
  }

  // Kombiniert Wander- und Arrive-Verhalten mit zeitlichem Übergang
  wanderAndArrive(target, startTime, duration, slowingRadius = 200) {
    // Berechne aktuelle Zeit und verstrichene Zeit
    let currentTime = millis();
    let elapsedTime = currentTime - startTime;

    // Berechne den Mischfaktor (0 bis 1) basierend auf verstrichener Zeit / Gesamtdauer
    // Dies wird am Anfang 0 sein (nur Wander) und sich mit der Zeit 1 annähern (mehr Arrive)
    let blendFactor = constrain(elapsedTime / duration, 0, 1);

    // Berechne die Kräfte als p5.Vector-Objekte
    let wanderForce = this.wander();
    let arriveForce = this.arrive(target, slowingRadius);

    // Erstelle eine Kopie von wanderForce, um das Original nicht zu verändern
    let resultForce = wanderForce.copy();

    // Skaliere die Wander-Kraft mit fortschreitender Zeit herunter
    resultForce.mult(1 - blendFactor);

    // Skaliere die Arrive-Kraft mit fortschreitender Zeit hoch und füge sie zum Ergebnis hinzu
    let scaledArriveForce = arriveForce.copy().mult(blendFactor);
    resultForce.add(scaledArriveForce);

    return resultForce;
  }

  // Überprüft Grenzen und verhindert das Verlassen des Bildschirms
  boundaries(width, height, padding = 25) {
    let desired = null;

    // Überprüfe horizontale Grenzen
    if (this.position.x < padding) {
      // Wenn zu weit links, bewege nach rechts
      desired = createVector(this.maxSpeed, this.velocity.y);
    } else if (this.position.x > width - padding) {
      // Wenn zu weit rechts, bewege nach links
      desired = createVector(-this.maxSpeed, this.velocity.y);
    }

    // Überprüfe vertikale Grenzen
    if (this.position.y < padding) {
      // Wenn zu weit oben, bewege nach unten
      desired = createVector(this.velocity.x, this.maxSpeed);
    } else if (this.position.y > height - padding) {
      // Wenn zu weit unten, bewege nach oben
      desired = createVector(this.velocity.x, -this.maxSpeed);
    }

    // Wenn eine Grenze überschritten wurde, wende eine Lenkungskraft an
    if (desired !== null) {
      desired.normalize();
      desired.mult(this.maxSpeed);
      let steer = p5.Vector.sub(desired, this.velocity);
      steer.limit(this.maxForce);
      this.applyForce(steer);
    }
  }

  // Zeigt den Boid auf dem Bildschirm an
  display() {
    // Berechne den Winkel für die Rotation (Boid zeigt in Bewegungsrichtung)
    let theta = this.velocity.heading() + PI / 2;

    // Zeichne Debug-Ansicht-Elemente
    if (this.debug) {
      push();

      // Berechne die Position des Kreises vor dem Boid
      let wanderCenter = this.velocity.copy();
      wanderCenter.normalize();
      wanderCenter.mult(this.wanderDistance);
      wanderCenter.add(this.position);

      // Zeichne den Kreis
      stroke(0, 255, 0, 100);
      noFill();
      ellipse(wanderCenter.x, wanderCenter.y, this.wanderRadius * 2);

      // Zeichne Linie zum Kreis
      stroke(200, 100);
      line(this.position.x, this.position.y, wanderCenter.x, wanderCenter.y);

      // Zeichne den Wander-Punkt auf dem Kreis
      let wanderPoint = createVector(
        this.wanderRadius * cos(this.wanderAngle),
        this.wanderRadius * sin(this.wanderAngle)
      );
      wanderPoint.add(wanderCenter);

      fill(0, 255, 0, 100);
      noStroke();
      ellipse(wanderPoint.x, wanderPoint.y, 4);

      // Zeichne Linie vom Kreiszentrum zum Wander-Punkt
      stroke(0, 255, 0, 100);
      line(wanderCenter.x, wanderCenter.y, wanderPoint.x, wanderPoint.y);

      // Zeichne Geschwindigkeitsvektor
      stroke(255, 0, 0, 100);
      strokeWeight(2);
      line(
        this.position.x,
        this.position.y,
        this.position.x + this.velocity.x * 10,
        this.position.y + this.velocity.y * 10
      );

      pop();
    }

    // Zeichne den Boid als Dreieck
    fill(127);
    stroke(200);
    strokeWeight(1);

    push();
    translate(this.position.x, this.position.y);
    rotate(theta);

    // Zeichne ein Dreieck
    beginShape();
    vertex(0, -this.r * 2); // Spitze
    vertex(-this.r, this.r * 2); // Untere linke Ecke
    vertex(this.r, this.r * 2); // Untere rechte Ecke
    endShape(CLOSE);

    pop();
  }
}

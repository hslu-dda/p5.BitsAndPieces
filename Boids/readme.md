# Boids Simulation

Diese Simulation zeigt eine vereinfachte Version von Craig Reynolds' Boids. Im Gegensatz zur vollständigen Boids-Implementierung liegt der Fokus hier nicht auf dem Schwarmverhalten (Flocking), sondern auf den grundlegenden Steuerungsverhaltensweisen einzelner Boids.

## Was sind Boids?

Boids (ein Kunstwort aus "bird-oid", also vogelähnlich) ist ein von Craig Reynolds 1986 entwickeltes Computermodell zur Simulation des Bewegungsverhaltens von Vogelschwärmen oder Fischschwärmen. Die vollständige Boids-Simulation basiert auf drei einfachen Regeln:

1. **Separation**: Boids versuchen, einen Mindestabstand zu ihren Nachbarn einzuhalten
2. **Ausrichtung**: Boids versuchen, sich in die gleiche Richtung wie ihre Nachbarn zu bewegen
3. **Kohäsion**: Boids versuchen, sich zur durchschnittlichen Position ihrer Nachbarn zu bewegen

In dieser Simulation konzentrieren wir uns jedoch auf folgende Verhaltensweisen:

- **Seek**: Direktes Ansteuern eines Ziels
- **Arrive**: Abbremsen bei Annäherung an ein Ziel
- **Wander**: Zufälliges Umherwandern
- **Boundary Handling**: Vermeiden des Verlassens des sichtbaren Bereichs

## Steuerungsverhaltensweisen im Detail

### Seek (Ansteuern)

Bei diesem Verhalten steuert ein Boid direkt auf ein Ziel zu. Der Boid berechnet einen Vektor, der direkt zum Ziel zeigt, und versucht, seine aktuelle Geschwindigkeit diesem gewünschten Vektor anzugleichen.

### Arrive (Ankommen)

Eine Erweiterung des Seek-Verhaltens, bei dem der Boid abbremst, wenn er sich dem Ziel nähert. Dies verhindert, dass der Boid über das Ziel hinausschießt.

### Wander (Umherwandern)

Ein komplexeres Verhalten, bei dem der Boid zufällig umherwandert, aber dennoch eine flüssige Bewegung beibehält. Dies wird durch das Projizieren eines Kreises vor dem Boid und das Ansteuern eines zufälligen Punktes auf diesem Kreis erreicht.

### Boundaries (Grenzen)

Verhindert, dass Boids den sichtbaren Bereich verlassen, indem sie sanft zurück in den Bereich gelenkt werden, wenn sie sich den Rändern nähern.

## Interaktion

- **Mausklick und halten**: Setzt das Ziel für alle Boids auf die Mausposition
- Die Boids beginnen zufällig umherzuwandern und nähern sich allmählich dem Ziel

## Technische Details

Diese Simulation verwendet die p5.js-Bibliothek zur Visualisierung und Vektormanipulation. Die Boids-Logik ist in der `Boid`-Klasse gekapselt, während die Hauptschleife in `sketch.js` implementiert ist.

## Erweiterungsmöglichkeiten

Um eine vollständige Boids-Simulation zu implementieren, könnten Sie folgende Verhaltensweisen hinzufügen:

- **Separation**: Vermeiden von Überfüllung mit anderen Boids
- **Alignment**: Ausrichtung der Bewegungsrichtung an benachbarten Boids
- **Cohesion**: Bewegung in Richtung des Durchschnittsorts benachbarter Boids

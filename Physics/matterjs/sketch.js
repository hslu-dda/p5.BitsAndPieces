const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Mouse = Matter.Mouse;
const MouseConstraint = Matter.MouseConstraint;

let engine;
let world;
let walls = [];
let balls = [];

class Ball {
  constructor(x, y) {
    this.radius = random(10, 100);
    this.color = color(random(255), random(255), random(255));

    // Create the Matter.js body
    this.body = Bodies.circle(x, y, this.radius, {
      restitution: 0.8,
      friction: 0.1,
      density: this.radius,
    });

    // Set random initial motion
    Body.setVelocity(this.body, {
      x: random(-5, 5),
      y: random(-5, 5),
    });
    Body.setAngularVelocity(this.body, random(-0.5, 0.5));

    // Add to world
    World.add(world, this.body);
  }

  show() {
    let pos = this.body.position;
    let angle = this.body.angle;

    push();
    translate(pos.x, pos.y);
    rotate(angle);

    // Draw ball
    fill(this.color);
    noStroke();
    ellipse(0, 0, this.radius * 2);

    // Line to show rotation
    stroke(0);
    strokeWeight(2);
    line(0, 0, this.radius, 0);
    pop();
  }

  // Check if ball is off screen
  isOffScreen() {
    let pos = this.body.position;
    return pos.y > height + 100 || pos.y < -100 || pos.x > width + 100 || pos.x < -100;
  }

  // Remove ball from world
  removeFromWorld() {
    World.remove(world, this.body);
  }
}

function setup() {
  let canvas = createCanvas(800, 600);
  engine = Engine.create();
  world = engine.world;

  // Create walls
  walls = [
    Bodies.rectangle(400, height + 30, width, 60, { isStatic: true }),
    Bodies.rectangle(-30, height / 2, 60, height, { isStatic: true }),
    Bodies.rectangle(width + 30, height / 2, 60, height, { isStatic: true }),
    Bodies.rectangle(400, -30, width, 60, { isStatic: true }),
  ];

  // Add mouse control
  let mouse = Mouse.create(canvas.elt);
  mouse.pixelRatio = pixelDensity();

  let mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
      stiffness: 0.2,
      render: { visible: false },
    },
  });

  // Add walls and mouse constraint to world
  World.add(world, [...walls, mouseConstraint]);
}

function draw() {
  background(220);
  Engine.update(engine);

  // Draw walls
  fill(80);
  noStroke();
  walls.forEach((wall) => {
    beginShape();
    wall.vertices.forEach((v) => {
      vertex(v.x, v.y);
    });
    endShape(CLOSE);
  });

  // Update and draw balls
  for (let i = balls.length - 1; i >= 0; i--) {
    balls[i].show();

    // Optional: Remove balls that are far off screen
    if (balls[i].isOffScreen()) {
      balls[i].removeFromWorld();
      balls.splice(i, 1);
    }
  }

  // Show ball count
  fill(0);
  noStroke();
  textSize(16);
  text("Balls: " + balls.length, 10, 20);
}

// Press space to add a ball
function keyPressed() {
  if (key === " ") {
    balls.push(new Ball(mouseX, mouseY));
  }
}

// Click to add a ball
function mousePressed() {
  if (!mouseConstraint.body) {
    // Only add if not dragging
    balls.push(new Ball(mouseX, mouseY));
  }
}

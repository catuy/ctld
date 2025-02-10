let path;
let img;
function preload() {
  img = loadImage('prueba.png');
}


function setup() {
  createCanvas(displayWidth, displayHeight);
  path = new Path();
}

function draw() {
  let colorb = color('#f3df59');
  background(colorb);
  fill(30);
  noStroke();
  path.display();
}

function mousePressed() {
  // path = new Path();
  // path.addPoint(mouseX, mouseY);
}

function mouseDragged() {
  path.addPoint(mouseX, mouseY);
}

class Path {
  constructor() {
    this.pts = [];
    this.angles = [];
    this.size = random(60,160);
  }

  get lastPt() {
    return this.pts[this.pts.length - 1];
  }

  addPoint(x, y) {
    if (this.pts.length < 1) {
      this.pts.push(new p5.Vector(x, y));
      return;
    }

    const nextPt = new p5.Vector(x, y);
    let d = p5.Vector.dist(nextPt, this.lastPt);

    while (d > this.size) {
      const diff = p5.Vector.sub(nextPt, this.lastPt);
      diff.normalize();
      diff.mult(this.size/2);
      this.pts.push(p5.Vector.add(this.lastPt, diff));
      this.angles.push(diff.heading());
      d -= this.size;
    }
  }

  display() {
    rectMode(CENTER);
    for (let i = 1; i < this.pts.length; i++) {
      const prev = this.pts[i - 1];
      const next = this.pts[i];
      const diff = p5.Vector.sub(next, prev);
      diff.mult(0.5);
      push();
      translate(prev.x + diff.x, prev.y + diff.y);
      rotate(this.angles[i - 1]);
      // rect(0, 0, this.size * 1.2, this.size);
      image(img, 0, 0, this.size/2, this.size);
      // rect(0, 0, this.size, this.size);



      pop();
    }
  }
}
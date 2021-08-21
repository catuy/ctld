
function setup() {
  createCanvas(displayWidth, displayHeight);
  fill(30);
  noStroke();
}

function draw() {
  ellipse(mouseX, mouseY, 200, 200);
  ellipseMode(CENTER);
  stroke(226, 0, 115);
  strokeWeight(1.3);
  fill(43, 35, 120);
}

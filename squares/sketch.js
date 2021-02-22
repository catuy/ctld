function setup() {

  createCanvas(displayWidth, displayHeight, SVG);
  background(240);
  fill(40);
  // stroke(40);
// strokeWeight(40);
  noStroke();
}



function touchMoved() {

colorMode(HSB, 1, 1, 1);
fill(0.15, 0.80, 0.96);
rect(mouseX-220, mouseY, 100, 200);
fill(0.569, 0.71, 0.67);
rect(mouseX+40, mouseY-100, 200, 200);
fill(0.0195, 0.76, 0.82);
rect(mouseX, mouseY+60, 200, 200);
}

save_canvas = function() {
  save();
}
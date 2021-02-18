function setup() {
  createCanvas(displayWidth, displayHeight, SVG);
  // let c = color('#312783');
  let fill_color = color('#312783');
  let stroke_color = color('#E6007E');
  background(200);
  fill(fill_color);
  stroke(stroke_color);
}

function touchMoved() {
  ellipse(mouseX, mouseY, 160, 160);
  strokeWeight(1);
  return false;
}
save_canvas = function() {
  save();
}



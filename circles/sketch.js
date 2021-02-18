function setup() {
  createCanvas(displayWidth, displayHeight, SVG);
  // let c = color('#312783');
  let fill_color = color('#312783');
  let stroke_color = color('#E6007E');
  let background_color = color('#eee');
  let stroke_wight = 1;

  background(background_color);
  fill(fill_color);
  stroke(stroke_color);
  strokeWeight(stroke_wight);

}

function touchMoved() {

  let object_width = 150;
  let object_height = 150;

  ellipse(mouseX, mouseY, object_width, object_height);
  return false;
}


save_canvas = function() {
  save();
}



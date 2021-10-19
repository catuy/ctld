var outputadd=0, outputsub=0;
var rSlider, gSlider, bSlider;
var r=0,g=0,b=0;
var cnv,cnvat;
var usectrlpos = true;

function setup() {
  // createCanvas(displayWidth, displayHeight, SVG);
  createCanvas(displayWidth, displayHeight, SVG);
  let fill_color = color('#2b2378');
  let stroke_color = color('#d90073');
  let background_color = color('#e2e2e2e2');
  let stroke_wight = 1.4;

// slider test ( change from inside canvas to its own position below canvas
if ( usectrlpos ) {
  rSlider = createSlider(0, 255, 200).parent('controlposition');
  gSlider = createSlider(0, 255, 200).parent('controlposition');
  bSlider = createSlider(0, 255, 0).parent('controlposition');
} else {
  rSlider = createSlider(0, 255, 200);
  rSlider.position(20+cnvat.x, height - 25+cnvat.y);
  gSlider = createSlider(0, 255, 200);
  gSlider.position(250+cnvat.x, height - 25+cnvat.y);
  bSlider = createSlider(0, 255, 0);
  bSlider.position(490+cnvat.x, height - 25+cnvat.y);
}


  background(background_color);
  fill(fill_color);
  stroke(stroke_color);
  strokeWeight(stroke_wight);
}

function touchMoved() {
  let object_width = 150;
  let object_height = 150;
  get_slider();
  // background(r,g,b);
  // fill(b,r,g);
  ellipse(mouseX, mouseY, object_width, object_height);
  return false;
}

function get_slider() {
  r = rSlider.value();
  g = gSlider.value();
  b = bSlider.value();  
}

// function draw() {
//   get_slider();
//   background(r,g,b);
//   fill(b,r,g);
// }

// function check_pos() {  
//   cnvat = _renderer.position();
// }

save_canvas = function() {
  save();
}



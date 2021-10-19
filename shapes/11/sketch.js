let pg;
let x, y;
let px, py;
let elipssewidth

var c = [
        // "#C460E0", 
         "#F469A9", 
         "#69F5E7", 
        //  "#687DF2", 
        //  "#69F591",             
         "#F1Ea67"
        ];

function setup() {
  createCanvas(1000, 700);
  pg = createGraphics(4000, 2800);
  pg.background(255);

  x = width / 2;
  y = height / 2;
  px = x;
  py = y;
  elipssewidth = 600;
  
}

function draw() {
  x += (pg.noise(frameCount * 0.01) - 0.5) * 300;
  y += (pg.noise(frameCount * 0.02) - 0.5) * 300;

  if (x > pg.width - elipssewidth) {
    px = x = elipssewidth;
  }
  if (x < elipssewidth) {
    px = x = pg.width - elipssewidth;
  }
  if (y > pg.height - elipssewidth) {
    py = y = elipssewidth;
  }
  if (y < elipssewidth) {
    py = y = pg.height - elipssewidth;
  }

  pg.ellipse(x, y, elipssewidth, elipssewidth);
  pg.stroke(random(c));
  pg.strokeWeight(10);
  pg.fill(0);
  pg.ellipseMode(CENTER);
    // line(pmouseX, pmouseY, mouseX, mouseY);

  px = x;
  py = y;

  // pg.ellipse(random(pg.width), random(pg.height), 100, 100);
  image(pg, 0, 0, width, height);
}

function mousePressed(){
 pg.save("pg.png"); 
}

function keyReleased() {
  if (key == 'E' || key == 'e') noLoop();
  if (key == 'F' || key == 'f') loop();
  if (key == 'R' || key == 'r') pg.background(255);
  if (key == 'S' || key == 's')  pg.save("pg.png");
}


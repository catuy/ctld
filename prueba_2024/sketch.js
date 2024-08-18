let x, y;
let elipssewidth;
let paused = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  background(255);

  x = width / 2;
  y = height / 2;
  elipssewidth = 80;

}

function draw() {
  if (!paused) {
    if (!mouseIsPressed) {
      x += (noise(frameCount * 0.01) - 0.5) * 30;
      y += (noise(frameCount * 0.02) - 0.5) * 30;
    } else {
      x = mouseX;
      y = mouseY;
    }

    x = constrain(x, elipssewidth / 2, width - elipssewidth / 2);
    y = constrain(y, elipssewidth / 2, height - elipssewidth / 2);

      let p = get(x - 50, y - 50, 200, 200);
      p.filter(INVERT);
      image(p, x, y, elipssewidth, elipssewidth);
    } else {
      fill(0);
    }

    imageMode(CENTER);
  }

function mousePressed() {
  attemptInstall();
}

function touchStarted() {
  attemptInstall();
  return false;
}

function keyPressed() {
  if (key === 's') {
    saveHighResImage();
  } else if (key === 'p') {
    paused = !paused;
  }
}

function saveHighResImage() {
  let scaleFactor = 5;
  let highResCanvas = createGraphics(width * scaleFactor, height * scaleFactor);
  highResCanvas.noStroke();
  highResCanvas.background(255);

  highResCanvas.translate(highResCanvas.width / width, highResCanvas.height / height);
  highResCanvas.image(get(), 0, 0, highResCanvas.width, highResCanvas.height);

  highResCanvas.save(`myfile-${hour()}${minute()}${second()}_highres.jpg`);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(255);
}

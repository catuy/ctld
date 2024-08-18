let x, y;
let ellipseWidth;
let paused = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  background(255);

  x = width / 2;
  y = height / 2;
  ellipseWidth = 80;
}

function draw() {
  if (!paused) {
    if (!mouseIsPressed && touches.length <= 1) {
      x += (noise(frameCount * 0.01) - 0.5) * 30;
      y += (noise(frameCount * 0.02) - 0.5) * 30;
    } else if (touches.length === 1) {
      x = touches[0].x;
      y = touches[0].y;
    }

    x = constrain(x, ellipseWidth / 2, width - ellipseWidth / 2);
    y = constrain(y, ellipseWidth / 2, height - ellipseWidth / 2);

    fill(0);
    ellipse(x, y, ellipseWidth, ellipseWidth);
  }
}

function touchStarted() {
  // Para dispositivos móviles, detectar si es un toque doble para pausar
  if (touches.length === 2) {
    paused = !paused;
    return false; // Evitar comportamiento predeterminado
  } else if (touches.length === 3) {
    saveHighResImage();
  }
  return false;
}

function keyPressed() {
  if (key === 'p') {
    paused = !paused;
  } else if (key === 's') {
    saveHighResImage();
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

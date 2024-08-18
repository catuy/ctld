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

  // Botón de Pausa
  let pauseButton = select('#pause-button');
  pauseButton.mousePressed(togglePause);

  // Botón de Guardar Imagen
  let saveButton = select('#save-button');
  saveButton.mousePressed(saveHighResImage);
}

function draw() {
  if (!paused) {
    if (!mouseIsPressed && touches.length === 0) {
      x += (noise(frameCount * 0.01) - 0.5) * 30;
      y += (noise(frameCount * 0.02) - 0.5) * 30;
    } else if (touches.length === 1) {
      x = touches[0].x;
      y = touches[0].y;
    }

    x = constrain(x, ellipseWidth / 2, width - ellipseWidth / 2);
    y = constrain(y, ellipseWidth / 2, height - ellipseWidth / 2);

    let p = get(x - 50, y - 50, 200, 200);
    p.filter(INVERT);
    image(p, x, y, ellipseWidth, ellipseWidth);

    imageMode(CENTER);
  }
}

function togglePause() {
  paused = !paused;
}

function saveHighResImage() {
  let scaleFactor = 5;
  let highResCanvas = createGraphics(width * scaleFactor, height * scaleFactor);
  highResCanvas.noStroke();
  highResCanvas.background(255
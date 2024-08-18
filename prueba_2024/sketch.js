let x, y;
let elipssewidth;
let paused = false;

function setup() {
  createCanvas(windowWidth, windowHeight); // Canvas al 100% de la pantalla
  noStroke();
  background(255); // Fondo blanco

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

    // Limita el movimiento al área del canvas
    x = constrain(x, elipssewidth / 2, width - elipssewidth / 2);
    y = constrain(y, elipssewidth / 2, height - elipssewidth / 2);

    // Dibuja el patrón visual
    let p = get(x - 50, y - 50, 200, 200);
    p.filter(INVERT);
    image(p, x, y, elipssewidth, elipssewidth);

    imageMode(CENTER);
  }
}

function keyPressed() {
  if (key === 's') {
    saveHighResImage();
  } else if (key === 'p') {
    paused = !paused;
  }
}

function touchStarted() {
  paused = !paused;
  return false;
}

function touchEnded() {
  if (touches.length === 2) {
    saveHighResImage();
  }
  return false;
}

function saveHighResImage() {
  let scaleFactor = 5; // Factor de escala para alta resolución
  let highResCanvas = createGraphics(width * scaleFactor, height * scaleFactor);
  highResCanvas.noStroke();
  highResCanvas.background(255); // Fondo blanco en la imagen de alta resolución

  // Redibujar la escena en la imagen de alta resolución
  highResCanvas.translate(highResCanvas.width / width, highResCanvas.height / height);
  highResCanvas.image(get(), 0, 0, highResCanvas.width, highResCanvas.height);

  // Guardar la imagen en alta resolución en Android
  highResCanvas.save(`myfile-${hour()}${minute()}${second()}_highres.jpg`);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // Reajusta el canvas al tamaño completo
  background(255); // Fondo blanco
}

let animations = [];
let numAnimations = 7; // Número de animaciones a superponer
let ellipseWidth = 380;
let paused = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  background(255);

  // Crear botones en la interfaz
  let pauseButton = createButton('Pausar');
  pauseButton.position(10, 10);
  pauseButton.mousePressed(togglePause);

  let saveButton = createButton('Guardar Imagen');
  saveButton.position(10, 40);
  saveButton.mousePressed(saveHighResImage);

  // Crear múltiples animaciones aleatorias
  for (let i = 0; i < numAnimations; i++) {
    let anim = {
      x: random(width),
      y: random(height),
      xSpeed: random(-10, 10),
      ySpeed: random(-10, 10),
      width: random(20, 200),
      color: color(random(255), random(255), random(255))
    };
    animations.push(anim);
  }
}

function draw() {
  if (!paused) {
    // background(255, 255, 255, 10); // Fondo con opacidad para el efecto de superposición

    for (let anim of animations) {
      // Actualizar la posición de la animación
      anim.x += anim.xSpeed;
      anim.y += anim.ySpeed;

      // Constrain para que la animación no se salga del canvas
      anim.x = constrain(anim.x, anim.width / 2, width - anim.width / 2);
      anim.y = constrain(anim.y, anim.width / 2, height - anim.width / 2);

      // Aplicar filtro y dibujar la animación
      let p = get(anim.x - anim.width / 2, anim.y - anim.width / 2, anim.width, anim.width);
      p.filter(INVERT);
      image(p, anim.x, anim.y, anim.width, anim.width);

      // Dibujar la animación
      fill(anim.color);
      ellipse(anim.x, anim.y, anim.width);
    }

    imageMode(CENTER);
  }
}

function mousePressed() {
  attemptInstall();
}

function touchStarted() {
  // Prevenir el comportamiento predeterminado para evitar conflictos
  return false;
}

function togglePause() {
  paused = !paused;
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

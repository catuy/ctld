let sineWaves = []; // Array de osciladores sinusoidales
let sineFreq = []; // Array de frecuencias
let numSines = 8; // Número de osciladores

let x, y;
let elipssewidth;
let audioStarted = false;
let paused = false;

let modulator; // Modulator for FM synthesis

function setup() {
  createCanvas(windowWidth, windowHeight); // Canvas al 100% de la pantalla
  noStroke();
  background(255); // Fondo blanco

  x = width / 2;
  y = height / 2;
  elipssewidth = 80;

  for (let i = 0; i < numSines; i++) {
    let sineVolume = (1.0 / numSines) / (i + 1);
    let osc = new p5.Oscillator('sine');
    osc.amp(sineVolume);
    sineWaves.push(osc);
    sineFreq.push(0);
  }

  // Setup modulator for FM synthesis
  modulator = new p5.Oscillator('sine');
  modulator.freq(5); // Low-frequency modulation
  modulator.amp(50);
  modulator.start();

  // Puedes comentar la solicitud de pantalla completa si no es esencial para la prueba
  // requestFullscreen();
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

    if (audioStarted) {
      // Modula la frecuencia en función de la posición del mouse
      let yoffset = map(y, 0, height, 0, 1);
      let frequency = pow(1000, yoffset) + 150;
      let detune = map(x, 0, width, -0.5, 0.5);

      // Cambia la frecuencia del modulador para la modulación de frecuencia
      modulator.freq(map(x, 0, width, 1, 10)); // Frecuencia del modulador basada en la posición del mouse

      for (let i = 0; i < numSines; i++) {
        sineFreq[i] = frequency * (i + 1) + modulator.amp() * sin(TWO_PI * modulator.freq() * frameCount / 60);
        sineWaves[i].freq(sineFreq[i]);
      }

      // Dibuja el patrón visual
      let p = get(x - 50, y - 50, 200, 200);
      p.filter(INVERT);
      image(p, x, y, elipssewidth, elipssewidth);
    } else {
      // Dibuja un patrón básico si el audio no está iniciado
      fill(0);
      // ellipse(x, y, elipssewidth);
    }

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
  if (!audioStarted) {
    startAudio();
    audioStarted = true;
  } else {
    paused = !paused;
  }
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

  highResCanvas.save(`myfile-${hour()}${minute()}${second()}_highres.jpg`);
}

function startAudio() {
  for (let i = 0; i < numSines; i++) {
    sineWaves[i].start();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // Reajusta el canvas al tamaño completo
  background(200); // Fondo blanco
}

// Función para solicitar pantalla completa
function requestFullscreen() {
  let elem = document.documentElement;
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.mozRequestFullScreen) { // Firefox
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) { // Chrome, Safari and Opera
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { // IE/Edge
    elem.msRequestFullscreen();
  }
}

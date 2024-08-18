let sineWaves = [];
let sineFreq = [];
let numSines = 8;

let x, y;
let elipssewidth;
let audioStarted = false;
let paused = false;

let modulator;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  background(155, 15, 55);

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

  modulator = new p5.Oscillator('sine');
  modulator.freq(5);
  modulator.amp(50);
  modulator.start();
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

    if (audioStarted) {
      let yoffset = map(y, 0, height, 0, 1);
      let frequency = pow(1000, yoffset) + 150;

      modulator.freq(map(x, 0, width, 1, 10));

      for (let i = 0; i < numSines; i++) {
        sineFreq[i] = frequency * (i + 1) + modulator.amp() * sin(TWO_PI * modulator.freq() * frameCount / 60);
        sineWaves[i].freq(sineFreq[i]);
      }

      let p = get(x - 50, y - 50, 200, 200);
      p.filter(INVERT);
      image(p, x, y, elipssewidth, elipssewidth);
    } else {
      fill(0);
    }

    imageMode(CENTER);
  }
}

function mousePressed() {
  startAudio();
  attemptInstall();
}

function touchStarted() {
  startAudio();
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

  // Guardar en alta resolución con compatibilidad para Android
  let imageFileName = `myfile-${hour()}${minute()}${second()}_highres.jpg`;
  highResCanvas.canvas.toBlob((blob) => {
    let a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = imageFileName;
    a.click();
  });
}

function startAudio() {
  if (!audioStarted) {
    for (let i = 0; i < numSines; i++) {
      sineWaves[i].start();
    }
    audioStarted = true;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(255);
}

// Importación de processing.sound eliminada ya que no es necesaria en p5.js
let sineWaves = []; // Array of sines
let sineFreq = []; // Array of frequencies
let numSines = 4; // Number of oscillators to use

let brushHeight = 60; // Default height
let brushWidth = 60;  // Default width
let colorMode = 0;

function setup() {
  createCanvas(displayWidth, displayHeight);
  background(255, 255, 255); // Default white background
  noStroke();
  noCursor();

  sineWaves = new Array(numSines); // Initialize the oscillators
  sineFreq = new Array(numSines); // Initialize array for Frequencies

  for (let i = 0; i < numSines; i++) {
    // Calculate the amplitude for each oscillator
    let sineVolume = (1.0 / numSines) / (i + 1);
    // Create the oscillators
    sineWaves[i] = new p5.Oscillator();
    sineWaves[i].setType('sine');
    // Start Oscillators
    sineWaves[i].start();
    // Set the amplitudes for all oscillators
    sineWaves[i].amp(sineVolume);
  }
}

function updateRectangleWidth(value) {
  brushWidth = value;
  console.log(`brushWidth updated to ${brushWidth}`);
}

function updateRectangleHeight(value) {
  brushHeight = value;
  console.log(`brushHeight updated to ${brushHeight}`);
}

function saveCanvas() {
  save('myCanvas.jpg');
}

function updateBackgroundColor(color) {
  background(color);
  console.log(`Background color updated to ${color}`);
}

function updateExportQuality(quality) {
  // Aquí puedes agregar la lógica para manejar la calidad de exportación
  console.log(`Export quality set to ${quality}x`);
}

function draw() {
  
  if (mouseIsPressed) {
 
 //Map mouseY from 0 to 1
  let yoffset = map(mouseY, 0, height, 0, 1);
  //Map mouseY logarithmically to 150 - 1150 to create a base frequency range
  let frequency = pow(1000, yoffset) + 150;
  //Use mouseX mapped from -0.5 to 0.5 as a detune argument
  let detune = map(mouseX, 0, width, -0.5, 0.5);

  for (let i = 0; i < numSines; i++) { 
    sineFreq[i] = frequency * (i + 1 * detune);
    // Set the frequencies for all oscillators
    sineWaves[i].freq(sineFreq[i]);
  }

 let p = get(200, 200, 400, 400);
  //PImage p = get(mouseX,mouseY,400,400);
 p.filter(INVERT);
 image(p,mouseX,mouseY,140,130);
  // image(p,mouseX,mouseY,random(200,180),circleSize);
  }

  // Draw rectangles based on brushWidth and brushHeight
  fill(255, 0, 0); // Red color for rectangles
  rect(mouseX, mouseY, brushWidth, brushHeight);
  console.log(`Drawing rectangle with width: ${brushWidth}, height: ${brushHeight}`);
}

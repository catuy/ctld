// Configuración inicial
let canvasWidth = 800;
let canvasHeight = 800;
let margin = 80; // Margen fijo del 5% (40px en un canvas de 800px)
let colors = ['#FF0000', '#0000FF', '#FFFF00', '#000000']; // Rojo, Azul, Amarillo, Negro
let colorsbg = ['#FFFFFF', '#000000']; // Blanco, Negro
let backgroundColors = ['#FFFFFF', '#F0F0F0', '#FFFF00', '#FF0000', '#0000FF']; // Blanco, Gris claro, Amarillo, Rojo, Azul
let currentColor;
let artGenerators = [];

function setup() {
  createCanvas(windowWidth, windowHeight); // Lienzo del tamaño de la ventana
  noLoop();
  initializeArtGenerators();
  generateArt();
}

// Inicializa los generadores de arte
function initializeArtGenerators() {
  artGenerators = [
    generateBackground,
    generateGeometricShapes,
    generateDirectionalLines,
    generateOrganicLines,
    generateGridPattern
  ];
}

// Función principal para generar arte
function generateArt() {
  // Fondo blanco con margen
  background(255);
  fill(random(backgroundColors));
  noStroke();
  rect(margin, margin, width - 2 * margin, height - 2 * margin);
  
  // Ejecutar cada generador de arte
  artGenerators.forEach(generator => generator());
}

// Genera un fondo (puede ser liso o un patrón de damero)
function generateBackground() {
  let bgType = random(['solid', 'checkerboard']);
  
  if (bgType === 'checkerboard') {
    let checkerSize = 4;
    for (let x = margin; x < width - margin; x += checkerSize) {
      for (let y = margin; y < height - margin; y += checkerSize) {
        fill(random(colorsbg));
        rect(x, y, checkerSize, checkerSize);
        fill(random(colorsbg));
        rect(x + checkerSize / 2, y + checkerSize / 2, checkerSize, checkerSize);
      }
    }
  }
}

// Genera formas geométricas básicas
function generateGeometricShapes() {
  let numShapes = int(random(1, 3)); // Menos formas, más contraste
  for (let i = 0; i < numShapes; i++) {
    let shapeType = random(['rect', 'circle']);
    let x = random(margin, width - margin);
    let y = random(margin, height - margin);
    let size = random(50, 500); // Mayor variación de tamaños
    currentColor = random(colors);
    
    fill(currentColor);
    noStroke();
    
    if (shapeType === 'rect') {
      rect(x, y, size*random(1, 3), size*random(1, 3));
    } else {
      ellipse(x, y, size, size);
    }
  }
}

// Genera líneas direccionales (rectas)
function generateDirectionalLines() {
  if (random() > 0.5) return; // 50% de probabilidad de añadir líneas
  
  let lineType = random(['horizontal', 'vertical', 'diagonal']);
  let numLines = int(random(3, 60)); // Menos líneas, más impacto
  stroke(random(colors));
  strokeWeight(random(2, 5)); // Líneas más gruesas
  
  for (let i = 0; i < numLines; i++) {
    let x1 = random(margin, width - margin);
    let y1 = random(margin, height - margin);
    let x2 = random(margin, width - margin);
    let y2 = random(margin, height - margin);
    
    if (lineType === 'horizontal') {
      line(margin, y1, width - margin, y1);
    } else if (lineType === 'vertical') {
      line(x1, margin, x1, height - margin);
    } else {
      // Diagonal
      line(x1, y1, x2, y2);
    }
  }
}

// Genera líneas orgánicas (curvas)
function generateOrganicLines() {
  if (random() > 0.5) return; // 50% de probabilidad de añadir líneas orgánicas
  
  let numLines = int(random(2, 4)); // Pocas líneas, pero más largas
  stroke(random(colors));
  strokeWeight(random(2, 4));
  noFill();
  
  for (let i = 0; i < numLines; i++) {
    beginShape();
    let startX = random(margin, width - margin);
    let startY = random(margin, height - margin);
    curveVertex(startX, startY);
    curveVertex(startX, startY);
    
    for (let j = 0; j < 3; j++) {
      curveVertex(random(margin, width - margin), random(margin, height - margin));
    }
    
    let endX = random(margin, width - margin);
    let endY = random(margin, height - margin);
    curveVertex(endX, endY);
    curveVertex(endX, endY);
    endShape();
  }
}

// Genera un patrón de grilla
function generateGridPattern() {
  if (random() > 0.5) return; // 50% de probabilidad de añadir una grilla
  
  stroke(random(colors));
  strokeWeight(1);
  let gridSize = 20;
  
  for (let x = margin; x < width - margin; x += gridSize) {
    line(x, margin, x, height - margin);
  }
  for (let y = margin; y < height - margin; y += gridSize) {
    line(margin, y, width - margin, y);
  }
}

// Interacción
function mousePressed() {
  generateArt();
}

function keyPressed() {
  if (key === 's' || key === 'S') {
    saveCanvas('geometric_art', 'png');
  }
}
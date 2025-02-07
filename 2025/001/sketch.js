let cellSize = 10; // Tamaño de cada celda de la grilla
let currentColor = 0; // Color actual (negro por defecto)
let isMenuOpen = false; // Estado del menú
let isWalkerActive = false; // Estado del dibujo automático
let colors = [0, '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF']; // Lista de colores
let walkerX, walkerY; // Posición del walker

function setup() {
  createCanvas(windowWidth, windowHeight); // Lienzo del tamaño de la ventana
  background(255); // Fondo blanco
  noStroke();
  drawGrid(); // Dibuja la grilla inicial
  createUI(); // Crea la interfaz de usuario
}

function draw() {
  // Si el mouse está presionado o se está tocando la pantalla
  if (mouseIsPressed && !isMenuOpen) {
    if (isWalkerActive) {
      drawWalker(); // Dibuja automáticamente
    } else {
      fill(currentColor); // Usa el color actual
      let gridX = floor(mouseX / cellSize) * cellSize; // Calcula la posición X en la grilla
      let gridY = floor(mouseY / cellSize) * cellSize; // Calcula la posición Y en la grilla
      rect(gridX, gridY, cellSize, cellSize); // Dibuja un cuadrado en la celda correspondiente
    }
  }
}

function drawGrid() {
  // Dibuja la grilla
  for (let x = 0; x < width; x += cellSize) {
    for (let y = 0; y < height; y += cellSize) {
      noFill(); // Sin relleno
      rect(x, y, cellSize, cellSize); // Dibuja cada celda de la grilla
    }
  }
}

function drawWalker() {
  fill(currentColor); // Usa el color actual
  rect(walkerX, walkerY, cellSize, cellSize); // Dibuja un cuadrado en la posición del walker

  // Mueve el walker aleatoriamente
  walkerX += floor(random(-1, 2)) * cellSize;
  walkerY += floor(random(-1, 2)) * cellSize;

  // Limita el walker dentro del lienzo
  walkerX = constrain(walkerX, 0, width - cellSize);
  walkerY = constrain(walkerY, 0, height - cellSize);
}

function createUI() {
  // Botón de menú hamburguesa
  let menuButton = createButton('☰');
  menuButton.position(10, 10);
  menuButton.style('font-size', '24px');
  menuButton.style('border', 'none');
  menuButton.style('background', 'none');
  menuButton.mousePressed(() => {
    isMenuOpen = !isMenuOpen; // Alternar estado del menú
    document.getElementById('menuModal').style.display = isMenuOpen ? 'block' : 'none';
  });

  // Modal del menú
  let modal = createDiv();
  modal.id('menuModal');
  modal.style('display', 'none');
  modal.style('position', 'fixed');
  modal.style('top', '0');
  modal.style('left', '0');
  modal.style('width', '100%');
  modal.style('height', '100%');
  modal.style('background', 'rgba(0, 0, 0, 0.8)');
  modal.style('color', '#fff');
  modal.style('padding', '20px');
  modal.style('box-sizing', 'border-box');
  modal.style('z-index', '1000');

  // Título del menú
  let title = createElement('h2', 'Opciones');
  title.parent(modal);

  // Selector de tamaño de celda
  let sizeLabel = createElement('label', 'Tamaño de celda:');
  sizeLabel.parent(modal);
  sizeLabel.style('display', 'block');
  sizeLabel.style('margin-bottom', '10px');
  let sizeInput = createInput(cellSize, 'number');
  sizeInput.parent(modal);
  sizeInput.style('display', 'block');
  sizeInput.style('margin-bottom', '20px');
  sizeInput.input(() => {
    cellSize = int(sizeInput.value()); // Actualizar tamaño de celda
    background(255); // Limpiar el fondo
    drawGrid(); // Redibujar la grilla
  });

  // Selector de color
  let colorLabel = createElement('label', 'Color:');
  colorLabel.parent(modal);
  colorLabel.style('display', 'block');
  colorLabel.style('margin-bottom', '10px');
  let colorSelect = createSelect();
  colorSelect.parent(modal);
  colorSelect.style('display', 'block');
  colorSelect.style('margin-bottom', '20px');
  colors.forEach((color, index) => {
    colorSelect.option(`Color ${index + 1}`, color);
  });
  colorSelect.changed(() => {
    currentColor = colorSelect.value(); // Actualizar color actual
  });

  // Botón para activar/desactivar el walker
  let walkerButton = createButton(isWalkerActive ? 'Desactivar Dibujo Automático' : 'Activar Dibujo Automático');
  walkerButton.parent(modal);
  walkerButton.style('display', 'block');
  walkerButton.style('margin-bottom', '20px');
  walkerButton.mousePressed(() => {
    isWalkerActive = !isWalkerActive; // Alternar estado del walker
    walkerButton.html(isWalkerActive ? 'Desactivar Dibujo Automático' : 'Activar Dibujo Automático');
    if (isWalkerActive) {
      walkerX = floor(random(width / cellSize)) * cellSize; // Posición inicial aleatoria
      walkerY = floor(random(height / cellSize)) * cellSize;
    }
  });

  // Botón para exportar en alta definición
  let exportButton = createButton('Exportar en alta definición');
  exportButton.parent(modal);
  exportButton.style('display', 'block');
  exportButton.style('margin-bottom', '20px');
  exportButton.mousePressed(() => {
    exportHighResImage();
  });

  // Botón para cerrar el menú
  let closeButton = createButton('Cerrar');
  closeButton.parent(modal);
  closeButton.style('display', 'block');
  closeButton.mousePressed(() => {
    isMenuOpen = false;
    modal.style('display', 'none');
  });
}

function exportHighResImage() {
  // Crear un lienzo en alta definición (4x el tamaño original)
  let scaleFactor = 4;
  let highResCanvas = createGraphics(width * scaleFactor, height * scaleFactor);
  highResCanvas.background(255);
  highResCanvas.noStroke();

  // Dibujar la grilla en alta definición
  for (let x = 0; x < width; x += cellSize) {
    for (let y = 0; y < height; y += cellSize) {
      let pixelColor = get(x + cellSize / 2, y + cellSize / 2); // Obtener el color del píxel central
      if (pixelColor[0] !== 255 || pixelColor[1] !== 255 || pixelColor[2] !== 255) {
        highResCanvas.fill(pixelColor);
        highResCanvas.rect(x * scaleFactor, y * scaleFactor, cellSize * scaleFactor, cellSize * scaleFactor);
      }
    }
  }

  // Guardar la imagen
  saveCanvas(highResCanvas, 'pixelArt', 'png');
}
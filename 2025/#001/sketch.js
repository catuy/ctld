let cellSize = 10; // Tamaño de cada celda de la grilla
let currentColor = 0; // Color actual (negro por defecto)
let isMenuOpen = false; // Estado del menú
let colors = [0, '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF']; // Lista de colores

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
    fill(currentColor); // Usa el color actual
    let gridX = floor(mouseX / cellSize) * cellSize; // Calcula la posición X en la grilla
    let gridY = floor(mouseY / cellSize) * cellSize; // Calcula la posición Y en la grilla
    rect(gridX, gridY, cellSize, cellSize); // Dibuja un cuadrado en la celda correspondiente
  }
}

function drawGrid() {
  // Dibuja la grilla
//   stroke(200); // Color de las líneas de la grilla
//   strokeWeight(1); // Grosor de las líneas
  for (let x = 0; x < width; x += cellSize) {
    for (let y = 0; y < height; y += cellSize) {
      noFill(); // Sin relleno
      rect(x, y, cellSize, cellSize); // Dibuja cada celda de la grilla
    }
  }
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
//   let sizeLabel = createElement('label', 'Tamaño de celda:');
//   sizeLabel.parent(modal);
  let sizeInput = createInput(cellSize, 'number');
  sizeInput.parent(modal);
  sizeInput.input(() => {
    cellSize = int(sizeInput.value()); // Actualizar tamaño de celda
    background(255); // Limpiar el fondo
    drawGrid(); // Redibujar la grilla
  });

  // Selector de color
  let colorLabel = createElement('label', 'Color:');
  colorLabel.parent(modal);
  let colorSelect = createSelect();
  colorSelect.parent(modal);
  colors.forEach((color, index) => {
    colorSelect.option(`Color ${index + 1}`, color);
  });
  colorSelect.changed(() => {
    currentColor = colorSelect.value(); // Actualizar color actual
  });

  // Botón para exportar en alta definición
  let exportButton = createButton('Exportar en alta definición');
  exportButton.parent(modal);
  exportButton.mousePressed(() => {
    exportHighResImage();
  });

  // Botón para cerrar el menú
  let closeButton = createButton('Cerrar');
  closeButton.parent(modal);
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
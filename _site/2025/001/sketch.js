let cellWidth = 10; // Ancho de cada celda de la grilla
let cellHeight = 10; // Alto de cada celda de la grilla
let currentColor = '#000000'; // Color actual (negro por defecto)
let isMenuOpen = false; // Estado del menú
let isWalkerActive = false; // Estado del dibujo automático
let colors = [
  { name: "Negro", value: '#000000' },
  { name: "Rojo", value: '#FF0000' },
  { name: "Verde", value: '#00FF00' },
  { name: "Azul", value: '#0000FF' },
  { name: "Amarillo", value: '#FFFF00' },
  { name: "Magenta", value: '#FF00FF' },
  { name: "Cian", value: '#00FFFF' },
  { name: "Blanco", value: '#FFFFFF' } // Color blanco para borrar
];
let walkerX, walkerY; // Posición del walker
let walkerAngle; // Ángulo de dirección del walker
let walkerSpeed = 1; // Velocidad del walker (en celdas por fotograma)
let colorIndex = 0; // Índice para la animación del ícono del menú
let margin = 1; // Margen de una unidad de la grilla


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
      let gridX = floor(mouseX / cellWidth) * cellWidth; // Calcula la posición X en la grilla
      let gridY = floor(mouseY / cellHeight) * cellHeight; // Calcula la posición Y en la grilla

      // Aplicar margen
      if (
        gridX >= cellWidth * margin &&
        gridX <= width - cellWidth * (margin + 1) &&
        gridY >= cellHeight * margin &&
        gridY <= height - cellHeight * (margin + 1)
      ) {
        rect(gridX, gridY, cellWidth, cellHeight); // Dibuja un cuadrado en la celda correspondiente
      }
    }
  }

  // Animación del ícono del menú
  animateMenuIcon();
}

function drawGrid() {
  // Dibuja la grilla sin borrar el contenido existente
  for (let x = 0; x < width; x += cellWidth) {
    for (let y = 0; y < height; y += cellHeight) {
      noFill(); // Sin relleno
      // stroke(200); // Color de la línea de la grilla
      rect(x, y, cellWidth, cellHeight); // Dibuja cada celda de la grilla
    }
  }
}

function drawWalker() {
  fill(currentColor); // Usa el color actual
  rect(walkerX, walkerY, cellWidth, cellHeight); // Dibuja un cuadrado en la posición del walker

  // Calcula la nueva posición basada en el ángulo
  let newX = walkerX + cos(walkerAngle) * cellWidth * walkerSpeed;
  let newY = walkerY + sin(walkerAngle) * cellHeight * walkerSpeed;

  // Si el walker se sale del lienzo, cambia de dirección
  if (
    newX < cellWidth * margin ||
    newX >= width - cellWidth * (margin + 1) ||
    newY < cellHeight * margin ||
    newY >= height - cellHeight * (margin + 1)
  ) {
    walkerAngle = random(TWO_PI); // Cambia a un ángulo aleatorio
    newX = constrain(newX, cellWidth * margin, width - cellWidth * (margin + 1)); // Limita la posición X
    newY = constrain(newY, cellHeight * margin, height - cellHeight * (margin + 1)); // Limita la posición Y
  }

  // Actualiza la posición del walker
  walkerX = newX;
  walkerY = newY;

  // Gira ligeramente el walker para un movimiento más natural
  walkerAngle += random(-0.0, 0.0); // Pequeñas variaciones en el ángulo
}

function createUI() {
  // Botón de menú (cuadrado animado)
  let menuButton = createButton('■');
  menuButton.position(0, 0); // Pegado al borde superior izquierdo
  menuButton.id('menuButton');
  menuButton.style('font-size', '48px'); // Tamaño más grande (x2)
  menuButton.style('border', 'none');
  menuButton.style('background', 'none');
  menuButton.style('color', '#FF0000');
  menuButton.style('padding', '0');
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

  // Selector de tamaño de celda (ancho y alto por separado)
  let sizeLabel = createElement('label', 'Tamaño de celda (ancho x alto):');
  sizeLabel.parent(modal);
  sizeLabel.style('display', 'block');
  sizeLabel.style('margin-bottom', '10px');
  let widthInput = createInput(cellWidth, 'number');
  widthInput.parent(modal);
  widthInput.style('display', 'inline-block');
  widthInput.style('margin-right', '10px');
  widthInput.input(() => {
    cellWidth = int(widthInput.value()); // Actualizar ancho de celda
    drawGrid(); // Redibujar la grilla
  });
  let heightInput = createInput(cellHeight, 'number');
  heightInput.parent(modal);
  heightInput.style('display', 'inline-block');
  heightInput.input(() => {
    cellHeight = int(heightInput.value()); // Actualizar alto de celda
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
  colors.forEach((color) => {
    colorSelect.option(color.name, color.value);
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
      walkerX = floor(random(width / cellWidth)) * cellWidth; // Posición inicial aleatoria
      walkerY = floor(random(height / cellHeight)) * cellHeight;
      walkerAngle = random(TWO_PI); // Ángulo inicial aleatorio
    }
  });

  // Botón para borrar el canvas
  let clearButton = createButton('Borrar Canvas');
  clearButton.parent(modal);
  clearButton.style('display', 'block');
  clearButton.style('margin-bottom', '20px');
  clearButton.mousePressed(() => {
    background(255); // Limpiar el fondo
    drawGrid(); // Redibujar la grilla
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
  for (let x = cellWidth * margin; x < width - cellWidth * margin; x += cellWidth) {
    for (let y = cellHeight * margin; y < height - cellHeight * margin; y += cellHeight) {
      let pixelColor = get(x + cellWidth / 2, y + cellHeight / 2); // Obtener el color del píxel central
      if (pixelColor[0] !== 255 || pixelColor[1] !== 255 || pixelColor[2] !== 255) {
        highResCanvas.fill(pixelColor);
        highResCanvas.rect(x * scaleFactor, y * scaleFactor, cellWidth * scaleFactor, cellHeight * scaleFactor);
      }
    }
  }

  // Guardar la imagen
  saveCanvas(highResCanvas, 'pixelArt', 'png');
}

// Animación del ícono del menú
function animateMenuIcon() {
  if (frameCount % 5 === 0) { // Cambia el color cada 5 fotogramas
    colorIndex = (colorIndex + 1) % colors.length;
    let menuButton = document.getElementById('menuButton');
    if (menuButton) {
      menuButton.style.color = colors[colorIndex].value;
    }
  }
}

// Evitar que el canvas gire en dispositivos móviles
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  drawGrid();
}
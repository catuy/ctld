let cellWidth = 10; // Ancho de cada celda de la grilla
let cellHeight = 10; // Alto de cada celda de la grilla
let currentColor = '#000000'; // Color actual (negro por defecto)
let isMenuOpen = false; // Estado del menú
let margin = 1; // Margen de una unidad de la grilla
let colorIndex = 0; // Índice para la animación del ícono del menú

// Colores básicos y secundarios para las líneas
let colors = [
  { name: "Negro", value: '#000000' },
  { name: "Rojo", value: '#FF0000' },
  { name: "Verde", value: '#00FF00' },
  { name: "Azul", value: '#0000FF' },
  { name: "Amarillo", value: '#FFFF00' },
  { name: "Magenta", value: '#FF00FF' },
  { name: "Cian", value: '#00FFFF' },
  { name: "Naranja", value: '#FF8000' },
  { name: "Verde Azulado", value: '#008080' },
  { name: "Púrpura", value: '#800080' },
  { name: "Marrón", value: '#8B4513' }
];

// Configuración de líneas
let numLines = 15; // Número de líneas a dibujar
let lineWidth = 25; // Ancho fijo de línea
let lineType = 'straight'; // Tipo de línea (recta/curva)
let minNodes = 1; // Mínimo número de nodos/quiebres por línea
let maxNodes = 3; // Máximo número de nodos/quiebres por línea
let minLineLength = 100; // Longitud mínima de segmento de línea
let maxLineLength = 300; // Longitud máxima de segmento de línea
let linesList = []; // Array para almacenar las líneas generadas

function setup() {
  createCanvas(windowWidth, windowHeight); // Lienzo del tamaño de la ventana
  background(248, 248, 240); // Fondo ligeramente hueso para más calidez
  createUI(); // Crea la interfaz de usuario
  generateLines(); // Genera composición inicial
  drawAllLines(); // Dibuja las líneas
}

function draw() {
  // Solo para la animación del menú, no redibujamos todo constantemente
  animateMenuIcon();
}

// Función para generar líneas aleatorias con nodos
function generateLines() {
  linesList = []; // Reinicia el array de líneas
  
  // Añadir algunas líneas estructurales (como en la imagen de referencia)
  addStructuralLines();
  
  // Añadir líneas coloridas con nodos
  for (let i = 0; i < numLines; i++) {
    // Selecciona un color aleatorio del array, excepto el negro (primer color)
    let colorIndex = floor(random(1, colors.length));
    
    // Determinar número aleatorio de nodos para esta línea
    let nodeCount = floor(random(minNodes, maxNodes + 1));
    
    // Crear puntos para esta línea (inicial, nodos intermedios, final)
    let points = [];
    
    // Margen de seguridad: 10% del ancho/alto del canvas y considerando el ancho de línea
    let marginX = max(width * 0.1, lineWidth / 2 + 5);
    let marginY = max(height * 0.1, lineWidth / 2 + 5);
    
    // Punto inicial (respetando el margen de seguridad)
    let startX = random(marginX, width - marginX);
    let startY = random(marginY, height - marginY);
    points.push({x: startX, y: startY});
    
    // Puntos intermedios (nodos)
    for (let n = 0; n < nodeCount; n++) {
      // El siguiente punto es relativo al anterior, con longitud controlada
      let prevPoint = points[points.length - 1];
      
      // Generar una longitud aleatoria dentro del rango especificado
      let segmentLength = random(minLineLength, maxLineLength);
      
      // Generar un ángulo aleatorio
      let angle = random(TWO_PI);
      
      // Calcular el siguiente punto basado en la longitud y ángulo
      let nextX = prevPoint.x + cos(angle) * segmentLength;
      let nextY = prevPoint.y + sin(angle) * segmentLength;
      
      // Asegurarnos que los puntos estén dentro del canvas respetando el margen de seguridad
      nextX = constrain(nextX, marginX, width - marginX);
      nextY = constrain(nextY, marginY, height - marginY);
      
      points.push({x: nextX, y: nextY});
    }
    
    // Agrega la línea con nodos al array
    linesList.push({
      points: points,
      color: colors[colorIndex].value,
      weight: lineWidth
    });
  }
}

// Añadir algunas líneas estructurales con posiciones aleatorias
function addStructuralLines() {
  // Margen de seguridad: 10% del ancho/alto del canvas y considerando el ancho de línea
  let blackLineWidth = lineWidth * 1.2;
  let marginXBlack = max(width * 0.1, blackLineWidth / 2 + 5);
  let marginYBlack = max(height * 0.1, blackLineWidth / 2 + 5);
  
  // Línea principal negra con nodos en posiciones aleatorias
  let mainLinePoints = [];
  
  // Punto inicial
  let startX = random(marginXBlack, width * 0.4);
  let startY = random(marginYBlack, height * 0.3);
  mainLinePoints.push({x: startX, y: startY});
  
  // Generar puntos con longitudes controladas
  for (let i = 0; i < 2; i++) {
    let prevPoint = mainLinePoints[mainLinePoints.length - 1];
    let segmentLength = random(minLineLength * 1.2, maxLineLength * 1.2); // Líneas estructurales un poco más largas
    let angle = random(TWO_PI);
    
    let nextX = prevPoint.x + cos(angle) * segmentLength;
    let nextY = prevPoint.y + sin(angle) * segmentLength;
    
    // Asegurarnos que los puntos estén dentro del canvas
    nextX = constrain(nextX, marginXBlack, width - marginXBlack);
    nextY = constrain(nextY, marginYBlack, height - marginYBlack);
    
    mainLinePoints.push({x: nextX, y: nextY});
  }
  
  linesList.push({
    points: mainLinePoints,
    color: '#000000',
    weight: blackLineWidth
  });
  
  // Margen para la línea amarilla
  let marginXYellow = max(width * 0.1, lineWidth / 2 + 5);
  let marginYYellow = max(height * 0.1, lineWidth / 2 + 5);
  
  // Línea amarilla con nodos en posiciones aleatorias
  let yellowLinePoints = [];
  
  // Punto inicial
  startX = random(marginXYellow, width * 0.4);
  startY = random(marginYYellow, height * 0.4);
  yellowLinePoints.push({x: startX, y: startY});
  
  // Generar puntos con longitudes controladas
  for (let i = 0; i < 2; i++) {
    let prevPoint = yellowLinePoints[yellowLinePoints.length - 1];
    let segmentLength = random(minLineLength, maxLineLength);
    let angle = random(TWO_PI);
    
    let nextX = prevPoint.x + cos(angle) * segmentLength;
    let nextY = prevPoint.y + sin(angle) * segmentLength;
    
    // Asegurarnos que los puntos estén dentro del canvas
    nextX = constrain(nextX, marginXYellow, width - marginXYellow);
    nextY = constrain(nextY, marginYYellow, height - marginYYellow);
    
    yellowLinePoints.push({x: nextX, y: nextY});
  }
  
  linesList.push({
    points: yellowLinePoints,
    color: '#FFFF00',
    weight: lineWidth
  });
}

// Función para dibujar todas las líneas con nodos
function drawAllLines() {
  background(248, 248, 240); // Fondo ligeramente hueso
  
  // Dibuja todas las líneas con sus nodos
  for (let i = 0; i < linesList.length; i++) {
    let l = linesList[i];
    stroke(l.color);
    strokeWeight(l.weight);
    strokeCap(PROJECT); // Cambiado de SQUARE a PROJECT para mejor unión en los ángulos
    noFill(); // Eliminar el relleno para que las formas no tengan color de fondo
    
    // Dibujar línea recta o curva según el tipo seleccionado
    beginShape();
    for (let p = 0; p < l.points.length; p++) {
      if (lineType === 'curved' && p > 0 && p < l.points.length - 1) {
        curveVertex(l.points[p].x, l.points[p].y);
      } else {
        vertex(l.points[p].x, l.points[p].y);
      }
    }
    endShape();
  }
}

function mousePressed() {
  // Si se hace clic y el menú no está abierto, regenera las líneas
  if (!isMenuOpen && mouseX > 50 && mouseY > 50) {
    generateLines();
    drawAllLines();
    return false; // Prevenir comportamiento por defecto
  }
  return true;
}

function createUI() {
  // Botón de menú (cuadrado animado)
  let menuButton = createButton('■');
  menuButton.position(10, 10); // Pequeño ajuste para no estar pegado al borde
  menuButton.id('menuButton');
  menuButton.style('font-size', '48px');
  menuButton.style('border', 'none');
  menuButton.style('background', 'none');
  menuButton.style('color', '#FF0000');
  menuButton.style('padding', '0');
  menuButton.style('cursor', 'pointer');
  menuButton.style('z-index', '1001'); // Asegurar que esté por encima del modal
  menuButton.mousePressed(() => {
    isMenuOpen = !isMenuOpen; // Alternar estado del menú
    document.getElementById('menuModal').style.display = isMenuOpen ? 'flex' : 'none';
  });

  // Modal del menú con scroll
  let modal = createDiv();
  modal.id('menuModal');
  modal.style('display', 'none');
  modal.style('position', 'fixed');
  modal.style('top', '0');
  modal.style('left', '0');
  modal.style('width', '100%');
  modal.style('height', '100%');
  modal.style('background', 'rgba(0, 0, 0, 0.85)');
  modal.style('color', '#fff');
  modal.style('box-sizing', 'border-box');
  modal.style('z-index', '1000');
  modal.style('justify-content', 'center');
  modal.style('align-items', 'center');
  
  // Contenedor del contenido del menú
  let menuContent = createDiv();
  menuContent.id('menuContent');
  menuContent.parent(modal);
  menuContent.style('width', '90%');
  menuContent.style('max-width', '600px'); // Ampliado para acomodar dos columnas
  menuContent.style('background', 'rgba(30, 30, 30, 0.95)');
  menuContent.style('border-radius', '10px');
  menuContent.style('padding', '15px'); // Reducido para más compacto
  menuContent.style('box-shadow', '0 0 20px rgba(0, 0, 0, 0.5)');

  // Título del menú
  let title = createElement('h2', 'Opciones de Composición');
  title.parent(menuContent);
  title.style('text-align', 'center');
  title.style('margin-top', '0');
  title.style('color', '#f0f0f0');
  title.style('font-size', '18px'); // Reducido para más compacto
  title.style('margin-bottom', '10px'); // Reducido para más compacto
  title.style('border-bottom', '1px solid #444');
  title.style('padding-bottom', '8px'); // Reducido para más compacto

  // Crear un contenedor para los controles en dos columnas
  let controlsContainer = createDiv();
  controlsContainer.parent(menuContent);

  // Dropdown para tipo de línea
  let lineTypeControl = createDiv();
  lineTypeControl.parent(controlsContainer);
  lineTypeControl.style('grid-column', '1 / span 2');
  
  let lineTypeLabel = createElement('label', 'Tipo de línea:');
  lineTypeLabel.parent(lineTypeControl);
  lineTypeLabel.style('color', '#ddd');
  lineTypeLabel.style('font-size', '12px');
  
  let lineTypeSelect = createSelect();
  lineTypeSelect.parent(lineTypeControl);
  lineTypeSelect.option('Straight');
  lineTypeSelect.option('Curved');
  lineTypeSelect.selected(lineType);
  lineTypeSelect.style('width', '100%');
  lineTypeSelect.style('padding', '6px');
  lineTypeSelect.style('border', '1px solid #555');
  lineTypeSelect.style('border-radius', '4px');
  lineTypeSelect.style('background', '#333');
  lineTypeSelect.style('color', '#fff');
  lineTypeSelect.style('font-size', '12px');
  lineTypeSelect.input(() => {
    lineType = lineTypeSelect.value().toLowerCase();
  });
  controlsContainer.style('display', 'grid');
  controlsContainer.style('grid-template-columns', '1fr 1fr'); // Dos columnas
  controlsContainer.style('gap', '8px'); // Reducido para más compacto
  controlsContainer.style('margin-bottom', '10px'); // Reducido para más compacto
  
  // Función para crear un control con label e input
  function createControl(labelText, inputValue, inputType, parentEl, inputId, onChange) {
    let controlGroup = createDiv();
    controlGroup.parent(parentEl);
    controlGroup.style('margin-bottom', '0px'); // Reducido para compactar más
    
    let label = createElement('label', labelText);
    label.parent(controlGroup);
    label.style('display', 'block');
    label.style('margin-bottom', '3px'); // Reducido para más compacto
    label.style('font-weight', 'bold');
    label.style('color', '#ddd');
    label.style('font-size', '12px'); // Reducido para más compacto
    
    let input = createInput(inputValue.toString(), inputType);
    if (inputId) input.id(inputId);
    input.parent(controlGroup);
    input.style('display', 'block');
    input.style('width', '100%');
    input.style('padding', '6px'); // Reducido para más compacto
    input.style('border', '1px solid #555');
    input.style('border-radius', '4px');
    input.style('background', '#333');
    input.style('color', '#fff');
    input.style('font-size', '12px'); // Reducido para más compacto
    input.input(onChange);
    
    return { group: controlGroup, input: input };
  }
  
  // Control de número de líneas
  let linesControl = createControl('Número de líneas:', numLines, 'number', controlsContainer, null, () => {
    numLines = int(linesControl.input.value());
  });
  
  // Control de ancho fijo de línea
  let widthControl = createControl('Ancho de línea:', lineWidth, 'number', controlsContainer, null, () => {
    lineWidth = int(widthControl.input.value());
  });
  
  // Control de nodos mínimos
  let minNodesControl = createControl('Mínimo de nodos por línea:', minNodes, 'number', controlsContainer, 'minNodesInput', () => {
    minNodes = int(minNodesControl.input.value());
    // Asegurar que minNodes no sea mayor que maxNodes
    if (minNodes > maxNodes) {
      maxNodes = minNodes;
      document.getElementById('maxNodesInput').value = maxNodes;
    }
  });
  
  // Control de nodos máximos
  let maxNodesControl = createControl('Máximo de nodos por línea:', maxNodes, 'number', controlsContainer, 'maxNodesInput', () => {
    maxNodes = int(maxNodesControl.input.value());
    // Asegurar que maxNodes no sea menor que minNodes
    if (maxNodes < minNodes) {
      minNodes = maxNodes;
      document.getElementById('minNodesInput').value = minNodes;
    }
  });
  
  // Control de longitud mínima de línea
  let minLengthControl = createControl('Longitud mínima de línea:', minLineLength, 'number', controlsContainer, 'minLengthInput', () => {
    minLineLength = int(minLengthControl.input.value());
    // Asegurar que minLineLength no sea mayor que maxLineLength
    if (minLineLength > maxLineLength) {
      maxLineLength = minLineLength;
      document.getElementById('maxLengthInput').value = maxLineLength;
    }
  });
  
  // Control de longitud máxima de línea
  let maxLengthControl = createControl('Longitud máxima de línea:', maxLineLength, 'number', controlsContainer, 'maxLengthInput', () => {
    maxLineLength = int(maxLengthControl.input.value());
    // Asegurar que maxLineLength no sea menor que minLineLength
    if (maxLineLength < minLineLength) {
      minLineLength = maxLineLength;
      document.getElementById('minLengthInput').value = minLineLength;
    }
  });
  
  // Contenedor para los botones
  let buttonsContainer = createDiv();
  buttonsContainer.parent(menuContent);
  buttonsContainer.style('display', 'grid');
  buttonsContainer.style('grid-template-columns', '1fr 1fr'); // Dos columnas para botones
  buttonsContainer.style('gap', '8px'); // Reducido para más compacto
  buttonsContainer.style('margin-top', '10px'); // Reducido para más compacto
  
  // Función para crear botones estilizados
  function createStyledButton(text, parentEl, onClick, primaryStyle = false) {
    let button = createButton(text);
    button.parent(parentEl);
    button.style('display', 'block');
    button.style('width', '100%');
    button.style('padding', '8px'); // Reducido para más compacto
    button.style('border', 'none');
    button.style('border-radius', '5px');
    button.style('cursor', 'pointer');
    button.style('font-size', '12px'); // Reducido para más compacto
    button.style('font-weight', 'bold');
    button.style('transition', 'all 0.2s ease');
    
    if (primaryStyle) {
      button.style('background', '#4CAF50');
      button.style('color', 'white');
    } else {
      button.style('background', '#555');
      button.style('color', '#eee');
    }
    
    button.mouseOver(() => {
      if (primaryStyle) {
        button.style('background', '#45a049');
      } else {
        button.style('background', '#666');
      }
    });
    
    button.mouseOut(() => {
      if (primaryStyle) {
        button.style('background', '#4CAF50');
      } else {
        button.style('background', '#555');
      }
    });
    
    button.mousePressed(onClick);
    return button;
  }

  // Botón para generar nueva composición (ocupa toda la fila)
  let newButtonContainer = createDiv();
  newButtonContainer.parent(menuContent);
  newButtonContainer.style('grid-column', '1 / span 2');
  newButtonContainer.style('margin-bottom', '8px');
  
  let newButton = createStyledButton('Generar Nueva Composición', newButtonContainer, () => {
    generateLines();
    drawAllLines();
  }, true);

  // Botón para exportar en alta definición
  let exportButton = createStyledButton('Exportar HD', buttonsContainer, () => {
    exportHighResImage();
  });

  // Botón para cerrar el menú
  let closeButton = createStyledButton('Cerrar', buttonsContainer, () => {
    isMenuOpen = false;
    modal.style('display', 'none');
  });
}

function exportHighResImage() {
  // Crear un lienzo en alta definición (4x el tamaño original)
  let scaleFactor = 4;
  let highResCanvas = createGraphics(width * scaleFactor, height * scaleFactor);
  highResCanvas.background(248, 248, 240);
  
  // Dibujar las líneas en alta definición usando beginShape para evitar fisuras
  for (let i = 0; i < linesList.length; i++) {
    let l = linesList[i];
    
    // Calcular el margen de seguridad: 10% del ancho/alto del canvas y considerando el ancho de línea
    let marginX = max(highResCanvas.width * 0.1, (l.weight * scaleFactor) / 2 + 5 * scaleFactor);
    let marginY = max(highResCanvas.height * 0.1, (l.weight * scaleFactor) / 2 + 5 * scaleFactor);
    
    // Verificar si algún punto está demasiado cerca del borde y ajustarlo si es necesario
    let adjustedPoints = [];
    for (let p = 0; p < l.points.length; p++) {
      let x = l.points[p].x * scaleFactor;
      let y = l.points[p].y * scaleFactor;
      
      // Asegurar que los puntos respeten el margen de seguridad
      x = constrain(x, marginX, highResCanvas.width - marginX);
      y = constrain(y, marginY, highResCanvas.height - marginY);
      
      adjustedPoints.push({x: x, y: y});
    }
    
    highResCanvas.stroke(l.color);
    highResCanvas.strokeWeight(l.weight * scaleFactor);
    highResCanvas.strokeCap(PROJECT); // Cambiado para mejor unión en los ángulos
    highResCanvas.noFill(); // Eliminar el relleno para que las formas no tengan color de fondo
    
    // Usar beginShape() para crear una línea continua sin fisuras
highResCanvas.beginShape();
for (let p = 0; p < adjustedPoints.length; p++) {
  if (lineType === 'curved' && p > 0 && p < adjustedPoints.length - 1) {
    highResCanvas.curveVertex(adjustedPoints[p].x, adjustedPoints[p].y);
  } else {
    highResCanvas.vertex(adjustedPoints[p].x, adjustedPoints[p].y);
  }
}
highResCanvas.endShape();
  }
  
  // Guardar la imagen
  saveCanvas(highResCanvas, 'abstractComposition', 'png');
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
  drawAllLines();
}

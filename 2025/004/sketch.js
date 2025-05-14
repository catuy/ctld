let x, y;
let px, py;
let elipsewidth;
let elipseheight;
let isPaused = true; // Initialize to paused
// Flag to track if we're currently exporting (to prevent multiple exports)
let isExporting = false;
let bgColor = 200; // Store background color
// Factor de escala para la calidad de exportación (por defecto 8x)
let exportQuality = 8;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  background(bgColor);

  x = width / 2;
  y = height / 2;
  px = x;
  py = y;
  elipssewidth = 60;
  elipseheight = 60;

  // Add event listener for the "Guardar" button
  const guardarButton = document.getElementById('guardar');
  guardarButton.addEventListener('click', function() {
    if (!isExporting) {
      saveHighQualityCanvas("myCanvas", "jpg");
    }
  });

  // Add event listener for the "Play" and "Pause" button
  const playPauseButton = document.getElementById('playPause');
  playPauseButton.addEventListener('click', function() {
    isPaused = !isPaused;
    playPauseButton.textContent = isPaused ? 'Pausa' : 'Play';
  });
  
  // Add a "Limpiar" button to clear the canvas
  const limpiarButton = document.createElement('button');
  limpiarButton.textContent = 'Limpiar';
  limpiarButton.addEventListener('click', function() {
    clearCanvas();
  });
  document.getElementById('sidebar').appendChild(limpiarButton);
  
  // Inicializar el valor del control deslizante de calidad
  document.getElementById('exportQuality').value = exportQuality;
  document.getElementById('qualityValue').textContent = exportQuality + 'x';
}

function draw() {
  console.log("Drawing frame...");
  console.log("Canvas width:", width);
  console.log("Canvas height:", height);
  console.log("isPaused:", isPaused);
  
  if (!isPaused) {
    x += (noise(frameCount * 0.01) - 0.5) * 30;
    y += (noise(frameCount * 0.02) - 0.5) * 30;

    if (x > width - elipssewidth) {
      px = x = width / 2;
    }
    if (x < elipssewidth) {
      px = x = width / 2;
    }
    if (y > height - elipseheight) {
      py = y = height / 2;
    }
    if (y < elipseheight) {
      py = y = height / 2;
    }

    let p = get(100, 100, 100, 100);
    p.filter(INVERT);

    // Draw on the main canvas
    image(p, x, y, elipssewidth, elipseheight);
    console.log("Image drawn at position:", x, y);

    imageMode(CENTER);

    px = x;
    py = y;
  }
}

function mousePressed() {
  if (isPaused) {
    px = mouseX;
    py = mouseY;
    // We don't draw anything on mouse press, just record the position
  }
}

function mouseDragged() {
  if (isPaused) {
    let p = get(px, py, 100, 100);
    p.filter(INVERT);

    // Draw on the main canvas
    image(p, mouseX, mouseY, elipssewidth, elipseheight);
    
    px = mouseX;
    py = mouseY;
  }
}

// Function to clear the canvas
function clearCanvas() {
  background(bgColor);
  console.log("Canvas cleared");
}

// Removed mouseClicked function to prevent saving on mouse click
// Removed keyPressed function to prevent saving on key press

function updateRectangleWidth(newWidth) {
  elipssewidth = parseInt(newWidth);
}

function updateRectangleHeight(newHeight) {
  elipseheight = parseInt(newHeight);
}

function updateBackgroundColor(newColor) {
  bgColor = newColor;
  background(bgColor);
}

// Function to update export quality
function updateExportQuality(newQuality) {
  exportQuality = parseInt(newQuality);
  console.log("Export quality set to:", exportQuality + "x");
  
  // Update the display value
  const qualityValue = document.getElementById('qualityValue');
  if (qualityValue) {
    qualityValue.textContent = exportQuality + 'x';
  }
}

// Función para guardar el canvas con alta calidad
function saveHighQualityCanvas(filename, extension) {
  console.log("Iniciando proceso de guardado...");
  console.log("Guardando imagen de alta calidad...");
  console.log("Factor de calidad:", exportQuality + "x");
  
  // Set flag to prevent multiple exports at once
  isExporting = true;
  console.log("Exporting flag set to:", isExporting);
  
  try {
    // Obtener el canvas original
    const canvas = document.getElementById('defaultCanvas0');
    console.log("Canvas element:", canvas);
    console.log("Canvas width:", canvas.width);
    console.log("Canvas height:", canvas.height);
    
    // Verificar si el canvas tiene contenido
    if (canvas.width === 0 || canvas.height === 0) {
      console.error("El canvas está vacío o no tiene dimensiones válidas.");
      throw new Error("El canvas está vacío o no tiene dimensiones válidas.");
    }
    
    console.log("Original canvas dimensions:", canvas.width, "x", canvas.height);
    
    // Crear un canvas temporal con el tamaño escalado según la calidad
    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');
    
    // Establecer dimensiones según el factor de calidad
    tempCanvas.width = canvas.width * exportQuality;
    tempCanvas.height = canvas.height * exportQuality;
    console.log("Temp canvas dimensions:", tempCanvas.width, "x", tempCanvas.height);
    
    // Configurar para mejor calidad
    tempCtx.imageSmoothingEnabled = true;
    tempCtx.imageSmoothingQuality = 'high';
    
    // Dibujar el canvas original en el temporal con el tamaño escalado
    tempCtx.drawImage(
      canvas, 
      0, 0, canvas.width, canvas.height,
      0, 0, tempCanvas.width, tempCanvas.height
    );
    console.log("Dibujo realizado en el canvas temporal");
    
    // Convertir a imagen y descargar
    const link = document.createElement('a');
    link.download = filename + '.' + extension;
    const dataURL = tempCanvas.toDataURL('image/' + extension, 1.0);
    console.log("DataURL del canvas temporal:", dataURL);
    
    // Log the content of the original canvas
    const originalDataURL = canvas.toDataURL('image/' + extension, 1.0);
    console.log("DataURL del canvas original:", originalDataURL);
    
    link.href = dataURL;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    console.log("Imagen guardada exitosamente");
  } catch (error) {
    console.error("Error al guardar la imagen:", error);
    alert("Hubo un problema al guardar la imagen. Intenta con una calidad más baja.");
  } finally {
    // Reset the exporting flag
    isExporting = false;
  }
}

// Make sure the functions are available globally
window.updateRectangleWidth = updateRectangleWidth;
window.updateRectangleHeight = updateRectangleHeight;
window.updateBackgroundColor = updateBackgroundColor;
window.updateExportQuality = updateExportQuality;

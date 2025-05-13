let pg;
let x, y;
let px, py;
let elipssewidth;
let isPaused = true; // Initialize to paused

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  background(200);

  // Create a second canvas for high-quality export
  pg = createGraphics(windowWidth, windowHeight);
  pg.noStroke();
  pg.background(200);

  x = width / 2;
  y = height / 2;
  px = x;
  py = y;
  elipssewidth = 60;
  elipseheight = 60;

  // Add event listener for the "Guardar" button
  const guardarButton = document.getElementById('guardar');
guardarButton.addEventListener('click', function() {
  saveHighQualityImage(pg, "myfile-" + hour() + "" + minute() + "" + second(), "jpg");
});

  // Add event listener for the "Play" and "Pause" button
  const playPauseButton = document.getElementById('playPause');
  playPauseButton.addEventListener('click', function() {
    isPaused = !isPaused;
    playPauseButton.textContent = isPaused ? 'Pausa' : 'Play';
  });
}




function draw() {
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

    // Draw on the high-quality canvas
    pg.image(p, (x / width) * 23622, (y / height) * 23622, (elipssewidth / width) * 23622, (elipseheight / height) * 23622);

    imageMode(CENTER);

    px = x;
    py = y;
  }
}

function mousePressed() {
  if (isPaused) {
    px = mouseX;
    py = mouseY;

    // Set the initial position on the high-quality canvas
    pg.push();
    pg.translate((mouseX / width) * 23622, (mouseY / height) * 23622);
    pg.ellipse(0, 0, elipssewidth, elipseheight);
    pg.pop();
  }
}

function mouseDragged() {
  if (isPaused) {
    let p = get(px, py, 100, 100);
    p.filter(INVERT);

    // Draw on the main canvas
    image(p, mouseX, mouseY, elipssewidth, elipseheight);

    // Draw on the high-quality canvas
    pg.image(p, (mouseX / width) * 23622, (mouseY / height) * 23622, (elipssewidth / width) * 23622, (elipseheight / height) * 23622);

    px = mouseX;
    py = mouseY;
  }
}
// Removed mouseClicked function to prevent saving on mouse click
// Removed keyPressed function to prevent saving on key press

function updateRectangleWidth(newWidth) {
  elipssewidth = parseInt(newWidth);
  pg.background(200); // Clear the high-quality canvas
  draw(); // Redraw on the high-quality canvas with the new width
}

function updateRectangleHeight(newHeight) {
  elipseheight = parseInt(newHeight);
  pg.background(200); // Clear the high-quality canvas
  draw(); // Redraw on the high-quality canvas with the new height
}

function updateBackgroundColor(newColor) {
  background(newColor);
  pg.background(newColor);
}

function saveHighQualityImage(img, filename, extension) {
  console.log("Saving high-quality canvas image:", img, filename, extension);
  save(img, filename, extension);
}

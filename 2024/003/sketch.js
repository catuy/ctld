/*
 * @name Simple Draw
 * @description Touch to draw on the screen using mouseX, mouseY, pmouseX, and pmouseY values.
 */

function setup() {
  // createCanvas(displayWidth, displayHeight, SVG);
  createCanvas(displayWidth, displayHeight);

   // Pick colors randomly
   r = random(255);
   g = random(255);
   b = random(255);
   stokeweight = 100;
  strokeWeight(stokeweight);
  stroke(r,g,b);
}

function touchMoved() {
  stroke(0);
  line(mouseX, mouseY, pmouseX, pmouseY);
  // line(mouseX-stokeweight*2, mouseY-stokeweight*2, pmouseX-stokeweight*2, pmouseY-stokeweight*2);
  // line(mouseX-stokeweight*4, mouseY-stokeweight*4, pmouseX-stokeweight*4, pmouseY-stokeweight*4);
  // line(mouseX-stokeweight*6, mouseY-stokeweight*6, pmouseX-stokeweight*6, pmouseY-stokeweight*6);
  // line(mouseX-stokeweight*8, mouseY-stokeweight*8, pmouseX-stokeweight*8, pmouseY-stokeweight*8);
  // rect(mouseX, mouseY, pmouseX, pmouseY);
  return false;
}
save_canvas = function() {
                save();
            }

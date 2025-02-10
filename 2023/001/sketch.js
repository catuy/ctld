  function setup() {

    createCanvas(displayWidth, displayHeight, SVG);
    background(240);
    fill(40);
    // stroke(40);
  // strokeWeight(40);
    noStroke();
  
    translate(width/2, height/2);
    beginShape();
    for(let i = 0; i < 21; i++) {
      const x = random(50, width-50);
      const y = random(50, height - 150);
      vertex(x, y);
      // curveVertex(x, y);

    }
    // x = x + 3; // increase x by 3.

    endShape();
    // noLoop();
  }
  save_canvas = function() {
    save();
  }
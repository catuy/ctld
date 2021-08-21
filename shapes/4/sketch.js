  
  function setup() {
    let c1 = color('#c3503b');
    let c2 = color('#f3df59');
    let c3 = color('#4278a6');
    let c4 = color('#121213');
    let c5 = color('#fff');
    let strokes;
    createCanvas(displayWidth, displayHeight, SVG);
    strokeWeight(strokes);
    noStroke();
    noFill();
    translate(width/2, height/2);


    for(let r = 0; r < 7; r++) {
      let colors = [c1, c2, c3, c4, c5];
      let color = random(colors);
      let strokes = random(3, 20);
      strokeWeight(strokes);
      // stroke(color);
      fill(color);
      
      beginShape();
    for(let i = 0; i < 14; i++) {
      const x = random(50, width-50);
      const y = random(50, height - 150);
      curveVertex(x, y);
      // vertex(x, y);
    }
    endShape(CLOSE);
  }
    noLoop();
  }
  save_canvas = function() {
    save();
  }
  
  
  function setup() {
    // let c1 = color('yellow');
    // let c2 = color('magenta');
    // let c3 = color('cyan');
    let c4 = 40;

    createCanvas(displayWidth, displayHeight, SVG);
    background(240);
    colorMode(HSB, 1, 1, 1);
    stroke(0.0195, 0.76, 0.82);
    // stroke(40);
    strokeWeight(40);
    // noStroke();
    noFill();
  
    translate(width/2, height/2);


    // ellipse(random(width), random(height), random(50, width-50), random(50, height - 150));


    beginShape();
    for(let i = 0; i < 14; i++) {
      const x = random(50, width-50);
      const y = random(50, height - 150);
      curveVertex(x, y);
    }
    endShape();
    stroke(0.15, 0.80, 0.96);

    beginShape();
    for(let i = 0; i < 14; i++) {
      const x = random(50, width-50);
      const y = random(50, height - 150);
      curveVertex(x, y);
    }
    endShape();
    stroke(0.569, 0.71, 0.67);


    beginShape();
    for(let i = 0; i < 14; i++) {
      const x = random(50, width-50);
      const y = random(50, height - 150);
      curveVertex(x, y);
    }
    endShape();

    stroke(0, 0, 0);
    // noFill();
    // stroke(c4);
    // strokeWeight(40);
    beginShape();
    for(let i = 0; i < 14; i++) {
      const x = random(50, width-50);
      const y = random(50, height - 150);
      curveVertex(x, y);


      // curveVertex(300, y);
      // curveVertex(x, 200);

    }
    endShape();

    
    // noLoop();
  }
  save_canvas = function() {
    save();
  }
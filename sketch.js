var crList = [];
var foList = [];

function setup() {
  width = 1280;
  height = 720;
  createCanvas(width, height);

  for (i = 0; i < 10; i++) {
    crList.push(new Creature(Math.random() * 20, Math.random() * 5, Math.random() * 1280, Math.random() * 720));
  }

  for (i = 0; i < 20; i++) {
    foList.push(new Food());
  }

}

function draw() {
  background(220);
  arrLen = crList.length;

  for (i = 0; i < arrLen - 1; i++) {
    crList[i].draw();
    crList[i].update();

    if (crList[i].isDead) {
      crList.splice(i, 1);
      arrLen -= 1;
    }


    crList[i].edge(width, height);
  }

  for (i = 0; i < arrLen - 1; i++) {
    for (j = i + 1; j < arrLen - 1; j++) {
      if (Math.abs(crList[i].xPOS - crList[j].xPOS < 1) && Math.abs(crList[i].yPOS - crList[j].yPOS < 1)) {
        crList[i].Encounter(crList[j], crList);
      }
    }
  }


}
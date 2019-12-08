var crList = [];
var fList = [];

function setup() {
  width = 0.75*displayWidth;
  height = displayHeight;
  fr = 60
  frameRate(fr);
  createCanvas(width, height);

  for (i = 0; i < 30; i++) {
    crList.push(new Creature(Math.random() * 20, random(75,200), Math.random() * 1280, Math.random() * 720));
  }

  for (i = 0; i < 50; i++) {
    fList.push(new Food());
  }

}

function draw() {
  background(220);
  crLen = crList.length;
  fLen = fList.length;
  

  for (i = 0; i < crList.length; i++) {
    crList[i].draw();
    crList[i].update();

    if (crList[i].isDead) {
      crList.splice(i, 1);
    }

    crList[i].edge(width, height);
  }
  
  
  for (i = 0; i < fLen;i++){
    fList[i].draw();
    fList[i].update(fList);
  
  }
  
  

  for (i = 0; i < crList.length - 1; i++) {
    for (j = i + 1; j < crList.length - 1; j++) {
      if (Math.abs(crList[i].xPOS - crList[j].xPOS < 1) && Math.abs(crList[i].yPOS - crList[j].yPOS < 1)) {
        crList[i].Encounter(crList[j], crList);
      }
    }
  }
  
  for (i = 0; i < crList.length;i++){
    crList[i].cooldown--;
  }
  
  if (fList.length < 25){
    fList.push(new Food());
  }
  
  for (i = 0;i < crList.length;i++){
    for (j = 0;j < fList.length;j++){
      if (dist(crList[i].xPOS,crList[i].yPOS,fList[j].pos.x,fList[j].pos.y) < 0.5*crList[i].size){
        crList[i].eat(fList[j], fList);
        fList.splice(j,1);  
      }
  
    }
  }
  
  if (frameCount % 30 == 0){
    console.log(crList.length);
  }
  
  if(crLen == 0){
    frameCount = -1;
  }
  
}
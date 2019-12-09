var crList = [];
var fList = [];
var amt = 30;

function setup() {
  width = 0.75*displayWidth;
  height = displayHeight;
  fr = 60
  frameRate(fr);
  createCanvas(width, height);

  for (i = 0; i < amt; i++) {
    crList.push(new Creature(random(5,30), random(50,200), random(0,width), random(0,height)));
  }

  for (i = 0; i < 35; i++) {
    fList.push(new Food(width,height));
  }
  
  resetButton = createButton("Reset");
  resetButton.size(0.25*displayWidth,50);
  resetButton.position(width,0);
  resetButton.mousePressed(restart);
  
  

}

function restart(){
  clear();
  crList = [];
  fList = []
  setup();

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
      if (dist(crList[i].xPOS,crList[i].yPOS,crList[j].xPOS,crList[j].yPOS) < (0.5*(crList[i].size+crList[j].size))) {
        crList[i].Encounter(crList[j], crList);
      }
    }
  }
  
  for (i = 0; i < crList.length;i++){
    crList[i].cooldown--;
  }
  
  if (fList.length < 25){
    fList.push(new Food(width,height));
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
  
  if(crList.length == 0){
    setup();
  }
  
}
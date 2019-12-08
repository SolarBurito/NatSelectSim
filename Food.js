class Food{
  constructor(width,height){
    this.pos = new p5.Vector();
    this.pos.set(random(0,width),random(0,height));
    this.eaten = false;
  }
  
  draw(){
    let c = color(50,255,50);
    fill(c);
    square(this.pos.x,this.pos.y, 50);
    c = color(255,255,255);
  }
  
  update(arr){
    if (this.eaten){
      for (i = 0; i < arr.length;i++){
        if (arr.indexOf(i) == this){
          arr.splice(i,1);
        }     
      break;
      }
    }
    
  }
}
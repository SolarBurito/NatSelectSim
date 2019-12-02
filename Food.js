class Food{
  constructor(){
    this.pos = p5.Vector.random2D();
    this.eaten = false;
  }
  
  draw(){
    let c = color(50,255,50);
    fill(c);
    rect(this.pos.x,this.pos.y, 50);
  }
  
  update(){
    if (eaten){
      
    }
  }
}
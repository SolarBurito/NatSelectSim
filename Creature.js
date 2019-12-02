class Creature{

  	constructor(speed_,size_,x,y) {
		this.direction = p5.Vector.random2D();
        this.speed = speed_;
        this.velocity = this.direction.mult(0.5*this.speed)
		this.size = size_;
		this.hunger = Math.log(Math.pow(size_+1, 5));
		this.confidence = Math.pow((Math.pow(speed_, 2)+ Math.pow(size_, 2)),0.5);
		this.lifespan = 1000 + Math.pow(speed_+1, 2) + Math.pow(size_+1, 1.5) + this.hunger/2 + this.confidence;
		this.isDead = false;
		this.timeAlive = 0;
        this.foodEaten = 100;
		this.xPOS = x;
		this.yPOS = y;
		print("Creature born");
	}
  
  	Mate(cr, arr) {		
      if (arr.length < 20){
          let crn = new Creature(this.avg(this.speed,cr.speed),this.avg(this.size,cr.size),this.xPOS+100,this.yPOS+100);
          arr.push(crn);
      }
	}
  
  	Fight (cr) {
		let prowess_1 = this.speed - this.size + 1/2*(this.confidence+this.confidence);
		let prowess_2 = cr.speed - cr.size + 1/2*(cr.confidence+cr.confidence);
		if (prowess_1 > prowess_2) {
			cr.isDead = true;
			return this;
		}else if (prowess_1 == prowess_2) {
			
			rn = Math.random()
			if (rn < 0.5) {
				cr.isDead = true;
				return this;
			}
		}
		this.isDead = true;
        print("Creatures fought and died");
		return cr;
        
	}
  
  	Encounter(cr, arr) {
		let conThresh = Math.abs(this.confidence-cr.confidence);		
		if (conThresh < 1) {
			this.Mate(cr, arr);
		}else if (conThresh >= 1 ) {
			this.Fight(cr);
		}
	}
  
  	avg(x, y) {
		return (x+y)/2;
	}
  
    update(){
      	if (this.foodEaten < this.hunger) {
			this.isDead = true;
            print("Creature starved");
		}
		
		if(this.timeAlive >= this.lifespan) {
			this.isDead = true;
            print("Creature died");
		}
      
        this.xPOS += 0.25*this.velocity.x;
        this.yPOS += 0.25*this.velocity.y;
      
        if (random(0,1) < 0.05){
          this.direction = p5.Vector.random2D();
          this.velocity = this.direction.mult(0.5*this.speed);
        }
      
      this.timeAlive += 1;
      this.foodEaten--;
		
    }
    
    draw(){
      circle(this.xPOS,this.yPOS,this.size*50);
    }
  
    edge(width, height){
      if (this.xPOS < 0){
          this.xPOS = width;
      }
      if (this.xPOS > width){
          this.xPOS = 0;
      }
      if (this.yPOS < 0){
          this.yPOS = height;
      }
      if (this.yPOS > height){
          this.yPOS = 0;
      }

      
    }

}
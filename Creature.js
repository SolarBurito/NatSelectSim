class Creature{

  	constructor(speed_,size_,x,y) {
		this.direction = p5.Vector.random2D();
        this.speed = speed_;
        this.velocity = this.direction.mult(0.5*this.speed)
		this.size = size_;	
		this.confidence = Math.pow((Math.pow(speed_, 2)+ Math.pow(size_, 2)),0.5);
		this.lifespan = 3000 + Math.pow(speed_+1, 2) + Math.pow(size_+1, 1.5) + this.hunger/2 + this.confidence;
		this.hunger = this.lifespan;
        this.isDead = false;
		this.timeAlive = 0;
        this.foodEaten = 100;
		this.xPOS = x;
		this.yPOS = y;
        this.cooldown = 0;
      
        this.red = map(this.confidence,75,200,0,255,true);
        this.green = map(this.size,50,200,0,255,true);
        this.blue = map(this.speed,5,30,0,255,true);
          
      
		print("Creature born");
      
	}
  
  	Mate(cr, arr) {		
      if (this.cooldown < 1 && cr.cooldown < 1 && arr.length < 50){
          let crn = new Creature(this.avg(this.speed,cr.speed),this.avg(this.size,cr.size),this.xPOS+100,this.yPOS+100);
          arr.push(crn);
          this.cooldown += 300;
          cr.cooldown += 300;
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
		if (conThresh < 20) {
			this.Mate(cr, arr);
		}else if (conThresh >= 20 ) {
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
      let c = color(this.red,this.green,this.blue);
      fill(c);
      circle(this.xPOS,this.yPOS,this.size);
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

  
    eat(food, fList){
      food.eaten = true;
      food.update(fList);
      this.foodEaten += 10;
      console.log("Creature Ate");
    }
}
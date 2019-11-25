import java.util.*;

public class Creature {
	private double speed, size, hunger, lifespan, confidence,foodEaten, timeAlive;
	public int xPOS, yPOS;
	private ArrayList<Creature> parents = new ArrayList<Creature>();
	public Boolean isDead;
	
	public double getSpeed() {return speed;}
	public double getSize() {return size;}
	public double getHunger() {return hunger;}
	public double getLifespan() {return lifespan;}
	public double getConfidence() {return confidence;}
	public double getFoodEaten() {return foodEaten;}
	public void setFoodEaten(double food) {foodEaten =+ food;}
	
	public Creature (double speed_, double size_,int x,int y) {
		speed = speed_;
		size = size_;
		hunger = Math.log(Math.pow(size_, 5));
		confidence = Math.pow((Math.pow(speed_, 2)+ Math.pow(size_, 2)),0.5);
		lifespan = Math.pow(speed_, 2) + Math.pow(size, 1.5) + hunger/2 + confidence;
		isDead = false;
		timeAlive = 0;
		xPOS = x;
		yPOS = y;
	}
	
	public Creature (double speed_, double size_, ArrayList<Creature> parents_, int x, int y) {
		speed = speed_;
		size = size_;
		hunger = Math.log(Math.pow(size_, 5));
		confidence = Math.pow((Math.pow(speed_, 2)+ Math.pow(size_, 2)),0.5);
		lifespan = Math.pow(speed_, 2) + Math.pow(size, 1.5) + hunger/2 + confidence;
		parents.add(parents_.get(0));
		parents.add(parents_.get(1));
		isDead = false;
		timeAlive = 0;
		xPOS = x;
		yPOS = y;
	}
	
	public Creature Mate (Creature mom, Creature dad) {		
		ArrayList<Creature> parents_ = new ArrayList<Creature>();
		parents_.add(mom);
		parents_.add(dad);
		return new Creature(avg(mom.speed,dad.speed),avg(mom.size,dad.size),parents_,mom.xPOS,mom.yPOS);
	}
	
	public void update() {
		
		
		
		if (foodEaten < hunger) {
			isDead = true;
		}
		
		if(timeAlive >= lifespan) {
			isDead = true;
		}
	}
	
	public double avg(double x, double y) {
		return (x+y)/2;
	}
	
}
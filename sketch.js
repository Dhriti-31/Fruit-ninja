var PLAY=1;
var END=0;
var gameState=1;

var sword,enemy,fruit, fruitGroup, enemyGroup;

var swordImage,virusImage,fruit1,fruit2,fruit3,fruit4,gameoverImage

function preload(){
  
  swordImage = loadImage("sword.png");
  virusImage = loadAnimation("alien1.png", "alien2.png");
  fruit1 = loadImage("fruit1.png");
  fruit2  = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4  = loadImage("fruit4.png");
  gameoverImage = loadImage("gameover.png");

  sound1 = loadSound("gameover.mp3")
   sound2 = loadSound("knifeSwooshSound.mp3")
}

function setup() {
  createCanvas(600, 600);
  
  //creating sword
   sword=createSprite(40,200,20,20);
  sword.addImage(swordImage);
   sword.scale=0.7
   sword.setCollider("rectangle",0,0,60,90);
   sword.debug =false;
   
   fruitGroup = createGroup();
   enemyGroup = createGroup();
 
  score=0;
 
}

function draw() {
  background("lightblue");
  
  if(gameState===PLAY){
  
    fruits();
    enemy();
      // Move knife with mouse
    sword.y=World.mouseY;
    sword.x=World.mouseX;

    if(fruitGroup.isTouching(sword)){
     fruitGroup.destroyEach();
     sound2.play();
     score = score + 2;
 } 
    else   
    {
    if(enemyGroup.isTouching(sword)) {
     gameState = END;    
       fruitGroup.destroyEach();
       enemyGroup.destroyEach();
       fruitGroup.setVelocityXEach(0);
       enemyGroup.setVelocityXEach(0);
      
      
       sound1.play(); 
         
       sword.addImage(gameoverImage);
        sword.x=300;
        sword.y=300;
        sword.scale=2;
      
        
      } 
  }  
  }
  
  
  drawSprites();
  
  //Display score
  textSize(25);
  text("Score : "+ score,250,50);
}

function fruits(){
  if(World.frameCount%80===0) {
    fruit=createSprite(600,300,20,20);
    fruit.scale= 0.2;
    
    r = Math.round(random(1,4))
    if(r==1) {
      fruit.addImage(fruit1)
    }else if(r==2) {
      fruit.addImage(fruit2)
     }else if(r==3) {
      fruit.addImage(fruit3)
     }else {
      fruit.addImage(fruit4)
     }
    
  fruit.y = Math.round(random(1,300));
    
    fruit.velocityX = -7
    fruit.setLifetime = 400;
    fruitGroup.add(fruit);
  } 
}
   function enemy(){
    if(World.frameCount % 200===0) {
        virus = createSprite(400,200,20,20);
       virus.addAnimation("moving",virusImage)
       virus.y = Math.round(random(100,300))
       virus.velocityX = -8;
       virus.setLifetime = 50;
       
  
      enemyGroup.add(virus);
        }
   }


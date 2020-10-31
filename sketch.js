var PLAY = 1;
var END = 0;
var gameState = PLAY;

var invisibleGround ;

var monkey , monkey_running,monkey_collided;
var banana ,bananaImage,bananaGroup, obstacle, obstacleImage,obstacleGroup;
var FoodGroup, obstacleGroup
var score,survivalTime;

var gameOver,gameOverImage;

var jungle, jungleImage;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  monkey_collided =loadImage("sprite_7.png");
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
   
  
  gameOverImage = loadImage("gameover.png");
  
  jungleImage = loadImage("jungle.jpg");
}



function setup() {
  createCanvas(500, 300);
  
   
  
  jungle = createSprite(200,100);
  jungle.addImage(jungleImage);
  jungle.scale = 0.9;
  
   
  monkey = createSprite(80,250,20,50);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.09;
  
  monkey.setCollider("rectangle",0,0,15,monkey.height);
  monkey.debug = false;
  
 invisibleGround = createSprite(300,295,600,10);
  invisibleGround.visible = false;
  
  obstacleGroup = new Group();
  bananaGroup = new Group();
  
  gameOver = createSprite(250,150,50,20);
  gameOver.addImage(gameOverImage);
     gameOver.scale = 0.1;
  
 
   //scoring system 
  score = 0;
  
  
}


function draw() {
 background(180);
  drawSprites();
  
  if(gameState === PLAY){
    
    monkey.visible= true;
    
    gameOver.visible = false;
    
   jungle.velocityX = -6 ;
    
    
     if (jungle.x < 50){
      jungle.x = jungle.x = 250;
    }
    
    
    //jump when the space key is pressed
    if(keyDown("space")&& monkey.y >= 100) {
        monkey.velocityY = -9;
    }
    
    
  //add gravity
    monkey.velocityY = monkey.velocityY + 0.8;
    
    spawnObstacles();
    spawnBanana()
    
    if(bananaGroup.isTouching(monkey)){
      bananaGroup.destroyEach();
       score= score+2;
       }
    
    
      if(obstacleGroup.isTouching(monkey)){
       monkey.scale -= 0.01
        obstacleGroup.destroyEach();
        bananaGroup.destroyEach();
        
        
        
      // gameState = END; 
    }
  }
   else if (gameState === END) {
    
    monkey.visible = false;
     
     jungle.velocityX=0;
     monkey.velocityY= 0;
     
      //set lifetime of the game objects so that they are never destroyed
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
     
     gameOver.visible = true;
     
     textSize(20);
     fill("red")
     text("Press 'R' to restart",170,200);
     
     obstacleGroup.setVelocityXEach(0);
     bananaGroup.setVelocityXEach(0);  
     
      if(keyDown("r")){
         reset();
       
        
         }
     
   }
   
  
    monkey.collide(invisibleGround);
  
  console.log(frameCount)
   
 
  //add score
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+score,350,50); 
  
  switch(score){
    case 10: monkey.scale = 0.15;
      break;
    case 20 : monkey.scale = 0.21;
      break;
    case 30 : monkey.scale = 0.26;
      break;
    case 40: monkey.scale = 0.31;
  }
   
}

function reset(){
  gameState = PLAY;
  obstacleGroup.destroyEach();
  score = 0;
  
  
}

 function spawnObstacles(){
 if (frameCount % 100 === 0){
     obstacle = createSprite(580,260,10,40);
    obstacle.addImage(obstaceImage);
    obstacle.velocityX = -6 ;
   obstacle.scale= 0.2;
   obstacle.lifetime= 300;
   
   obstacleGroup.add(obstacle)
   
    //adjust the depth
    obstacle.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
 }
}

function spawnBanana() {
  //write code here to spawn the clouds
  if (frameCount % 150 === 0) {
    banana = createSprite(600,0,40,10);
    banana.y = Math.round(random(80,120));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    
     //assign lifetime to the variable
    banana.lifetime = 200;
    
    //adjust the depth
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    //add each cloud to the group
    bananaGroup.add(banana);
  }
}

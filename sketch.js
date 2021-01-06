
var monkey , monkey_running
var banana ,bananaImage
var FoodGroup
var score,obstacle,obstacleGroup,obstacleimage
var gameState = "PLAY"
var bg, bgImage
function preload(){
  bgImage = loadImage("ForestImage.jpg");
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
 //bgimage=loadImage("jungle.jpg");
  obstacleimage=loadImage("obstacle.png");
}




function setup() {
  createCanvas(400,400)
  
 /*bground=createSprite(200,200,400,400);
  bground.shapeColor="cyan";
  bground.velocityX=3;
  bground.addImage("jungle",bgimage);*/
 bg=createSprite(300,300);
  bg.addImage(bgImage);
  bg.scale=3.5;
  
monkey=createSprite(100,400,10,10);
monkey.addAnimation("moving",monkey_running);
monkey.scale=0.1; 
  
ground=createSprite(400,420,900,10);
  //ground.velocityX=-4;
  ground.x=ground.width/2;
  console.log(ground.x);
  ground.visible=false;
  
  FoodGroup=createGroup();
  obstacleGroup=createGroup();
  score=0;
}


function draw() {
background("pink");
  textSize(20);
  stroke("red");
  fill("red");
  if(gameState==="PLAY"){
  if(keyDown("right")){
 monkey.velocityX=4;
  }
  camera.position.x = monkey.x;
  camera.position.y = monkey.y;
  if(keyDown("space")){
    monkey.velocityY=-12;
    }
  if (ground.x < 0){
      ground.x = ground.width/2;
    }
  monkey.velocityY = monkey.velocityY + 0.8;
  monkey.collide(ground);
  if (FoodGroup.isTouching(monkey)){
    score=score+2;
    FoodGroup.destroyEach();
    monkey.scale=monkey.scale+0.01;
  }
  obstacles();
   food();
    if(obstacleGroup.isTouching(monkey)){
      gameState="END"
    }
  }
  if(gameState==="END"){
    text("GAMEOVER",200,200);
    obstacleGroup.destroyEach();
    FoodGroup.destroyEach();
  }
  //obstacles();
drawSprites(); 
  text("SCORE : "+score,50,50);
}
function obstacles(){
  if(frameCount%100===0){
    obstacle=createSprite(600,400,10,10);
    obstacle.addImage(obstacleimage);   
    obstacle.scale=0.1;
    obstacle.velocityX=-2 
    obstacleGroup.add(obstacle);
  }
}
function food(){
  if(frameCount%80===0)
{
 var banana=createSprite(500,165,10,40); 
   banana.y= Math.round(random(120,200));
  banana.velocityX = -3;
  banana.addImage(bananaImage);
  banana.scale=0.1;
  banana.lifetime=200;
  
  FoodGroup.add(banana);
}
}
var canvasimg , backgroundImg;
var op1Group , op1Image;
var op2Group , op2Image;
//var bg = "sprites/star1.jpg";
var ground , groundImage ;
var spaceShip , spaceImg;
var energyGroup , energyImg;

var Play = 1;
var End = 0;

var gameState = Play;

var score = 0;

var GameImg;

function preload(){
    //backgroundImg = loadImage(bg);
    groundImage = loadImage("sprites/123456789.jpeg");
    spaceImg = loadImage("spaceShip.png");
    op1Image = loadImage("fire.png");
    op2Image = loadImage("op2.png");
    energyImg = loadImage("coin123.png");
    GameImg = loadImage("GameOver.png")
  }

function setup(){
    var canvas = createCanvas(displayWidth - 20, displayHeight-30);
    //canvas.x = canvas.width/2;
    //canvas.velocityX = -2;
   // var space1 = createSprite(displayWidth - 20, displayHeight-30);
   // space1.addImage("space",canvasimg);
   // space1.scale = 6;
   ground = createSprite(displayWidth , displayHeight);
   ground.addImage("ground",groundImage);
   ground.y = ground.height /2;
   ground.velocityY = 2;
   ground.scale = 20;
   
   spaceShip = createSprite(displayWidth/2 , displayHeight/1.3);
   spaceShip.addImage("SPACESHIP",spaceImg);
   spaceShip.scale = 2;

   spaceShip.debug = true;

   op1Group = new Group();
   op2Group = new Group();
   energyGroup = new Group();
  }

function draw(){

  if (gameState === Play){
    
    //background(backgroundImg);
    ground.velocityY = 2;
    if (ground.y > 400){
      ground.y = ground.height/2;
    } 
    if(keyDown(RIGHT_ARROW)){
      spaceShip.velocityX = 5;
    }
    if(keyDown(LEFT_ARROW)){
      spaceShip.velocityX = -5;
    }

    edges = createEdgeSprites();

    spaceShip.bounceOff(edges[0]);
    spaceShip.bounceOff(edges[1]);
    
    spawnOp1();
    spawnOp2();
    spawnEnergy();

    if(energyGroup.isTouching(spaceShip)){
      score = score+1;
    }

    if(op1Group.isTouching(spaceShip)){
      gameState = End;
    }

    if(op2Group.isTouching(spaceShip)){
      gameState = End;
    }
  }

  else if (gameState === End){

      ground.velocityY = 0;
      op1Group.setVelocityYEach(0);
      op2Group.setVelocityYEach(0);
      spaceShip.destroy();

      //textSize(20);
      //fill("red");
      //stroke("white");

      //console.log("GAME OVER");

      var GameOver = createSprite(displayWidth/2,displayHeight/2,200,200);
      GameOver.addImage("GameOver",GameImg);

  }
 
    drawSprites();
}

function spawnOp1() {
    if (frameCount % 60 === 0) {
      var op1 = createSprite(200,0,40,10);
      op1.x = Math.round(random(0,displayWidth));
      op1.addImage("op1",op1Image);
      op1.scale = 0.1;
      op1.velocityY = 7;
      
      op1.debug = true;
      op1.lifetime = 200;  
      
      op1Group.add(op1);
    }
}
function spawnOp2() {
    if (frameCount % 200 === 0) {
      var op2 = createSprite(200,0,40,10);
      op2.x = Math.round(random(0,displayWidth));
      op2.addImage("op2",op2Image);
      op2.scale = 3;
      op2.velocityY = 7;
      
      op2.debug = true;
      op2.lifetime = 200;  
      
      op2Group.add(op2);
    }
}
function spawnEnergy() {
    if (frameCount % 300 === 0) {
      var energy = createSprite(200,0,40,10);
      energy.x = Math.round(random(0,displayWidth));
      energy.addImage("coin",energyImg);
      energy.scale = 0.05;
      energy.velocityY = 7;
      
      energy.debug = true;
      energy.lifetime = 200;  
      
      energyGroup.add(energy);
    }
}


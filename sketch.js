var PLAY = 1;
var END =0;
var gameState = PLAY;

var vampire
var space, invisibleSpace, spaceImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3;

var score=0;

var gameOver;

function preload(){
 vampire = loadAnimation("vampire.png");

 spaceImage = loadImage("space.png");

 obstacle1 = loadImage("castle_03.png");
 obstacle2 = loadImage("castle_05.png");
 obstacle3 = loadImage("castle_06.png");

 gameOverImg = loadImage("R.png");


}

function setup() {
 createCanvas(windowWidth,windowHeight)

 space = createSprite(windowWidth,windowHeight);
 space.addImage("space",spaceImage);
 space.x = space.width / 2;
 space.velocityX = -(6 + 3*score/100);

 gameOver = createSprite(300,100);
 gameOver.addImage(gameOverImg);

 gameOver.scale = 0.5;
 gameOver.visible = false;

 invisibleSpace = createSprite(windowWidth, windowHeight, 400, 50);
 invisibleSpace.visible = false;

 obstaclesGroup = new Group();

 score = 0;
}

function draw() {
 background(200);
 text("score :"+ score, 500,50);

  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    space.velocityX = -(6+3*score/100);

    if(keyDown("space") && vampire.y >= 159){
        vampire.velocityY = -12;
    }

    vampire.velocityY = vampire.velocityY + 0.8

    if (space.x < 0){
        space.x = space.width/2;

    }

  

    if(obstaclesGroup.isTouching(vampire)){
        gameState = END;
    }
  }
  else if (gameState === END){
    gameOver.visible = true;

    space.velocityX = 0;
    vampire.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);

    obstaclesGroup.setLifetimeEach(-1);
  }

drawSprites();
}


function spawnObstacles(){
    if(frameCount % 60 === 0) {
        var obstacle = createSprite(600,165,10,40);
        obstacle.velocityX = -(6 + 3*score/100);

        var rand = Math.round(random(1,3));
        switch(rand){
            case 1: obstacle.addImage(obstacle1);
                    break;
            case 2: obstacle.addImage(obstacle2);
                    break;
            case 3: obstacle.addImage(obstacle3);
                    break;
            default: break;
        }

        obstacle.scale = 0.5;
        obstacle.lifetime = 300;
        obstaclesGroup.add(obstacle);
    }
}
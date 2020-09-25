var fighter,fighterImg;
var missile,missileImg;
var coins,coinsImg;
var hearts,heartsImg;
var backgroundImg;
var score = 0;
var gameState = "PLAY";
var coinsGroup;
var missileGroup;

function preload(){
  fighterImg = loadImage("Images/Fighter.png");
  missileImg = loadImage("Images/Missile.png");
  coinsImg = loadImage("Images/Coin.png");
  heartsImg = loadImage("Images/Life.png");
  backgroundImg = loadImage("Images/Background.jpg")
}



function setup() {
  createCanvas(displayWidth-30,displayHeight-50);
 
  fighter = createSprite(displayWidth/2,displayHeight-150, 50, 50);
  fighter.debug = true;
  fighter.setCollider("rectangle",0,0,150,220);
  fighter.addImage(fighterImg);
  fighter.scale = 0.5;
  //missile = createSprite()
  coinsGroup = new Group();
  missileGroup = new Group();
  
}

function draw() {
  background(backgroundImg); 
   textSize(50);
    text("Coins: " + score,displayWidth/-50,displayHeight-550);

   
  if(gameState==="PLAY"){
    spawnMissiles();
    spawnCoins();
    drawSprites();
    if(coinsGroup.isTouching(fighter)){
      coins.remove();
      score++
    }

    if(missileGroup.isTouching(fighter)){
      missile.remove();
      gameState = "END";
    }

    if(keyDown(RIGHT_ARROW)){
      fighter.x = fighter.x + 10;
    }

    if(keyDown(LEFT_ARROW)){
      fighter.x = fighter.x - 10;
    }

    if(keyDown(UP_ARROW)){
      fighter.y = fighter.y - 10;
    }

    if(keyDown(DOWN_ARROW)){
      fighter.y = fighter.y + 10;

    
  }
}

  if(gameState==="END"){
    fighter.visible = false;
    score = 0;
    missileGroup.setVelocityYEach(0);
    coinsGroup.setVelocityYEach(0);
    text(" GAME OVER ",displayWidth/2,displayHeight/2);
    text("PRESS R TO RESTART",displayWidth/2,displayHeight/2-50);
  }
  

}

function spawnMissiles(){
  if(frameCount%50===0){
    missile = createSprite(displayWidth/2-50,0,10,70);
    missile.addImage(missileImg);
    missile.scale = 0.5
    missile.velocityY = 8;
    missile.x = Math.round(random(50,displayWidth));
    missileGroup.add(missile);
  }
}

function spawnCoins(){
  if(frameCount%70===0){
    coins = createSprite(displayWidth/2-50,0,10,10);
    coins.addImage(coinsImg);
    coins.scale = 0.3;
    coins.velocityY = 8;
    coins.x = Math.round(random(50,displayWidth));
    coinsGroup.add(coins);
  }
}
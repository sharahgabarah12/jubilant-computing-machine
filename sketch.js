var space,rocket,juptier,mars;
var spaceImg,rocketImg1,juptierImg,marsImg;
var gameOverImg,juptierCG,marsCG; 

var END =0;
var PLAY =1;
var gameState = PLAY;
//var gameState = END;

var distance=0;
var gameOver, restart;

function preload(){
  spaceImg = loadImage("hd-wallpaper-g0a61a66af_1920.jpg");
 rocketImg1 = loadImage("rocket.png");
  juptierImg = loadImage("juptier.png");
marsImg= loadImage("mars.png");
gameOverImg = loadImage("gameOver.png");
}

function setup(){

  //create the canvas and adjust the window sizes to suit the device 
createCanvas(windowWidth, windowHeight);
  
space=createSprite(width/2,200);
space.addImage(spaceImg);
space.velocityX = -5;

//creating boy running
rocket  = createSprite(170,150);
rocket.addImage(rocketImg1);
rocket.scale=0.4;
  
//set collider for mainCyclist

//rocket.setCollission("rectangle",0,0,40,40);
rocket.setCollider("rectangle",0,0,40,40);
//rocket.setCollission("rectangle",0,0,40,40,50);
//mainCyclist.setCollider("rectangle",0,0,40,40,50);

  
gameOver = createSprite(650,150);
gameOver.addImage(gameOverImg);
gameOver.scale = 0.8;
gameOver.visible = false;  

//createMars();
//createJuptier();

juptierCG=new Group();
marsCG=new Group();
}

function draw() {
  background(0);

  drawSprites();
  textSize(20);
  fill(255);
  text("Distance: "+ distance,900,30);

  if(gameState===PLAY){

   distance = distance + Math.round(getFrameRate()/50);
   space.velocityX = -(6 + 2*distance/150);

   edges= createEdgeSprites();

  //code to reset the background
  if (space.x < 500){
    space.x = width/2,200;
  }
  
  if(keyDown("space")) {

    rocket.velocityY = -10;
  }
  
rocket.velocityY = rocket.velocityY + 0.8;
juptier();
mars();

        //creating continous opponent players

//var select_oppPlayer = Math.round(random(1,2));
      
//if (World.frameCount % 150 == 0) {
 // if (select_oppPlayer == 1) {
  //mars();
//} else {
 //juptier();
 //}
//}

if(marsCG.isTouching(rocket)){
   gameState = END;
}
if(juptierCG.isTouching(rocket)){
gameState = END;
}
if (rocket.isTouching(edges)) {
  gameState = END
} 
} if (gameState === END) {
    gameOver.visible = true;
  
    textSize(20);
    fill(255);
    text("Press Up Arrow to Restart the game!", 500,200);

    space.velocityX = 0;
    rocket.velocityY = 0;

    marsCG.setVelocityXEach(0);
    marsCG.setLifetimeEach(-1);

    juptierCG.setVelocityXEach(0);
    juptierCG.setLifetimeEach(-1);

if(keyDown("UP_ARROW")) {
  reset();
  }
}
}

function mars() {
  if (World.frameCount % 200 == 0) {

    var mars = createSprite(1100,Math.round(random(600, 300),40, 10, 10));
    mars.addImage(marsImg);
  mars.scale=0.5;
  mars.velocityX = -(6 + 2*distance/150);
  mars.lifetime = 400;
  marsCG.add(mars);
  }
}

function juptier() {
  if (World.frameCount % 320 == 0) {
    // Modify the positions of diamonds 
  var juptier = createSprite(1100,Math.round(random(650,500),40, 10, 10));
juptier.addImage(juptierImg);
juptier.scale=0.16;
juptier.velocityX = -(6 + 2*distance/150);
juptier.lifetime = 400;
juptierCG.add(juptier);
}
}

function reset(){
gameState = PLAY;
gameOver.visible = false;
//  mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
rocket.x = 170;
rocket.y = 150;

marsCG.destroyEach();
juptierCG.destroyEach();

distance = 0;
}
//function reset(){
//  gameState = END;
//  gameOver.visible = true;
//  mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
  
//  pinkCG.destroyEach();
//  yellowCG.destroyEach();
//  redCG.destroyEach();
  
//  distance = 50;
// }

var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;

  ghost=createSprite(300,300)
 ghost.addImage(ghostImg) 
 ghost.scale=0.3

 doorsGroup= new Group()
 climbersGroup=new Group()
  invisibleBlockGroup=new Group()
 
}

function draw() {
  background(200);
 if(gameState=="play"){
  if(tower.y > 400){
    tower.y = 300
  }
  spawnDoors()
  ghost.velocityY+=0.5
 
  if(keyDown('left_arrow')){
    ghost.x-=5
  }
  if(keyDown('right_arrow')){
    ghost.x+=5
  }
  if(keyDown('space')){
    ghost.velocityY=-10

  }
  if(climbersGroup.isTouching(ghost)){
    ghost.velocityY=0

  }
  if(invisibleBlockGroup.isTouching(ghost) || ghost.y>600){
  gameState="end"
  }
  drawSprites()

 }
  if (gameState=="end"){
    fill('yellow')
    textSize(30)
    text('Game Over',250,300)
  }
 
  
}
function spawnDoors(){
  if(frameCount%200==0){
    var d=createSprite(random(100,500),-20)
    d.addImage(doorImg)
    d.velocityY=1
    d.lifetime=600
    doorsGroup.add(d)
    var c=createSprite(d.x,40)
    c.addImage(climberImg)
    c.velocityY=1
    c.lifetime=600
    climbersGroup.add(c)
    var i=createSprite(d.x,55,c.width,3)
    i.velocityY=1
    i.lifetime=600
    i.debug=true
    invisibleBlockGroup.add(i)
    ghost.depth=d.depth+1
  }
}

var play = 1;
var end = 0;
var gmstate = play,
  backImage, backg;
var player, player_running;

var ground, ground_img;
var FoodGroup, bananaImage;
var obstaclesGroup, obstacle, obstacle_img;
var gameOver, b, c;
var score = 0;
var banana;


function preload() {
  backImage = loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");
  bananaImage = loadImage("banana.png");
  obstacle_img = loadImage("stone.png");

}

function setup() {
  createCanvas(800, 400);

  backg = createSprite(0, 0, 800, 400);
  backg.addImage(backImage);
  backg.scale = 1.5;
  backg.x = backg.width / 2;


  player = createSprite(100, 340, 20, 50);
  player.addAnimation("Running", player_running);
  player.scale = 0.1;
 // player.debug=true;

  b = createSprite(400, 120, 800, 10);

  b.visible = false;
  //b.debug=true;
  c = createSprite(400, 330, 800, 20);
  c.visible = false;

  ground = createSprite(400, 350, 800, 10);
  ground.velocityX = -4;
  ground.x = ground.width / 2;
  ground.visible = false;

  FoodGroup = new Group();
  obstaclesGroup = new Group();

  score = 0;
}

function draw() {
text("Score: " + score, 500, 50);
  background(255);
 
  if (gmstate === play) {
    backg.velocityX = -4;
    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }
    if (backg.x < 100) {
      backg.x = backg.width / 2;
    }

    if (FoodGroup.isTouching(player)) {
      FoodGroup.destroyEach();
      score = score + 2;
    }
    player.bounceOff(b);

    if (keyDown("space")&&player.isTouching(c)) {
      player.velocityY = -16;
    }
    player.velocityY = player.velocityY + 0.8;

    player.collide(ground);
    spawnFood();
    spawnObstacles();


    if (obstaclesGroup.isTouching(player)) {
      gmstate = end;
    }

    drawSprites();

  }
  if (gmstate === end) {
    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }

    ground.velocityX = 0;
    player.velocityY = 0;
    FoodGroup.setVelocityEach(0);
    obstaclesGroup.setVelocityEach(0);
    banana.lifetime = -1;
    obstacle.lifetime = -1;
    score = 0;
    stroke("white");
    textSize(20);

    text("Game over Press 'R' to restart", 300, 200);
    if (keyDown("r")) {
      gmstate = play;
    }
  }

    stroke("white");
    textSize(20);
    fill("white");
    text("Score: " + score, 500, 50);

}

function spawnFood() {

  if (frameCount % 100 === 0) {
    banana = createSprite(600, 250, 40, 10);
    banana.y = random(120, 200);
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -5;
    banana.lifetime = 300;
    player.depth = banana.depth + 1;
    FoodGroup.add(banana);
  }
}

function spawnObstacles() {
  if (frameCount % 150 === 0) {
    obstacle = createSprite(800, 350, 10, 40);
     //obstacle.debug =true;
    obstacle.setCollider("rectangle", 0, 0, 50, 70);
    obstacle.velocityX = -6;
    obstacle.addImage(obstacle_img);
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
    obstaclesGroup.add(obstacle);
  }
}
var canvasBg = document.getElementById('canvasBg');
var ctxBg = canvasBg.getContext('2d');
var canvasJet = document.getElementById('canvasJet');
var ctxJet = canvasJet.getContext('2d');
var canvasEnemy = document.getElementById('canvasEnemy');
var ctxEnemy = canvasEnemy.getContext('2d');

var jet1 = new Jet();;
var gameWidth = canvasBg.width;
var gameHeight = canvasBg.height;
var isPlaying = false;
var requestAnimFrame = window.requestAnimationFrame ||
                       window.webkitRequestAnimationFrame ||
                       window.mozRequestAnimationFrame ||
                       window.msRequestAnimationFrame ||
                       window.oRequestAnimationFrame;

var enemies = [];
// var spawnAmount = 5;

var imageSprite = new Image();
imageSprite.src = 'images/sprite.png';
imageSprite.addEventListener('load',init,false);



// main functions
function init(){
  spawnEnemy(5);
  drawBg();
  startLoop();
  document.addEventListener('keydown',checkKeyDown,false);
  document.addEventListener('keyup',checkKeyUp,false);
}

function spawnEnemy(n){
  for (var i = 0; i < n; i++) {
    enemies[enemies.length] = new Enemy();
  }

}

function drawAllEnemies(){
  clearCtxEnemy();
  for (var i = 0; i < enemies.length; i++) {
    enemies[i].draw();
  }
}

function loop(){
  if (isPlaying) {
    jet1.draw();
    drawAllEnemies();
    requestAnimFrame(loop);
  }
}

function startLoop() {
  isPlaying = true;
  loop();
}

function stopLoop() {
  isPlaying = false;
}

function drawBg() {
  var srcX = 0;
  var srcY = 0;
  var drawX = 0;
  var drawY = 0;

  ctxBg.drawImage(imageSprite,srcX,srcY,gameWidth,gameHeight,drawX,drawY,gameWidth,gameHeight);
}

function clearCtxBg() {
  ctxBg.clearRect(0,0,gameWidth,gameHeight);
}

// end of main functions





// jet functions
function Jet() {
  this.srcX = 0;
  this.srcY = 500;
  this.width = 128;
  this.height = 61;
  this.speed = 4;
  this.drawX = 200;
  this.drawY = 200;
  this.noseX = this.drawX;
  this.noseY = this.drawY + this.width;
  this.isUpKey = false;
  this.isRightKey = false;
  this.isDownKey = false;
  this.isLeftKey = false;
  this.isSpaceBar = false;
  this.isShooting = false;
  this.bullets = [];
  this.currentBullet = 0;
  for (var i = 0; i < 25; i++) {
    this.bullets[this.bullets.length] = new Bullet();
  }
}

Jet.prototype.draw = function(){
  clearCtxJet();
  this.checkDirection();
  this.noseX = this.drawX + this.width;
  this.noseY = this.drawY + 26;
  this.checkShooting();
  this.drawAllBullets();

  ctxJet.drawImage(imageSprite,this.srcX,this.srcY,this.width,this.height,this.drawX,this.drawY,this.width,this.height);
};


Jet.prototype.checkDirection = function(){
  if (this.isUpKey && this.drawY > 0) {
    this.drawY -= this.speed;
  }
  if (this.isRightKey && this.drawX < (gameWidth - 128)) {
    this.drawX += this.speed;
  }
  if (this.isDownKey && this.drawY < (gameHeight - 75)) {
    this.drawY += this.speed;
  }
  if (this.isLeftKey && this.drawX > 0) {
    this.drawX -= this.speed;
  }
};

function clearCtxJet() {
  ctxJet.clearRect(0,0,gameWidth,gameHeight);
}

Jet.prototype.drawAllBullets = function(){
  for (var i = 0; i < this.bullets.length; i++) {
    if (this.bullets[i].drawX >= 0) this.bullets[i].draw();
    if(this.bullets[i].explosion.hasHit) this.bullets[i].explosion.draw();
  }
};

Jet.prototype.checkShooting = function(){
  if(this.isSpaceBar && !this.isShooting) {
    this.isShooting = true;
    this.bullets[this.currentBullet].fire(this.noseX, this.noseY);
    this.currentBullet++;
    if(this.currentBullet >= this.bullets.length) this.currentBullet = 0;
  } else if(!this.isSpaceBar) {
    this.isShooting = false;
  }
};
// end of jet functions




// enemy functions

function Enemy() {
  this.srcX = 131;
  this.srcY = 500;
  this.width = 128;
  this.height = 78;
  this.speed = 2;
  this.drawX = Math.floor(Math.random() * 1000) + gameWidth;
  this.drawY = Math.floor(Math.random() * 422);
}

Enemy.prototype.draw = function(){
  this.drawX -= this.speed;
  ctxEnemy.drawImage(imageSprite,this.srcX,this.srcY,this.width,this.height,this.drawX,this.drawY,this.width,this.height);
  this.checkEscaped();
};

Enemy.prototype.checkEscaped = function(){
  if (this.drawX + this.width <= 0) {
    this.recycleEnemy();
  }
};

Enemy.prototype.recycleEnemy = function(){
  this.drawX = Math.floor(Math.random() * 1000) + gameWidth;
  this.drawY = Math.floor(Math.random() * 422);
};

function clearCtxEnemy() {
  ctxEnemy.clearRect(0,0,gameWidth,gameHeight);
}

// end of enemy functions

// event functions
function checkKeyDown(e) {
  var keyID = e.keyCode || e.which;
  if (keyID === 38 || keyID === 87) { // up arrow or 'w' key
    jet1.isUpKey = true;
    e.preventDefault();
  }
  if (keyID === 39 || keyID === 68) { // right arrow or 'd' key
    jet1.isRightKey = true;
    e.preventDefault();
  }
  if (keyID === 40 || keyID === 83) { // down arrow or 's' key
    jet1.isDownKey = true;
    e.preventDefault();
  }
  if (keyID === 37 || keyID === 65) { // left arrow or 'a' key
    jet1.isLeftKey = true;
    e.preventDefault();
  }
  if (keyID === 32) { // spacebar
    jet1.isSpaceBar = true;
    e.preventDefault();
  }
}

function checkKeyUp(e) {
  var keyID = e.keyCode || e.which;
  if (keyID === 38 || keyID === 87) { // up arrow or 'w' key
    jet1.isUpKey = false;
    e.preventDefault();
  }
  if (keyID === 39 || keyID === 68) { // right arrow or 'd' key
    jet1.isRightKey = false;
    e.preventDefault();
  }
  if (keyID === 40 || keyID === 83) { // down arrow or 's' key
    jet1.isDownKey = false;
    e.preventDefault();
  }
  if (keyID === 37 || keyID === 65) { // left arrow or 'a' key
    jet1.isLeftKey = false;
    e.preventDefault();
  }
  if (keyID === 32) { // spacebar
    jet1.isSpaceBar = false;
    e.preventDefault();
  }
}

// end of event functions


// bullet functions

function Bullet() {
  this.srcX = 331;
  this.srcY = 500;
  this.drawX = -20;
  this.drawY = 0;
  this.width = 16;
  this.height = 14;
  this.explosion = new Explosion();
}

Bullet.prototype.draw = function(){
  this.drawX += 10;
  ctxJet.drawImage(imageSprite,this.srcX,this.srcY,this.width,this.height,this.drawX,this.drawY,this.width,this.height);
  this.checkHitEnemy();
  if (this.drawX > gameWidth) this.recycle;
};


Bullet.prototype.fire = function(startX, startY){
  this.drawX = startX;
  this.drawY = startY;
};

Bullet.prototype.checkHitEnemy = function(){
  for (var i = 0; i < enemies.length; i++) {
    if(this.drawX >= enemies[i].drawX &&
       this.drawX <= enemies[i].drawX + enemies[i].width &&
       this.drawY >= enemies[i].drawY &&
       this.drawY <= enemies[i].drawY + enemies[i].height) {
          this.explosion.drawX = enemies[i].drawX - (this.explosion.width / 2);
          this.explosion.drawY = enemies[i].drawY;
          this.explosion.hasHit = true;
          this.recycle();
          enemies[i].recycleEnemy();
    }
  }
};

Bullet.prototype.recycle = function(){
  this.drawX = -20;
};
// end of bullet functions


// explosion functions

function Explosion() {
  this.srcX = 259;
  this.srcY = 500;
  this.drawX = 0;
  this.drawY = 0;
  this.width = 72;
  this.height = 72;
  this.currentFrame = 0;
  this.totalFrames = 10;
  this.hasHit = false;
}

Explosion.prototype.draw = function(){
  if(this.currentFrame <= this.totalFrames) {
    ctxJet.drawImage(imageSprite,this.srcX,this.srcY,this.width,this.height,this.drawX,this.drawY,this.width,this.height);
    this.currentFrame++;
  } else {
    this.hasHit = false;
    this.currentFrame = 0;
  }
};

// end of explosion functions
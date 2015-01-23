var canvasBg = document.getElementById('canvasBg');
var ctxBg = canvasBg.getContext('2d');
var canvasJet = document.getElementById('canvasJet');
var ctxJet = canvasJet.getContext('2d');
var jet1;
var gameWidth = canvasBg.width;
var gameHeight = canvasBg.height;
var fps = 10;
var drawInterval;

var imageSprite = new Image();
imageSprite.src = 'images/sprite.png';
imageSprite.addEventListener('load',init,false);



// main functions
function init(){
  drawBg();
  startDrawing();
  jet1 = new Jet();
  document.addEventListener('keydown',checkKeyDown,false);
  document.addEventListener('keyup',checkKeyUp,false);
}

function draw(){
  jet1.draw();
}

function startDrawing(){
  stopDrawing();
  drawInterval = setInterval(draw,fps);
}

function stopDrawing(){
  clearInterval(drawInterval);
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
  this.srcX = 800;
  this.srcY = 78;
  this.drawX = 200;
  this.drawY = 200;
  this.width = 128;
  this.height = 75;
  this.speed = 2;
  this.isUpKey = false;
  this.isRightKey = false;
  this.isDownKey = false;
  this.isLeftKey = false;
}

Jet.prototype.draw = function(){
  clearCtxJet();
  this.checkKeys();
  ctxJet.drawImage(imageSprite,this.srcX,this.srcY,this.width,this.height,this.drawX,this.drawY,this.width,this.height);
};

Jet.prototype.checkKeys = function(){
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

// end of jet functions





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
}

// end of event functions
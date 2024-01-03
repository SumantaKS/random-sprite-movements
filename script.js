"use strict";
/** @type {HTMLCanvasElement} */ //to display canvas methods in vscode

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
const canvasWidth = (canvas.width = 500);
const canvasHeight = (canvas.height = 1000);
let gameFrame = 0;

class Enemy {
  constructor() {
    this.enemyImg = new Image();
    this.enemyImg.src = "img/enemy4.png";
    this.enemyWidth = 213;
    this.enemyHeight = 213;
    this.width = this.enemyWidth / 2;
    this.height = this.enemyHeight / 2;
    this.x = Math.random() * (canvasWidth - this.width);
    this.y = Math.random() * (canvasHeight - this.height);
    this.newX = Math.random() * (canvasWidth - this.width);
    this.newY = Math.random() * (canvasHeight - this.height);
    this.speed = Math.random() * 4 + 1;
    this.enemyFrame = 0;
    this.flapSpeed = Math.floor(Math.random() * 3 + 1); //this ensures each enemy has different flap speed
    this.newGameFrame = Math.floor(Math.random() * 200 + 50); //to make each enemy move independently
  }
  resetFrame() {
    // this.x = 0;
    // this.y = 0;
    //every newGameFrame'th frame resetFrame() is implemented
    //we get new x and y positions every newGameFrame'th frame
    if (gameFrame % this.newGameFrame === 0) {
      this.newX = Math.random() * (canvasWidth - this.width);
      this.newY = Math.random() * (canvasHeight - this.height);
    }
    //now we need to move the sprite from x to newX
    let dx = this.x - this.newX;
    let dy = this.y - this.newY;
    this.x -= dx / 70; //current position is moving to new postion at 70th of the distance every animation frame. Play with this number to increase or decrese speed
    this.y -= dy / 70;
    if (this.x + this.width < 0) this.x = canvasWidth; //infinite right to left movement
    if (gameFrame % this.flapSpeed === 0) {
      this.enemyFrame >= 5 ? (this.enemyFrame = 0) : this.enemyFrame++;
    }
  }
  draw() {
    ctx.drawImage(
      this.enemyImg,
      this.enemyFrame * this.enemyWidth,
      0,
      this.enemyWidth,
      this.enemyHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}

const enemyCount = 10;
const enemies = [];
for (let i = 0; i < enemyCount; i++) {
  enemies.push(new Enemy());
}

function animate() {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  enemies.forEach((enemy) => {
    enemy.resetFrame();
    enemy.draw();
  });
  gameFrame++;
  requestAnimationFrame(animate);
}

animate();

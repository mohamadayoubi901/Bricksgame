var keysDown = {};

addEventListener("keydown", function (e) {
  keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
  delete keysDown[e.keyCode];
}, false);

class pad1 extends Sprite {

  draw(ctx) {
    //draw padle
    ctx.beginPath();
    ctx.rect(this.x, this.y,this.w,this.h);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.stroke();
  }
  update() {
    //move the padle with "A" and "D"
    if (65 in keysDown && this.x > 0) {
      this.x -= 1 * this.speed;
    }
    if (68 in keysDown && this.x + 120 < Bricksgame.cw) {
      this.x += 1 * this.speed;
    }

  }
};
class bricks extends Sprite {

  draw(ctx) {
    //draw the brick
    if (!this.case) {
      ctx.beginPath();
      ctx.rect(this.x, this.y, this.w, this.h);
      ctx.fillStyle = 'red';
      ctx.fill();
      ctx.stroke();
    }

  }
  update() {
    if (!this.case) {
      //check if the ball hit the brick
      if (Ball1.x + Ball1.w < this.x + this.w && Ball1.X + Ball1.w > this.x || Ball1.x - Ball1.w  < this.x + this.w && Ball1.x - Ball1.w > this.x) {

        if (Ball1.y + Ball1.h  > this.y && Ball1.y + Ball1.h < (this.y + this.h) || Ball1.y - Ball1.h > this.y && Ball1.y - Ball1.h < (this.y + this.h)) {
          // check if the ball hit the left of the brick
          if (Ball1.x + Ball1.w < (this.x + this.w / 2)) {
            //reflect the ball and increse score and remove brick
            Ball1.velocityX = -1 + Math.sin(-45);
            Ball1.velocityY = -Ball1.velocityY;
            Ball1.speed += 0.03;
            this.case = true;
            score1.index += 100;
          }
          //check if the pable touch the right of the brick
          if (Ball1.x + Ball1.w > (this.x + this.w / 2)) {
            //reflect the ball and increse score and remove brick
            Ball1.velocityX = 1 + Math.sin(45);
            Ball1.velocityY = -Ball1.velocityY;
            Ball1.speed += 0.03;
            this.case = true;
            score1.index += 100;
          }
        }

      }
    }
  }

};

class ball extends Sprite {

  draw(ctx) {
    //draw the ball
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.h, 0, 2 * Math.PI, false);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.stroke();
    //print press space to start
    if (!this.case) {
      ctx.fillText("press space to start", 400, 400);
    }
  }
  update() {
    if (32 in keysDown) {
      this.case = true;
    }
    if (this.case) {

      //check if the ball touch to top and right and left of the canvas
      if (this.y - this.h <= 0) {
        //reflect the ball
        this.velocityY = -this.velocityY;
      }
      if (this.x + this.w >= Bricksgame.cw) {
        this.velocityX = -this.velocityX;
      }
      if (this.x - this.w <= 0) {
        this.velocityX = -this.velocityX;
      }



      //check if the ball collide with the first padle
      if (this.x + this.w < Padle1.x + Padle1.w && this.x + this.h > Padle1.x || this.x - this.w < Padle1.x + Padle1.w && this.x - this.w > Padle1.x) {

        if (this.y + this.h > Padle1.y && this.y + this.h < (Padle1.y + Padle1.h ) || this.y - this.h > Padle1.y && this.y - this.h < (Padle1.y + Padle1.h)) {
          //check if the ball touch to left of the padle
          if (this.x + this.w < (Padle1.x + Padle1.w / 2)) {
            //reflect the ball
            this.velocityX = -1 + Math.sin(-45);
            this.velocityY = -1;
            this.speed += 0.1;
          }
          //check if the pable touch the right of the padle
          if (this.x + this.w > (Padle1.x + Padle1.w / 2)) {
            //reflect the ball
            this.velocityX = 1 + Math.sin(45);
            this.velocityY = -1;
            this.speed += 0.1;
          }
        }

      }
      //check if the bsll get out of the canvas
      if (this.y + this.h >= Bricksgame.ch) {
        if (this.index < 2) {
          this.reset();
          this.index++;
        }
        else {
          location.reload();
        }
      }

      //move the ball
      this.x = this.x + (this.velocityX * this.speed);
      this.y = this.y + (this.velocityY * this.speed);
    }

  }
  reset() {
    this.x = 450;
    this.y = Bricksgame.ch / 2;
    this.velocityY = 1;
    this.velocityX = 0;
    this.speed = 4;
  }
};

class score extends Sprite {
  draw(ctx) {
    ctx.fillText("socre: " + this.index, this.x, this.y);
    ctx.fillText("lifes: " + (3 - Ball1.index), this.x, this.y + 20);
    if (this.index == 100*9*4) {
      ctx.fillText("congrats you win", 400, 300);
    }

  }
  update() {

  }
};


var Bricksgame = new game(800, 600);
var Padle1 = new pad1(500, 550,120,10, 10);
var Ball1 = new ball(400, 300,10,10, 4);
var Bricks = [];
var score1 = new score(20, 550,85,30, 0);
var x1 = 10
for (var i = 0; i < 9; i++) {
  var y1 = 20;
  for (var j = 0; j < 4; j++) {
    Bricks[i, j] = new bricks(x1, y1,85,30, 0);
    Bricksgame.addSprite(Bricks[i, j]);
    y1 = y1 + 32
  }
  x1 = x1 + 87;
}


Bricksgame.addSprite(Padle1);
Bricksgame.addSprite(Ball1);
Bricksgame.addSprite(score1);
animate(Bricksgame);

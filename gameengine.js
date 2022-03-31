window.requestAnimFrame = (function (callback) {
  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
    function (callback) {
      window.setTimeout(callback, 1000 / 60);
    };
})();

function animate(myGame) {
  myGame.update();
  myGame.draw();
  requestAnimationFrame(function () {
    animate(myGame);
  });
};

class game {
  constructor(canvasWidth, canvasHeight) {
    this.canvas = document.getElementById("maingame");
    if (this.canvas.getContext) {
      this.ctx = this.canvas.getContext("2d");
    }
    this.sprites = []
    this.cw = canvasWidth;
    this.ch = canvasHeight;
  };
  addSprite(sprite) {
    this.sprites.push(sprite);
  };
  update() {
    var numberofsprites = this.sprites.length;
    for (var i = 0; i < numberofsprites; i++)
      this.sprites[i].update();
  };
  draw() {
    /*var background = new rectangle (0, 0, this.cw,this.ch, "black", 5);
    background.fill("black");
    background.draw(this.ctx);*/
    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(0, 0, this.cw, this.ch); //i added this 2 line  in order to show a simple animation without creating rectangle class
    var numberofsprites = this.sprites.length;
    for (var i = 0; i < numberofsprites; i++)
      this.sprites[i].draw(this.ctx);
  };


};


class Sprite {
  constructor(x, y,w,h, speed) {
    this.x = x;
    this.y = y;
    this.w=w;
    this.h=h;
    this.speed = speed
    this.velocityX=1;
    this.velocityY=1;
    this.case=false;
    this.index=0;
  }
  draw(ctx) {
  }

  update() {

  }
};





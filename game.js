const canvas = document.querySelector(".canvas")
const ctx = canvas.getContext("2d");
var p = 600 + (Math.random()*500);
var q = 600 + (Math.random()*500);
var c = 0;
var d = 0;

class block {
  constructor(width, height, x, y, color){
    this.width = width;
    this.height = height;
    this.x=x;
    this.y=y;
    this.color=color;
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x,this.y,this.width,this.height);
  }
}

class obstacle {
  constructor(width, height, x, y, speed, color){
    this.width = width;
    this.height = height;
    this.x=x;
    this.y=y;
    this.speed = speed;
    this.color=color;
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x,this.y,this.width,this.height);
  }
  move() {
    this.x -= this.speed;
  }
}

let obsF = new obstacle(70,150,p,450,4,"#34495E")
let obsC = new obstacle(70,150,q,0,4,"#34495E")
let b = new block(50,50,200,400,"#B3B6B7");
let e = new block(350,350,125,125,"#A9CCE3");
let s = new block(100,60,20,20,"red");

function floor() {
  ctx.beginPath();
  ctx.moveTo(0,525);
  ctx.lineTo(600,525);
  ctx.lineWidth = 150;
  ctx.strokeStyle = "#1F618D";
  ctx.stroke();
}

function ceiling() {
  ctx.beginPath();
  ctx.moveTo(0,75);
  ctx.lineTo(600,75);
  ctx.lineWidth = 150;
  ctx.strokeStyle = "#7FB3D5";
  ctx.stroke();
}

b.draw();
floor();
ceiling();
animateGame();
animateObs();

addEventListener("keydown", e => {
  if(e.code === "Space"){
      if(EndCheck() === 0) {
        if(b.y === 400)
        {
          b.y = 150;
        }
        else if(b.y === 150)
        {
          b.y = 400;
        }
      }
    }
})

function animateGame() {
  b.draw();
  floor();
  ceiling();
}

function animateObs() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  animateGame();
  obsF.draw();
  obsC.draw();
  obsF.move();
  obsC.move();
  scoreCalc();
  speedCheck();
  resetSpeed();
  id = requestAnimationFrame(animateObs);
  if(EndCheck() === 1) {
  EndGame();
  cancelAnimationFrame(id);
}
}

function resetSpeed() {
  if (obsF.x < -70)
  obsF.x = 600 + (Math.random()*100 + Math.random()*300);
  if (obsC.x < -70)
  obsC.x = 600 + (Math.random()*500);

}

function EndCheck() {
  if(b.y === 400 && obsF.x <= 250 && obsF.x >= 130)
  return 1;
  else if(b.y === 150 && obsC.x <= 250 && obsC.x >= 130)
  return 1;
  else {
    return 0;
  }
}

function speedCheck() {
   if((obsF.x - obsC.x) <= 120)
  obsF.speed+=1;
  else if((obsC.x - obsF.x) <= 120)
  obsC.speed+=1;
  if(obsF.speed >=7)
  obsF.speed = 3;
  if(obsC.speed >=7)
  obsC.speed = 3;
}

function EndGame() {
  e.draw();
  ctx.font = "bold 50px verdana, sans-serif";
  ctx.fillStyle = "black";
  ctx.textAlign = "center";
  ctx.fillText("GAME OVER",300,270);

  ctx.font = "bold 15px verdana, sans-serif";
  ctx.fillStyle = "black";
  ctx.textAlign = "center";
  ctx.fillText("(press the space bar to restart)",300,290);

  if(localStorage.getItem("max") === undefined) {
    localStorage.setItem("max", d);
    // r = localStorage.getItem("max");
  }
  else {
    if(Number(localStorage.getItem("max")) < d) {
        localStorage.setItem("max", d);
      }
        // r = localStorage.getItem("max");
  }

  ctx.font = "bold 20px verdana, sans-serif";
  ctx.fillStyle = "black";
  ctx.textAlign = "center";
  ctx.fillText("Your Score: " + d,300,325);


  ctx.font = "bold 20px verdana, sans-serif";
  ctx.fillStyle = "black";
  ctx.textAlign = "center";
  ctx.fillText("High Score: " + localStorage.getItem("max"),300,360);

  addEventListener("keydown", e => {
    if(e.code === "Space"){
      location.reload();
    }
  })
}

function scoreCalc() {
  ctx.font = "40px verdana, sans-serif";
  ctx.fillStyle = "#EAF2F8";
  ctx.textAlign = "center";
  c++;
  if(c%5 === 0)
  d++;
  ctx.fillText(d,70,70);
}

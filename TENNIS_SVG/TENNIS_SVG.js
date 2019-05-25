
var body = document.body;

var svg = document.createElementNS("http://www.w3.org/2000/svg",'svg');
svg.setAttribute('id', "tennis");
svg.setAttribute('width', "600");
svg.setAttribute('height', "500");
body.appendChild(svg);

var tennis = document.getElementById('tennis');

var dispaly  = document.createElementNS("http://www.w3.org/2000/svg",'rect');
dispaly.setAttribute('x', "0");
dispaly.setAttribute('y', "0");
dispaly.setAttribute('width', "600");
dispaly.setAttribute('height', "500");
dispaly.setAttribute('fill', "blue");
tennis.appendChild(dispaly);

var field  = document.createElementNS("http://www.w3.org/2000/svg",'rect');
field.setAttribute('x', "0");
field.setAttribute('y', "200");
field.setAttribute('width', "600");
field.setAttribute('height', "300");
field.setAttribute('fill', "black");
tennis.appendChild(field);

var racketL = document.createElementNS("http://www.w3.org/2000/svg",'rect');
racketL.setAttribute('x', "0");
racketL.setAttribute('width', "10");
racketL.setAttribute('height', "70");
racketL.setAttribute('fill', "yellow");
tennis.appendChild(racketL);

var racketR = document.createElementNS("http://www.w3.org/2000/svg",'rect');
racketR.setAttribute('x', "590");
racketR.setAttribute('width', "10");
racketR.setAttribute('height', "70");
racketR.setAttribute('fill', "yellow");
tennis.appendChild(racketR);

var button = document.createElement('input');
button.type = 'button';
button.value = 'старт!';
button.style.position = 'absolute';
button.style.top = '30px';
button.style.left = '50px';
body.appendChild(button);

var a = 0; var b = 0; // начало счета

var score = document.createElementNS("http://www.w3.org/2000/svg",'text');
score.setAttribute('x', "230");
score.setAttribute('y', "50");
score.setAttribute('style', "font-size: 30px");
score.setAttribute('fill', "orange");
score.innerHTML = a +':'+b;
tennis.appendChild(score);


racketH = {
  topL: 315,
  topR: 315,

  update : function() {            
            racketL.setAttribute('y', this.topL);
            racketR.setAttribute('y', this.topR);
        }
}
racketH.update();

addEventListener('keydown', startStop);
addEventListener('keyup', startStop);

setInterval(move, 40);

var s1 = 0; 
var s2 = 0;
var s3 = 0;
var s4 = 0;

function startStop(EO) {
  EO = EO || window.event;
  if (EO.keyCode == 16 && EO.type == 'keydown'){
    s1 = 2;
  }
  if (EO.keyCode == 17 && EO.type == 'keydown') {
    s2 = 2;
  }
  if (EO.keyCode == 38 && EO.type == 'keydown') {
    s3 = 2;
  }
  if (EO.keyCode == 40 && EO.type == 'keydown') {
    s4 = 2;
  }
  if (EO.keyCode == 16 && EO.type == 'keyup'){
    s1 = 0;
  }
  if (EO.keyCode == 17 && EO.type == 'keyup') {
    s2 = 0;
  }
  if (EO.keyCode == 38 && EO.type == 'keyup') {
    s3 = 0;
    }
  if (EO.keyCode == 40 && EO.type == 'keyup') {
    s4 = 0;
  }
}

function move() {  
    if (racketH.topL != 201) {
    racketH.topL = racketH.topL - s1;
  }
    if (racketH.topR != 201) {
    racketH.topR = racketH.topR - s3;
  }
    if (racketH.topL != 429) {
    racketH.topL = racketH.topL + s2;
  }
    if (racketH.topR != 429) {
    racketH.topR = racketH.topR + s4;
  }
    racketH.update();
  }

var ball = document.createElementNS("http://www.w3.org/2000/svg",'circle');
ball.setAttribute('r', "20");
ball.setAttribute('fill', "red");


var ballH={
        posX : 300,
        posY : 350,
        speedX : 2,
        speedY : 1,
        ballR : 20,
        
        update : function() {
            ball.setAttribute('cx', this.posX);
            ball.setAttribute('cy', this.posY);            
        }
    }

ballH.update();

button.addEventListener('click', start);

var areaH={
        width : 580,
        height : 480
    }

var timer;
var xR;
var yR;
function start() {        
        if (timer) {
         clearInterval(timer);
         timer=0;  
        }
        ballH.posX = 300;
        ballH.posY = 350;
        tennis.appendChild(ball);
        timer = setInterval(tick,30);
        // случайный вылет мячика
        xR = randomDiap(1,2); 
        yR = randomDiap(1,2); 
        if (xR == 2) {
          ballH.speedX = -ballH.speedX;
        }
        if (yR == 2) {
          ballH.speedY = -ballH.speedY;      
    }
}
    function randomDiap(n,m) {
      return Math.floor(
      Math.random()*(m-n+1)
    )+n;
    }

    function tick() {
        
        ballH.posX+=ballH.speedX;
        ballH.posY+=ballH.speedY;

        // вылетел ли мяч правее стены?
        if ( ballH.posX>areaH.width ) {
            ballH.speedX=-ballH.speedX;
            ballH.posX=areaH.width;
            a++;
            score.innerHTML = a +':'+b;
            clearInterval(timer);
        }
        // 10 толщина ракетки, 70 толщина ракетки
        if ( ballH.posX>areaH.width - 10 && racketH.topR < ballH.posY && (racketH.topR + 70) > ballH.posY) {
            ballH.speedX=-ballH.speedX;
            ballH.posX=areaH.width - 10;
        }

        // вылетел ли мяч левее стены?
        if ( ballH.posX<0 + ballH.ballR) { 
            ballH.speedX=-ballH.speedX;
            ballH.posX=0 + ballH.ballR;
            b++;
            score.innerHTML = a +':'+b;
            clearInterval(timer);
        }
        
        // 10 толщина ракетки, 70 толщина ракетки
        if ( ballH.posX < 10 + ballH.ballR  && racketH.topL < ballH.posY && (racketH.topL + 70) > ballH.posY) { 
            ballH.speedX=-ballH.speedX;
            ballH.posX=10 + ballH.ballR;
        }

        
        // вылетел ли мяч ниже пола?
        if ( ballH.posY > areaH.height) {
            ballH.speedY=-ballH.speedY;
            ballH.posY=areaH.height;
        }
        // вылетел ли мяч выше потолка? 200 - высота поля
        if ( ballH.posY<200 + ballH.ballR ) {
            ballH.speedY=-ballH.speedY;
            ballH.posY=200 + ballH.ballR;
        }

        ballH.update();
    }

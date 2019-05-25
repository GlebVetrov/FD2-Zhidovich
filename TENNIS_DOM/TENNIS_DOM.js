var body = document.body;

var tennis = document.createElement('div');
tennis.style.width = '600px';
tennis.style.height = '500px';
tennis.style.backgroundColor = 'black';
tennis.style.position = 'relative';
body.appendChild(tennis);

var buttom = document.createElement('input');
buttom.type = 'button';
buttom.value = 'старт!';
buttom.style.position = 'absolute';
buttom.style.top = '30px';
buttom.style.left = '50px';

var a = 0;
var b = 0; // начало счета

var score = document.createElement('p');
score.style.position = 'absolute';
score.style.top = '20px';
score.style.left = '250px';
score.style.fontSize = '30px';
score.style.color = 'white';
score.innerHTML = a + ':' + b;

var field = document.createElement('div');
field.style.width = '600px';
field.style.height = '300px';
field.style.backgroundColor = 'yellow';
field.style.position = 'absolute';
field.style.top = '200px';

tennis.appendChild(buttom);
tennis.appendChild(score);
tennis.appendChild(field);

var sideLeft = document.createElement('div');
sideLeft.style.width = '10px';
sideLeft.style.height = '70px';
sideLeft.style.position = 'absolute';
sideLeft.style.top = '115px';
sideLeft.style.backgroundColor = 'black';

var sideRight = document.createElement('div');
sideRight.style.width = '10px';
sideRight.style.height = '70px';
sideRight.style.position = 'absolute';
sideRight.style.right = '0';
sideRight.style.top = '115px';
sideRight.style.backgroundColor = 'black';

sideH = {
    topL: 115,
    topR: 115,

    update: function () {
        sideLeft.style.top = this.topL + "px";
        sideRight.style.top = this.topR + "px";
    }
}

var ball = document.createElement('div');
ball.style.width = '40px';
ball.style.height = '40px';
ball.style.backgroundColor = 'red';
ball.style.position = 'absolute';
ball.style.borderRadius = '20px';
ball.style.top = '130px';
ball.style.left = '280px';

field.appendChild(sideLeft);
field.appendChild(sideRight);

addEventListener('keydown', startStop);
addEventListener('keyup', startStop);

setInterval(move, 40);


//начальная скорость площадки 0, рабочая скорость 2
var s1 = 0;
var s2 = 0;
var s3 = 0;
var s4 = 0;

function startStop(EO) {
    EO = EO || window.event;
    if (EO.keyCode == 16 && EO.type == 'keydown') {
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
    if (EO.keyCode == 16 && EO.type == 'keyup') {
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
    if (sideH.topL != 1) {
        sideH.topL = parseInt(sideH.topL) - s1;
    }
    if (sideH.topR != 1) {
        sideH.topR = parseInt(sideH.topR) - s3;
    }
    if (sideH.topL != 229) {
        sideH.topL = parseInt(sideH.topL) + s2;
    }
    if (sideH.topR != 229) {
        sideH.topR = parseInt(sideH.topR) + s4;
    }
    sideH.update();
}

buttom.addEventListener('click', start);

var ballH = {
    posX: 280,
    posY: 130,
    speedX: 2,
    speedY: 1,
    width: 40,
    height: 40,

    update: function () {
        ball.style.left = this.posX + "px";
        ball.style.top = this.posY + "px";
    }
}

var areaH = {
    width: 600,
    height: 300
}

var timer; // таймер

function start() {
    if (timer) {
        clearInterval(timer);
        timer = 0;
    }
    ballH.posX = 280;
    ballH.posY = 130;
    field.appendChild(ball);
    timer = setInterval(tick, 30);
}


function tick() {

    ballH.posX += ballH.speedX;
    // вылетел ли мяч правее стены?
    if (ballH.posX + ballH.width > areaH.width) {
        ballH.speedX = -ballH.speedX;
        ballH.posX = areaH.width - ballH.width;
        a++;
        score.innerHTML = a + ':' + b;
        clearInterval(timer);
    }
    // 10 толщина ракетки, 40/2=20 половина мяча, 70 толщина ракетки
    if (ballH.posX + ballH.width > areaH.width - 10 && sideH.topR < ballH.posY + 20 && (sideH.topR + 70) > ballH.posY + 20) {
        ballH.speedX = -ballH.speedX;
        ballH.posX = areaH.width - ballH.width - 10;
    }

    // вылетел ли мяч левее стены?
    if (ballH.posX < 0) {
        ballH.speedX = -ballH.speedX;
        ballH.posX = 0;
        b++;
        score.innerHTML = a + ':' + b;
        clearInterval(timer);
    }

    // 10 толщина ракетки, 40/2=20 половина мяча, 70 толщина ракетки
    if (ballH.posX < 10 && sideH.topL < ballH.posY + 20 && (sideH.topL + 70) > ballH.posY + 20) {
        ballH.speedX = -ballH.speedX;
        ballH.posX = 10;
    }
    ballH.posY += ballH.speedY;
    // вылетел ли мяч ниже пола?
    if (ballH.posY + ballH.height > areaH.height) {
        ballH.speedY = -ballH.speedY;
        ballH.posY = areaH.height - ballH.height;
    }
    // вылетел ли мяч выше потолка?
    if (ballH.posY < 0) {
        ballH.speedY = -ballH.speedY;
        ballH.posY = 0;
    }

    ballH.update();
}
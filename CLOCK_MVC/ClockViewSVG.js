function ClockViewSVG() {
    var myModel = null; // с какой моделью работаем
    var myField = null; // внутри какого элемента DOM наша вёрстка
    var displaySVG = null;
    var svg = null;
    var bigSVG = null;
    var middleSVG = null;
    var smallSVG = null;
    
    this.start = function (model, field) {
        myModel = model;
        myField = field;

        svg = myField;

        displaySVG = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
        displaySVG.setAttribute('id', "displaySVG");
        displaySVG.setAttribute('cx', "100");
        displaySVG.setAttribute('cy', "100");
        displaySVG.setAttribute('r', "100");
        displaySVG.setAttribute('fill', "blue");
        svg.appendChild(displaySVG);

        bigSVG = document.createElementNS("http://www.w3.org/2000/svg", 'line');
        bigSVG.setAttribute('id', "bigSVG");
        bigSVG.setAttribute('x1', "100");
        bigSVG.setAttribute('y1', "100");
        bigSVG.setAttribute('x2', "100");
        bigSVG.setAttribute('y2', "50");
        bigSVG.setAttribute('stroke', "black");
        bigSVG.setAttribute('stroke-width', "10");
        svg.appendChild(bigSVG);

        middleSVG = document.createElementNS("http://www.w3.org/2000/svg", 'line');
        middleSVG.setAttribute('id', "middleSVG");
        middleSVG.setAttribute('x1', "100");
        middleSVG.setAttribute('y1', "100");
        middleSVG.setAttribute('x2', "100");
        middleSVG.setAttribute('y2', "40");
        middleSVG.setAttribute('stroke', "black");
        middleSVG.setAttribute('stroke-width', "5");
        svg.appendChild(middleSVG);

        smallSVG = document.createElementNS("http://www.w3.org/2000/svg", 'line');
        smallSVG.setAttribute('id', "smallSVG");
        smallSVG.setAttribute('x1', "100");
        smallSVG.setAttribute('y1', "100");
        smallSVG.setAttribute('x2', "100");
        smallSVG.setAttribute('y2', "20");
        smallSVG.setAttribute('stroke', "black");
        smallSVG.setAttribute('stroke-width', "3");
        svg.appendChild(smallSVG);

        this.setFigures();

        this.updateArrowSVG();
    }

    this.update = function () {
        hourSvg = myModel.hours;
        minSvg = myModel.min;
        secSvg = myModel.sec;
        this.updateArrowSVG();
    }


    var m = 2; //число на которое следует поделить что бы в 30 градусах часа видны были и минуты
    var s = 10; //число на которое следует поделить что бы в 6 градусах минуты видны были и секунды
    var a = 6; //360/60=6deg сколько градусов проходит стрелка за 1ед времени
    var hourDeg = 30; //360/12=30deg на час


    //установка начальных значений стрелок

    this.setFigures = function () {
        var circleDeg = 360; // градусов в круге
        var numberOftimeSVG = 12; // формат времени     
        var radius = displaySVG.getAttribute('r') - displaySVG.getAttribute('r') * 0.15; // растояние от края циферблата до кружочков с цифрами
        for (var i = 1; i < numberOftimeSVG + 1; i++) {
            var angle = i * (circleDeg / numberOftimeSVG) / 180 * Math.PI;
            var displaySVGCenterX = parseInt(displaySVG.getAttribute('cx')) + radius * Math.sin(angle);
            var displaySVGCenterY = displaySVG.getAttribute('cx') - radius * Math.cos(angle);
            var circle = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
            circle.setAttribute('r', displaySVG.getAttribute('r') / 10); // делю на 10 для соотношения цеферблата к кружочкам 1 к 10
            circle.setAttribute('fill', "red");
            circle.setAttribute('cy', Math.round(displaySVGCenterY));
            circle.setAttribute('cx', Math.round(displaySVGCenterX));
            var text = document.createElementNS("http://www.w3.org/2000/svg", 'text');
            text.innerHTML = i;
            text.setAttribute('fill', "white");
            if (i < 10) {
                text.setAttribute('dy', Math.round(displaySVGCenterY) + displaySVG.getAttribute('r') / 10 / 2); // центровка цифр
                text.setAttribute('dx', Math.round(displaySVGCenterX) - displaySVG.getAttribute('r') / 10 / 2); // центровка цифр
            } else {
                text.setAttribute('dy', Math.round(displaySVGCenterY) + displaySVG.getAttribute('r') / 10 / 2); // центровка цифр
                text.setAttribute('dx', Math.round(displaySVGCenterX) - displaySVG.getAttribute('r') / 10 + displaySVG.getAttribute('r') / 10 * 0.1); // центровка цифр
            }
            svg.appendChild(circle);
            svg.appendChild(text);
        }
    }

    var hourSvg = 0;
    var minSvg = 0;
    var secSvg = 0;
    
    this.updateArrowSVG = function () {
        var hour = hourSvg * hourDeg + minSvg / m;
        var min = minSvg * a + secSvg / s;        
        bigSVG.setAttribute("transform", "rotate(" + hour + " 100 100)");
        middleSVG.setAttribute("transform", "rotate(" + min + " 100 100)");
        smallSVG.setAttribute("transform", "rotate(" + secSvg * a + " 100 100)");

    }

}

//Минск (GMT+3)
var clock3 = new ClockModel();
var view3 = new ClockViewSVG();
var city3 = 'Минск';
var utc3 = '+3';
var controller3 = new ClockControllerButtons();
var containerElem3 = document.getElementById('div3');
var containerSVG3 = document.getElementById('svg');
clock3.start(view3, city3, utc3);
view3.start(clock3, containerSVG3);
controller3.start(clock3, containerElem3);
clock3.updateView();
//Токио (GMT+9)
var clock4 = new ClockModel();
var view4 = new ClockViewSVG();
var city4 = 'Токио';
var utc4 = '+9';
var controller4 = new ClockControllerButtons();
var containerElem4 = document.getElementById('div4');
var containerSVG4 = document.getElementById('svg2');
clock4.start(view4, city4, utc4);
view4.start(clock4, containerSVG4);
controller4.start(clock4, containerElem4);
clock4.updateView();
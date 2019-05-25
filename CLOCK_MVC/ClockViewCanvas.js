"use strict";

//view
function ClockViewCanvas() {
    var myModel = null; // с какой моделью работаем
    var myField = null; // внутри какого элемента DOM наша вёрстка
    var context = null;

    this.start = function (model, field) {
        myModel = model;
        myField = field;

        // ищем и запоминаем интересные нам элементы DOM
        context = myField.getContext('2d');
    }

    this.update = function () {
        this.createDisplay();
        this.createArrow();
    }

    // 100 100 центр координат
    this.createDisplay = function () {
        context.beginPath();
        context.fillStyle = "yellow";
        context.arc(100, 100, 100, 0, Math.PI * 2, true);
        context.fill();
        for (var i = 1; i < 13; i++) {
            var radius = 85;
            var angle = i * 360 / 12 / 180 * Math.PI;
            var centerX = 100 + radius * Math.sin(angle);
            var centerY = 100 - radius * Math.cos(angle);
            context.beginPath();
            context.fillStyle = "black";
            context.arc(centerX, centerY, 10, 0, Math.PI * 2, true);
            context.fill();
            context.fillStyle = 'yellow';
            context.font = 'italic bold 11px Arial';
            if (i < 10) {
                context.fillText(i, centerX - 4, centerY + 3);
            } else {
                context.fillText(i, centerX - 6, centerY + 3);
            }
        }
    }


    this.createArrow = function () {
        context.strokeStyle = 'black';
        context.lineCap = 'round';
        
        var hour = myModel.hours;
        var min = myModel.min;
        var sec = myModel.sec;

        var radiusH = 30;
        var angleH = (hour * 360 / 12 + 0.5 * min) / 180 * Math.PI;
        var hCenterX = 100 + radiusH * Math.sin(angleH);
        var hCenterY = 100 - radiusH * Math.cos(angleH);

        context.beginPath();
        context.lineWidth = 10;
        context.moveTo(100, 100);
        context.lineTo(hCenterX, hCenterY);
        context.stroke();

        var radiusM = 50;
        var angleM = (min * 360 / 60 + 6 / 60 * sec) / 180 * Math.PI;
        var mCenterX = 100 + radiusM * Math.sin(angleM);
        var mCenterY = 100 - radiusM * Math.cos(angleM);

        context.beginPath();
        context.lineWidth = 5;
        context.moveTo(100, 100);
        context.lineTo(mCenterX, mCenterY);
        context.stroke();

        var radiusS = 70;
        var angleS = sec * 360 / 60 / 180 * Math.PI;
        var sCenterX = 100 + radiusS * Math.sin(angleS);
        var sCenterY = 100 - radiusS * Math.cos(angleS);

        context.beginPath();
        context.lineWidth = 2;
        context.moveTo(100, 100);
        context.lineTo(sCenterX, sCenterY);
        context.stroke();
    }
}

//london
var clock = new ClockModel();
var view = new ClockViewCanvas();
var city = 'London';
var utc = '+3';
var controller = new ClockControllerButtons();
var containerElem = document.getElementById('div');
var containerCanvas = document.getElementById('canvas');
clock.start(view, city, utc);
view.start(clock, containerCanvas);
controller.start(clock, containerElem);
clock.updateView();
//Нью-Йорк (GMT-5)
var clock2 = new ClockModel();
var view2 = new ClockViewCanvas();
var city2 = 'Нью-Йорк';
var utc2 = '-5';
var controller2 = new ClockControllerButtons();
var containerElem2 = document.getElementById('div2');
var containerCanvas2 = document.getElementById('canvas2');
clock2.start(view2, city2, utc2);
view2.start(clock2, containerCanvas2);
controller2.start(clock2, containerElem2);
clock2.updateView();
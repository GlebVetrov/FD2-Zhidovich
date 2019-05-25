"use strict";

//controller
function ClockControllerButtons() {
    var myModel = null; // с какой моделью работаем
    var myField = null; // внутри какого элемента DOM наша вёрстка        

    this.start = function (model, field) {
        myModel = model;
        myField = field;
                        
        // ищем и запоминаем интересные нам элементы DOM
        // назначаем обработчики событий
        var label = myField.querySelector('.utc');
        label.innerHTML = myModel.myCity + ' (GMT' + myModel.myUtc + ')';
        var buttonStart = myField.querySelector('.start');
        buttonStart.addEventListener('click', this.startTimer);
        var buttonStop = myField.querySelector('.stop');
        buttonStop.addEventListener('click', this.stoptTimer);

    }

    this.startTimer = function () {
        myModel.startTimer();
    }

    this.stoptTimer = function () {
        myModel.stopTimer();
    }

}
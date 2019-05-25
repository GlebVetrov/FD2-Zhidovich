function ClockViewDom() {
    var self = this;
    var myModel = null; // с какой моделью работаем
    var myField = null; // внутри какого элемента DOM наша вёрстка
    var displayDom = null;
    field = null;
    
    var bigDom = null;
    var middleDom = null;
    var smallDom = null;

    this.start = function (model, fieldd) {
        myModel = model;
        myField = fieldd;

        field = myField;
        field.style.position = 'relative';
        field.style.width = "200px";
        field.style.height = "200px";
        

        displayDom = document.createElement('div');
        displayDom.style.width = "200px";
        displayDom.style.height = "200px";
        displayDom.style.borderRadius = "50%";
        displayDom.style.background = "blue";
        field.appendChild(displayDom);

        bigDom = document.createElement('div');
        bigDom.className = "bigDom";
        field.appendChild(bigDom);

        middleDom = document.createElement('div');
        middleDom.className = "middleDom";
        field.appendChild(middleDom);
        
        smallDom = document.createElement('div');
        smallDom.className = "smallDom";
        field.appendChild(smallDom);

        this.setFigures();

        this.updateArrowDom();
    }

    this.update = function () {
        hourDom = myModel.hours;
        minDom = myModel.min;
        secDom = myModel.sec;
        this.updateArrowDom();
    }

    var m = 2; //число на которое следует поделить что бы в 30 градусах часа видны были и минуты
    var s = 10; //число на которое следует поделить что бы в 6 градусах минуты видны были и секунды
    var a = 6; //360/60=6deg сколько градусов проходит стрелка за 1ед времени
    var hourDeg = 30; //360/12=30deg на час
        
    this.setFigures = function() {
        var circleDeg = 360; // градусов в круге
        var numberOfTime = 12; // формат времени     
        var radius = 85; // растояние от края циферблата до кружочков с цифрами
        for (var i = 1; i < numberOfTime + 1; i++) {
            var angle = i * (circleDeg / numberOfTime) / 180 * Math.PI;
            var displayDomCenterX = 90 + radius * Math.sin(angle);
            var displayDomCenterY = 90 - radius * Math.cos(angle);
            var circle = document.createElement('div');
            circle.style.width = '20px';
            circle.style.height = '20px';
            circle.style.transformOrigin = "center center";
            circle.style.position = 'absolute';
            circle.style.borderRadius = "50%";
            circle.style.textAlign = 'center';
            circle.style.top = Math.round(displayDomCenterY) + 'px';
            circle.style.left = Math.round(displayDomCenterX) + 'px';
            circle.style.background = 'red';
            circle.innerHTML = i;
            field.appendChild(circle);
        }
    }

    var hourDom = 0;
    var minDom = 0;
    var secDom = 0;

    this.updateArrowDom = function() {
        var hour = hourDom * hourDeg + minDom / m;
        var min = minDom * a + secDom / s;
        bigDom.style.transform = 'rotate(' + hour + 'deg)';
        middleDom.style.transform = 'rotate(' + min + 'deg)';
        smallDom.style.transform = 'rotate(' + secDom * a + 'deg)';
    }
}
    //Берлин (GMT+1)
    var clock5 = new ClockModel();
    var view5 = new ClockViewDom();
    var city5 = 'Берлин';
    var utc5 = '+1';
    var controller5 = new ClockControllerButtons();
    var containerElem5 = document.getElementById('div5');
    var containerSVG5 = document.getElementById('dom');
    clock5.start(view5, city5, utc5);
    view5.start(clock5, containerSVG5);
    controller5.start(clock5, containerElem5);
    clock5.updateView();
    //Владивосток (GMT+10)
    var clock6 = new ClockModel();
    var view6 = new ClockViewDom();
    var city6 = 'Владивосток';
    var utc6 = '+10';
    var controller6 = new ClockControllerButtons();
    var containerElem6 = document.getElementById('div6');
    var containerSVG6 = document.getElementById('dom2');
    clock6.start(view6, city6, utc6);
    view6.start(clock6, containerSVG6);
    controller6.start(clock6, containerElem6);
    clock6.updateView();
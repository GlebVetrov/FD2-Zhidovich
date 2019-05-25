var body = document.body;

var setInfo = document.createElement('input');
setInfo.onclick = addInfo;
setInfo.type = "button";
setInfo.style.display = "block";
setInfo.value = 'ввод информации о напитке';
var getInfo = document.createElement('input');
getInfo.onclick = readInfo;
getInfo.style.display = "block";
getInfo.type = "button";
getInfo.value = 'получение информации о напитке';
var delInfo = document.createElement('input');
delInfo.onclick = deleteInfo;
delInfo.style.display = "block";
delInfo.type = "button";
delInfo.value = 'удаление информации о напитке';
var showInfo = document.createElement('input');
showInfo.onclick = showNames;
showInfo.style.display = "block";
showInfo.type = "button";
showInfo.value = 'перечень всех напитков';

body.appendChild(setInfo);
body.appendChild(getInfo);
body.appendChild(delInfo);
body.appendChild(showInfo);


function AJAXStorage() {
    var self = this;

    self.storage = {};
    self.addValue = function (key, value) {
        self.storage[key] = value;
        storeInfo();
    }
    self.getValue = function (key) {
        return self.storage[key];
    }
    self.deleteValue = function (key) {
        key in self.storage ? delete self.storage[key] : false;
        storeInfo();
    }
    self.getKeys = function () {
        return Object.keys(self.storage);
    }

    var ajaxHandlerScript = "https://fe.it-academy.by/AjaxStringStorage2.php";
    var updatePassword;
    var stringName = 'ZHIDOVICH_TEST_Storage';

    function storeInfo() {
        updatePassword = Math.random();
        $.ajax({
            url: ajaxHandlerScript,
            type: 'POST',
            cache: false,
            dataType: 'json',
            data: {
                f: 'LOCKGET',
                n: stringName,
                p: updatePassword
            },
            success: lockGetReady,
            error: errorHandler
        });
    }

    function lockGetReady(callresult) {
        if (callresult.error != undefined)
            alert(callresult.error);
        else {
          console.log(callresult);
            // нам всё равно, что было прочитано - 
            // всё равно перезаписываем
            var info = self.storage;
            $.ajax({
                url: ajaxHandlerScript,
                type: 'POST',
                cache: false,
                dataType: 'json',
                data: {
                    f: 'UPDATE',
                    n: stringName,
                    v: JSON.stringify(info),
                    p: updatePassword
                },
                success: updateReady,
                error: errorHandler
            });
        }
    }

    function updateReady(callresult) {
        if (callresult.error != undefined)
            alert(callresult.error);
    }

    function restoreInfo() {
        $.ajax({
            url: ajaxHandlerScript,
            type: 'POST',
            cache: false,
            dataType: 'json',
            data: {
                f: 'READ',
                n: stringName
            },
            success: readReady,
            error: errorHandler
        });
    }

    function readReady(callresult) {
        if (callresult.error != undefined)
            alert(callresult.error);
        else if (callresult.result != "") {
            var info = JSON.parse(callresult.result);
            self.storage = info;
        }
    }

    function errorHandler(jqXHR, statusStr, errorStr) {
        alert(statusStr + ' ' + errorStr);
    }
    restoreInfo();
}

var drinkStorage = new AJAXStorage();


function addInfo() {
    var name = prompt('Ведите название напитка: ');
    if (name !== null) {
        name = name.toLowerCase();
    } else {
      return;
    }
    var info = {};
    info.alcohol = prompt('Напиток алкогольный? Да или Нет: ').toLowerCase();
    info.recepi = prompt('Ведите рецепт напитка: ').toLowerCase();
    return drinkStorage.addValue(name, info);
}

function readInfo() {
    var name = prompt('Ведите название напитка: ');
    if (name !== null) {
        name = name.toLowerCase();
    } else {
      return;
    }
    var a = drinkStorage.getValue(name);
    if (a != undefined) {
        alert('напиток: ' + name + '\n' +
            'алкогольный: ' + a.alcohol + '\n' +
            'рецепт приготовления: ' + '\n' + a.recepi);

    } else
        alert('нет такого напитка');
}

function deleteInfo() {
    var name = prompt('Ведите название напитка: ');
    if (name !== null) {
        name = name.toLowerCase();
    } else {
      return;
    }
    if (drinkStorage.getValue(name)) {
        drinkStorage.deleteValue(name);
        alert('напиток удален');
    } else
        alert('нет такого напитка');
}

function showNames() {
    alert(drinkStorage.getKeys());
}


"use strict";

//model
function ClockModel() {
  var self = this;
  var myView = null;
  self.myCity = null;
  self.myUtc = null;

 self.start = function(view, city, utc) {
     myView = view;
     self.myCity = city;
     self.myUtc = utc;
 } 

 var timer = 0;

 var currTime = new Date(); 
 self.hours = currTime.getUTCHours() + parseInt(self.myUtc);
 self.min = currTime.getUTCMinutes();
 self.sec = currTime.getUTCSeconds();

 var mSec = currTime.getMilliseconds();    

 self.updateView = function() {
    
     self.updateTime();
      
     if (myView){
         myView.update();
     }
 }

 self.updateTime = function() {
   currTime = new Date();
   self.hours = currTime.getUTCHours() + parseInt(self.myUtc);
   self.min = currTime.getUTCMinutes();
   self.sec = currTime.getUTCSeconds(); 
 }

 self.startTimer = function() {
     if (timer) {
         clearInterval(timer);
         timer = 0;
     }
     timer = setInterval(self.updateView, 1000 - mSec);
 }

 self.startTimer();

 self.stopTimer = function() {
     clearInterval(timer);
 }
 
}

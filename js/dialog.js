'use strict';
(function () {
  var wizard = document.querySelector('.setup');
  var dialog = wizard.querySelector('.upload');

  var dialogMouseDownHandle = function (mouseDownEvt) {
    mouseDownEvt.preventDefault();
    var startCoordinates = {
      x: mouseDownEvt.clientX,
      y: mouseDownEvt.clientY
    };
    var flagMove = false;

    var mouseMoveHandle = function (mouseMoveEvt) {
      flagMove = true;
      var endCoordinates = {
        x: startCoordinates.x - mouseMoveEvt.clientX,
        y: startCoordinates.y - mouseMoveEvt.clientY
      };
      startCoordinates.x = mouseMoveEvt.clientX;
      startCoordinates.y = mouseMoveEvt.clientY;
      wizard.style.left = (wizard.offsetLeft - endCoordinates.x) + 'px';
      wizard.style.top = (wizard.offsetTop - endCoordinates.y) + 'px';
    };

    var mouseUpHandle = function () {
      if (flagMove) {
        var dialogClickHandle = function (clickEvt) {
          clickEvt.preventDefault();
          dialog.removeEventListener('click', dialogClickHandle);
        };
        dialog.addEventListener('click', dialogClickHandle);
      }
      document.removeEventListener('mousemove', mouseMoveHandle);
      document.removeEventListener('mouseup', mouseUpHandle);
    };

    document.addEventListener('mousemove', mouseMoveHandle);
    document.addEventListener('mouseup', mouseUpHandle);
  };


  dialog.addEventListener('mousedown', dialogMouseDownHandle);
})();

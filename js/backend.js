'use strict';
(function () {
  var URL = 'https://js.dump.academy/code-and-magick/data';
  var URLPost = 'https://js.dump.academy/code-and-magick';
  window.backend = {
    load: function (onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.addEventListener('load', function () {
        switch (xhr.status) {
          case 200:
            onLoad(xhr.response);
            break;
          case 400:
            onError('Ошибка 4хх');
            break;
          case 300:
            onError('Косяк! Перенаправление. Ошибка 3хх');
            break;
        }
      });
      xhr.addEventListener('error', function () {
        onError('Ошибка сервера');
      });
      xhr.addEventListener('timeOut', function () {
        onError('Вышло время загрузки');
      });
      xhr.open('GET', URL);
      xhr.send();
    },
    save: function (data, onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.addEventListener('load', function () {
        switch (xhr.status) {
          case 200:

            onLoad(xhr.response);
            break;
          case 400:
            onError('Ошибка 4хх');
            break;
          case 300:
            onError('Косяк! Перенаправление. Ошибка 3хх');
            break;
        }
      });
      xhr.addEventListener('error', function () {
        onError('Ошибка сервера');
      });
      xhr.addEventListener('timeOut', function () {
        onError('Вышло время загрузки');
      });
      xhr.open('POST', URLPost);
      xhr.send(data);
    }
  };
})();

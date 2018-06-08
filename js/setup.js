var WIZARDS_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARDS_LASTNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARDS_COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARDS_EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];

var wizardsClan = [];
var wizardTemplate = document.querySelector ('#similar-wizard-template').content.querySelector ('.setup-similar-item');
var wizard = document.querySelector ('.setup');
var listElement = document.querySelector ('.setup-similar-list');

var buildWizards = function (names, lastnames, coatColor, eyesColor) {
  var fullnameRandom;
  var colorCoatRandom;
  var colorEyeRandom;
  for (var i = 0; i < names.length; i++) {
    fullnameRandom  = names[getRandomValue (names.length)] + ' ' + lastnames[getRandomValue (lastnames.length)];
    colorCoatRandom = coatColor[getRandomValue (coatColor.length)];
    colorEyeRandom = eyesColor[getRandomValue (eyesColor.length)];
    wizardsClan[i] = {
      name: fullnameRandom,
      coatColor: colorCoatRandom,
      eyesColor: colorEyeRandom
    };
  };
};

var buildTemplate = function (template, wizardsClan, list) {
  for (var j = 0; j < wizardsClan.length; j++) {
    var wizardElement = template.cloneNode(true)
    wizardElement.querySelector ('.setup-similar-label').textContent = wizardsClan[j].name;
    wizardElement.querySelector ('.wizard-coat').style.fill = wizardsClan[j].coatColor;
    wizardElement.querySelector ('.wizard-eyes').style.fill = wizardsClan[j].eyesColor;
    list.appendChild (wizardElement);
  };
};

var getRandomValue = function (lengthValue) {
  return (Math.floor(Math.random() * lengthValue));
};

wizard.classList.remove ('hidden');
document.querySelector ('.setup-similar').classList.remove ('hidden');
buildWizards (WIZARDS_NAMES, WIZARDS_LASTNAMES, WIZARDS_COAT_COLOR, WIZARDS_EYES_COLOR);
buildTemplate (wizardTemplate, wizardsClan, listElement);
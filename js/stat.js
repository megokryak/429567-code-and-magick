'use strict';

window.renderStatistics = function (ctx, names, times) {
  var CLOUD_WIDTH = 420;
  var CLOUD_HEIGHT = 270;
  var CLOUD_START_X = 100;
  var CLOUD_START_Y = 10;
  var SHADOW_BIAS = 10;
  var WIDTH_COLUMN = 40;
  var HEIGHT_BARCHART = 150;
  var DISTANCE_COLUMN = 50;
  var MY_COLOR = 'rgba(255, 0, 0, 1)';
  var OTHER_COLOR = 'rgba(0, 0, 255, ' + Math.random() + ')';


  var cloudEndX = CLOUD_START_X + CLOUD_WIDTH;
  var cloudEndY = CLOUD_START_Y + CLOUD_HEIGHT;
  var cloudCenterX = (cloudEndX - CLOUD_START_X) / 2 + CLOUD_START_X;
  var cloudCenterY = (cloudEndY - CLOUD_START_Y) / 2 + CLOUD_START_Y;
  var shadowStartX = CLOUD_START_X + SHADOW_BIAS;
  var shadowStartY = CLOUD_START_Y + SHADOW_BIAS;
  var shadowCenterX = cloudCenterX + SHADOW_BIAS;
  var shadowCenterY = cloudCenterY + SHADOW_BIAS;
  var shadowEndX = cloudEndX + SHADOW_BIAS;
  var shadowEndY = cloudEndY + SHADOW_BIAS;
  var textStartX = CLOUD_START_X + 30;
  var textStartY = CLOUD_START_Y + 30;
  var textStep = 20;
  var statisticStartX = CLOUD_START_X + 50;
  var statisticStartY = cloudEndY - 35;
  var maxTime = 0;
  var heightColumn = 0;
  var distance = 0;
  var colorForColumn;

  var renderStatisticPlayer = function (x, y, color, yourName, yourTime) {
    yourTime = Math.round(yourTime);
    ctx.fillStyle = color;
    heightColumn = yourTime * HEIGHT_BARCHART / maxTime;
    ctx.fillRect(x, y, WIDTH_COLUMN, -heightColumn);
    ctx.fillStyle = '#000';
    ctx.textBaseline = 'top';
    ctx.fillText(yourName, x + 5, y + 2);
    ctx.textBaseline = 'bottom';
    ctx.fillText(yourTime, x + 5, y - heightColumn - 2);
  };

  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.strokeStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.beginPath();
  ctx.moveTo(shadowStartX, shadowStartY);
  ctx.lineTo(shadowCenterX, shadowStartY + 10);
  ctx.lineTo(shadowEndX, shadowStartY);
  ctx.lineTo(shadowEndX - 10, shadowCenterY);
  ctx.lineTo(shadowEndX, shadowEndY);
  ctx.lineTo(shadowCenterX, shadowEndY - 10);
  ctx.lineTo(shadowStartX, shadowEndY);
  ctx.lineTo(shadowStartX + 10, shadowCenterY);
  ctx.closePath();
  ctx.stroke();
  ctx.fill();

  ctx.fillStyle = '#fff';
  ctx.strokeStyle = '#fff';
  ctx.beginPath();
  ctx.moveTo(CLOUD_START_X, CLOUD_START_Y);
  ctx.lineTo(cloudCenterX, CLOUD_START_Y + 10);
  ctx.lineTo(cloudEndX, CLOUD_START_Y);
  ctx.lineTo(cloudEndX - 10, cloudCenterY);
  ctx.lineTo(cloudEndX, cloudEndY);
  ctx.lineTo(cloudCenterX, cloudEndY - 10);
  ctx.lineTo(CLOUD_START_X, cloudEndY);
  ctx.lineTo(CLOUD_START_X + 10, cloudCenterY);
  ctx.closePath();
  ctx.stroke();
  ctx.fill();

  ctx.font = '16px PT Mono';
  ctx.fillStyle = '#000';
  ctx.fillText('Ура вы победили!', textStartX, textStartY);
  ctx.fillText('Список результатов:', textStartX, textStartY + textStep);

  for (var i = 0; i < times.length; i++) {
    if (times[i] > maxTime) {
      maxTime = times[i];
    }
  }

  for (var j = 0; j < names.length; j++) {
    if (names[j] === 'Вы') {
      colorForColumn = MY_COLOR;
    } else {
      colorForColumn = OTHER_COLOR;
    }
    renderStatisticPlayer(statisticStartX + distance, statisticStartY, colorForColumn, names[j], times[j]);
    distance = distance + DISTANCE_COLUMN + WIDTH_COLUMN;
  }
};

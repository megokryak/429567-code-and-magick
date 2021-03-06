'use strict';

window.renderStatistics = function (ctx, names, times) {
  var CLOUD_WIDTH = 420;
  var CLOUD_HEIGHT = 270;
  var CLOUD_START_X = 100;
  var CLOUD_START_Y = 10;
  var SHADOW_BIAS = 10;
  var WIDTH_COLUMN = 40;
  var COLOR_CLOUD = '#fff';
  var COLOR_SHADOW = 'rgba(0, 0, 0, 0.7)';
  var HEIGHT_BARCHART = 150;
  var DISTANCE_COLUMN = 50;
  var MY_COLOR = 'rgba(255, 0, 0, 1)';
  var OTHER_COLOR = 'rgba(0, 0, 255, ' + Math.random() + ')';

  var statisticStartX = CLOUD_START_X + 50;
  var statisticStartY = CLOUD_START_Y + CLOUD_HEIGHT - 35;
  var maxTime;

  renderCloud(CLOUD_START_X + SHADOW_BIAS, CLOUD_START_Y + SHADOW_BIAS, CLOUD_WIDTH, CLOUD_HEIGHT, COLOR_SHADOW, ctx);
  renderCloud(CLOUD_START_X, CLOUD_START_Y, CLOUD_WIDTH, CLOUD_HEIGHT, COLOR_CLOUD, ctx);
  renderText(CLOUD_START_X, CLOUD_START_Y, ctx);
  maxTime = searchMax(times);
  renderStatisticPlayer(statisticStartX, statisticStartY, names, times, HEIGHT_BARCHART, WIDTH_COLUMN, maxTime, MY_COLOR, OTHER_COLOR, DISTANCE_COLUMN, ctx);
};

var renderCloud = function (cloudStartX, cloudStartY, cloudWidth, cloudHeight, color, ctx) {

  var cloudEndX = cloudStartX + cloudWidth;
  var cloudEndY = cloudStartY + cloudHeight;
  var cloudCenterX = (cloudEndX - cloudStartX) / 2 + cloudStartX;
  var cloudCenterY = (cloudEndY - cloudStartY) / 2 + cloudStartY;

  ctx.fillStyle = color;
  ctx.strokeStyle = color;
  ctx.beginPath();
  ctx.moveTo(cloudStartX, cloudStartY);
  ctx.lineTo(cloudCenterX, cloudStartY + 10);
  ctx.lineTo(cloudEndX, cloudStartY);
  ctx.lineTo(cloudEndX - 10, cloudCenterY);
  ctx.lineTo(cloudEndX, cloudEndY);
  ctx.lineTo(cloudCenterX, cloudEndY - 10);
  ctx.lineTo(cloudStartX, cloudEndY);
  ctx.lineTo(cloudStartX + 10, cloudCenterY);
  ctx.closePath();
  ctx.stroke();
  ctx.fill();
};

var renderText = function (cloudStartX, cloudStartY, ctx) {
  var textStartX = cloudStartX + 30;
  var textStartY = cloudStartY + 30;
  var textStep = 20;

  ctx.font = '16px PT Mono';
  ctx.fillStyle = '#000';
  ctx.fillText('Ура вы победили!', textStartX, textStartY);
  ctx.fillText('Список результатов:', textStartX, textStartY + textStep);
};

var searchMax = function (times) {
  var max = 0;
  for (var i = 0; i < times.length; i++) {
    if (times[i] > max) {
      max = times[i];
    }
  }
  return max;
};

var renderStatisticPlayer = function (x, y, names, times, heightBarchart, widthColumn, maxTime, myColor, otherColor, distanceColumn, ctx) {
  var heightColumn;
  var distance = 0;
  var colorForColumn;

  for (var j = 0; j < names.length; j++) {
    if (names[j] === 'Вы') {
      colorForColumn = myColor;
    } else {
      colorForColumn = otherColor;
    }
    x = x + distance;
    times[j] = Math.round(times[j]);
    ctx.fillStyle = colorForColumn;
    heightColumn = times[j] * heightBarchart / maxTime;
    ctx.fillRect(x, y, widthColumn, -heightColumn);
    ctx.fillStyle = '#000';
    ctx.textBaseline = 'top';
    ctx.fillText(names[j], x + 5, y + 2);
    ctx.textBaseline = 'bottom';
    ctx.fillText(times[j], x + 5, y - heightColumn - 2);
    distance = distanceColumn + widthColumn;
  }
};

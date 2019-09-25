//  Белое облако с координатами [100, 10] высотой 270px и шириной 420px.
'use strict';
var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var MARGIN = 20;
var GAP = 20;
// Высота гистограммы 150px.
var BAR_HEIGHT = 150;
// Ширина колонки 40px.
var BAR_WIDTH = 40;
// Расстояние между колонками 50px.
var SPACE_BETWEEN = 50;
// Цвет колонки игрока Вы rgba(255, 0, 0, 1).
var YOUR_COLOR = 'rgba(255, 0, 0, 1)';
var OTHERS_COLOR = 240;
// Под облаком должна располагаться тень: многоугольник такой же формы,
// залитый цветом rgba(0, 0, 0, 0.7) (полупрозрачный чёрный), смещённый относительно белого на 10px вниз и вправо.
var SHADOW_COLOR = 'rgba(0, 0, 0, 0.7)';
var FONT_STYLE = '16px PT Mono';
var TEXT_COLOR = 'gray';
var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + CLOUD_WIDTH, y);
  ctx.bezierCurveTo(x + CLOUD_WIDTH - MARGIN / 2, y + CLOUD_HEIGHT * 0.33, x + CLOUD_WIDTH - MARGIN / 2, y + CLOUD_HEIGHT * 0.66, x + CLOUD_WIDTH, y + CLOUD_HEIGHT);
  ctx.lineTo(x, y + CLOUD_HEIGHT);
  ctx.bezierCurveTo(x + MARGIN / 2, y + CLOUD_HEIGHT * 0.66, x + MARGIN / 2, y + CLOUD_HEIGHT * 0.33, x, y);
  ctx.stroke();
  ctx.fill();
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {

      maxElement = arr[i];
    }
  }
  return maxElement;
};

var getPlayerHeight = function (playerTime, maxTime) {
  return Math.round(((BAR_HEIGHT - GAP * 2) * playerTime) / maxTime);
};

var getRandomColor = function (name, colorInDeg) {
  return (name === 'Вы') ? YOUR_COLOR : 'hsl(' + colorInDeg + ', 50%,' + Math.random() * 100 + '%)';
};

var renderBar = function (ctx, x, y, width, height, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height, color);
};

var renderText = function (ctx, text, x, y, textColor) {
  ctx.fillStyle = textColor;
  ctx.fillText(text, x, y);
};

window.renderStatistics = function (ctx, names, times) {

  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, SHADOW_COLOR);
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  var maxTime = getMaxElement(times);
  ctx.font = FONT_STYLE;
  ctx.fillStyle = YOUR_COLOR;
  renderText(ctx, 'Ура, вы победили!', CLOUD_X + MARGIN * 3, CLOUD_Y + MARGIN + GAP, TEXT_COLOR);
  renderText(ctx, 'Список результатов:', CLOUD_X + MARGIN * 3, CLOUD_Y + MARGIN + GAP * 2, TEXT_COLOR);

  for (var i = 0; i < names.length; i++) {
    var barPlayerHeight = getPlayerHeight(times[i], maxTime);
    var barX = CLOUD_X + MARGIN * 2 + i * (BAR_WIDTH + SPACE_BETWEEN);
    var barY = CLOUD_Y + CLOUD_HEIGHT - MARGIN - GAP - barPlayerHeight;
    var barColor = getRandomColor(names[i], OTHERS_COLOR);
    renderText(ctx, Math.round(times[i]), barX, barY - GAP, TEXT_COLOR);
    renderBar(ctx, barX, barY, BAR_WIDTH, barPlayerHeight, barColor);
    renderText(ctx, names[i], barX, barY + barPlayerHeight + GAP, TEXT_COLOR);
  }
};

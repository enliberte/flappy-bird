//определяем веб-элемент, в котором будет произодиться отрисовка, и контекст
canvas = document.getElementById("game");
context = canvas.getContext('2d');

//определяем внутриигровые объекты
//персонаж
char = new Image();
char.src = 'img/bird.png';
//задний фон
bg = new Image();
bg.src = 'img/bg.png';
//пол
fg = new Image();
fg.src = 'img/fg.png';
//верхняя труба
pipeUp = new Image();
pipeUp.src = 'img/pipeUp.png';
//нижняя труба
pipeBottom = new Image();
pipeBottom.src = 'img/pipeBottom.png';
//звук полета
fly = new Audio();
fly.src = 'audio/fly.mp3';
//звук набора очков
score = new Audio();
score.src = 'audio/score.mp3';

//экспортируем объекты
module.exports = {
    context: context,
    char: char,
    bg: bg,
    fg: fg,
    pipeUp: pipeUp,
    pipeBottom: pipeBottom,
    fly: fly,
    score: score
};


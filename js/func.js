//импортируем внутриигровые объекты
go = require('./game_objects');

//определяем функцию отрисовки
function draw() {
    go.context.drawImage(go.bg, 0, 0); //отрисовываем фон

    requestAnimationFrame(draw); //рекурсивно вызываем функцию для бесконечной отрисовки
}

//полет
flyUp = function(yPos) {
    go.fly.play();
    return (yPos - 25);
};

//создание блоков


module.exports = {
    draw: draw
};
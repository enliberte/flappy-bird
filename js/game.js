cvs = document.getElementById("game");
ctx = cvs.getContext("2d");
menu = document.getElementById("menu");
new_game_btn = document.querySelector('#new_game');
login_btn = document.querySelector('#login');
register_btn = document.querySelector('#register');
login_block = document.querySelector('#login_block');
register_block = document.querySelector('#register_block');
back_btn = document.querySelector('#back_btn');

bird = new Image(); bg = new Image(); fg = new Image();
pipeUp = new Image(); pipeBottom = new Image();
bird.src = "img/bird.png"; bg.src = "img/bg.png"; fg.src = "img/fg.png";
pipeUp.src = "img/pipeUp.png"; pipeBottom.src = "img/pipeBottom.png";
fly = new Audio(); score_audio = new Audio();
fly.src = "audio/fly.mp3"; score_audio.src = "audio/score.mp3";

game_continues = false;
grav = 1.5; gap = 90;
pipes = [];
pipes[0] = {x : cvs.width, y : 0};
score = 0;
bird_pos = {x: 10, y: 150};

function moveUp() {
    bird_pos.y -= 50;
    fly.play();
}

function fall_bird_down() {
    bird_pos.y += grav;
}

function show_score() {
    ctx.fillStyle = "#000";
    ctx.font = "24px pixel_font";
    ctx.fillText("Score: " + score, 10, cvs.height - 20);
}

function initial() {
    game_continues = true;
    pipes = [];
    pipes[0] = {x : cvs.width, y : 0};
    score = 0;
    bird_pos = {x: 10, y: 150}
}

function start_game() {
    menu.classList.add('hidden');
    cvs.classList.remove('hidden');
    initial();
    draw();
}

function draw_pipes() {
    ctx.drawImage(pipeUp, pipes[i].x, pipes[i].y);
    ctx.drawImage(pipeBottom, pipes[i].x, pipes[i].y + pipeUp.height + gap);
}

function move_pipes() {
    pipes[i].x--;
}

function add_new_pipe() {
    if (pipes[i].x === 125) {
        pipes.push({x : cvs.width, y : Math.floor(Math.random() * pipeUp.height) - pipeUp.height});
    }
}

function raise_score() {
    if (pipes[i].x === 5) {
        score++;
        score_audio.play();
    }
}

function check_collisions() {
    if (bird_pos.x + bird.width >= pipes[i].x
        && bird_pos.x <= pipes[i].x + pipeUp.width
        && (bird_pos.y <= pipes[i].y + pipeUp.height
            || bird_pos.y + bird.height >= pipes[i].y + pipeUp.height + gap)
        || bird_pos.y + bird.height >= cvs.height - fg.height) {
        draw_menu();
    } else {
        move_pipes();
        raise_score();
    }
}

function draw() {
    document.addEventListener('keydown', moveUp);
    document.addEventListener('touchstart', moveUp);
    cancelAnimationFrame(draw_menu);
    ctx.drawImage(bg, 0, 0);
    if (game_continues) {
        ctx.drawImage(bird, bird_pos.x, bird_pos.y);
        fall_bird_down();
        for (i = 0; i < pipes.length; i++) {
            draw_pipes();
            add_new_pipe();
            check_collisions();
        }
        ctx.drawImage(fg, 0, cvs.height - fg.height);
        show_score();
        requestAnimationFrame(draw);
    }

}

function draw_menu(){
    game_continues = false;
    cancelAnimationFrame(draw);
    document.removeEventListener('keydown', moveUp);
    document.removeEventListener('touchstart', moveUp);

    cvs.classList.add('hidden');
    menu.classList.remove('hidden');
    new_game_btn.classList.remove('hidden');
    login_btn.classList.remove('hidden');
    register_btn.classList.remove('hidden');
    login_block.classList.add('hidden');
    register_block.classList.add('hidden');
    back_btn.classList.add('hidden');
}

function draw_login_form(){
    new_game_btn.classList.add('hidden');
    login_btn.classList.add('hidden');
    register_btn.classList.add('hidden');
    login_block.classList.remove('hidden');
    back_btn.classList.remove('hidden');
}

function draw_register_form(){
    new_game_btn.classList.add('hidden');
    login_btn.classList.add('hidden');
    register_btn.classList.add('hidden');
    register_block.classList.remove('hidden');
    back_btn.classList.remove('hidden');
}
pipeBottom.onload = draw_menu;
//обработчики кнопок
//новая игра
new_game_btn.addEventListener('click', start_game);
new_game_btn.addEventListener('touchstart', start_game);
//аутентификация
login_btn.addEventListener('click', draw_login_form);
login_btn.addEventListener('touchstart', draw_login_form);
//регистрация
register_btn.addEventListener('click', draw_register_form);
register_btn.addEventListener('touchstart', draw_register_form);
//назад в меню
back_btn.addEventListener('click', draw_menu);
back_btn.addEventListener('touchstart', draw_menu);


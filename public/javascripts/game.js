const buttonContainer = document.querySelector('#button-container');
const gameContainer = document.querySelector('#game-container');

const secondsEl = document.querySelector('#seconds');
const addEl = document.querySelector('#add');
const subtractEl = document.querySelector('#subtract');

const scoreEl = document.querySelector('#score');

const restartGameEl = document.querySelector('#restart-game');

const target = document.querySelector('.target');

const gameState = {
    score: 0,
    seconds: 10,
    accuracy: 100,
};

function startGame() {
    const divs = buttonContainer.getElementsByTagName('div');
    for (let i = 0; i < divs.length; i++) {
        divs[i].classList.add('hide');
    }
    target.classList.remove('disable');
    gameContainer.classList.remove('center');
    movement();
    target.addEventListener('click', () => {
        movement();
        incrementScore();
    });
}

function timer() {
    subtractEl.classList.add('disable');
    addEl.classList.add('disable');
    setInterval(() => {
        if (seconds === 0) return;
        seconds--;
        secondsEl.textContent = ' ' + seconds;
        if (seconds === 0) {
            ballEl.classList.add('disable');
            subtractEl.classList.add('disable');
            addEl.classList.add('disable');
            restartGameEl.classList.remove('hide');
        }
    }, 1000);
}

function movement() {
    target.style.top = `${Math.random() * 73}%`;
    target.style.left = `${Math.random() * 65}%`;
}

const buttonContainer = document.querySelector('#button-container');
const buttons = buttonContainer.getElementsByTagName('div');
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
    avgAccuracy: null,
    totalAccuracy: null,
    ended: false,
    top: Math.random() * 75,
    left: Math.random() * 90,
    moveInterval: null,
};

secondsEl.textContent = ' ' + gameState.seconds;
scoreEl.textContent = gameState.score;

addEl.addEventListener('mousedown', () => {
    gameState.seconds++;
    secondsEl.textContent = ' ' + gameState.seconds;
});

subtractEl.addEventListener('mousedown', () => {
    if (gameState.seconds > 3) gameState.seconds--;
    secondsEl.textContent = ' ' + gameState.seconds;
});

async function startGame() {
    if (user?.status !== 'loggedin') {
        alert('Please log in to play the game!');
        return;
    }
    for (const div of buttons) {
        div.classList.add('hide');
    }
    target.classList.remove('disable');
    gameContainer.classList.remove('center');

    target.style.top = `${gameState.top}%`;
    target.style.left = `${gameState.left}%`;
    let firstClick = true;
    target.addEventListener('click', (event) => {
        if (gameState.ended) return;
        if (firstClick) {
            timer();
            addEl.classList.add('disable');
            subtractEl.classList.add('disable');
            firstClick = false;
        }
        clearInterval(gameState.moveInterval);
        movement();
        const accuracy = calculateAccuracyScore(target, event.clientX, event.clientY);
        if (gameState.avgAccuracy === null) {
            gameState.avgAccuracy = accuracy;
        } else {
            gameState.avgAccuracy = (gameState.totalAccuracy + accuracy) / gameState.score;
        }
        incrementScore(accuracy);
    });
}

function restartGame() {
    location.reload();
}

function timer() {
    subtractEl.classList.add('disable');
    addEl.classList.add('disable');
    setInterval(() => {
        if (gameState.seconds === 0) return;
        gameState.seconds--;
        secondsEl.textContent = ' ' + gameState.seconds;
        if (gameState.seconds === 0) {
            gameState.ended = true;
            target.classList.add('disable');
            subtractEl.classList.add('disable');
            addEl.classList.add('disable');
            restartGameEl.classList.remove('hide');
        }
    }, 1000);
}

function incrementScore(accuracy) {
    gameState.score++;
    gameState.totalAccuracy += accuracy;
    scoreEl.textContent = gameState.score;
}

function calculateAccuracyScore(image, clickX, clickY) {
    const centerX = image.offsetLeft + image.offsetWidth / 2;
    const centerY = image.offsetTop + image.offsetHeight / 2;

    const distance = Math.sqrt(Math.pow(centerX - clickX, 2) + Math.pow(centerY - clickY, 2));
    const maxDistance = Math.sqrt(Math.pow(image.offsetWidth, 2) + Math.pow(image.offsetHeight, 2)) / 2;

    let accuracy = Math.round((1 - distance / maxDistance) * 100);
    accuracy = Math.max(0, Math.min(accuracy, 100));

    return accuracy;
}

function movement() {
    const randomTop = Math.random() * 75;
    const randomLeft = Math.random() * 90;

    const distanceX = randomLeft - gameState.left;
    const distanceY = randomTop - gameState.top;

    const steps = 30; // number of steps for the animation
    const duration = 10; // duration of each step in milliseconds

    let stepCount = 0;
    const stepX = distanceX / steps;
    const stepY = distanceY / steps;

    const interval = setInterval(() => {
        gameState.left += stepX;
        gameState.top += stepY;

        target.style.top = `${gameState.top}%`;
        target.style.left = `${gameState.left}%`;

        stepCount++;
        if (stepCount === steps && interval === gameState.moveInterval) {
            clearInterval(interval);
        }
    }, duration);

    gameState.moveInterval = interval;
}

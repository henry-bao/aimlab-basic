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
    round: 0,
    hit: 0,
    seconds: 20,
    totalAccuracy: 0,
    avgAccuracy: null,
    ended: false,
    moveInterval: null,
};

secondsEl.textContent = ' ' + gameState.seconds;
scoreEl.textContent = `${gameState.hit} / ${gameState.round}`;

addEl.addEventListener('click', () => {
    gameState.seconds++;
    secondsEl.textContent = ' ' + gameState.seconds;
});

subtractEl.addEventListener('click', () => {
    if (gameState.seconds > 3) gameState.seconds--;
    secondsEl.textContent = ' ' + gameState.seconds;
});

async function startGame() {
    if (user?.status !== 'loggedin') {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            html: `<p class="alert-text">Please log in to play the game!</p>`,
        });
        return;
    }
    for (const div of buttons) {
        div.classList.add('hide');
    }
    target.classList.remove('disable');
    gameContainer.classList.remove('center');

    timer();
    movement();

    let firstClick = true;
    target.addEventListener('click', (event) => {
        if (gameState.ended) return;
        if (firstClick) {
            addEl.classList.add('disable');
            subtractEl.classList.add('disable');
            firstClick = false;
        }
        if (gameState.moveInterval) {
            clearInterval(gameState.moveInterval);
        }
        incrementScore();
        movement();
        const accuracy = calculateAccuracyScore(target, event.clientX, event.clientY);
        incrementAccuracy(accuracy);
    });
}

function restartGame() {
    location.reload();
}

function timer() {
    subtractEl.classList.add('disable');
    addEl.classList.add('disable');
    const totalTime = gameState.seconds;
    setInterval(async () => {
        if (gameState.seconds === 0) return;
        gameState.seconds--;
        secondsEl.textContent = ' ' + gameState.seconds;
        if (gameState.seconds === 0) {
            gameState.round -= 1;
            gameState.ended = true;
            clearInterval(gameState.moveInterval);
            target.classList.add('disable');
            subtractEl.classList.add('disable');
            addEl.classList.add('disable');
            restartGameEl.classList.remove('hide');

            try {
                const postReult = await fetchJSON('api/game/result', {
                    method: 'POST',
                    body: {
                        hit: gameState.hit,
                        round: gameState.round,
                        seconds: totalTime,
                        accuracy: gameState.avgAccuracy.toFixed(2),
                        game_date: new Date(),
                    },
                });
                if (postReult.status === 'success') {
                    Swal.fire({
                        icon: 'success',
                        title: 'Game Over!',
                        text: ``,
                        allowOutsideClick: false,
                        html: `<p class="alert-text"><strong>Score: </strong> <span>${gameState.hit} / ${
                            gameState.round
                        }</span></p>
                        <p class="alert-text"><strong>Accuracy: </strong> <span>${gameState.avgAccuracy.toFixed(
                            2
                        )}%</span></p>
                        <p class="alert-text"><strong>Time: </strong> <span>${totalTime} seconds</span></p>`,
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        html: `<p class="alert-text">${postReult.message}</p>`,
                    });
                }
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    html: `<p class="alert-text">${error.message}</p>`,
                });
            }
        }
    }, 1000);
}

function incrementScore() {
    gameState.hit++;
    refreshScore();
}

function refreshScore() {
    scoreEl.textContent = `${gameState.hit} / ${gameState.round}`;
}

function incrementAccuracy(accuracy) {
    console.log('Accuracy: ' + accuracy);
    gameState.totalAccuracy += accuracy;
    if (gameState.avgAccuracy === null) {
        gameState.avgAccuracy = accuracy;
    } else {
        gameState.avgAccuracy = (gameState.totalAccuracy + accuracy) / gameState.round;
    }
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
    gameState.round++;

    const randomStartTop = Math.random() * 75;
    const randomStartLeft = Math.random() * 90;

    const randomEndTop2 = Math.random() * 75;
    const randomEndLeft2 = Math.random() * 90;

    const distanceX = randomEndLeft2 - randomStartLeft;
    const distanceY = randomEndTop2 - randomStartTop;

    const steps = 150; // number of steps for the animation
    const duration = 10; // duration of each step in milliseconds

    let stepCount = 0;
    const stepX = distanceX / steps;
    const stepY = distanceY / steps;

    const interval = setInterval(() => {
        if (stepCount === steps) {
            clearInterval(interval);
            incrementAccuracy(0);
            refreshScore();
            movement();
            return;
        }
        stepCount++;
        target.style.top = `${randomStartTop + stepCount * stepY}%`;
        target.style.left = `${randomStartLeft + stepCount * stepX}%`;
    }, duration);

    gameState.moveInterval = interval;
}

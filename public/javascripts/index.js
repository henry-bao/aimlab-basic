let username = null;
let score = 0;
let validClick = 0;
let missClick = 0;
let accuracy = -1;
let id = null;

const GAME_TIME_LIMIT = 19;

function miss() {
    missClick++;
}

async function promptUsername() {
    let prepDiv = document.getElementById('prep');

    let prepResponse = await fetch('gamePrep');

    let prepHTML = await prepResponse.text();
    prepDiv.innerHTML = prepHTML;
}

async function startGame() {
    missClick = 0;
    username = document.getElementById('username').value;
    let body = document.getElementById('homePage');
    body.innerHTML = '';

    let gameResponse = await fetch('game');

    let gameHTML = await gameResponse.text();
    body.innerHTML = `<div id="timer">${GAME_TIME_LIMIT}s</div>`;
    body.innerHTML += gameHTML;

    let timeleft = GAME_TIME_LIMIT;
    let downloadTimer = setInterval(function () {
        if (timeleft <= 0) {
            accuracy = parseFloat(accuracy.toFixed(2));
            clearInterval(downloadTimer);
            document.getElementById('in-game-button').disabled = true;
            document.getElementById('game-result').innerHTML = `
          <p>Game Over!</p>
          <p>Username: ${username}</p>
          <p>Score: ${score}</p>
          <p>Accuracy: ${accuracy}</p>
          <p>Your score has been saved!!</p>
          <button onclick="redirectToMain()">Back to Main Menu</button>
        `;
            postGameResult();
        }
        document.getElementById('timer').innerHTML = timeleft + 's';
        timeleft -= 1;
    }, 1000);
}

async function postGameResult() {
    await fetch(`/gameResult`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: username, score: score, accuracy: accuracy }),
    });
}

async function showLeaderboard() {
    let response = await fetch('gameResult');
    let responseJson = await response.json();
    let body = document.getElementById('homePage');
    body.innerHTML = '';
    body.innerHTML = `<button onclick="redirectToMain()">Back to Main Menu</button>`;
    body.innerHTML += responseJson
        .map((player) => {
            let date = new Date(player.game_date);
            date = date.toDateString();
            return `
        <div class="playerRecord">
            <p>Player: ${player.username}</p>
            <p>Score: ${player.score}</p>
            <p>Accuracy: ${player.accuracy}</p>
            <p>Played On: ${date}</p>
        </div>
        `;
        })
        .join('\n');
}

function changePosition() {
    score += 10;
    validClick++;
    accuracy = validClick / missClick;
    console.log('hit: ' + validClick);
    console.log('miss: ' + missClick);
    console.log(accuracy);

    if (score < 50) {
        let target = document.getElementById('target');
        let leftRandom = Math.floor(Math.random() * 90);
        let topRandom = Math.floor(Math.random() * 90);
        target.style.left = leftRandom + '%';
        target.style.top = topRandom + '%';
    } else {
        buttonMove();
    }
}

function buttonMove() {
    let leftToRight = true;
    let topToBottom = true;
    let startLeftPos = Math.floor(Math.random() * 90);
    let startTopPos = Math.floor(Math.random() * 90);
    let target = document.getElementById('target');
    target.style.left = startLeftPos + '%';
    target.style.top = startTopPos + '%';
    let endLeftPos = Math.floor(Math.random() * 90);
    let endTopPos = Math.floor(Math.random() * 90);
    if (startLeftPos > endLeftPos) {
        leftToRight = false;
    }
    if (endTopPos < startTopPos) {
        topToBottom = false;
    }

    // let id = null

    clearInterval(id);
    id = setInterval(frame, 40);
    function frame() {
        if (startLeftPos == endLeftPos && startTopPos == endTopPos) {
            clearInterval(id);
        } else if (startLeftPos == endLeftPos) {
            if (topToBottom) {
                startTopPos++;
            } else {
                startTopPos--;
            }
            target.style.left = startLeftPos + '%';
            target.style.top = startTopPos + '%';
        } else if (startTopPos == endTopPos) {
            if (leftToRight) {
                startLeftPos++;
            } else {
                startLeftPos--;
            }
            target.style.left = startLeftPos + '%';
            target.style.top = startTopPos + '%';
        } else {
            if (leftToRight) {
                startLeftPos++;
            } else {
                startLeftPos--;
            }
            if (topToBottom) {
                startTopPos++;
            } else {
                startTopPos--;
            }
            target.style.left = startLeftPos + '%';
            target.style.top = startTopPos + '%';
        }
    }
}

function redirectToMain() {
    document.location.href = '/';
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

async function getHistory() {
    console.log("work")
    let history = await fetchJSON(`api/game/get-history`);
    console.log(history)
    let gameHistoryDiv = document.getElementById('game_history');
    gameHistoryDiv.innerHTML = '';
    gameHistoryDiv.innerHTML += responseJson.map(player => {
        let date = new Date(player.game_date)
        date = date.toDateString()
        return `
        <div>
            <p>Player: ${player.username}</p>
            <p>Score: ${player.score}</p>
            <p>Accuracy: ${player.accuracy}</p>
            <p>Played On: ${date}</p>
        </div>
        `
    }).join("\n");

}

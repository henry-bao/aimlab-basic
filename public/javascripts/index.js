let username = undefined;
let score = 0;
let validClick = 0;
let missClick = 0;
let accuracy = -1;

function miss() {
  missClick++;
}

async function promptUsername() {

  // Get ready to start a game. Go to gamePrep route
  let prepDiv = document.getElementById('prep')

  let prepResponse = await fetch('gamePrep')

  let prepHTML = await prepResponse.text()
  prepDiv.innerHTML = prepHTML

}

async function startGame() {
  missClick = 0
  username = document.getElementById("username").value
  let body = document.getElementById("homePage")
  body.innerHTML = ""

  let gameResponse = await fetch('game')

  let gameHTML = await gameResponse.text()
  body.innerHTML = gameHTML


    let timeleft = 9;
    let downloadTimer = setInterval(function(){
      if(timeleft <= 0){
        clearInterval(downloadTimer);
        document.getElementById("in-game-button").disabled = true
        document.getElementById("game-result").innerHTML = `
          <p>Game Over!</p>
          <p>Username: ${username}</p>
          <p>Score: ${score}</p>
          <p>Accuracy: ${accuracy}</p>
          <p>Your score has been saved!!</p>
          <p>You will be redirected in 2 seconds..</p>
        `
        postGameResult();
        setTimeout(() => {
          document.location.href="/";
        }, 2000)
      }
    document.getElementById("timer").innerHTML = timeleft + "s";
    timeleft -= 1;
  }, 1000);

}

async function postGameResult() {
  await fetch(`/gameResult`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({username: username, score: score, accuracy: accuracy})
  })
}

function changePosition() {
  score += 10
  validClick ++
  accuracy = validClick / missClick
  console.log("hit: " + validClick)
  console.log("miss: " + missClick)
  console.log(accuracy)
  let target = document.getElementById("target")
  let leftRandom = Math.floor(Math.random() * 100);
  let topRandom = Math.floor(Math.random() * 100);
  target.style.left = leftRandom + "%"
  target.style.top= topRandom + "%"
}
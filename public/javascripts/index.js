let username = undefined;
let score = 0;

async function promptUsername() {

  // Get ready to start a game. Go to gamePrep route
  let prepDiv = document.getElementById('prep')

  let prepResponse = await fetch('gamePrep')

  let prepHTML = await prepResponse.text()
  prepDiv.innerHTML = prepHTML

}

async function startGame() {
  username = document.getElementById("username").value
  let body = document.getElementById("homePage")
  body.innerHTML = ""

  let gameResponse = await fetch('game')

  let gameHTML = await gameResponse.text()
  body.innerHTML = gameHTML
}

function changePosition() {
  let target = document.getElementById("target")
  console.log(target)
  target.style.left = "15%"
  target.style.top= "20%"
}
let username = undefined;

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
  console.log("starting game...")

  console.log(username)
}
async function startGame() {

  // Get ready to start a game. Go to gamePrep route
  console.log("start")
  let prepDiv = document.getElementById('prep')
  let prepResponse = await fetch('gamePrep')
  let prepHTML = await prepResponse.text()
  prepDiv.innerHTML = prepHTML
}



function displayScore(leaderboard, score, scoreContainer) {
    // console.log(leaderboard);
    scoreContainer.innerHTML = "";
    const html = `
    <h1>Overall Score: ${score}</h1>`;

    scoreContainer.insertAdjacentHTML("afterbegin", html);
  }



  export { displayScore}
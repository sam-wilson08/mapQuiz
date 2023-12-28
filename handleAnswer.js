

function handleCorrectAnswer() {
    this.score += this.bonus;
    this.questionCounter++;
  
    const html = `<p id="correctMessage">Correct ✅</p>`;
  
    this.displayResult.insertAdjacentHTML("afterbegin", html);

  }

  function handleIncorrectAnswer() {

    this.incorrectCountries.push(this.randomFlag);
    this.incorrectCountriesFlag.push(this.questionFlag);
    this.questionCounter++;


    const html = `<p id="incorrectMessage">Incorrect! ❌</p>`;

    this.displayResult.insertAdjacentHTML("afterbegin", html)
  }

  export { handleCorrectAnswer, handleIncorrectAnswer}



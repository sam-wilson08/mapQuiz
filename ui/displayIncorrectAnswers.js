function displayIncorrectAnswers() {

    const incorrectAnswersBtn = document.querySelector("#incorrectAnswersBtn");

    if (!this.displayingIncorrectAnswers) {
      // Display incorrect answers
      if (this.incorrectCountries.length === 0) {
        const html = `
                <div>
                    <p>No Countries Incorrect</p>
                </div>
            `;
        this.viewIncorrectAnswersContainer.insertAdjacentHTML(
          "afterbegin",
          html
        );
      } else {
        for (let i = 0; i < this.incorrectCountriesFlag.length; i++) {
          const countryFlag = this.incorrectCountriesFlag[i];
          const incorrectCountry = this.incorrectCountries[i];

          const html = `
                    <div id="incorrectCountriesList">
                        <p>${incorrectCountry}</p>
                        <img class="flag" src="${countryFlag}" alt="Flag of ${incorrectCountry}">
                    </div>
                `;
          this.viewIncorrectAnswersContainer.insertAdjacentHTML(
            "afterbegin",
            html
          );
        }
      }

      this.displayingIncorrectAnswers = true; // Set flag to true when displaying incorrect answers
      incorrectAnswersBtn.textContent = "Hide Incorrect Answers";
    } else {
      // If incorrect answers are already displayed, hide them
      this.viewIncorrectAnswersContainer.innerHTML = "";
      this.displayingIncorrectAnswers = false; // Set flag to false when hiding incorrect answers
      incorrectAnswersBtn.textContent = "View Incorrect Answers";
    }
  }


  export { displayIncorrectAnswers}
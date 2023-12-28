

function  displayOptions() {
    const options = [
      { element: document.querySelector("#option1"), value: this.randomFlagOptionOne },
      { element: document.querySelector("#option2"), value: this.randomFlagOptionTwo },
      { element: document.querySelector("#option3"), value: this.randomFlagOptionThree },
      { element: document.querySelector("#option4"), value: this.randomFlagOptionFour }
    ];
  
    options.forEach(option => {
      option.element.textContent = option.value;
    });
  
    const answerLocation = Math.floor(Math.random() * 4) + 1;
    const answerElement = document.querySelector(`#option${answerLocation}`);
  
    answerElement.textContent = this.randomFlag;
  }

  export { displayOptions}
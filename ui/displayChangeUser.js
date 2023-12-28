


function changeUser() {
    this.changeUserContainer.style.display = "none"
    this.startQuizBtn.style.display ="none"
    this.username.value =""
    this.userNameLogin.style.display = "block";
    this.questionNumberContainer.style.display = "none"
    this.scoreContainer.style.display ="none"
    this.endGameOptionsContainer.style.display ="none"
    this.incorrectAnswersBtn.style.display ="none"
    this.viewIncorrectAnswersContainer.innerHTML = "";

  }

  export { changeUser}
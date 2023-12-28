"use-strict";

import { displayLeaderBoard } from './ui/displayLeaderboard.js';
import { displayScore } from './ui/displayScore.js';
import { displayQuestionNumber } from './ui/displayQuestionNumber.js';
import { displayIncorrectAnswers } from './ui/displayIncorrectAnswers.js';
import { handleCorrectAnswer, handleIncorrectAnswer } from './handleAnswer.js';
import { displayOptions } from './ui/displayOptions.js';
import { getFlag } from './getters/getFlag.js';
import { getData } from './getters/getData.js';
import { changeUser } from './ui/displayChangeUser.js';


class App {
  answerContainer; questionContainer;   questionCounter = 0;  questionNumber;  score = 0;  scoreContainer;   quizStarted = false;  bonus;  questionInterval;  questionTimer;  countryNamesArray;  questionFlag;
  randomFlagOptionOne;  randomFlagOptionTwo;  randomFlagOptionThree;  randomFlagOptionFour;  randomFlag;
  questionNumberContainer;  noOfQuestions = 20;  incorrectCountries = [];  incorrectCountriesFlag = [];  endGameOptionsContainer;
  users;  username;  leaderboard = [];  leaderboardContainer; changeUserContainer; changeUser; displayChangeUser;
  viewIncorrectAnswersContainer;  viewLeaderboardBtn;  startQuizBtn; incorrectAnswersBtn;
  userNameLogin;  loadingContainer;  displayingLeaderboard = false;  displayingIncorrectCountries = false;  resultContainer;  displayResult;  displayingIncorrectCountries = false

  constructor() {


    const submitUsernameBtn = document.querySelector("#submitUsernameBtn");
    const { countryNamesArray, users } = getData();
    const options = document.querySelectorAll(".option");
    options.forEach(option => {option.addEventListener("click", this.optionSelected.bind(this));});



     // Load leaderboard data from local storage
    this.loadLeaderboardFromStorage();

    this.incorrectAnswersBtn = document.querySelector("#incorrectAnswersBtn");
    this.optionSelected = this.optionSelected.bind(this);
    this.startQuizBtn = document.querySelector("#startBtn");
    this.startQuizBtn.style.display = "none";
    this.userNameLogin = document.querySelector("#usernameForm");
    this.displayResult = document.querySelector("#resultContainer")
    this.loadingContainer = document.querySelector("#loadingContainer");
    this.questionNumber = document.querySelector("#questionNumber");
    this.questionNumberContainer = document.querySelector("#questionNumberContainer");
    this.changeUserContainer = document.querySelector("#changeUserContainer")
    this.username = document.querySelector("#inputField");
    this.endGameOptionsContainer = document.querySelector("#endGameOptionsContainer");
    this.leaderboardContainer = document.querySelector("#leaderboardContainer");
    this.bonusContainer = document.querySelector("#bonusContainer");
    this.answerContainer = document.querySelector("#answerContainer");
    this.questionContainer = document.querySelector("#questionContainer");
    this.scoreContainer = document.querySelector("#scoreContainer");
    this.viewIncorrectAnswersContainer = document.querySelector("#viewIncorrectAnswersContainer");
    this.viewLeaderboardBtn = document.querySelector("#viewLeaderboardBtn");
    this.changeUserContainer.style.display = "none"
    this.countryNamesArray = countryNamesArray; // Define countryNamesArray as a class property
    this.users = users;

    this.viewLeaderboardBtn.addEventListener('click',displayLeaderBoard.bind(this));
    this.startQuizBtn.addEventListener("click", this.displayLoading.bind(this));
    submitUsernameBtn.addEventListener("click",this.submitUsernameBtn.bind(this));
    incorrectAnswersBtn.addEventListener("click", () => {displayIncorrectAnswers.call(this, this.displayingIncorrectCountries,this.incorrectCountries,this.incorrectCountriesFlag, this.viewIncorrectAnswersContainer,);});

  }

  loadLeaderboardFromStorage() {
    
    const storedLeaderboard = JSON.parse(localStorage.getItem("leaderboard"));
    if (storedLeaderboard) {
      this.leaderboard = storedLeaderboard.map(user => ({
        nameID: user.nameID,
        score: user.score,
      }));
    }
  }

    // Function to handle username submission
  submitUsernameBtn(e) {
    e.preventDefault();
    console.log(this.username.value);

    if(this.username.value.length > 0){
      this.startQuizBtn.style.display = "block";
    }

  }
 // Function to display loading message before starting the quiz
  displayLoading() {
    this.startQuizBtn.style.display = "none";
    const html = `<div>
    <p id="loadingMessage"> Loading Get Ready... </p>
    </div>`;

    this.loadingContainer.insertAdjacentHTML("afterbegin", html);

    setTimeout(() => {
      this.startQuiz();
    }, 2000);
  }

  // Function to start the quiz
  async startQuiz() {
    if (this.quizStarted === true) {
      console.log("Quiz already started");
    } else {

      this.resetGame()

      displayQuestionNumber(this.questionNumberContainer, this.username, this.questionCounter, this.noOfQuestions);
      this.displayQuestion();
      answerContainer.style.display = "flex"; // Assuming answerContainer exists

      this.createOptions();
      displayScore(this.leaderboard, this.score, this.scoreContainer);
    }
  }

  // Function to reset the game state
  resetGame(){
    this.incorrectAnswersBtn.style.display = "none"
    this.viewIncorrectAnswersContainer.innerHTML = "";
    this.displayingIncorrectAnswers = false; 
    incorrectAnswersBtn.textContent = "View Incorrect Answers";
    this.questionNumberContainer.style.display = "block"
    this.scoreContainer.style.display ="block"
    this.changeUserContainer.style.display = "none"
    this.viewLeaderboardBtn.style.display = "none"
    this.displayingLeaderboard = false;
    this.displayingIncorrectCountries = false;
    this.loadingContainer.innerHTML = "";
    this.userNameLogin.style.display = "none";
    this.questionCounter = 0;
    this.score = 0;
    this.quizStarted = true;
    this.endGameOptionsContainer.innerHTML = "";
    this.leaderboardContainer.innerHTML = "";
    this.viewIncorrectAnswersContainer.innerHTML = "";
    this.incorrectCountries = [];
    this.incorrectCountriesFlag = [];
  }

 // Function to create multiple choice options for the quiz
  createOptions() {
    const getRandomUniqueCountry = (countryArray, excludeCountry) => {
      let randomIndex = Math.floor(Math.random() * countryArray.length);
      while (countryArray[randomIndex] === excludeCountry) {
        randomIndex = Math.floor(Math.random() * countryArray.length);
      }
      return countryArray.splice(randomIndex, 1)[0];
    };

    const countryOptions = [...this.countryNamesArray]; 
    const correctAnswer = this.randomFlag;

    this.randomFlagOptionOne = getRandomUniqueCountry(
      countryOptions,
      correctAnswer
    );

    this.randomFlagOptionTwo = getRandomUniqueCountry(
      countryOptions,
      correctAnswer
    );

    this.randomFlagOptionThree = getRandomUniqueCountry(
      countryOptions,
      correctAnswer
    );

    this.randomFlagOptionFour = getRandomUniqueCountry(
      countryOptions,
      correctAnswer
    );

    displayOptions.call(this, this.randomFlag, this.randomFlagOptionOne, this.randomFlagOptionTwo, this.randomFlagOptionThree, this.randomFlagOptionFour );
  }

  async displayQuestion() {
    await getFlag.call(this, this.countryNamesArray, this.randomFlag, this.questionFlag)

    this.bonus = 10;
    const html = `
      <img id="flag" src="${this.questionFlag}" alt="Description of the image">
    `;

    this.questionContainer.style.opacity =1
    this.questionContainer.insertAdjacentHTML("afterbegin", html);
    this.questionContainer.style.display = "block"; 

    this.timer();
  }

 // Function to handle the timer for each question
  timer() {
    this.intervalMessage()
    this.questionInterval = setInterval(() => this.intervalMessage(), 1000);
  }

   // Function to display interval messages during the timer countdown
  intervalMessage() {
    this.bonusContainer.innerHTML = "";

    const html = `
    <h1>Speed Bonus: ${this.bonus}</h1>`;
    this.bonus--;

    this.bonusContainer.insertAdjacentHTML("afterbegin", html);

    if (this.bonus === -1) {
      this.cancelIntervalTimer();
    }
  }

  // Function to cancel the interval timer for each question
  cancelIntervalTimer() {
    clearInterval(this.questionInterval);
    this.questionCounter++;
    this.questionContainer.innerHTML = "";
    this.checkCount();
    this.loadQuestion();
  }


  loadQuestion() {
    if (this.quizStarted === true) {
      this.displayQuestion();
      this.createOptions();
      displayQuestionNumber(this.questionNumberContainer, this.username, this.questionCounter, this.noOfQuestions);

    }
  }
  // Function to handle when an option is selected by the user
  optionSelected(event) {
    const selectedButton = event.target;
    const answer = selectedButton.textContent;
    this.questionContainer.style.opacity =0
  
    if (this.questionCounter < this.noOfQuestions) {
      if (answer === this.randomFlag) {
        handleCorrectAnswer.call(this, this.score, this.bonus, this.questionCounter, this.displayResult);
      } else {
        handleIncorrectAnswer.call(this, this.incorrectCountries, this.randomFlag, this.incorrectCountriesFlag, this.questionFlag, this.questionCounter, this.displayResult);
      }
      clearInterval(this.questionInterval);
      setTimeout(() => {
        this.loadNextQuestion();
      }, 1000);
    }
  }
  // Function to load the next question
  loadNextQuestion(){
    this.displayResult.innerHTML =""
    this.questionContainer.innerHTML = "";
    clearInterval(this.questionInterval);
    displayScore(this.leaderboard, this.score, this.scoreContainer);
    displayQuestionNumber(this.questionNumberContainer, this.username, this.questionCounter, this.noOfQuestions);
    this.checkCount();
    this.loadQuestion();
  }

  // Function to check the question count and display the end game UI 
  checkCount() {
    if (this.questionCounter === this.noOfQuestions) {

      let scoreUpdated = false;
      for (let j = 0; j < this.leaderboard.length; j++) {
        if (this.username.value === this.leaderboard[j].nameID) {
          if (this.score >= this.leaderboard[j].score) {
            this.leaderboard[j].score = this.score;
            scoreUpdated = true;
            break; // Exit the loop once the score is updated
          }
        }
      }

      if (!scoreUpdated) {
        this.leaderboard.push({
          nameID: this.username.value,
          score: this.score,
        });
      }

      localStorage.setItem("leaderboard", JSON.stringify(this.leaderboard));

      this.displayEndGameUI()

      displayScore(this.leaderboard, this.score, this.scoreContainer);
      
    const changeUserBtn = document.querySelector("#changeUserBtn");

     changeUserBtn.addEventListener("click", () =>  changeUser.call(this, this.changeUserContainer, this.startQuizBtn, this.username.value, this.userNameLogin, this.questionNumberContainer, this.scoreContainer, this.endGameOptionsContainer))

  }
}
  // Function to display the end game UI
displayEndGameUI(){
  this.startQuizBtn.style.display = "block";
  this.viewLeaderboardBtn.style.display = "block"
  this.incorrectAnswersBtn.style.display ="block"
  this.questionContainer.style.display = "none";
  this.answerContainer.style.display = "none";
  this.changeUserContainer.style.display ="block"
  this.bonusContainer.innerHTML = "";
  this.quizStarted = false;
  this.questionCounter = 0;
}

}
 

const app = new App();




function displayQuestionNumber(questionNumberContainer, username, questionCounter, noOfQuestions) {
  questionNumberContainer.innerHTML = "";

  const html = `
  <h1> Playing as: ${username.value}</h1>
  <h1> Question ${questionCounter}/${noOfQuestions}</h1>`;

  questionNumberContainer.insertAdjacentHTML("afterbegin", html);
}


export { displayQuestionNumber}
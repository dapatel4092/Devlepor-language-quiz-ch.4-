var startScreen = document.getElementById("start-pg");
var quizContainer = document.getElementById("quiz-pg");
var questionElement = document.getElementById("gameQuestion");
var choicesElement = document.getElementById("options");
var timerElement = document.getElementById("timeleft");
var endScreen = document.getElementById("end-pg");
var finalScoreElement = document.getElementById("final-score");
var highscoreForm = document.getElementById("highscore-form");
var highscorePage = document.getElementById("highscore-pg");
var highscoreList = document.getElementById("highscore-list");
var goBackButton = document.getElementById("go-back-btn");
var clearScoresButton = document.getElementById("clear-scores-btn");

const questions = [
  {
    question: "What does SQL stand for?",
    choices: ["Structered Query Language", "Stand Quote Language", " Structered Quotation Language", ],
    answer: "Structered Query Language"
  },
  {
    question: "Which programming language is used for web development?",
    choices: ["JavaScript", "Python", "Java", "C++"],
    answer: "JavaScript"
  },
  {
    question: "What does CSS stand for?",
    choices: ["Cascading Style Sheets", "Central Style Sheets", "Cascading Simple Sheets",],
    answer: "Cascading Style Sheets"
  }
];

let currentQuestion = 0;
let score = 0;
let timeLeft = 60;
let timer;

function startQuiz() {
  startScreen.style.display = "none";
  quizContainer.style.display = "block";
  showQuestion();
  startTimer();
}

function showQuestion() {
  const question = questions[currentQuestion];
  questionElement.textContent = question.question;
  choicesElement.innerHTML = "";

  for (let i = 0; i < question.choices.length; i++) {
    const choice = question.choices[i];
    const li = document.createElement("li");
    li.textContent = choice;
    choicesElement.appendChild(li);
    li.addEventListener("click", checkAnswer);
  }
}

function checkAnswer(event) {
  const selectedChoice = event.target;
  const answer = questions[currentQuestion].answer;

  if (selectedChoice.textContent === answer) {
    score++;
  } else {
    timeLeft -= 10;
    if (timeLeft < 0) {
      timeLeft = 0;
    }
  }

  currentQuestion++;

  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    endQuiz();
  }
}

function startTimer() {
  timer = setInterval(function() {
    timeLeft--;
    if (timeLeft <= 0) {
      endQuiz();
    }
    timerElement.textContent = timeLeft;
  }, 1000);
}

function endQuiz() {
  clearInterval(timer);

  quizContainer.style.display = "none";
  endScreen.style.display = "block";
  finalScoreElement.textContent = score;

  highscoreForm.addEventListener("submit", saveHighscore);
}

function saveHighscore(event) {
  event.preventDefault();

  const nameInput = document.getElementById("name");
  const name = nameInput.value.trim();

  if (name !== "") {
    const highscores = JSON.parse(localStorage.getItem("highscores")) || [];
    const newHighscore = {
      initials: name,
      score: score
    };

    highscores.push(newHighscore);
    localStorage.setItem("highscores", JSON.stringify(highscores));

    nameInput.value = "";

    showHighscores();
  }
}

function showHighscores() {
  endScreen.style.display = "none";
  highscorePage.style.display = "block";

  const highscores = JSON.parse(localStorage.getItem("highscores")) || [];
  highscoreList.innerHTML = "";

  for (let i = 0; i < highscores.length; i++) {
    const highscore = highscores[i];
    const li = document.createElement("li");
    li.textContent = `${highscore.initials} - ${highscore.score}`;
    highscoreList.appendChild(li);
  }
}

function goBack() {
  highscorePage.style.display = "none";
  startScreen.style.display = "block";
  currentQuestion = 0;
  score = 0;
  timeLeft = 60;
}

function clearScores() {
  localStorage.removeItem("highscores");
  highscoreList.innerHTML = "";
}

document.querySelector(".startbtn button").addEventListener("click", startQuiz);
document.getElementById("startbtn").addEventListener("click", startQuiz);
goBackButton.addEventListener("click", goBack);
clearScoresButton.addEventListener("click", clearScores);

// Show start screen initially
startScreen.style.display = "block";

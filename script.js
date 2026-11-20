// DOM ELEMENTS
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");

const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionSpan = document.getElementById("total-questions");

const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");

const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");

// QUIZ QUESTIONS

const quizQuestions = [
  {
    question: "What is the largest planet in our solar system?",
    answers: [
      { text: "Earth", correct: false },
      { text: "Jupiter", correct: true },
      { text: "Mars", correct: false },
      { text: "Saturn", correct: false },
    ],
  },
  {
    question: "How many continents are there in the world?",
    answers: [
      { text: "5", correct: false },
      { text: "6", correct: false },
      { text: "7", correct: true },
      { text: "8", correct: false },
    ],
  },
  {
    question: "Which animal is known as the King of the Jungle?",
    answers: [
      { text: "Tiger", correct: false },
      { text: "Elephant", correct: false },
      { text: "Lion", correct: true },
      { text: "Leopard", correct: false },
    ],
  },
  {
    question: "What is the capital city of Japan?",
    answers: [
      { text: "Seoul", correct: false },
      { text: "Beijing", correct: false },
      { text: "Tokyo", correct: true },
      { text: "Bangkok", correct: false },
    ],
  },
  {
    question: "Which gas do plants absorb from the atmosphere?",
    answers: [
      { text: "Oxygen", correct: false },
      { text: "Carbon dioxide", correct: true },
      { text: "Nitrogen", correct: false },
      { text: "Hydrogen", correct: false },
    ],
  },
  {
    question: "Who invented the telephone?",
    answers: [
      { text: "Thomas Edison", correct: false },
      { text: "Alexander Graham Bell", correct: true },
      { text: "Albert Einstein", correct: false },
      { text: "Isaac Newton", correct: false },
    ],
  },
  {
    question: "What is the fastest land animal?",
    answers: [
      { text: "Lion", correct: false },
      { text: "Horse", correct: false },
      { text: "Cheetah", correct: true },
      { text: "Deer", correct: false },
    ],
  },
  {
    question: "How many sides does a hexagon have?",
    answers: [
      { text: "5", correct: false },
      { text: "6", correct: true },
      { text: "7", correct: false },
      { text: "8", correct: false },
    ],
  },
  {
    question: "Which ocean is the largest in the world?",
    answers: [
      { text: "Atlantic Ocean", correct: false },
      { text: "Indian Ocean", correct: false },
      { text: "Arctic Ocean", correct: false },
      { text: "Pacific Ocean", correct: true },
    ],
  },
  {
    question:
      "Which programming language is commonly used for web development?",
    answers: [
      { text: "JavaScript", correct: true },
      { text: "C++", correct: false },
      { text: "Assembly", correct: false },
      { text: "Swift", correct: false },
    ],
  },

  {
    question: "Who is my favourite person?",
    answers: [
      { text: "my friend", correct: false },
      { text: "My future Husband", correct: true },
      { text: "My boyfreind", correct: true },
      { text: "someone else", correct: false },
    ],
  },
];

// QUIZ STATE VARIABLES
let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;

// INITIAL SETTINGS
totalQuestionSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

// EVENT LISTENERS
startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

// START QUIZ
function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  scoreSpan.textContent = 0;

  startScreen.classList.remove("active");
  resultScreen.classList.remove("active");
  quizScreen.classList.add("active");

  progressBar.style.width = "0%";

  showQuestion();
}

// DISPLAY QUESTION
function showQuestion() {
  answersDisabled = false;

  const currentQuestion = quizQuestions[currentQuestionIndex];

  currentQuestionSpan.textContent = currentQuestionIndex + 1;

  const progressParent = (currentQuestionIndex / quizQuestions.length) * 100;

  progressBar.style.width = progressParent + "%";

  questionText.textContent = currentQuestion.question;

  answersContainer.innerHTML = "";

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");

    button.textContent = answer.text;
    button.classList.add("answer-btn");

    button.dataset.correct = answer.correct;

    button.addEventListener("click", selectAnswer);

    answersContainer.appendChild(button);
  });
}

// SELECT ANSWER
function selectAnswer(event) {
  if (answersDisabled) return;

  answersDisabled = true;

  const selectedButton = event.target;
  const isCorrect = selectedButton.dataset.correct === "true";

  Array.from(answersContainer.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    } else if (button === selectedButton) {
      button.classList.add("incorrect");
    }
  });

  if (isCorrect) {
    score++;
    scoreSpan.textContent = score;
  }

  setTimeout(() => {
    currentQuestionIndex++;

    if (currentQuestionIndex < quizQuestions.length) {
      showQuestion();
    } else {
      showResults();
    }
  }, 1000);
}

// SHOW RESULTS
function showResults() {
  quizScreen.classList.remove("active");
  resultScreen.classList.add("active");

  progressBar.style.width = "100%";

  finalScoreSpan.textContent = score;

  const percentage = (score / quizQuestions.length) * 100;

  if (percentage === 100) {
    resultMessage.textContent = "Perfect! You're a genius!";
  } else if (percentage >= 80) {
    resultMessage.textContent = "Great job! You know your stuff!";
  } else if (percentage >= 60) {
    resultMessage.textContent = "Good effort! Keep learning!";
  } else if (percentage >= 40) {
    resultMessage.textContent = "Not bad! Try again to improve!";
  } else {
    resultMessage.textContent = "Keep studying! You'll get better!";
  }
}

// RESTART QUIZ
function restartQuiz() {
  resultScreen.classList.remove("active");
  startQuiz();
}

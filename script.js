const questions = [
  {
    question:
      "Identify the correct extension of the user-defined header file in C++.",
    answers: [
      { text: ".cpp", correct: false },
      { text: ".hg", correct: false },
      { text: ".h", correct: true },
      { text: ".hf", correct: false },
    ],
  },
  {
    question: " C++ uses which approach?",
    answers: [
      { text: "left-right", correct: false },
      { text: "top-down", correct: false },
      { text: "right-left", correct: false },
      { text: "bottom-up", correct: true },
    ],
  },
  {
    question:
      " Which of the following data type is supported in C++ but not in C",
    answers: [
      { text: "int", correct: false },
      { text: "bool", correct: true },
      { text: "double", correct: false },
      { text: "float", correct: false },
    ],
  },
  {
    question: "Identify the correct syntax for declaring arrays in C++.",
    answers: [
      { text: "array arr[10]", correct: false },
      { text: "array[10]", correct: false },
      { text: "int arr[10]", correct: true },
      { text: "int arr", correct: false },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";

  showQuestion();
}
function showQuestion() {
  resetState();

  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}
function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}
function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}
function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}
nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});
startQuiz();

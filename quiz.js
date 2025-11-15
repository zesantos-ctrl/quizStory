const questions = [
  {
    question: "When did Emma go to the park?",
    answers: [
      { id: "1", text: "Last Saturday", correct: true },
      { id: "2", text: "Last Monday", correct: false },
      { id: "3", text: "Yesterday", correct: false },
      { id: "4", text: "Last night", correct: false },
    ],
  },
  {
    question: "Why did Emma wake up early?",
    answers: [
      { id: "1", text: "It was a rainy day", correct: false },
      { id: "2", text: "She had to work", correct: false },
      { id: "3", text: "It was a sunny day", correct: true },
      { id: "4", text: "She wanted breakfast", correct: false },
    ],
  },
  {
    question: "What did Emma take to the park?",
    answers: [
      { id: "1", text: "A backpack, water, and a book", correct: true },
      { id: "2", text: "Money and keys", correct: false },
      { id: "3", text: "Food and a blanket", correct: false },
      { id: "4", text: "A computer", correct: false },
    ],
  },
  {
    question: "Where did Emma sit in the park?",
    answers: [
      { id: "1", text: "Next to a lake", correct: false },
      { id: "2", text: "On a bench", correct: false },
      { id: "3", text: "Under a big tree", correct: true },
      { id: "4", text: "On the grass", correct: false },
    ],
  },
  {
    question: "What were children doing in the park?",
    answers: [
      { id: "1", text: "Reading books", correct: false },
      { id: "2", text: "Playing football", correct: true },
      { id: "3", text: "Swimming", correct: false },
      { id: "4", text: "Flying kites", correct: false },
    ],
  },
  {
    question: "What came and sat next to Emma?",
    answers: [
      { id: "1", text: "A cat", correct: false },
      { id: "2", text: "A bird", correct: false },
      { id: "3", text: "A small dog", correct: true },
      { id: "4", text: "A squirrel", correct: false },
    ],
  },
  {
    question: "How long did Emma stay in the park?",
    answers: [
      { id: "1", text: "One hour", correct: false },
      { id: "2", text: "Two hours", correct: true },
      { id: "3", text: "All day", correct: false },
      { id: "4", text: "Thirty minutes", correct: false },
    ],
  },
  {
    question: "What did Emma do in the park?",
    answers: [
      { id: "1", text: "She worked", correct: false },
      { id: "2", text: "She read and walked", correct: true },
      { id: "3", text: "She cooked food", correct: false },
      { id: "4", text: "She played football", correct: false },
    ],
  },
  {
    question: "How did Emma feel when she returned home?",
    answers: [
      { id: "1", text: "Angry", correct: false },
      { id: "2", text: "Tired", correct: false },
      { id: "3", text: "Relaxed and happy", correct: true },
      { id: "4", text: "Scared", correct: false },
    ],
  },
  {
    question: "What time of day did Emma go home?",
    answers: [
      { id: "1", text: "In the morning", correct: false },
      { id: "2", text: "In the afternoon", correct: false },
      { id: "3", text: "At sunset", correct: true },
      { id: "4", text: "At midnight", correct: false },
    ],
  }
];



const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function showQuestion() {
  resetState();

  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.dataset.id = answer.id;
    button.classList.add("btn");
    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

function selectAnswer(e) {
  const currentQuestion = questions[currentQuestionIndex];
  const answers = currentQuestion.answers;

  const correctAnswer = answers.find((ans) => ans.correct === true);

  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.id == correctAnswer.id;

  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }

  Array.from(answerButtonsElement.children).forEach((button) => {
    button.disabled = true;

    if (button.dataset.id == correctAnswer.id) {
      button.classList.add("correct");
    }
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

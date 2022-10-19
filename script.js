let questions = [
  {
    question: "In HTML, onclick and onfocus are:",
    correct: "Event attributes",
    incorrects: ["None of the mentioned", "HTML elements", "Style attributes"],
  },
  {
    question:
      "Consider there is an object declared: const person ={} . Which is the WRONG way to add a property 'name' to an object?",
    correct: "person['name']='John';",
    incorrects: [
      "person.name='John';",
      "const key = 'name'; person[key]='John';",
      "person.push({name:'John'});",
    ],
  },
  {
    question: "How do you write 'Hello World' in an alert box?",
    correct: "alert('Hello World');",
    incorrects: [
      "msgBox('Hello World');",
      "msg('Hello World');",
      "alertBox('Hello World');",
    ],
  },
  {
    question:
      "What is the result of document.querySelectorAll('.test') when there aren't elements with class test in the DOM?",
    correct: "[]",
    incorrects: ["null", "error", "undefined"],
  },
  {
    question: "How can we create a new DOM element in JavaScript?",
    correct: "Using the createElement method",
    incorrects: [
      "Using the createDocument method",
      "Using the insertBefore method",
      "Using the querySelector method",
    ],
  },
];

let currentQuestion = 0;
let totalQuestions = questions.length;
const actualQuestion = document.querySelector("#total_question");

const randomiseNumbersUnique = function (num) {
  const allNumbers = [];
  for (let i = 0; i < num; i++) {
    allNumbers.push(i);
  }
  const result = [];
  for (let i = num; i >= 1; i--) {
    const randomPosition = Math.ceil(Math.random() * i);
    result.push(allNumbers[randomPosition - 1]);
    allNumbers.splice(randomPosition - 1, 1);
  }
  return result;
};

const createQuestions = function (obj) {
  //Error:
  //it was trying to generate a question with no Object, because the list finished.
  //Validation - If object does not exist redirect to result page.

  if (!obj) {
    goToResultsPage();
  }
  const parentNode = document.getElementsByClassName("bodycontent")[0];
  const correctAnswer = obj.correct;
  let arrOfQuestions = [];
  let incorrectArray = [];
  incorrectArray = obj.incorrects;

  arrOfQuestions = incorrectArray.slice();
  arrOfQuestions.push(correctAnswer);

  const randomIndexesArray = randomiseNumbersUnique(arrOfQuestions.length);

  const question = document.createElement("h3");
  question.innerText = obj.question;
  question.classList.add("questiontext");
  parentNode.appendChild(question);

  for (let i = 0; i < arrOfQuestions.length; i++) {
    const label = document.createElement("label");
    label.classList.add("labl");
    const input = document.createElement("input");
    input.setAttribute("type", "radio");
    input.setAttribute("name", "radioname");
    label.appendChild(input);
    parentNode.appendChild(label);

    const option = document.createElement("h4");
    option.innerText = arrOfQuestions[randomIndexesArray[i]];
    option.classList.add("answerbutton");
    input.setAttribute("value", `${option.innerText}`);
    label.appendChild(option);
  }
};

const goToResultsPage = function () {
  const nextButton = document.querySelector(".nextbutton");
  location.href = "./results.html";
};

const goToNextPage = function () {
  const parentNode = document.getElementsByClassName("bodycontent")[0];
  parentNode.innerHTML = "";
  currentQuestion++;
  createQuestions(questions[currentQuestion]);
  actualQuestion.innerText = `QUESTION ${currentQuestion + 1}/${
    questions.length
  }`;
  const nextButton = document.querySelector(".nextbutton");

  if (currentQuestion >= totalQuestions) {
    nextButton.addEventListener("click", goToResultsPage);
  }
  nextButton.addEventListener("click", checkAnswer(currentQuestion));
};

const checkAnswer = function (obj) {
  const radioButtons = document.querySelectorAll('input[name="radioname"]');

  for (const radioButton of radioButtons) {
    if (radioButton.checked) {
      if (radioButton.value === obj.correct) score++;
      // break;
    }
  }
  console.log("current score:", score);
};

const startQuiz = function () {
  score = 0;
  currentQuestion = 0;

  createQuestions(questions[currentQuestion]);
  actualQuestion.innerText = `QUESTION ${currentQuestion + 1}/${
    questions.length
  }`;
  if (currentQuestion >= totalQuestions - 1) {
    nextButton.addEventListener("click", goToResultsPage);
  }
  ////////////////////////////ARROW FUNCTION//////////////////////
  const nextButton = document.querySelector(".nextbutton");
  nextButton.addEventListener("click", () =>
    checkAnswer(questions[currentQuestion])
  );

  nextButton.addEventListener("click", goToNextPage);
};

window.onload = function () {
  startQuiz();
};

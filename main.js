let countSpan = document.querySelector(".quiz-info .count span");
let bulletsSpanContainer = document.querySelector(".bullets .spans");
let quizArea = document.querySelector(".quiz-area");
let answersArea = document.querySelector(".answers-area");
let submitButton = document.querySelector(".submit-button");

//Set Options
let currentIndex = 0;
let rightAnswers = 0;

function getQuestions() {
  let myRequest = new XMLHttpRequest();
  myRequest.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      let questionsObject = JSON.parse(this.responseText);
      let qCount = questionsObject.length;

      //Create Bullets + Set Questions Count
      createBullets(qCount);
      // Add Question Data
      addQuestionData(questionsObject[currentIndex], qCount);
      // Click On Sumbit
      submitButton.onclick = function () {
        // Get Right Answer
        let theRightAnswer = questionsObject[currentIndex].right_answer;
        // Increase Index
        currentIndex++;
        // Check The Answer
        checkAnswer(theRightAnswer, qCount);
        // Remove Previous Question
        quizArea.innerHTML = "";
        answersArea.innerHTML = "";
        // Add Question Data
        addQuestionData(questionsObject[currentIndex], qCount);
        // Handle Bullets Class
        handleBullets();
        // Show Results
        showResults(qCount);
      };
    }
  };
  myRequest.open("GET", "html_questions.json", true);
  myRequest.send();
}

getQuestions();

function createBullets(num) {
  countSpan.innerHTML = num;

  // Create Spans
  for (let i = 0; i < num; i++) {
    // Create Bullet
    let theBullets = document.createElement("span");
    // Check If Its First Span
    if (i === 0) {
      theBullets.className = "on";
    }
    // Append Bullets To Main Bullet Container
    bulletsSpanContainer.appendChild(theBullets);
  }
}

function addQuestionData(obj, count) {
  if (currentIndex < count) {
    // Create H2 Question Title
    let questionTitle = document.createElement("h2");
    // Create Quesion Text
    let questionText = document.createTextNode(obj["title"]);
    // Append Text To H2
    questionTitle.appendChild(questionText);
    // Append H2 to The Quiz Area
    quizArea.appendChild(questionTitle);

    // Create The Answers
    for (let i = 1; i <= 4; i++) {
      //Create Main Answer Div
      let mainDiv = document.createElement("div");
      //Add Class To Main Div
      mainDiv.className = "answer";

      //Create Radio Input
      let radioInput = document.createElement("input");
      //Add Type + Name + Id + Data-Attribute
      radioInput.name = "question";
      radioInput.type = "radio";
      radioInput.id = `answer_${i}`;
      radioInput.dataset.answer = obj[`answer_${i}`];

      //Make First Option Selected
      if (i === 1) {
        radioInput.checked = true;
      }

      //Create Label
      let theLabel = document.createElement("label");
      // Add For Attribute
      theLabel.htmlFor = `answer_${i}`;
      // Create Label Text
      let theLabelText = document.createTextNode(obj[`answer_${i}`]);
      // Add The Text To Label
      theLabel.appendChild(theLabelText);

      // Add Input + Label To Main Div
      mainDiv.appendChild(radioInput);
      mainDiv.appendChild(theLabel);

      // Append All Divs To Answers Area
      answersArea.appendChild(mainDiv);
    }
  }
}

function checkAnswer(rAnswer, count) {
  let answers = document.getElementsByName("question");
  let theChoosenAnswer;

  for (let i = 0; i < answers.length; i++) {
    if (answers[i].checked) {
      theChoosenAnswer = answers[i].dataset.answer;
    }
  }

  if (rAnswer === theChoosenAnswer) {
    rightAnswers++;
  }
}

function handleBullets() {
  let bulletsSpans = document.querySelectorAll(".bullets .spans span");
  let arrayOfSpans = Array.from(bulletsSpans);
  arrayOfSpans.forEach((span, index) => {
    if (currentIndex === index) {
      span.className = "on";
    }
  });
}


function showResults(count){
let theResults;
  if(currentIndex === count){
  quizArea.remove();
  answersArea.remove();
}
}
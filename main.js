let countSpan = document.querySelector(".quiz-info .count span");
let bulletsSpanContainer = document.querySelector(".bullets .spans");
let quizArea = document.querySelector(".quiz-area")

//Set Options
let currentIndex = 0;

function getQuestions() {
  let myRequest = new XMLHttpRequest();
  myRequest.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      let questionsObject = JSON.parse(this.responseText);
      let qCount = questionsObject.length;

      //Create Bullets + Set Questions Count
      createBullets(qCount);
      // Add Question Data
      addQuestionData(questionsObject[currentIndex] , qCount)
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
    if(i===0){
        theBullets.className = "on"
    }
    // Append Bullets To Main Bullet Container
    bulletsSpanContainer.appendChild(theBullets)
  }
}

function addQuestionData(obj,count){
  // Create H2 Question Title
  let questionTitle = document.createElement("h2");
  // Create Quesion Text
  let questionText = document.createTextNode(obj["title"]);
  // Append Text To H2
  questionTitle.appendChild(questionText);
  // Append H2 to The Quiz Area
  quizArea.appendChild(questionTitle);

  // Create The Answers
  for(let i=1;i<=4;i++){
    //Create Main Answer Div
    let mainDiv = document.createElement("div");
    //Add Class To Main Div
    mainDiv.className = "answer";
  }

}
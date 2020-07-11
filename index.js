// 1. 문제 개수 입력 (문제수는 10개 생성으로 가정)
const form = document.querySelector("#questionsInput"),
  input = form.querySelector("input");

// 1. 출제 문항수 제출
form.addEventListener("submit",handleSubmit);
function handleSubmit(event) {
  event.preventDefault();
  const inputValue = Number(input.value);
  createRandomNumber(inputValue); // 2. 난수생성
  createQuestions(inputValue); // 3.문제출제
  createAnswer(inputValue);// 4. 정답생성
  input.style = "display: none";
  };

// 2. 난수(전역)배열 20개 생성
const randomNumber = [];
function createRandomNumber(num){
  for (let i = 0; i < 2*num;  i++){
    randomNumber[i] = Math.floor(Math.random()*9)+1;
  }
};

// 3. 문제출제

// 3-1. 문제수(전역)빈배열 생성
const questionNumber=[];

//3-2. 문제배열에 Data(0~9)입력
function createQuestions(num){
  document.querySelector("#marking").style="display : block"
  for (let i = 0; i < num; i++){
    questionNumber.push(i);
    };

  //3-3. 문제형식
  let questionArea = document.querySelector("#questionArea")
  questionArea.innerHTML = `다음 문제 알맞은 답을 구하세요.<br>`;
  const span = document.createElement("span");

  //3-4 문제생성
  questionNumber.forEach(function(toSolve){
    printQuestions(toSolve);
  });

  //문제와 펑션 분리 span을 두개 생
  function printQuestions(a) {
    const numberSpan = document.createElement("span");
    const questionSpan = document.createElement("span");
    const markSpan = document.createElement("span");
    const br = "<br>";
    numberSpan.innerHTML =`${a+1<10? `0${a+1}`:a+1} 번 문제>`;
    //문제 스팬
    questionSpan.innerHTML = `${randomNumber[a*2]} + ${randomNumber[a*2+1]} =  <input type="text" id="inputAnswer${a}"> `;
    markSpan.innerHTML = ` <button id=mark${a}></button> ` + br;
    questionArea.appendChild(numberSpan);
    questionArea.appendChild(questionSpan);
    questionArea.appendChild(markSpan);
    document.querySelector(`#mark${a}`).style = "display : none";
  }
};

// 4. 정답생성

// 4-1.  정답(전역)빈배열 생성
const answerNumber=[];

// 4-1.  정답배열 10개 입력
function createAnswer(num){
  for (let i = 0; i < num; i++){
  answerNumber.push(randomNumber[i*2]+randomNumber[i*2+1])
  };
};

// 5. 채점

const marks = [];
document.querySelector("#mark")
function marking(){
  for (let i = 0; i < questionNumber.length; i++){
    document.querySelector(`#mark${i}`).style = "block"
    if(answerNumber[i]===Number(document.querySelector(`#inputAnswer${i}`).value)){
      document.querySelector(`#mark${i}`).innerHTML = "⭕";
    }else{
      document.querySelector(`#mark${i}`).innerHTML = "❌";
    }
  };
};

// ! 출제, 문제 풀이 분리(서버와 DB사이드 공부)
// ! 채점 후 점수 매기기 기능
//
// ! 경험치, 업적 획득 기능

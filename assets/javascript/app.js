

window.onload = function() {

// $("#start").on("click",startTimer());



};
var gameQuestions=[];
var correctTotal=0;
var questions = [


    {
      id:"1",
      questionText:"This is a question.",
      funFact:"This is a fun fact about question 1.",
      answers:[
        "This is the correct answer for #1",
        "Question 1 incorrect answer #1",
        "Question 1 incorrect answer #2",
        "Question 1 incorrect answer #3",
      ]
    },

    {
      id:"2",
      questionText:"This is question #2.",
      funFact:"This is a fun fact about question 2.",
      answers:[
        "This is the correct answer for #2",
        "Question 2 incorrect answer #1",
        "Question 2 incorrect answer #2",
        "Question 2 incorrect answer #3",
      ]
    },

    {
      id:"3",
      questionText:"This is question #3.",
      funFact:"This is a fun fact about question 3.",
      answers:[
        "This is the correct answer for #3",
        "Question 3 incorrect answer #1",
        "Question 3 incorrect answer #2",
        "Question 3 incorrect answer #3",
      ]
    }

];

// var gameQuestions=questions.keys("id");

      function startGame(gameStatus){
        gameQuestions=Array.from(questions);
        console.log(gameQuestions);
        if (gameStatus=="new") {
        $("#start").attr("style","display:none");
        $("#titlescreen").attr("style","display:none");
        }
        else if (gameStatus=="continue") {
          $(".answerGuess").empty();
          $("#playagain").attr("style","display:none");
          $("#endscreen").attr("style","display:none");
        }
        $("#gamescreen").attr("style","display:block");
        hereWeGo();
        $("#timer").text("10");
        
        nextQuestion();
    
        }

      function hereWeGo(){
        $(".answerGuess").empty();
        $("#subheader").attr("style","display:none");
        startTimer(1000,"Game starts in: ");
      }

      function gameOver() {
        gameQuestions=[];
        $(".answerGuess").empty();
        $("#subheader").empty();
        
        $("#gamescreen").attr("style","display:none");
        $("#endscreen").attr("style","display:block");
        $("#playagain").attr("style","display:block");
      }

// console.log(gameQuestions);
// console.log("question 1: "+gameQuestions[0].questionText);//question
// console.log(questions[0].answers.answer1);//correct answer



  function nextQuestion(){
      var max=gameQuestions.length-1;//get random value from gameQuestions array
      var x=getRandom(0,max);
      console.log("x="+x);
      var correctAnswer=gameQuestions[x].answers[0];//the correct answer is always the first option in the array of answers
      var questionText=gameQuestions[x].questionText;
      var funFact=gameQuestions[x].funFact;
      console.log("QT: "+questionText);
      $("#questionText").text(questionText);
      var y=1;
      var hidingSpot=getRandom(1,4);//randomize where the correct answer is displayed
      console.log("hiding spot"+hidingSpot);
      for (i=1;i<=4;i++){
        if (i==hidingSpot) {
          $("#answer"+i).text(correctAnswer);
          $("#answer"+i).attr("data-value","correct");
        }
        else {
          max = gameQuestions[x].answers.length-1;
          var incorrectAnswer = gameQuestions[x].answers[y];
          $("#answer"+i).text(incorrectAnswer);
          $("#answer"+i).attr("data-value","incorrect");
          y++;
          // var z = getRandom(0,max);
          // var incorrectAnswer = gameQuestions[x].answers[z];//randomize which wrong answer gets displayed next
          // console.log(incorrectAnswer);
          // $("#answer"+i).text(incorrectAnswer);
          // $("#answer"+i).attr("data-value","incorrect");
          // gameQuestions[x].answers.splice(z,1);
          // y++;
        }
      };
      gameQuestions.splice(x,1);//remove question from gameQuestion array
      resetTimer();
      $("#timer").text("10");
      startTimer(100);
      setTimeout(showFact(funFact),5000);
  }


  function showFact(text){
    $("#subheader").attr("style","display:block");
    $("#subheader").text(text);
  }
 
  function showCorrect(){
    var correctText = $("<h1>");
          correctText.html("You answered: "+correctTotal+" questions correctly.");
    
          $("#endtext").append(correctText);
  }




  function clearAnswers(result){
    console.log(result);
    $("li").each(function(index){
      if ($(this).attr("value")!=result)
          {
            //do nothing
          }
      else {
        $(this).empty();
          };
    });
    
  }


  function checkAnswer(element){
    stopTimer();
    console.log("this:"+this);
   // var result = $(this).data("value");
      var result = $(this).attr("value");
      console.log("result: "+ result);
    if (result=="correct") {
      $(this).attr("style","background-color:green");
      console.log("Correct!");
      correctTotal++;
      clearAnswers(result);
      wait(1000);
    }
    else {
      $(this).attr("style","background-color:red")
      clearAnswers(result);
      wait(1000);
    }
    var questionsRemaining=gameQuestions.length;
    if (questionsRemaining==0) {
      gameOver();
      }
    else {
      nextQuestion();
      }
  }

function getRandom(min,max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


//------------------//START TIMER FUNCTIONS//----------------------///
function resetTimer(questionsRemaining) {
  if (questionsRemaining==0){
    gameOver();
  }
  else {
    time = 10;
  
    $("#timer").text("10");
  
  }
}
function startTimer(interval,text) {
  if(interval<=100){
  intervalId = setInterval(countDown(10), interval);
  }
  else {
  intervalId = setInterval(countDownFast(5), interval)  
  }
}

function stopTimer() {

  console.log("stopping");
  clearInterval(intervalId);
  resetTimer();
}


function countDown(time) { //time. lol
  
  time=time-.1;
  $("#timer").text(time);
  if (time===0) {

  $("#subheader").text("You ran out of time");//oh noes. out of time, homie
  stopTimer();
  setTimeout(nextquestion(),1500);
  }
}
function countDownFast(time,text) {
  var time=time;
  time--;
  $("#questionText").text(text + time);
  }

  function average(array) 
  {
      var sum=0
      for (i=0;i<array.length;i++)
      {
          sum += array[i];
      }
      var avg = sum/array.length;
      return avg;
  };
  
  function wait(ms){
      var start = new Date().getTime();
      var now = start;
      while(now < start + ms) {
        now = new Date().getTime();
     }
  };



   
            

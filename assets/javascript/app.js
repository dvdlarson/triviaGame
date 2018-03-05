



var gameQuestions=[];
var correctTotal=0;
var gameTimer;
var intervalID;
var questions = [];
//$(document).ready(getQuestions());
// var questions = [


//     {
//       id:"1",
//       questionText:"This is a question.",
//       funFact:"This is a fun fact about question 1.",
//       answers:[
//         "This is the correct answer for #1",
//         "Question 1 incorrect answer #1",
//         "Question 1 incorrect answer #2",
//         "Question 1 incorrect answer #3",
//       ]
//     },

//     {
//       id:"2",
//       questionText:"This is question #2.",
//       funFact:"This is a fun fact about question 2.",    //i was going to write questions but then i thought of looking for an API
//       answers:[                                          //and dont you know I found one
//         "This is the correct answer for #2",
//         "Question 2 incorrect answer #1",
//         "Question 2 incorrect answer #2",
//         "Question 2 incorrect answer #3",
//       ]
//     },

//     {
//       id:"3",
//       questionText:"This is question #3.",
//       funFact:"This is a fun fact about question 3.",
//       answers:[
//         "This is the correct answer for #3",
//         "Question 3 incorrect answer #1",
//         "Question 3 incorrect answer #2",
//         "Question 3 incorrect answer #3",
//       ]
//     }

// ];

    function getQuestions(){
          var queryURL = "https://opentdb.com/api.php?amount=10&category=11&difficulty=easy&type=multiple";

    
        $.ajax({
            url: queryURL,
            method: 'GET',
            dataType: 'json',
            success: function (response) {
                gameQuestions = response.results;
                    }
            
        });
      }      
      
    function startGame(gameStatus){
            getQuestions();
            if(gameQuestions==[]){
                alert("There seems to be a problem with the database. Please wait a few minutes and try again");
                location.reload(true);
            };
            $("#playagain").attr("style","display:none");
            $("#endscreen").attr("style","display:none");
            $("#start").attr("style","display:none");
            $("#playagain").attr("style","display:none");
            $("#titlescreen").attr("style","display:none");
            $("#gamescreen").attr("style","display:visible");
            $(".answerGuess").empty();
            $("#timer").empty();
            $("#subheader").empty();
          
      //    gameQuestions=Array.from(questions); //get copy of question array into temp array to use for the game
      //   console.log(gameQuestions);
          if (gameStatus=="new") {
              startCountdown("Welcome! Game starts in: ");
                  }
          else if (gameStatus=="continue") {
              startCountdown("Back again, eh? Game starts in: ");
              }
          //hopefully the countdown finishes, then this stuff happens
    
          
    
        }

   

// console.log(gameQuestions);
// console.log("question 1: "+gameQuestions[0].questionText);//question        //trying to figure out how to access the question array
// console.log(questions[0].answers.answer1);//correct answer

       

  function nextQuestion(){
      $("#timer").attr("style","display:visible");
      $("#answerDiv").attr("style","display:visible");
      $("#timer").text("10");
      $("#subheader").empty();
      var questionsRemaining = gameQuestions.length; //questions are spliced from the gameQuestions array (at the end of the function) 
      if (questionsRemaining == 0) {        //every time a question is asked.this section checks to see if that array is empty. If so, all the 
            gameOver();                    //questions have been asked, and so call the game over function
            }                           // otherwise, get on with the game


      var max = gameQuestions.length-1;       //the object here is to grab a random # from 0 to the # of items remaining in gameQuestions array
      var r = getRandom(0,max);             //we are trying to get a random value from gameQuestions array so the questions are asked
      console.log("random ="+r);                // in a random order each time the game is played

                                                      //here we start setting variables based on the question object values
      var correctAnswer = gameQuestions[r].correct_answer;//the correct answer is always the first option in the array of answers
      var questionText = gameQuestions[r].question;
  //    console.log("QT: "+ questionText);              
      $("#questionText").text(questionText);     
      var y = 0;
      var hidingSpot = getRandom(1,4);        //here randomizing where the correct answer is displayed in the 4 possible answer locations.
      console.log("hiding spot: "+hidingSpot);      // cheaters  can totally use this to get the answers
      for (i = 1;i <= 4;i++){
        if (i == hidingSpot) {
          $("#answer"+i).html(correctAnswer);
          $("#answer"+i).attr("data-value","correct");
        }
        else {
          
          var incorrectAnswer = gameQuestions[r].incorrect_answers[y];
          $("#answer"+i).html(incorrectAnswer);
          $("#answer"+i).attr("data-value","incorrect");
          y++;
          // var z = getRandom(0,max);
          // var incorrectAnswer = gameQuestions[x].answers[z];             //tried to randomize which wrong answer gets displayed next
          // console.log(incorrectAnswer);
          // $("#answer"+i).text(incorrectAnswer);
          // $("#answer"+i).attr("data-value","incorrect");
          // gameQuestions[x].answers.splice(z,1);
          // y++;
        }
      };
      gameQuestions.splice(r,1);//remove question from gameQuestion array
      timer();
      // $("#timer").text("10");
      // startTimer(100);
      wait(1000);
      setTimeout(showFact(funFact),5000);
      console.log("funfact: " + funFact);
  }


          //this is the stuff that happens when you click an answer
          //trying to:
          // isolate the clicked answer on the screen, 
          //change background color green if it is correct,red if incorrect, 
          //display appropriate text in the subheader section, 
          //wait 250ms then reset the color and class of the item, 
          //finally check the gameQuestions array to see if it is empty
          //if so, game over, if not, nextQuestion

    $(".answerGuess").on("click",function(){ 
        clearInterval(intervalID); //stop the timer
        $(this).attr("class","list-group-item answerGuessed"); //changing the class of just this one element.
        $(".answerGuess").empty(); //clear out the other answer options
                                        //do some stuff based on whether the guess was correct or not
        if  ($(this).data("value")=="correct") {

            $(this).attr("style","background-color:green");
            $("#subheader").text("That is correct!");
            wait(250);
            $(this).attr("style","background-color:none");
            $(this).attr("class","list-group-item answerGuess");
            correctTotal++;
        }
        else {
            $(this).attr("style","background-color:red");
            $("#subheader").text("Sorry, that's not correct.");
            wait(250);
            $(this).attr("style","background-color:none");
            $(this).attr("class","list-group-item answerGuess");
        }
        var questionsRemaining=gameQuestions.length;
        if (questionsRemaining==0) {
            gameOver();
            }
        else {
            nextQuestion();
            }
    
    });

     

    function gameOver() {
    //  gameQuestions=[];
      $(".answerGuess").empty();
      $("#answerDiv").attr("style","display:none");
      $("#subheader").empty();
      $("#subheader").attr("style","display:none");
      $("#timer").empty();
      $("#questionText").text("GAME OVER");
      $("#countdownText").attr("style","display:block");
      $("#countdownText").text("You answered "+correctTotal+" questions correctly!");
    //  $("#gamescreen").attr("style","display:none");
    //  $("#endscreen").attr("style","display:block");
      $("#playagain").attr("style","display:block");
    }

function getRandom(min,max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


//------------------//START TIMER FUNCTIONS//----------------------///
function timer() {
    // this is the main game screen 10 second timer
    //  
    // 
    var timeleft = 10;
    
   intervalID = setInterval(function(){  
    $("#timer").text(timeleft);              
    if(timeleft <= 0){
        clearInterval(intervalID);
        $("#subheader").text("You ran out of time");  //oh noes. out of time, homie
        wait(2000);
        nextQuestion();
    }
    timeleft--  ;
    },1000);
  }

  function wait(ms){
    var start = new Date().getTime();
    var now = start;
    while(now < start + ms) {
      now = new Date().getTime();
   }
};

function startCountdown(text) {
  // this is the pre-game countdown timer
  //   appropriate text is passed to the function depending on whether it is a new game or 
  // a play-again situation

  $(".answerGuess").empty();
  $("#answerDiv").attr("style","display:none");
  $("#subheader").empty();
  $("#countdownText").empty();
  var timeleft = 5;
  intervalID = setInterval(function(){
  timeleft--;
  $("#countdownText").text(text + timeleft);
  if(timeleft <= 0){

      clearInterval(intervalID);
      $("#countdownText").text("Enjoy the game!");
      wait(2000);
      $("#countdownText").attr("display:none");
      nextQuestion();
      
  }
  },1000);
}



// function resetTimer(questionsRemaining) {
//   if (questionsRemaining==0){
//     gameOver();
//   }
//   else {
//     time = 10;
  
//     $("#timer").text("10");
  
//   }
// }
// function startTimer(interval,text,action) {
//   if (action == "stop") {
//     clearInterval(intervalID);
//   }
//   if(interval<=100){
//   intervalId = setInterval(countDown(10), interval);
//   }
//   else {
//   intervalId = setInterval(countDownFast(5), interval)  
//   }
// }

// function stopTimer() {

//   console.log("stopping");
//   clearInterval(intervalId);
//   resetTimer();
// }


// function countDown(time) { //time. lol
  
//   time=time-.1;
//   $("#timer").text(time);
//   if (time===0) {

//   $("#subheader").text("You ran out of time");//oh noes. out of time, homie
//   stopTimer();
//   setTimeout(nextquestion(),1500);
//   }
// }
// function countDownFast(time,text) {
//   var time=time;
//   time--;
//   $("#questionText").text(text + time);
//   }

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
  
  



   
            

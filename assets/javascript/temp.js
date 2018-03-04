
// {
// //hide the start button, change the bkgrnd image and start the game//
//     $("#start").hide();
//     document.body.style.backgroundImage = "../media/background.png";
//     startGame();
// }

var intervalId;
var time=10;

function playGame() {
    //shuffle array of questions, copy array into gameQuestions array variable
    //set correctGuesses to 0
    //choose item at end of array as currentWord(VAR) and populate with properties
    //shuffle array of answers in current word then loop through and assign to answertext1-4 divs
    //start timer
    //get answerText value as playerGuess(VAR) on click of answerText class item, compare to correctAnswer(VAR)
    //if they match, correctGuesses++(VAR), confirmCorrect() nextQuestion(),
    //if timer reaches zero, show something indicating this, showCorrect(), nextQuestion()
    //if guess is incorrect, highlight guess red, show correct answer in subheader



}

function resetTimer(questionsRemaining) {
  if (questionsRemaining==0){
    gameOver();
  }
  else {
    time = 10;
  
    $("#display").text("10");
  
  }
}
  
  function startTimer() {
    intervalId = setInterval(countDown, 1000);

  }
  
  function stopTimer() {
  
    console.log("stopping");
    clearInterval(intervalId);
    resetTimer();
  }
  
  
  function countDown() {
    var time=10;
    time--;
    $("#timer").text(time);
    if (time===0) {

    $("#subheader").text("You ran out of time");
    stopTimer();
    }
  }

function elm(elementID) {
    return document.getElementById(elementID);
}

function getRandom(min,max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


    





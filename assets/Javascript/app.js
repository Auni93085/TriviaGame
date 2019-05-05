// **********************INSTRUCTIONS****************************
// There is a start button to start the game
// When the start button is clicked, a new screen pops up with a countdown timer and multiple choice questions
// User can choose only one answer per question
// When the timer hits 0, the game stops and new screen pops up with results
// The user can answer all the questions in the allocated time and hit the "done" button to end the game.
// when the user clicks "done", a new screen pops up with results

// *****************************Need for game************************
// Start Button to start the game and hide the initial page
// a variable with a list of questions. Each question needs an array of answers and correct answer
// variable for correct answer, wrong answer, missed questions, remaining time,
// timer to countdown in 1 second intervals from specified time
// reset game function
// game initialize function
// a loop to check for right or wrong answers





$(document).ready(function() {
// Start code here...


// Questions and answers Array
var questions = [
    {
      question: 'Before Mount Everest was discovered, what was the highest mountain on Earth?',
      answers: [
        { answer: 'A. Andes', value: false },
        { answer: 'B. Himalayas', value: false },
        { answer: 'C. Olympus Mons', value: false },
        { answer: "D. Mount Everest", value: true }
      ]
    },
    {
      question: 'In which country was the Caesar Salad invented in?',
      answers: [
        { answer: 'Mexico', value: true },
        { answer: 'Italy', value: false },
        { answer: 'Russia', value: false },
        { answer: 'USA', value: false }
      ]
    },
    {
      question: 'How many months have 28 days in them?',
      answers: [
        { answer: '1', value: false },
        { answer: '12', value: true },
        { answer: '5', value: false },
        { answer: '7', value: false }
      ]
    },
    {
      question: 'In which state is it illegal to hunt mice without a license?',
      answers: [
        { answer: 'Florida', value: false },
        { answer: 'Ohio', value: true },
        { answer: 'Hawaii', value: false },
        { answer: "Texas", value: false }
      ]
    },
    {
      question: "What do you call a group of frogs?",
      answers: [
        { answer: 'Pickles', value: false },
        { answer: 'A group', value: false },
        { answer: 'An army', value: true },
        { answer: 'Jeff', value: false }
      ]
    },
    {
      question: 'What is banned in public places in Florida after 6pm?',
      answers: [
        { answer: 'Farting', value: true },
        { answer: 'Eating', value: false },
        { answer: 'Swimming', value: false },
        { answer: 'Skate Boarding', value: false }
      ]
    },
    {
      question: 'What is the strangest thing about Vegas casinos?',
      answers: [
        { answer: 'They smell like cigarettes', value: false },
        { answer: 'Most people are there for the free drinks', value: false },
        { answer: 'They do not have any clocks', value: true },
        { answer: 'There is no cell phone reception', value: false }
      ]
    }
  ];
  
// Global variables
var game;
var counter = 0;
var clock;
var timer = 15;
var correctCounter = 0;
var incorrectCounter = 0;

  // Start the game when that start button is clicked
  $('.answers').css('visibility', 'hidden');
  $('body').on('click', '.start-btn', function(event) {
    event.preventDefault();
    startGame();
    $('.answers').css('visibility', 'visible');
  });

  $('body').on('click', '.answer', function(event) {
    // console.log($(this));
    chosenAnswer = $(this).text();
    var answerCounter = questions[counter].answers;

    var answer = $('.answer');
    for (var i = 0; i < answerCounter.length; i++) {
      if (chosenAnswer === answerCounter[i].answer && answerCounter[i].value === true) {
        clearInterval(clock);
        var right = $(this).attr('class', 'right-answer answer');
        rightAnswer();
      } else if (chosenAnswer === answerCounter[i].answer && answerCounter[i].value === false) {
        clearInterval(clock);
        $(this).attr('class', 'wrong-answer answer');
        wrongAnswer();
      }
    }
  });

  $('body').on('click', '.reset-button', function(event) {
    event.preventDefault();
    resetGame();
  });


function rightAnswer() {
  correctCounter++;
  $('.time').html(timer);
  $('.right').html('<p>Right answers: ' + correctCounter + '</p><br>');
  setTimeout(questionCounter, 2000);
}

function wrongAnswer() {
  incorrectCounter++;
  $('.time').html(timer);
  $('.wrong').html('<p>Wrong answers: ' + incorrectCounter + '</p>');
  setTimeout(questionCounter, 2000);
}

function unanswered() {
  unanswered++;
  $('.main').append("<p class='times-up'>Time's up!</p>");
  $('.right-answer').css('background-color', 'green');
  $('.times-up')
    .delay(2000)
    .fadeOut(400);
  setTimeout(questionCounter, 2000);
}

// Start the game
function startGame() {
  $('.game-start').css('display', 'none');
  $('.questions-page').css('visibility', 'visible');
  $('.start-btn').css('visibility', 'hidden');
  $('.timer').html('<p>Time remaining: <span class="time">15</span></p>');

  $('.question').html(questions[counter].question);
  var showAnswers =
    '<p class="answer first-answer">' +
    questions[counter].answers[0].answer +
    '</p><p class="answer">' +
    questions[counter].answers[1].answer +
    '</p><p class="answer">' +
    questions[counter].answers[2].answer +
    '</p><p class="answer">' +
    questions[counter].answers[3].answer +
    '</p>';

  $('.answers').html(showAnswers);

  timerText();
}

function questionCounter() {
  if (counter < 8) {
    counter++;
    startGame();
    timer = 15;
    timerText();
  } else {
    finishGame();
  }
  console.log("game is over")
}

// Finishing the game
function finishGame() {
  var final = $('.main')
    .html("<p>Good Job! Here are your results..<p><br><br>")
    .append('<p>Correct Answers: ' + correctCounter + '</p><br>')
    .append('<p>Wrong Answers: ' + incorrectCounter + '</p>');
  $(final).attr('<div>');
  $(final).attr('class', 'final');
  $('.final').append('<p><a class="btn btn-primary btn-lg reset-button" href="#">Restart the game!</a></p>');
}

// Reset the game
function resetGame() {
  counter = 0;
  correctCounter = 0;
  incorrectCounter = 0;
  timer = 15;
  startGame();
  timerText();
}

// Timer function
function timerText() {
  clearInterval(clock);
  clock = setInterval(seconds, 1000);
  function seconds() {
    if (timer === 0) {
      clearInterval(clock);
      unanswered();
    } else if (timer > 0) {
      timer--;
    }
    $('.time').html(timer);
  }
}


});




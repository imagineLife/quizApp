var listOfQandA = {
  questions: [
  {
    question: "How many records did John Coltrane release during his lifetime?", 
    answer: ["24","19","54","33"],
    isCorrect:'54',
    why:'Many MORE records were released under his name, including posthumous records & as a sideman.' 
  },
  {
    question: "'Duke' Ellington's first name was...", 
    answer: ["Edward","Henry","Harriet","Samuel"],
    isCorrect:'Edward',
    why:'Duke is one of many players with \'Jazz royalty\' nicknames' 
  },
  {
    question: "________ was famous for playing with his back turned to the audience", 
    answer: ["Dizzy Gillespie","Thelonious Monk","Miles Davis","Bill Nye"],
    isCorrect:'Miles Davis' ,
    why:'He was more interested in the music, iteself, than the performance.'
  },
  {
    question: "____________ had her first live performance at the Apollo in New York City", 
    answer: ["Billie Holiday","Diana Krall","Tina Fey","Ella Fitzgerald"],
     isCorrect:'Ella Fitzgerald',
     why:'She was only 17 years old!' 
  },
  {
    question: "____________'s original surname (last name) was Colton", 
    answer: ["Dennis Rodman","Chesney Baker","Gene Ammons","Anita O'Day"],
    isCorrect:'Anita O\'Day',
    why:'Based off the pig latin for \'dough\', slang for money!' 
  },
  {
    question: "The classical name for the jazz bazz is ____________", 
    answer: ["Bass","Stand-up Bass","Upright Bass","Double Bass"],
    isCorrect: "Double Bass",
    why:'Even though it is many times larger, it is built similarly to a violin'
  },
  {
    question: "____________ is know for bringing wide intervals into jazz improv on the trumpet", 
    answer: ["Bill Clinton","Chet Baker","Woody Shaw","Clifford Brown"],
    isCorrect: "Woody Shaw",
    why:"Woody called the trumpet the '\Prince of all horns\'"
  },
  {
    question: "____________ started with the Jazz Messengers at age 19", 
    answer: ["Lance Armstrong","Elvin Jones","Sonny Rollins","Wynton Marsalis"],
    isCorrect: "Wynton Marsalis",
    why:"At the time, Wynton and his brother Branford played alongside two OTHER brothers, Robin and KEvin Eubanks"
  },
  ],

// MANUALLY ADDED FOR COUNTING 
// Q# & Correct totals throughout the quiz
  curQIndex: 0,
  rightAnswerCount: 0,
  wrongAnswerCount: 0
};

function getQuestionToShow(){
  //Get the question thats needed to display
  //grab the question index, put question AND ANSWER values into vars
  var questionObjToDisplay = listOfQandA.questions[listOfQandA.curQIndex];
  var answerObjToDisplay = questionObjToDisplay.answer;
  showQuestion(questionObjToDisplay);
  showAnswers(questionObjToDisplay.answer);
  updateCurrentQuestionCounter(listOfQandA.curQIndex);
}

function showQuestion(questionObjToDisplay){
  // var progressHTML = '<span>(' + (listOfQandA.curQIndex + 1) + '/' + listOfQandA.questions.length + ')</span>';
  
  //Build Question-Var
  q1 = listOfQandA.questions[listOfQandA.curQIndex].question;

  //put question into the html of its placeholder
  $('.jq-question-text')
    .html(q1);
}

function showAnswers(answerObjToDisplay){
  //loop through answer and assign an answer to each radio label
  //also assign the VALUEs of the radios to be the value of the displayed label
    $('.label-answer')
      .each(function(index,label){
        $(this)
          .find('input')
          .attr('value', answerObjToDisplay[index]);
        $(this)
          .find('input')
          .prop('checked', false);
        $(this)
          .find('span')
          .text(answerObjToDisplay[index]);
      });
}

function updateCurrentQuestionCounter(curQNumber){
  incorrectCount = 8 - listOfQandA.rightAnswerCount;
  var currentQuestionNumber = curQNumber + 1;
  $('.currentQuestionTracker')
    .html('Q# ' +currentQuestionNumber + ' of 8');
  $('.currentScore')
    .html(function(){
      if(listOfQandA.wrongAnswerCount <1){
        return listOfQandA.rightAnswerCount + ' correct';
      }else{
        return listOfQandA.rightAnswerCount + ' correct </br> '+ listOfQandA.wrongAnswerCount +' incorrect';
      }
    });
}

//Check if submitted answer is correct or incorrect
function checkAnswerStatus(answerSubmitted, event){
  a1 = listOfQandA.questions[listOfQandA.curQIndex].isCorrect;

  switch(answerSubmitted) {
    
    case (a1):
      showQuestionFeedback(true, event);
      break;

    case (undefined):
      showQuestionFeedback('unanswered', event);
      break;
    
    default:
      showQuestionFeedback(false, event);
  }
}

function showFinalCard() {
  var feedback = $('.popup-inner');
  var thisButtonPopupAttr = $('#submitAnswer')
                            .attr('data-popup-open');
  feedback
    .find('.txt-center')
    .html('You\'re All Done!');
  feedback
    .find('span')
    .text('You got '+ listOfQandA.rightAnswerCount +' out of '+ listOfQandA.questions.length +' correct!');
  $('a[id^="close-feedback-modal"]')
    .remove();
  $('span')
    .append("<button id='restartQuiz' class='button checkAndSee startOver' type='submit' data-popup-open='popup-feedback'>Do it Again!</button>");
}

function showQuestionFeedback(boolVal, ev) {
  var feedback = $('.popup-inner');
  var thisButtonPopupAttr = $('#submitAnswer')
                            .attr('data-popup-open');
  var feedbackSpan = feedback
                      .find('span');
  var rightAnswer = listOfQandA.questions[listOfQandA.curQIndex].isCorrect;
  var theWhy = listOfQandA.questions[listOfQandA.curQIndex].why;

  switch(boolVal) {
     
    case (true):
      feedback.find('.txt-center').html('Correct!');
      feedback.find('img').attr('src', 'happyJazz.jpg');
      listOfQandA.curQIndex++;
      listOfQandA.rightAnswerCount++;
      feedback.find('span').text(theWhy);
      break;

    case ('unanswered'):
      feedback.find('.txt-center').text('MAKE A DECISION');
      feedback.find('img').attr('src', 'waitingJazz.jpg');
      feedback.find('span').text('');
      break;

    default:
      feedback.find('.txt-center').text('Sorry, that wasn\'t correct.');
      feedback.find('img').attr('src', 'angryJazz.jpeg');
      feedback.find('span').text('The correct answer was '+rightAnswer + '. ' + theWhy);
      listOfQandA.curQIndex++;
      listOfQandA.wrongAnswerCount++;
      break;
  }

  ev.preventDefault();
  $('[data-popup="' + thisButtonPopupAttr + '"]').fadeIn(100);

    //IF this is the last card, show the final card!
    //IF NOT go to next question
    if(listOfQandA.curQIndex == listOfQandA.questions.length){
      showFinalCard();
    }else{
      getQuestionToShow();
    }
}

//closing the feedback-dialogue
$('#close-feedback-modal').on('click', function (e) {
  var targetPopupClass = $(this).attr('data-popup-close');
  $('[data-popup="' + targetPopupClass + '"]').fadeOut(300);
  e.preventDefault();

});

//when user selects the submit button
$('#form-quiz').on('click', function(ev){
      var userChoice = $('input[name="answerOption"]:checked').val();
    if(ev
        .target
        .matches('#submitAnswer')
      ){
        checkAnswerStatus(userChoice, event);      
    }
});

$('.popup-inner').on('click', '#restartQuiz', function (e) {
  listOfQandA.curQIndex = 0;
  listOfQandA.rightAnswerCount = 0;
  listOfQandA.wrongAnswerCount = 0;
  $('[data-popup="popup-feedback"]').fadeOut(300);
  e.preventDefault();
  getQuestionToShow();
});

//KNOW when the START button is clicked
$('#button-start')
  .on('click', function(event){
    //HIDE this button DIV
    $(this)
      .parent()
      .addClass('hidden');
   //SHOW the quiz-div
    $('#my-quiz')
      .removeClass('hidden');
  showQuestion();
  });

$(function () {
  getQuestionToShow();
});
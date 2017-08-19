'use strict';

var listOfQuestAndAnswers = [{
    question: "How many records did John Coltrane release during his lifetime?", 
    answers: [{a:"24"},{b:"19"},{c:"54"},{d:"33"}],
    isCorrect:'54',
    why:'Many MORE records were released under his name, including posthumous records & as a sideman.' 
  },
  {
    question: "'Duke' Ellington's first name was...", 
    answers: [{a:"Edward"},{b:"Henry"},{c:"Harriet"},{d:"Samuel"}],
    isCorrect:'Edward',
    why:'Duke is one of many players with \'Jazz royalty\' nicknames' 
  },
  {
    question: "________ was famous for playing with his back turned to the audience", 
    answers: [{a:"Dizzy Gillespie"},{b:"Thelonious Monk"},{c:"Miles Davis"},{d:"Bill Nye"}],
    isCorrect:'Miles Davis' ,
    why:'He was more interested in the music, iteself, than the performance.'
  },
  {
    question: "____________ had her first live performance at the Apollo in New York City", 
    answers: [{a:"Billie Holiday"},{b:"Diana Krall"},{c:"Tina Fey"},{d:"Ella Fitzgerald"}],
     isCorrect:'Ella',
     why:'She was only 17 years old!' 
  },
  {
    question: "____________'s original surname was Colton", 
    answers: [{a:"Dennis Rodman"},{b:"Chesney Baker"},{c:"Gene Ammons"},{d:"Anita O'Day"}],
    isCorrect:'Anita O\'Day',
    why:'Based off the pig latin for \'money\'' 
  },
  {
    question: "The real name for the jazz bazz is ____________", 
    answers: [{a:"Bass"},{b:"Stand-up Bass"},{c:"Upright Bass"},{d:"Double Bass"}],
    isCorrect: "Double Bass",
    why:'Even though it is many times larger, it is built similarly to a violin'
  },
  {
    question: "____________ is know for bringing wide intervals into jazz improv on the trumpet", 
    answers: [{a:"Bill Clinton"},{b:"Chet Baker"},{c:"Woody Shaw"},{d:"Clifford Brown"}],
    isCorrect: "Woody Shaw",
    why:"Woody called the trumpet the '\Prince of all horns\'"
  },
  {
    question: "____________ started with the Jazz Messengers at age 19", 
    answers: [{a:"Lance Armstrong"},{b:"Elvin Jones"},{c:"Sonny Rollins"},{d:"Wynton Marsalis"}],
    isCorrect: "Wynton",
    why:"At the time, Wynton and his brother Branford played alongside two OTHER brothers, Robin and KEvin Eubanks"
  },
];

var  QUIZZ_START_BTN = "#start-quizz-btn";
var  QUIZZ_QUESTION = "#question";
var  QUIZZ_ANSWERS = "#answers";
var  QUIZZ_ANSWER1 = "#answer1";
var  QUIZZ_ANSWER2 = "#answer2";
var  QUIZZ_ANSWER3 = "#answer3";
var  QUIZZ_ANSWER4 = "#answer4";
var  PREVIOUS_BTN = ".previous";
var  QUESTION_TRACK = "#question-track";
var  SCORE_TRACK = "#score-track";
var  NEXT_BTN = ".next";
var  RESULT_BTN ="#result-btn";
var  FINAL_RESULT_PAGE = ".finalResultPage";
var  CLOSE_BTN_RESULT_PAGE = ".close";
var  MIN_WIN_SCORE = 6;

var hasAnswer = false;
var questionNum = 0;
var score = 0;

function hideContent(){
 
  $(QUIZZ_QUESTION).hide();
  $(QUIZZ_ANSWERS).hide();
  $(QUESTION_TRACK).hide();
  $(SCORE_TRACK).hide();
  $(PREVIOUS_BTN).hide();
  $(NEXT_BTN).hide();
  $(RESULT_BTN).hide();
  $(FINAL_RESULT_PAGE).hide();
  $(CLOSE_BTN_RESULT_PAGE).hide();
};

function quizzPlayBtn(e){
  $(QUIZZ_START_BTN).click(function(e){
    e.preventDefault();
    questionNum = 0;
    score = 0;
    showQuestionAndAnswers(questionNum);
    $(QUIZZ_QUESTION).show();
    $(QUIZZ_ANSWERS).show();
    $(QUESTION_TRACK).show();
    $(SCORE_TRACK).show();
    $(PREVIOUS_BTN).show();
    $(NEXT_BTN).show();
    $(QUIZZ_START_BTN).hide();

  });

};

function showQuestionAndAnswers(num){
  $(QUIZZ_ANSWERS).text('')
  $(QUIZZ_QUESTION + ' h4 ').text(listOfQuestAndAnswers[num].question);
  $(QUIZZ_ANSWERS).append(addAnswerList(listOfQuestAndAnswers[num].answers[0].a));
  $(QUIZZ_ANSWERS).append(addAnswerList(listOfQuestAndAnswers[num].answers[1].b));
  $(QUIZZ_ANSWERS).append(addAnswerList(listOfQuestAndAnswers[num].answers[2].c));
  $(QUIZZ_ANSWERS).append(addAnswerList(listOfQuestAndAnswers[num].answers[3].d));
  getSelectedValue(num);
};

function addAnswerList(item){
  return `<li id="answer1"> 
              <div class="input-group">
                <span class="input-group-addon">
                  <input type="radio" name="answers" value="${item}">
                </span>
                <span><h5>${item}</h5><p></p></span>
              </div>
            </li>`

};

function getSelectedValue(num){
  $('input').click(function(e){
    var value = $('input[name=answers]:checked').val();
    if(!hasAnswer){
      hasAnswer = true;
      checkAnswer(value,num)
    }
  })
 
};

function checkAnswer(answerSelected,num){
  if(answerSelected ===  listOfQuestAndAnswers[num].isCorrect){
     $('input[value="'+ listOfQuestAndAnswers[num].isCorrect +  '"]').closest('li').addClass('correct').find('p').text('correct');
    score ++
    TrackLabels()
  }else{
    $('input[name=answers]:checked').closest('li').addClass('incorrect');
    $('input[value="'+ listOfQuestAndAnswers[num].isCorrect +  '"]').closest('li').addClass('correct');
    $('input[value="'+ listOfQuestAndAnswers[num].isCorrect +  '"]').parent().parent().find('p').append(listOfQuestAndAnswers[num].why);
  }
 
};

function TrackLabels(){
  $(QUESTION_TRACK).text('Question: ' + (questionNum + 1) + ' of ' + listOfQuestAndAnswers.length);
  $(SCORE_TRACK).text('Score: ' + score  +  ' of ' + listOfQuestAndAnswers.length);
};


function preNextBtns(){
  $(NEXT_BTN).click(function(){
     questionNum ++
    if(questionNum < listOfQuestAndAnswers.length){
        showQuestionAndAnswers(questionNum);
        TrackLabels();
        hasAnswer = false;
    }else if(questionNum > listOfQuestAndAnswers.length-1){
      resultBtn()
      
    }
  })

  $(PREVIOUS_BTN).click(function(){
    if(questionNum > 0 ){
       questionNum --
       showQuestionAndAnswers(questionNum);
       TrackLabels();  
    }
  })

};

  function activateResultBtn(){
  $(RESULT_BTN).click(function(e){
    e.preventDefault();
    $(QUIZZ_QUESTION).hide();
    $(QUIZZ_ANSWERS).hide();
    $(RESULT_BTN).hide();
    showResults();
    closeBtn()
  })
  }


function resultBtn(){
  $(RESULT_BTN).show();

};

function showResults(){
   $(FINAL_RESULT_PAGE).show(function(){
     if(score >= MIN_WIN_SCORE){
        $(FINAL_RESULT_PAGE).find('p').text('You pass the quizz with a score of: ' + score + ' correct');
     }else{
        $(FINAL_RESULT_PAGE).find('p').text('Sorry you fail the quizz with a score of: ' + score + ' correct') ;
     }
   });
 
}
function closeBtn(){
  $(CLOSE_BTN_RESULT_PAGE).show();
  $(CLOSE_BTN_RESULT_PAGE).click(function(e){
    e.preventDefault();
    // console.log('bye and restart please')
    $(QUIZZ_START_BTN).show();
    $(FINAL_RESULT_PAGE).hide();
     
  });
  
};

function callFunctions(){
    hideContent();
    quizzPlayBtn();
    TrackLabels();
    preNextBtns();
    activateResultBtn();
};

callFunctions();
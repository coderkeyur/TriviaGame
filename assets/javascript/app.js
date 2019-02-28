$(document).ready(function(){

    var currentQ;
    var correctAnswer;
    var wrongAnswer;
    var unanswered;
    var answered;
    var seconds;
    var time;
    var userChoice;

    var text={
        correct: "You got it!",
        incorrect: "Ahh, you selected wrong answer!",
        noTime: "You ran out of time!",
        done: "You completed the game!",
    };

var triviaQuestions = [
    {
        question : "Which of these NBA franchises has never signed LeBron James?",
        choices : ["Cleveland Cavaliers", "Miami Heat", "Los Angeles Lakers", "Houston Rockets"],
        correct : 3,
        answerText : "Lebron hasn't traveled to Houston yet!",
    },{
        question : "Which truck is made by Ford?",
        choices : ["CR-V","Silverado", "F-150", "Tacoma"],
        correct: 2,
        answerText : "Ford makes F-150!",
    },{
        question : "How many blue stripes does the United States of America national flag have?",
        choices : ["10", "16", "6", "0"],
        correct : 3,
        answerText : "No white stripes in the United States flag!",
    },{
        question : "What is the name for the Jewish New Year?",
        choices : ["Hannukkha","Diwali", "Christmas", "Eid"],
        correct : 0,
        answerText : "Jewish new year is known as Hannukkha!",
    },
];

$("#gameArea").hide();

$("#startBtn").on("click", function(){
    $("#startGame").hide();
    newGame();
});

$("#restartGameBtn").on("click", function(){
    $("#Res").hide();
    newGame();
});

function newGame(){
    $("#gameArea").show();
    $("#Ans").hide();
    $("#Res").hide();
    correctAnswer = 0;
    wrongAnswer = 0;
    unanswered = 0;
    currentQ = 0;
    questions();
}

function questions(){
    $("#Qs").show();
    $("#Ans").hide();
    answered = true;
    $(".question").html(triviaQuestions[currentQ].question);
    for (var i = 0; i <= 5; i++) {
        var list= $("<div>");
        list.text(triviaQuestions[currentQ].choices[i]);
        list.attr({"data-index": i });
        list.addClass("thisChoice");
        $(".choices").append(list);
    }

    countDown();

    $(".thisChoice").on("click", function(){
        userChoice = $(this).data("index");
        clearInterval(time);
        shoAnswer();
    });
}

function countDown(){
    seconds = 15;
    $("#time").html("00:" + seconds);
    answered = true;
    time = setInterval(countDownSho, 1000);
}

function countDownSho(){
    seconds --;
    if (seconds < 10) {
        $("#time").html("00:0" + seconds);
    }else{
        $("#time").html("00:" + seconds);
    }

    if (seconds < 1) { 
        clearInterval(time);
        answered = false;
        shoAnswer();
    }
}

function shoAnswer(){
    $("#Qs").hide();
    $("Res").hide();
    $("#Ans").show();
    $(".thisChoice").empty();

    var rightAnswerText = triviaQuestions[currentQ].choices[triviaQuestions[currentQ].correct];
    var rightAnswerIndex = triviaQuestions[currentQ].correct;

    if ((userChoice === rightAnswerIndex) && (answered === true)) {
        correctAnswer++;
        $("#text").html(text.correct);
        $("#correctAnswer").hide();
    } else if ((userChoice !== rightAnswerIndex) && (answered === true)) {
        wrongAnswer++;
        $("#text").html(text.incorrect);
        $("#correctAnswer").show().html("The correct answer is: " + rightAnswerText);
    }else{
        unanswered++;
        $("#text").html(text.noTime);
        $("#correctAnswer").show().html("The correct answer is: " + rightAnswerText);
        answered = true;
    }
    
    if (currentQ === ( triviaQuestions.length-1)) {
        setTimeout(results, 10000);
    } else {
        currentQ++;
        setTimeout(questions, 10000);
    }

}

function results (){
    $("#Ans").hide();
    $("Qs").hide();
    $("#Res").show();
    $("#resultText").html(text.done);
    $("#correctAnswers").html("Correct Answers: " + correctAnswer);
    $("#wrongAnswers").html("Wrong Answers: " + wrongAnswer);
    $("#unanswered").html("Unanswered: " + unanswered);
    $("#restartGameBtn").show();
}

});


$(document).ready(function() {
    let gameData = [];

    // Starts a quick play game
    $('#quick-play-btn').on('click', function() {
        $('#body').load('quick-play.html', function(statusTxt, xhr) {
            // Check to see if response is okay
            if(statusTxt == "success") {
                console.log('Page loaded fine.');
            } else if ( statusTxt == "error") {
                console.log(`Error: ${xhr.statusTxt}`);
            }
        });

        

        $.ajax({
            method: 'GET',
            url: 'https://opentdb.com/api.php?amount=25&category=9&difficulty=easy&type=multiple&encode=base64',
            dataType: 'json',
        }).done(function(quiz){

            // Loops through the JSON and creates an object of game data ready to use
            for(let i = 0; i < quiz.results.length; i++) {

                let answers = [];
                let question = atob(quiz.results[i].question);
                let correct = atob(quiz.results[i].correct_answer);

                for(let j = 0; j < quiz.results[i].incorrect_answers.length; j++) {
                    answers.push(atob(quiz.results[i].incorrect_answers[j]));
                }
                answers.push(correct);

                gameData.push({ question : question, correct : correct, answers : answers})
            };

            console.log(gameData);
            $('#question-title').html(gameData[0].question);
            for(let i = 0; i < gameData[0].answers.length; i++) {
                $('.answer-section').append(`<button>${gameData[0].answers[i]}</button>`)
            }
        });
        
        
            
        
    });
});
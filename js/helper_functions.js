//----------------------------------------------------------------//
// IMPORTS
//----------------------------------------------------------------//
import { gameScore, gamePosition } from './main.js';


//----------------------------------------------------------------//
// VARIABLES
//----------------------------------------------------------------//
export let gameData = [];
export let gameLength = 0;


//----------------------------------------------------------------//
// WE NEED TO REQUEST DATA FROM THE API
//----------------------------------------------------------------//
export function ajaxRequest() {
    $.ajax({
        method: 'GET',
        url: 'https://opentdb.com/api.php?amount=20&category=9&difficulty=easy&type=multiple&encode=base64',
        dataType: 'json',
        timeout: 2000,
        // If it was a success, do this...
        success: function(quiz) {
            console.log('AJAX request completed.');
            quickPlayGameStart(quiz);
        }, 
        // If there was an error, do this...
        error: function(xhr, status, error) {
            let errorMesage = `${xhr.status}: ${xhr.statusText}`;
            console.log(`Error with the AJAX request: ${errorMesage}`);
        }
    })
}

//----------------------------------------------------------------//
// WE NEED TO PROCESS THE JSON RESPONSE DATA AND START THE GAME
//----------------------------------------------------------------//

// Shuffling the array of questions
function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}


export function quickPlayGameStart(quiz) {

    if(gameData.length >= quiz.results.length) {
        gameData = [];
    }

    // Loops through the JSON and create an object of game data ready to use
    for(let i = 0; i < quiz.results.length; i++) {
        let answers = [];
        let question = atob(quiz.results[i].question);
        let correct = atob(quiz.results[i].correct_answer);
        for(let j = 0; j < quiz.results[i].incorrect_answers.length; j++) {
            answers.push(atob(quiz.results[i].incorrect_answers[j]));
        }
        answers.push(correct);
        shuffle(answers);
        gameData.push({ question : question, correct : correct, answers : answers})
    };

    gameLength = gameData.length;

    // Adds first question and answers to the DOM
    $('.progress-bar-wrapper p').html(`1/${gameLength}`);
    $('#question-title').html(gameData[0].question);
    for(let i = 0; i < gameData[0].answers.length; i++) {
        $('.answer-section').append(`<button id="answer-btn">${gameData[0].answers[i]}</button>`)
    }
    $('.answer-section').after('<button id="submit-btn" class="submit-btn disabled">Submit</button>');
    $('#submit-btn').prop('disabled', true);
}

//----------------------------------------------------------------//
// LOADS HTML SNIPPET TO THE PAGE
//----------------------------------------------------------------//

// Loads in the HTML snippets required for each stage of the website
export function loadHTML(element, snippet) {
    // Loads in the neccessary HTML snippet 
    $(element).load(snippet, function(statusTxt, xhr) {
        // Check to see if response is okay
        if(statusTxt == "success") {
            console.log('Page loaded fine.');
        } else if ( statusTxt == "error") {
            console.log(`Error: ${xhr.statusTxt}`);
        }

        // Change the finish screen text to show the percentage completed by the player
        successMessage(element, gameScore, gameLength);
    });
};

//----------------------------------------------------------------//
// CHECK SCORE OF PLAYER AND OUTPUTS MESSAGE BASED ON THAT
//----------------------------------------------------------------//

function successMessage(element, score, length) {
    if(element === '#game-content-wrapper') {
        let percentComplete = (score / length) * 100;
        $('#score-percent').html(`${percentComplete}%`);
            if(percentComplete === 0) {
                $('#game-content-wrapper p').html(`Jesus christ, you didn't get any questions right. Poor effort.`);
        } else if(percentComplete <= 25) {
            $('#game-content-wrapper p').html(`Oh not good, you only got <b>${score}</b> out of <b>${length}</b> questions right. Better luck next time.`);
        } else if(percentComplete <= 50) {
            $('#game-content-wrapper p').html(`Well done, you got <b>${score}</b> out of <b>${length}</b> questions right. You can do better though, how about another game?`);
        } else if(percentComplete <= 90) {
            $('#game-content-wrapper p').html(`Congratulations, you got <b>${score}</b> out of <b>${length}</b> questions right!`);
        } else {
            $('#game-content-wrapper p').html(`Holly cow, you smashed it! You got <b>${score}</b> out of <b>${length}</b> questions right.`);
        }
    }
}

//----------------------------------------------------------------//
// INSERTS RELEVANT GAME CONTENT INTO THE DOM
//----------------------------------------------------------------//
export function insertGameContent(position, length, data) {
    $('.answer-section button').remove();
    $('#current-question-header').html(`Question ${position + 1}`);
    $('.progress-bar-wrapper p').html(`${position + 1}/${length}`);

    // Updates progress bar depending on screen size
    if($(window).width() >= 1280) {
        $('.progress-bar-inner').height((position / length) * 100 + '%');
    } else {
        $('.progress-bar-inner').width((position / length) * 100 + '%');
    }
    
    // Adds question and answers to the DOM
    $('#question-title').html(data[position].question);
    for(let i = 0; i < data[position].answers.length; i++) {
        $('.answer-section').append(`<button id="answer-btn">${data[position].answers[i]}</button>`)
    };
};


















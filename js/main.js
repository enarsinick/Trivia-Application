//--------------------------------//
// IMPORTS
//--------------------------------//
import { quickPlayGameStart, gameData } from './quickPlay.js';

// Global Variables
let gameScore = 0;
let gamePosition = 0;

// We want the code to run once the page is ready
$(document).ready(function() {

    // Once the user clicks the quick play button, it starts the game
    $('#quick-play-btn').on('click', function() {
        // Loads in the neccessary HTML snippet 
        $('#body').load('quick-play.html', function(statusTxt, xhr) {
            // Check to see if response is okay
            if(statusTxt == "success") {
                console.log('Page loaded fine.');
            } else if ( statusTxt == "error") {
                console.log(`Error: ${xhr.statusTxt}`);
            }
        });

        // AJAX request to get the quiz data
        $.ajax({
            method: 'GET',
            url: 'https://opentdb.com/api.php?amount=25&category=9&difficulty=easy&type=multiple&encode=base64',
            dataType: 'json',
            timeout: 2000,
            // If it was a success, do this...
            success: function(quiz) {
                console.log('AJAX request completed.');
                quickPlayGameStart(quiz);
                console.log(gameData);
            }, 
            // If there was an error, do this...
            error: function(xhr, status, error) {
                let errorMesage = `${xhr.status}: ${xhr.statusText}`;
                console.log(`Error with the AJAX request: ${errorMesage}`);
            }
        })
    });

    // Listen out for a click on submit button when game is running
    $('body').on('click', '#submit-btn', function() {

        // We need to check if the selected answer is correct
        $('.answer-section button').each(function(index) {
            if($(this).hasClass('selected-answer')) {
                // If the answer is correct, add 1 to the player sore
                if($(this).html() === gameData[gamePosition].correct) {
                    gameScore ++;
                }
            }
        });

        gamePosition ++;

        $('.answer-section button').remove();

        // Adds first question and answers to the DOM
        $('#question-title').html(gameData[gamePosition].question);
        for(let i = 0; i < gameData[gamePosition].answers.length; i++) {
            $('.answer-section').append(`<button id="answer-btn">${gameData[gamePosition].answers[i]}</button>`)
        };
    });
    
    // We need to add a class to an answer button when selected
    $('body').on('click', '#answer-btn', function() {
        
        // Remove any pre-added class to the button  
        $('.answer-section button').each(function(index) {
            $(this).removeClass('selected-answer');
        });

        // Adds the class to the selected button
        $(this).addClass('selected-answer');
    });
});
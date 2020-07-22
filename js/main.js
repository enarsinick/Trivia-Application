//----------------------------------------------------------------//
// IMPORTS
//----------------------------------------------------------------//
import { gameData, gameLength, loadHTML, ajaxRequest, insertGameContent } from './helper_functions.js';


//----------------------------------------------------------------//
// VARIABLES
//----------------------------------------------------------------//
export let gameScore = 0;
export let gamePosition = 0;


//----------------------------------------------------------------//
// WE WANT THE CODE TO RUN ONCE THE PAGE IS READY
//----------------------------------------------------------------//
$(document).ready(function() {

    // Once the user clicks the quick play button, it starts the game
    $('#quick-play-btn').on('click', function() {
        // Loads the HTML snippet for a quick play game 
        loadHTML('#body', 'quick-play.html');

        // AJAX request to get the quiz data
        ajaxRequest();
    });

    // Listen out for a click on submit button when game is running
    $('body').on('click', '#submit-btn', function() {

        let hasSelectedAnswer = false;

        // We need to check if the selected answer is correct
        $('.answer-section button').each(function(index) {
            if($(this).hasClass('selected-answer')) {
                hasSelectedAnswer = true;
                // If the answer is correct, add 1 to the player sore
                if($(this).html() === gameData[gamePosition].correct) {
                    gameScore ++;
                }
            }
        });

        if (hasSelectedAnswer) {
            gamePosition ++;

            // Check if the user has reach the end of the game
            if (gamePosition >= gameLength) {
                // The game has finished, we need to load in the score screen
                loadHTML('#game-content-wrapper', 'finish.html');
            } else {
                // The game continues, load next question and answers
                insertGameContent(gamePosition, gameLength, gameData);
            }
        } else {
            $('.answer-section').after('<p class="selected-answer-error">Please select an answer</p>');
        }
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
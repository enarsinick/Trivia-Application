//--------------------------------//
// IMPORTS
//--------------------------------//
import { quickPlayGameStart } from './quickPlay.js';


$(document).ready(function() {

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
            timeout: 2000,
            success: function(quiz) {
                console.log('AJAX request completed.');
                quickPlayGameStart(quiz);
            }, 
            error: function(xhr, status, error) {
                let errorMesage = `${xhr.status}: ${xhr.statusText}`;
                console.log(`Error with the AJAX request: ${errorMesage}`);
            }
        })
    });
});
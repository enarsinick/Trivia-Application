import { gameLength } from './quickPlay.js';
import { gameScore } from './main.js';

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
        if(element === '#game-content-wrapper') {
            let percentComplete = (gameScore / gameLength) * 100;
            $('#score-percent').html(`${percentComplete}%`);
                if(percentComplete === 0) {
                    $('#game-content-wrapper p').html(`Jesus christ, you didn't get any questions right. Poor effort.`);
            } else if(percentComplete <= 25) {
                $('#game-content-wrapper p').html(`Oh not good, you only got <b>${gameScore}</b> out of <b>${gameLength}</b> questions right. Better luck next time.`);
            } else if(percentComplete <= 50) {
                $('#game-content-wrapper p').html(`Well done, you got <b>${gameScore}</b> out of <b>${gameLength}</b> questions right. You can do better though, how about another game?`);
            } else if(percentComplete <= 90) {
                $('#game-content-wrapper p').html(`Congratulations, you got <b>${gameScore}</b> out of <b>${gameLength}</b> questions right!`);
            } else {
                $('#game-content-wrapper p').html(`Holly cow, you smashed it! You got <b>${gameScore}</b> out of <b>${gameLength}</b> questions right.`);
            }
            
        }
    });
};
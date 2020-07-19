import { quickPlayGameStart } from './quickPlay.js';

export function ajaxRequest() {
    $.ajax({
        method: 'GET',
        url: 'https://opentdb.com/api.php?amount=25&category=9&difficulty=easy&type=multiple&encode=base64',
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


// We need to store the JSON data in an array of objects
export let gameData = [];

// We need to process the JSON response data and start the quick play game
export function quickPlayGameStart(quiz) {

    // Loops through the JSON and create an object of game data ready to use
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

    // Adds first question and answers to the DOM
    $('#question-title').html(gameData[0].question);
    for(let i = 0; i < gameData[0].answers.length; i++) {
        $('.answer-section').append(`<button id="answer-btn">${gameData[0].answers[i]}</button>`)
    }
}
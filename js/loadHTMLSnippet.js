export function loadHTML(element, snippet) {
    // Loads in the neccessary HTML snippet 
    $(element).load(snippet, function(statusTxt, xhr) {
        // Check to see if response is okay
        if(statusTxt == "success") {
            console.log('Page loaded fine.');
        } else if ( statusTxt == "error") {
            console.log(`Error: ${xhr.statusTxt}`);
        }
    });
}
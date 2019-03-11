const readline = require("readline-sync");

function start() {
    const content = {};

    content.searchTerm = askAndReturnSearchTerm();
    content.prefix = askAndReturnPrefix();

    function askAndReturnSearchTerm() {
        return readline.question("Type a Wikipedia search term: ");
    }


    function askAndReturnPrefix() {
        const options = ["Who is", "What is", "The history of"];
        let index = readline.keyInSelect(options, "Select a prefix:");
        return options[index];
    }

    console.log(content);
}

start();
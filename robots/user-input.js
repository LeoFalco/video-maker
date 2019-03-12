const readline = require("readline-sync");

async function robot(content) {
    console.log("robô user input");
    content.searchTerm = askAndReturnSearchTerm();
    content.prefix = askAndReturnPrefix();
    console.log("content" + JSON.stringify(content));

    function askAndReturnSearchTerm() {
        return readline.question("Type a Wikipedia search term: ");
    }

    function askAndReturnPrefix() {
        const options = ["Who is", "What is", "The history of"];
        let index = readline.keyInSelect(options, "Select a prefix:");
        return options[index];
    }
}

module.exports = robot;
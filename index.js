// código extraído da documentação do @std/esm
// entry.js
require = require("@std/esm")(module);
module.exports = require("./main.mjs").default;

import readline from "readline-sync";

function start() {
    const content = {};

    content.searchTerm = askAndReturnSearchTerm();
    content.prefix = askAndReturnPrefix();

    function askAndReturnSearchTerm() {

        return "termo";
    }


    function askAndReturnPrefix() {
        return "prefix";
    }

    console.log(content);
}

start();
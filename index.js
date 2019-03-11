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
const algorithmia = require("algorithmia");
const sentenceDetection = require("sbd");

async function robot(content) {

    await fetchContentFromWikipedia(content);
    await sanitizeContent(content);

    async function fetchContentFromWikipedia(content) {
        console.log("fetch from wikipedia")
        const algorithmiaAuthenticated = algorithmia('simZSwLQqTEddMOOYcnP1TGS2xg1')
        const wikipediaAlgorithm = algorithmiaAuthenticated.algo('web/WikipediaParser/0.1.2')
        const wikipediaResponde = await wikipediaAlgorithm.pipe(content.searchTerm)

        let wikipediaContent = wikipediaResponde.get()


        content.sourceContentOriginal = wikipediaContent.content;
    }

    function sanitizeContent(content) {
        let withoutLineBlanksAndMarkdown = removeBlankLinesAndMarkDown(content.sourceContentOriginal);
        let withoutSpecialChars = removeSpecialChars(withoutLineBlanksAndMarkdown);

        content.sourceContentSanitized = withoutSpecialChars;

        breakContentIntoSentences(content);

        function removeBlankLinesAndMarkDown(text) {
            return text.split('\n')
                .filter((line) => {
                    // linha existe
                    // nao e vazia
                    // nao começa com '='
                    return line && (line.trim().length !== 0) && (!line.startsWith('='))
                })
                .join(' ');
        }

        function removeSpecialChars(text) {
            return text.replace(/\((?:\([^()]*\)|[^()])*\)/gm, '').replace(/  /g, ' ').replace(" .", '.');
        }
    }

    function breakContentIntoSentences(content) {
    
        let sentences = sentenceDetection.sentences(content.sourceContentSanitized);
        content.sentences = [];

        sentences.forEach((sentence) => {
            content.sentences.push({
                text: sentence,
                keywords: [],
                images: []
            });
        });

        console.log(content.sentences)
    }

    //sanitizeContent(content);
    //breakContentIntoSentences(content);
}

module.exports = robot;  
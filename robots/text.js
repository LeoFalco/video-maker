const algorithmia = require("algorithmia");
const sentenceDetection = require("sbd");

async function robot(content) {

    await fetchContentFromWikipedia(content);
    await sanitizeContent(content);

    async function fetchContentFromWikipedia(content) {
        console.log("fetch from wikipedia")
        const wikipediaResponde = await algorithmia.client('simZSwLQqTEddMOOYcnP1TGS2xg1')
            .algo('web/WikipediaParser/0.1.2')
            .pipe(content.searchTerm)

        content.sourceContentOriginal = wikipediaResponde.get().content
    }

    function sanitizeContent(content) {
        let withoutLineBlanksAndMarkdown = removeBlankLinesAndMarkDown(content.sourceContentOriginal);
        let withoutSpecialChars = removeSpecialChars(withoutLineBlanksAndMarkdown);

        content.sourceContentSanitized = withoutSpecialChars;

        console.log(content.sourceContentSanitized);
        breakContentIntoSentences(content);

        function removeBlankLinesAndMarkDown(text) {
            return text.split('\n')
                .filter((line) => {
                    // linha existe
                    // nao e vazia
                    // nao começa com '='
                    return lineIsNotEmpty(line) &&
                        lineIsNotMarkdownToken(line)
                })
                .join(' ');

            function lineIsNotEmpty(line) {
                return line && (line.trim().length !== 0)
            }

            function lineIsNotMarkdownToken(line) {
                return !line.startsWith('=');
            }

        }

        function removeSpecialChars(text) {
            return text.replace(/\((?:\([^()]*\)|[^()])*\)/gm, '').replace(/  /g, ' ').replace(" .", '.');
        }
    }

    function breakContentIntoSentences(content) {

        function lineIsNotTooShortOrLong(line) {
            return line.length >= 50 && line.length <= 140;

        }

        let sentences = sentenceDetection.sentences(content.sourceContentSanitized)
            .filter(lineIsNotTooShortOrLong);
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
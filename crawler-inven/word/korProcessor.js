/*
Extends korProcessorApi for specialized use.
*/

var KoreanProcessorApi = require('./korProcessorApi');
const maxTextWordCount = 100;

class korProcessor {

    constructor(isDebug) {
        this.isDebug = isDebug;
        this.processor = new KoreanProcessorApi(isDebug);
    }

    extractEssential(text, callback) {
        this.extract(text, ['Noun', 'Number', 'Verb', 'Adjective'], callback);
    }

    extract(text, types, callback) {

        if (text.split(' ').length <= maxTextWordCount) {

            this._tokenize(text, (res) => {
                res.forEach((token) => {
                    this._parseToken(token, types, (res) => { callback(res) })
                })
            });

        } else {

            this._tokenizeLong(text, (res) => {
                res.forEach((token) => {
                    this._parseToken(token, types, (res) => { callback(res) })
                })
            });

        }
    }

    _tokenize(text, callback) {
        this.processor.normalize(text, (res) => {
            this.processor.tokenize(res, (tokens) => { callback(tokens.tokens) });
        });
    }

    _tokenizeLong(text, callback) {

        var splits = this._splitText(text, maxTextWordCount);

        splits.forEach((split) => { this._tokenize(split, callback); });
    }

    _splitText(text, maxWords) {
        var arr = [];
        return this._splitTextHelper(text.split(' '), maxWords, arr);
    }

    _splitTextHelper(words, maxWords, arr) {
        var slice = '';

        for (var i = 0; i < maxWords; i++) {

            if (words.length != 0)
                slice += (words.shift() + ' ');

        }

        arr.push(slice.trim());
        
        if (words.length > 0) {
            return this._splitTextHelper(words, maxWords, arr);
        } else {
            return arr;
        }
    }

    /*
    Parses tokens in form such as '아니요(Adjective(아니다): 0, 3)' into a JSON object of this form :
    {
    word : '아니다'
    literal : '아니요'
    type : 'adjective'
    }

    calls the callback function only on the tokens of the given type.
    */
    _parseToken(token, types, callback) {

        var firstChar = token.substr(0, 1);

        var splitToken = token.replace(/\(|\)|:|,/g, ' ').trim();
        splitToken = splitToken.replace(/\s\s/g, ' ');
        splitToken = splitToken.split(' ');

        var literal;
        var word;
        var type;

        if (firstChar == ',') {
            literal = firstChar;
            word = firstChar;
            type = splitToken[0];
        } else {
            literal = splitToken[0];
            word = splitToken[0];
            type = splitToken[1];
        }

        if (type == 'Verb' || type == 'Adjective')
            var word = splitToken[2];

        var obj = {
            word: word,
            literal: literal,
            type: type
        };

        if (types.includes(type))
            callback(obj);
    }

}

module.exports = korProcessor;

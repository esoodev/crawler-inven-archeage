var request = require('request');
var querystring = require('querystring');

class korProcessorApi {

    constructor(isDebug) {
        this.baseAddr = 'https://open-korean-text.herokuapp.com/';
        this.isDebug = isDebug;
    }

    normalize(text, callback) {

        var query = querystring.stringify({ text: text });

        request({
            uri: 'https://open-korean-text.herokuapp.com/normalize?' + query
        }, function (error, response, body) {

            if (error) throw ('' + error + '\n on text: ' + text); // Print the error if one occurred

            if (this.isDebug) {
                console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
                console.log('body:', body); // Print the HTML for the Google homepage.
            }

            else if (callback != null) {

                try {
                    callback(JSON.parse(body).strings);
                } catch (err) {
                    console.log('Error while JSON.parse on text: ' + text + '\n ' + err +'\n ');
                    console.log('Body: ' + body);
                }

            }
        });
    }

    tokenize(text, callback) {

        var query = querystring.stringify({ text: text });

        request({
            uri: 'https://open-korean-text.herokuapp.com/tokenize?' + query
        }, function (error, response, body) {

            if (error) throw ('' + error + ' on text: ' + text); // Print the error if one occurred

            if (this.isDebug) {
                console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
                console.log('body:', body); // Print the HTML for the Google homepage.
            }

            else if (callback != null) callback(JSON.parse(body));
        });
    }

    extractPhrases(text, callback) {

        var query = querystring.stringify({ text: text });

        request({
            uri: 'https://open-korean-text.herokuapp.com/extractPhrases?' + query
        }, function (error, response, body) {

            if (error) throw ('' + error + '\n on text: ' + text); // Print the error if one occurred

            if (this.isDebug) {
                console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
                console.log('body:', body); // Print the HTML for the Google homepage.
            }

            else if (callback != null) callback(body);
        });
    }

    /*
    NOT SUPPORTED ANYMORE
    */
    //stem(text, callback) {

    //    var query = querystring.stringify({ text: text });

    //    request({
    //        uri: 'https://open-korean-text.herokuapp.com/stem?' + query
    //    }, function (error, response, body) {

    //        if (this.isDebug) {
    //            if (error) throw ('error:' + error); // Print the error if one occurred
    //            console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    //            console.log('body:', body); // Print the HTML for the Google homepage.
    //        }

    //        else if (callback != null) callback(body);
    //    });
    //}
}

module.exports = korProcessorApi;

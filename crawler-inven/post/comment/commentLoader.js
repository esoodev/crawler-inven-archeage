var Comment = require('./comment');
var http = require("http");
var querystring = require('querystring');
var parseString = require('xml2js').parseString;

// Loads comments in xml format via http request. 
// Calls the callback function on the resulting xml data afterwards.
class CommentLoader {

    constructor(callback) {
        this.callback = callback;   // Gets called on each comment.
    }

    loadComments(post) {

        if (!post.isValid || post == null) return;

        var postData = querystring.stringify({
            'comeidx': post.board_id,
            'articlecode': post.post_id,
            "out": "xml"
        });

        var httpOptions = {
            hostname: 'www.inven.co.kr',
            path: '/common/board/comment.xml.php',
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': Buffer.byteLength(postData)
            }
        };

        const req = http.request(httpOptions, (res) => {

            res.setEncoding('utf8');
            var data = '';

            // Data loaded
            res.on('data', (res) => {
                data += res;
            });

            // Request finished
            res.on('end', (res) => {
                this._parse(post, data);
            });
        });

        req.on('error', (e) => {
            console.error(`problem with request: ${e.message}`);
        });


        req.write(postData);
        req.end();

    }

    _parse(post, data) {

        var comments = [];

        parseString(data, (err, result) => {
            //example: gets a comment

            try {
                result.resultdata.commentlist[0].item.forEach((content, index) => {

                    var comment = new Comment(post);

                    comment.author = content.o_name[0];
                    comment.comment_id = content.$.cmtidx;
                    comment.content = content.o_comment[0].replace(/&nbsp;/g, ' ').replace(/[\r\n]+/g,"\\n").trim();
                    comment.write_date = content.o_date[0];

                    this.callback(comment); // Calls the callback on each comment.

                    comments.push(comment);
                });
            } catch (err) {
                console.log('Error while parsing comments. There are no comments in post ' + post.post_id + '.');
            }

        });
    }

}
module.exports = CommentLoader;
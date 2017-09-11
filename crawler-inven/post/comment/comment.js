var KoreanProcessor = require('../../word/korProcessor');

class Comment {

    /*
    Initialize a comment object based on the post it belongs to.
    */
    constructor(post) {

        this.server = post.server;

        this.board_id = post.board_id;
        this.board_name = post.board_name;
        this.post_id = post.post_id;

        this.author;
        this.comment_id;
        this.content;
        this.write_date;

        this.wordProcessor = new KoreanProcessor();

    };

    loopThruWords(callback) {
        this.wordProcessor.extractEssential(this.content, callback);
    }

    get parameters() {
        return [this.board_id, this.post_id, this.server, this.content, this.write_date];
    }

    get isValid() {
        return (this.content.charAt(0) != '<' && this.content.charAt(this.content.length - 1) != '>');
    }
}
module.exports = Comment;


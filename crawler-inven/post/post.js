var url = require('url');

class Post {

    /*
    Constructs based on the result from PostLoader.
    */
    constructor(res) {

        this.board_name = res['viewTopBoardName'];
        this.write_date = res['articleDate'];
        this.author = res['articleWriter'];
        this.post_name = res['articleTitle'];
        this.page_url = res['articleBotUrl'];
        this.content = res['powerbbsContent'];

        this.url_parts = url.parse(res['articleBotUrl'], true);
        this.server;
        this.board_id;
        this.post_id;

        this._setPost_id();
        this._setBoard_id();
        this._setServer();

    };

    _setPost_id() {
        //return this.url_parts.query.l;

        if(this.url_parts.query.l) {
            this.post_id = this.url_parts.query.l;
        } else {
            try {
                this.post_id = this.url_parts.path.split('/')[4]
            } catch (err) {
                console.log('Could not retrieve post_id. Is the crawl result valid?') 
            }
        }
        
    }

    _setBoard_id() {
        //return this.url_parts.query.come_idx;

        if(this.url_parts.query.come_idx) {
            this.board_id = this.url_parts.query.come_idx;
        } else {
            try {
            this.board_id = this.url_parts.path.split('/')[3]
            } catch (err) {
                console.log('Could not retrieve board_id. Is the crawl result valid?')
            }
        }
        
    }

    _setServer() {
        var name = this.board_name.replace(/아키에이지|인벤|게시판|서버/gi, '');
        //return name.trim();
        this.server = name.trim();
    }

    /*
    Returns parameters for the stored procedure.
    */
    get parameters() {
        return [this.board_id, this.post_id, this.server, this.content, this.write_date, this.page_url];
    }

    get isValid() {
        return (this.board_id != null && this.post_id != null);
    }
}
module.exports = Post;


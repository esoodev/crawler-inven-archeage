var PostLoader = require('./post/postLoader');
var PostSaver = require('./post/postSaver');
var Post = require('./post/post');

var CommentLoader = require('./post/comment/commentLoader');
var CommentSaver = require('./post/comment/commentSaver');
var Comment = require('./post/comment/comment');

var WordLoader = require('./word/korProcessor');
var WordSaver = require('./word/wordSaver');
var Word = require('./word/word');

const debug_postLoader = true;

class Crawler {

    constructor(settings, isExtractWords) {
        this.settings_crawler = settings.settings_crawler;
        this.settings_mysql = settings.settings_mysql;
        this.wSaver = new WordSaver();
        this.wLoader = new WordLoader();

        this.cSaver = new CommentSaver();
        this.cLoader = new CommentLoader((comment) => {

            if (isExtractWords) {
                this.wLoader.extractEssential(comment.content, (res) => {
                    var word = new Word(res, comment.write_date);

                    if (word.isValid)
                        this.wSaver.save(word, () => {});
                });
            }

            this.cSaver.save(comment);
        });

        this.pSaver = new PostSaver();
        this.pLoader = new PostLoader(this.settings_crawler, (res) => {
            var post = new Post(res);

            if (isExtractWords) {
                this.wLoader.extractEssential(post.content, (res) => {
                    var word = new Word(res, post.write_date);

                    if (word.isValid)
                        this.wSaver.save(word, () => {});
                });
            }

            this.pSaver.save(post);
            this.cLoader.loadComments(post);
        }, debug_postLoader);

    }

    crawl(docId) {
        this.pLoader.crawl(docId);
    }

    crawlUrl(url) {
        this.pLoader.crawlUrl(url);
    }

    crawlList(docIds) {

    }

    crawlAll() {
        this.pLoader.crawlAll();
    }

    crawlN(count) {

    }

    crawlBatch() {

    }

}

module.exports = Crawler;
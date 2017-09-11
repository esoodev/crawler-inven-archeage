var setup = require('../setup');
var crawler = require('crawler');
var entities = require('html-entities').AllHtmlEntities;

class PostLoader {

    constructor(settings, callback, isDebug) {

        this.settings = settings;
        console.log(settings)

        if (isDebug != null)
            this.isDebug = isDebug;
        else this.isDebug = false;

        this.crawler = new crawler({
            maxConnections: setup.maxConnections,
            // This will be called for each crawled page 
            callback: function (error, res, done) {
                if (error) {
                    console.log(error);
                } else {
                    var $ = res.$;
                    var post = [];
                    // $ is Cheerio by default 
                    //a lean implementation of core jQuery designed specifically for the server 
                    setup.postSelectors.forEach((selector) => {
                        var value = $(selector).text().trim();
                        if (value != null) {

                            if (selector == '#powerbbsContent')
                                try {
                                    post[selector.substr(1)] = entities.decode($(selector).html().trim()).replace(/<p>\s<\/p>+/g, "\\n").replace(/<(?:.)*?>/gm, '');
                                } catch (err) {
                                    post[selector.substr(1)] = ''
                                }
                            else
                                post[selector.substr(1)] = $(selector).text().trim();
                        }
                    });
                    callback(post);
                }
                done();
            }
        });

    }

    crawl(docId) {
        if (this.isDebug) console.log('queueing: ' + this.settings.url + docId);
        this.crawler.queue(this.settings.url + docId);
    }

    crawlUrl(url) {
        if (this.isDebug) console.log('queueing: ' + url);
        this.crawler.queue(url);
    }

    crawlList(docIds) {
        docIds.forEach((docId) => {
            this.crawl(docId);
        });
    }

    crawlAll() {
        var start = this.settings.postId_start;
        var end = this.settings.postId_end;

        for (var id = start; id <= end; id++) {
            this.crawl(id);
        }
    }

    crawlN(count) {
        var start = this.settings.postId_start;
        var end = start + count;
        for (var id = start; id < end; id++) {
            this.crawl(id);
        }
    }

    get info() {
        return this.settings;
    }


}

module.exports = PostLoader;
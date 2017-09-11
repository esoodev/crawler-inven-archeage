var PostLoader = require('./postLoader');
var PostSaver = require('./postSaver');
var Post = require('./post');

var saver = new PostSaver();

var loader = new PostLoader(0, (res) => {
    var post = new Post(res);
    saver.save(post);
}, false);
var loader2 = new PostLoader(0, (res) => {
    var post = new Post(res);
    saver.save(post);
}, false);
var loader3 = new PostLoader(0, (res) => {
    var post = new Post(res);
    saver.save(post);
}, false);

loader.crawlAll();

var PostLoader = require('./postLoader');
var PostSaver = require('./postSaver');
var Post = require('./post');

const settings = require('../../setup.json');
const settings_crawler = settings.settings_crawler;
const settings_mysql = settings.settings_mysql;

var saver = new PostSaver(settings_mysql);


var loader = new PostLoader(settings_crawler, (res) => {
    var post = new Post(res);
    console.log(post)
    saver.save(post);
}, false);
// var loader2 = new PostLoader(0, (res) => {
//     var post = new Post(res);
//     saver.save(post);
// }, false);
// var loader3 = new PostLoader(0, (res) => {
//     var post = new Post(res);
//     saver.save(post);
// }, false);

loader.crawl(200);
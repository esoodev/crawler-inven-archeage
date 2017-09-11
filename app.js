var Crawler = require('./crawler-inven/crawler');
const settings = require('./setup.json');

var crawler = new Crawler(settings);
crawler.crawlAll();
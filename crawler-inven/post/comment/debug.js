var CommentLoader = require('./commentLoader');
var CommentSaver = require('./commentSaver');
var Post = require('../post');
var loader = new CommentLoader(loaderCallback);
var saver = new CommentSaver();

const samplePost1 = new Post({
    "viewTopBoardName": "아키에이지 인벤 자유 게시판",
    "articleDate": "some date",
    "articleWriter": "me",
    "articleTitle": "some title",
    "articleBotUrl": "http://www.inven.co.kr/board/powerbbs.php?come_idx=2645&l=463658",
    "powerbbsContent": "content"
});

const samplePost2 = new Post({
    "viewTopBoardName": "아키에이지 인벤 자유 게시판",
    "articleDate": "some date",
    "articleWriter": "me",
    "articleTitle": "some title",
    "articleBotUrl": "http://www.inven.co.kr/board/powerbbs.php?come_idx=2645&l=463678",
    "powerbbsContent": "content"
});



function loaderCallback(comment) {
    saver.save(comment);
}

loader.loadComments(samplePost1);
loader.loadComments(samplePost2);
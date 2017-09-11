var Executor = require('../../mysql/storedProcedureExecutor');
var StoredProcedure = require('../../mysql/storedProcedure');

class CommentSaver {

    constructor() {
        this.executor = new Executor();
    }

    save(comment, callback) {
        
        // Ignore links
        if (comment.isValid) {
            this.executor.execute(new StoredProcedure('xlp_save_inven_comment_test', comment.parameters), (res) => { if (callback != null) callback(res) });
        }
    }
}
module.exports = CommentSaver;
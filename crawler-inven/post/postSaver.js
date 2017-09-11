var Executor = require('../mysql/storedProcedureExecutor');
var StoredProcedure = require('../mysql/storedProcedure');

class PostSaver {
    constructor() {
        this.executor = new Executor();
    }

    save(post, callback) {
        if (post.isValid)
            this.executor.execute(new StoredProcedure('xlp_save_inven_post_test', post.parameters), (res) => { if (callback != null) callback(res) });
    }
}

module.exports = PostSaver;
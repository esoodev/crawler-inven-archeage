var MysqlSP = require('../../mysql/mysql-stored-procedure');

class CommentSaver {

    constructor(connectionSetup) {
        this.connectionSetup = connectionSetup;
        this.mysqlsp = new MysqlSP(connectionSetup);
    }

    save(comment, callback) {

        if (comment.isValid)
            this.mysqlsp.execute(this.connectionSetup.storedProcedureName_saveComment, comment.parameters, (res) => { if (callback != null) callback(res) });
    }
}
module.exports = CommentSaver;
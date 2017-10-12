var MysqlSP = require('../mysql/mysql-stored-procedure');

class PostSaver {

    constructor(connectionSetup) {
        this.connectionSetup = connectionSetup;
        this.mysqlsp = new MysqlSP(connectionSetup);
    }

    save(post, callback) {
        if (post.isValid)
            this.mysqlsp.execute(this.connectionSetup.storedProcedureName_savePost, post.parameters, (res) => { if (callback != null) callback(res) });
        else 
            console.log('Invalid post. Not saving. : ' + JSON.stringify(post)) 
    }
}

module.exports = PostSaver;
/*
Given a string (comment), saves the words into the database.
*/

var MysqlSP = require('../mysql/mysql-stored-procedure');

class WordSaver {

    constructor(connectionSetup) {
        this.connectionSetup = connectionSetup;
        this.mysqlsp = new MysqlSP(connectionSetup);
    }

    save(word, callback) {

        if (word.isValid)
            this.mysqlsp.execute(this.connectionSetup.storedProcedureName_saveWord, word.parameters, (res) => {
                if (callback != null) callback(res)
            });
        else console.log('error: word is invalid \n' + JSON.stringify(word));

    }
}
module.exports = WordSaver;
var Executor = require('../mysql/storedProcedureExecutor');
var StoredProcedure = require('../mysql/storedProcedure');


/*
Given a string (comment), saves the words into the database.
*/
class WordSaver {

    constructor() {
        this.executor = new Executor();
    }

    save(word, callback) {

        if (word.isValid)
            this.executor.execute(new StoredProcedure('xlp_save_inven_word', word.parameters), (res) => { if (callback != null) callback(res) });
        else console.log('error: word is invalid \n' + JSON.stringify(word));
        
    }
}
module.exports = WordSaver;
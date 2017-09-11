'use strict';

class StoredProcedure {

    constructor(procedureName, parameters) {
        this.procedureName = procedureName;
        this.parameters = parameters;
    }

    /*
    Get query format used by StoredProcedureExecutor class.
    */
    getQuery(parametersCount) {
        var str = 'CALL ' + this.procedureName + ' (';
        var loopCount = parametersCount == null ? this.parameters.length : parametersCount;


        for (var i = 1; i <= loopCount; i++) {
            str += '?';
            if (i != loopCount)
                str += ',';
        }

        str += ');';
        return str;
    }
}

module.exports = StoredProcedure;

/*
Simple module for executing mysql stored procedures.
*/
'use strict';

var mysql = require('mysql');
var assert = require('assert');

module.exports = class MysqlSP {

    constructor(connection) {

        /* Sample connection format :
        {
            connectionLimit : 10,
            host            : 'example.org',
            user            : 'bob',
            password        : 'secret',
            database        : 'my_db'
        } */

        this.pool = mysql.createPool(connection);
    }

    execute(procedureName, parameters, cb) {
        this.pool.query(this._getQueryFormat(procedureName, parameters), parameters,
            (err, rows) => {
                if (err)
                    console.log(err + '');
                else
                    cb(rows);
            }
        );
    }

    close(onError) {
        this.pool.end((err) => {
            if (err) {
                if (onError) onError(err)
                else console.log(err)
            }
        });
    }


    _getQueryFormat(procedureName, parameters) {

        assert(parameters != null && procedureName != null);

        var str = 'CALL ' + procedureName + ' (';
        var loopCount = parameters.length;


        for (var i = 1; i <= loopCount; i++) {
            str += '?';
            if (i != loopCount)
                str += ',';
        }

        str += ');';
        return str;
    }

}
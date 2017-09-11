'use strict';

var mysql = require('mysql');
var connection = require('./setup');

class MySqlExecutor {

    constructor() {
        this.pool = mysql.createPool(connection);
    }

    execute(procedure, cb) {
        this.pool.query(procedure.getQuery(), procedure.parameters,
            (err, rows) => {
                if (err)
                    console.log(err + '');
                else
                    cb(rows);
            }
        );
    }
}

module.exports = MySqlExecutor;

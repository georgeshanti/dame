"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var mysql = __importStar(require("mysql"));
var MySQLConnector = /** @class */ (function () {
    function MySQLConnector(host, user, password, db) {
        this.host = host;
        this.user = user;
        this.password = password;
        this.db = db;
    }
    MySQLConnector.prototype.connection = function () {
        var connection = mysql.createConnection({
            host: this.host,
            user: this.user,
            password: this.password,
            database: this.db
        });
    };
    MySQLConnector.prototype.getTables = function () {
        var connection = this.connection();
        connection.connect();
        connection.query('SHOW TABLES', function (error, results, fields) {
            if (error)
                throw error;
            console.log('The solution is: ', results);
        });
        connection.end();
    };
    MySQLConnector.prototype.executeQuery = function (statement) {
        var connection = this.connection();
        connection.connect();
        connection.query(statement, function (error, results, fields) {
            if (error)
                throw error;
            console.log('The solution is: ', results);
            return results;
        });
        connection.end();
    };
    return MySQLConnector;
}());
exports.default = MySQLConnector;

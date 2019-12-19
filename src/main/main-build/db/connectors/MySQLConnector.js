"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = __importStar(require("mysql"));
const Connector_1 = require("@db/connectors/Connector");
const Table_1 = require("@db/Table");
const Row_1 = require("@db/Row");
const Schema_1 = require("@db/Schema");
const Promise = require('promise');
class MySQLConnector extends Connector_1.Connector {
    constructor(host, user, password, db) {
        super();
        this.host = host;
        this.user = user;
        this.password = password;
        this.db = db;
        this.schemas = [];
        this.pool = mysql.createPool({
            connectionLimit: 10,
            host: this.host,
            user: this.user,
            password: this.password,
            database: this.db
        });
    }
    executeQuery(query) {
        return new Promise((resolve, reject) => {
            this.pool.query(query, function (error, result, fields) {
                if (error)
                    reject(error);
                else {
                    let rows = result.map((x) => {
                        return new Row_1.Row(x);
                    });
                    resolve(rows);
                }
            });
        });
    }
    getSchemasAndTables() {
        return new Promise((resolve, reject) => {
            this.executeQuery(`SELECT table_schema, table_name FROM information_schema.tables;`)
                .then((rows) => {
                let schemaDict = {};
                for (var index in rows) {
                    let schemaRow = rows[index];
                    let schemaName = schemaRow['table_schema'];
                    let tableName = schemaRow['table_name'];
                    if (!Object.keys(schemaDict).includes(schemaName)) {
                        schemaDict[schemaName] = new Schema_1.Schema(schemaName, this);
                    }
                    let schema = schemaDict[schemaName];
                    let table = new Table_1.Table(tableName, schema, this);
                    schemaDict[schemaName].tables.push(table);
                }
                let schemas = [];
                for (let index in schemaDict)
                    schemas.push(schemaDict[index]);
                resolve(rows);
            });
        });
    }
}
exports.MySQLConnector = MySQLConnector;

import * as mysql from "mysql";

import { Connector } from '@db/connectors/Connector';
import { Table } from "@db/Table";
import { Row } from "@db/Row";
import { Column } from "@db/Column";
import { Schema } from "@db/Schema";
import { resolve } from "dns";
const Promise = require('promise');

class MySQLConnector extends Connector{
    host: string;
    user: string;
    password: string;
    db: string;
    pool: any;
    schemas: Schema[];

    constructor(host: string, user: string, password: string, db: string){
        super();
        this.host = host;
        this.user = user;
        this.password = password;
        this.db = db;
        this.schemas = [];
        this.pool = mysql.createPool({
            connectionLimit : 10,
            host     : this.host,
            user     : this.user,
            password : this.password,
            database : this.db
        });
    }
    
    executeQuery(query: string):Promise<Row[]>{
        return new Promise((resolve, reject)=>{
            this.pool.query( query, function (error, result, fields) {
                if (error) reject(error);
                else{
                    let rows: Row[] = result.map((x)=>{
                        return new Row(x);
                    })
                    resolve(rows);
                }
            });
        });
    }

    getSchemasAndTables():Promise<Schema[]>{
        return new Promise((resolve, reject)=>{
            this.executeQuery(`SELECT table_schema, table_name FROM information_schema.tables;`)
                .then((rows)=>{
                    let schemaDict: {[id: string]: Schema} = {};
                    for(var index in rows){
                        let schemaRow: Row = rows[index];
                        let schemaName: string = schemaRow['table_schema'];
                        let tableName: string = schemaRow['table_name'];
                        if( !Object.keys(schemaDict).includes(schemaName) ){
                            schemaDict[schemaName] = new Schema(schemaName, this);
                        }
                        let schema: Schema = schemaDict[schemaName];
                        let table = new Table(tableName, schema, this);
                        schemaDict[schemaName].tables.push(table);
                    }
                    let schemas: Schema[] = [];
                    for( let index in schemaDict )
                        schemas.push(schemaDict[index]);
                    resolve(rows);
                })
        });
    }
}

export { MySQLConnector }
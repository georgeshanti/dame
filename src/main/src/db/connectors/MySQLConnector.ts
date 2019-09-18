import * as mysql from "mysql";

import Connector from './Connector';

export default class MySQLConnector implements Connector{
    host: string;
    user: string;
    password: string;
    db: string;

    constructor(host: string, user: string, password: string, db: string){
        this.host = host;
        this.user = user;
        this.password = password;
        this.db = db;
    }

    connection():any{
        var connection = mysql.createConnection({
            host     : this.host,
            user     : this.user,
            password : this.password,
            database : this.db
        });
    }

    getTables(){
        var connection = this.connection();
        connection.connect();
        
        connection.query( 'SHOW TABLES', function (error, results, fields) {
        if (error) throw error;
        console.log('The solution is: ', results);
        });
        
        connection.end();
    }
    
    executeQuery(statement: string):any{
        var connection = this.connection();
        connection.connect();
        
        connection.query( statement, function (error, results, fields) {
            if (error) throw error;
            console.log('The solution is: ', results);
            return results;
        });
        
        connection.end();
    }
}
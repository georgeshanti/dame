"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('module-alias/register');
const MySQLConnector_1 = require("@db/connectors/MySQLConnector");
const Dame_1 = require("./Dame");
let dame = new Dame_1.Dame();
dame.startServer(() => {
    dame.launchWindow();
    var connect = new MySQLConnector_1.MySQLConnector('localhost', 'mysql', 'mysql', 'test');
    connect.getSchemasAndTables()
        .then((schemas) => {
        console.log(schemas);
    });
});

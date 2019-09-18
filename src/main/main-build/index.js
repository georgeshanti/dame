"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var MySQLConnector_1 = __importDefault(require("./db/connectors/MySQLConnector"));
var DameApp_1 = require("./DameApp");
var dame = new DameApp_1.Dame();
dame.startServer(function () {
    console.log("What?");
    dame.launchWindow();
    var connect = new MySQLConnector_1.default('', '', '', '');
    connect.getTables();
    connect.executeQuery("Select * from USER;");
});

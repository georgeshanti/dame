"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Schema {
    constructor(name, connector) {
        this.name = name;
        this.connector = connector;
        this.tables = [];
    }
}
exports.Schema = Schema;

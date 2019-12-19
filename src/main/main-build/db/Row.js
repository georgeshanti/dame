"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Row {
    constructor(row) {
        for (let key in row) {
            this[key] = row[key];
        }
    }
}
exports.Row = Row;

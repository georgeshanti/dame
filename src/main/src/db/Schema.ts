import { Column } from "@db/Column";
import { Connector } from "@db/connectors/Connector";
import { Table } from "@db/Table";

class Schema{
    name: string;
    connector: Connector;
    tables: Table[];

    constructor(name: string, connector: Connector){
        this.name = name;
        this.connector = connector;
        this.tables = [];
    }
}

export { Schema };
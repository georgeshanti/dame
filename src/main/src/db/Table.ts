import { Column } from "@db/Column";
import { Connector } from "@db/connectors/Connector";
import { Schema } from "./Schema";

class Table{
    name: string;
    scheman: Schema;
    connector: Connector;
    columns: Column[];

    constructor(name: string, schema:Schema, connector: Connector){
        this.name = name;
        this.connector = connector;
    }

    getColumns(): Promise<Column[]>{return null;}
}

export { Table };
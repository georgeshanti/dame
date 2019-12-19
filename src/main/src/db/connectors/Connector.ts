import { Row } from '@db/Row';
import { Table } from '@db/Table';
import { Column } from '@db/Column';
import { Schema } from '@db/Schema';

const Promise = require('promise');

abstract class Connector{

    schemas: Schema[];

    executeQuery(statement: string): Promise<Row[]>{ return null; };
    getSchemasAndTables(): Promise<Schema[]>{ return null; }
}

export { Connector };
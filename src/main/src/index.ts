require('module-alias/register');

import { Connector } from '@db/connectors/Connector';
import { MySQLConnector } from '@db/connectors/MySQLConnector';

import { Dame } from './Dame';
import { Table } from '@db/Table';

let dame:Dame = new Dame();

dame.startServer(()=>{
	dame.launchWindow();
	var connect:Connector = new MySQLConnector('localhost','mysql','mysql','test');
	connect.getSchemasAndTables()
		.then((schemas)=>{
			console.log(schemas);
		})
});
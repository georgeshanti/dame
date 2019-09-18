import Connector from './db/connectors/Connector';
import MySQLConnector from './db/connectors/MySQLConnector';

import { Dame } from './DameApp';

let dame:Dame = new Dame();

dame.startServer(()=>{
	console.log("What?");
	dame.launchWindow();
	var connect:Connector = new MySQLConnector('','','','');
	connect.getTables();
	connect.executeQuery("Select * from USER;")
});
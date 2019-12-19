import { BrowserWindow, app } from 'electron';
import express from "express";

import  {Connector } from "@db/connectors/Connector";

const isDev:boolean = require("electron-is-dev");

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.

const PORT:number = 8000;
const uiURL:string = "http://localhost:3000/";
class Dame{
	dameApp: Electron.App;
	mainWindow: Electron.BrowserWindow;
	server: express.Application;
	connectors:{string: Connector};

	constructor(){
		this.dameApp = app;
		this.server = express();
	}

	startServer(cb):void{
		if(!isDev)
			this.server.listen(PORT, cb);
		cb();
	}

	createWindow(){
		this.mainWindow = new BrowserWindow();
		this.mainWindow.loadURL(uiURL);

		// Open the DevTools.
		this.mainWindow.webContents.openDevTools()

		// Emitted when the window is closed.
		this.mainWindow.on('closed', () => {
			// Dereference the window object, usually you would store windows
			// in an array if your this.dameApp supports multi windows, this is the time
			// when you should delete the corresponding element.
			this.mainWindow = null
		})
	}

	launchWindow():void{
		this.dameApp.on('ready', this.createWindow.bind(this));

		// Quit when all windows are closed.
		this.dameApp.on('window-all-closed', () => {
			// On macOS it is common for applications and their menu bar
			// to stay active until the user quits explicitly with Cmd + Q
			if (process.platform !== 'darwin')
				app.quit()
		});

		this.dameApp.on('activate', () => {
		// On macOS it's common to re-create a window in the this.dameApp when the
		// dock icon is clicked and there are no other windows open.
			if (this.mainWindow === null) {
				this.createWindow();
			}
		});
	}
}

export { Dame }
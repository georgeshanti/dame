"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var express_1 = __importDefault(require("express"));
var isDev = require("electron-is-dev");
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
var PORT = 8000;
var uiURL = "http://localhost:3000/";
var Dame = /** @class */ (function () {
    function Dame() {
        this.dameApp = electron_1.app;
        this.server = express_1.default();
    }
    Dame.prototype.startServer = function (cb) {
        if (!isDev)
            this.server.listen(PORT, cb);
        cb();
    };
    Dame.prototype.createWindow = function () {
        var _this = this;
        this.mainWindow = new electron_1.BrowserWindow();
        this.mainWindow.loadURL(uiURL);
        // Open the DevTools.
        this.mainWindow.webContents.openDevTools();
        // Emitted when the window is closed.
        this.mainWindow.on('closed', function () {
            // Dereference the window object, usually you would store windows
            // in an array if your this.dameApp supports multi windows, this is the time
            // when you should delete the corresponding element.
            _this.mainWindow = null;
        });
    };
    Dame.prototype.launchWindow = function () {
        var _this = this;
        this.dameApp.on('ready', this.createWindow.bind(this));
        // Quit when all windows are closed.
        this.dameApp.on('window-all-closed', function () {
            // On macOS it is common for applications and their menu bar
            // to stay active until the user quits explicitly with Cmd + Q
            if (process.platform !== 'darwin')
                electron_1.app.quit();
        });
        this.dameApp.on('activate', function () {
            // On macOS it's common to re-create a window in the this.dameApp when the
            // dock icon is clicked and there are no other windows open.
            if (_this.mainWindow === null) {
                _this.createWindow();
            }
        });
    };
    return Dame;
}());
exports.Dame = Dame;

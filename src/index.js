const { createWindow } = require('./main');
const { app, BrowserWindow, Menu, ipcMain } = require('electron');


require('electron-reload')(__dirname)

app.allowRendererProcessReuse = true; 
app.whenReady().then(createWindow);
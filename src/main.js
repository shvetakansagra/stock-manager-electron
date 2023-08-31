const { BrowserWindow } = require('electron');

function createWindow() {
    window = new BrowserWindow({
                       width:800,
                       height:600,
                       webPreferences: {
                       nodeIntegration: true,
                       contextIsolation: false //required flag
                     }
                   })
     window.loadFile("src/ui/index.html");
   }


   module.exports = {
    createWindow 
  };   
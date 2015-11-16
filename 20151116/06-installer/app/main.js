var app = require('app');  // Module to control application life.
var BrowserWindow = require('browser-window');  // Module to create native browser window.

// Report crashes to our server.
require('crash-reporter').start();

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the javascript object is GCed.
var mainWindow = null;

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  if (process.platform != 'darwin')
    app.quit();
});

// This method will be called when Electron has done everything
// initialization and ready for creating browser windows.
app.on('ready', function() {
    var Menu = require('menu');
    var dockMenu = Menu.buildFromTemplate([
      { label: 'New Window', click: function() { console.log('New Window'); } },
      { label: 'New Window with Settings', submenu: [
        { label: 'Basic' },
        { label: 'Pro'}
      ]},
      { label: 'New Command...'}
    ]);
    app.dock.setMenu(dockMenu);

  // Create the browser window.
  mainWindow = new BrowserWindow({width: 1060, height: 700});

  // and load the index.html of the app.
  mainWindow.loadUrl('file://' + __dirname + '/index.html');

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
});

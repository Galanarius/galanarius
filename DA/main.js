const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');
const url = require('url');
let win;

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({
    width: 1000,
    height: 650,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  win.loadFile('index.html')

  // Open the DevTools.
  //win.webContents.openDevTools()

  // Emitted when the window is closed.
  win.on('closed', () => {
    win = null
  })
  var menu = Menu.buildFromTemplate([
  {
    label: 'Menu',
    submenu: [
        {
          label:'Home',
          click: async() => {

          }
        },
        {
          label:'About'
        },
        {
          label:'Profile'
        },
        {
          label: 'Stats'
        }
    ]
  }
  ]);
  Menu.setApplicationMenu(menu);
}
//Runs on full load
app.on('ready', createWindow)
// Quit when all windows are closed.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
//Allows window to be reopened from the dock on macOS
app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})
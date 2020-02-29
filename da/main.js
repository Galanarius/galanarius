const { app, BrowserWindow } = require('electron');
const Electron = require('electron');
var win;

function createWindow(){
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })
  win.loadFile('pages/home.html')
}

function loadMenu(){
  const menuTemp = [
    {
      label: 'Home',
      click: () => {
        win.loadFile('pages/home.html');
      }
    },
    {
      label: 'Log in',
      click: () => {
        win.loadFile('pages/login.html');
      }
    },
    {
      label: 'About',
      click: () => {
        win.loadFile('pages/about.html');
      }
    },
    {
      label: 'Profile',
      click: () => {
        win.loadFile('pages/profile.html');
      }
    },
    {
      label: 'Map',
      click: () => {
        win.loadFile('pages/map.html');
      }
    },
    {
      label: 'Actions',
      click: () => {
        win.loadFile('pages/actions.html');
      }
    }
  ]
  const menu = Electron.Menu.buildFromTemplate(menuTemp);
  Electron.Menu.setApplicationMenu(menu);
}

app.whenReady().then(createWindow).then(loadMenu)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
import { BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
function loginAuth(mainWindow, db) {
  const loginWindow = new BrowserWindow({
    parent: mainWindow,
    width: 400,
    height: 500,
    modal: true,
    frameless: true,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })
  //get url for loading login page
  const appURL = mainWindow.webContents.getURL()
  loginWindow.loadURL(join(appURL, '/login'))
  loginWindow.show()

  //to handle login request
  ipcMain.on('login', (event, arg) => {
    const { username, password } = arg
    const selectUserSQL = 'SELECT * FROM User WHERE username = ?'
    db.get(selectUserSQL, [username], (selectUserErr, row) => {
      if (selectUserErr) {
        console.error('Error querying the database:', selectUserErr.message)
        event.returnValue = { success: false, message: 'Database query error' }
      } else if (!row) {
        // Username not found
        console.log('Username not found')
        event.returnValue = { success: false, message: 'Username not found' }
      } else if (row.password !== password) {
        // Incorrect password
        console.log('Incorrect password')
        event.returnValue = { success: false, message: 'Incorrect password' }
      } else {
        // Successful login
        console.log('Login successful')
        event.returnValue = { success: true, message: 'Login successful' }
        loginWindow.close()
      }
    })
  })
}
export default loginAuth

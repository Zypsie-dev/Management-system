import { BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import bcrypt from 'bcrypt'
import registerUser from './register.js'
let islogged = false
function loginAuth(mainWindow, db) {
  console.log(islogged)
  const loginWindow = new BrowserWindow({
    parent: mainWindow,
    width: 400,
    height: 600,
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
  if (!islogged) {
    loginWindow.loadURL(join(appURL, '/login'))
    loginWindow.show()
    //to handle login request from login page
    ipcMain.handle('login', async (event, arg) => {
      const { username, password } = arg
      const selectUserSQL = 'SELECT * FROM User WHERE username = ?'

      try {
        const row = await new Promise((resolve, reject) => {
          db.get(selectUserSQL, [username], (selectUserErr, row) => {
            if (selectUserErr) {
              console.error('Error querying the database:', selectUserErr.message)
              reject('Database query error')
            } else {
              resolve(row)
            }
          })
        })

        if (!row) {
          // Username not found
          console.log('Username not found')
          return { success: false, message: 'Username not found' }
        } else {
          const isPasswordValid = await bcrypt.compare(password, row.password)
          if (!isPasswordValid) {
            // Incorrect password
            console.log('Incorrect password')
            return { success: false, message: 'Incorrect password' }
          } else {
            // Successful login
            console.log('Login successful')
            islogged = true
            loginWindow.close()
            return { success: true, message: 'Login successful' }
          }
        }
      } catch (error) {
        console.error('Error:', error)
        return { success: false, message: 'An error occurred' }
      }
    })
    //to handle register request from login page
    registerUser(loginWindow, db)
  }
}

export default loginAuth







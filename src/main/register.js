import { ipcMain } from 'electron'
import bcrypt from 'bcrypt'

function registerUser(loginWindow, db) {
  ipcMain.handle('register', async (event, arg) => {
    const { username, password } = arg
    const hashedPassword = await bcrypt.hash(password, 10)

    // Check if the user already exists
    const checkUserSQL = 'SELECT * FROM User WHERE username = ?'
    const existingUser = await new Promise((resolve, reject) => {
      db.get(checkUserSQL, [username], (checkUserErr, row) => {
        if (checkUserErr) {
          console.error('Error checking user in the database:', checkUserErr.message)
          reject('Database query error')
        } else {
          resolve(row)
        }
      })
    })

    if (existingUser) {
      // User already exists, return an error message to the frontend
      console.log('User already exists')
      return { success: false, message: 'User already exists' }
    }

    // User does not exist, proceed with registration
    const insertUserSQL = 'INSERT INTO User (username, password) VALUES (?, ?)'
    try {
      await new Promise((resolve, reject) => {
        db.run(insertUserSQL, [username, hashedPassword], (insertUserErr) => {
          if (insertUserErr) {
            console.error('Error inserting user into the database:', insertUserErr.message)
            reject('Database insertion error')
          } else {
            console.log('User registered successfully')
            loginWindow.close()
            return { success: true, message: 'User registered successfully' }
          }
        })
      })
    } catch (error) {
      console.error('Error:', error)
      return { success: false, message: 'An error occurred' }
    }
  })
}

export default registerUser

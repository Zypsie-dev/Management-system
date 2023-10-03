import { ipcMain } from 'electron'
import { productInventory, deleteProduct } from './database/product.js'
async function inventory(db) {
  ipcMain.handle('inventory', async (event, arg) => {
    try {
      return await productInventory(db)
    } catch (error) {
      console.error('Error:', error)
      return { success: false, message: 'An error occurred' }
    }
  })
}
async function deleteItem(db) {
  ipcMain.handle('delete', async (event, arg) => {
    try {
      await deleteProduct(db, arg)
      return { success: true }
    } catch (error) {
      console.error('Error:', error)
      return { success: false, message: 'An error occurred' }
    }
  })
}
export { inventory, deleteItem }

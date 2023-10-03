async function productInventory(db) {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM Inventory', (err, rows) => {
      if (err) {
        reject(err)
      }
      resolve(rows)
    })
  })
}
function deleteProduct(db, id) {
  return new Promise((resolve, reject) => {
    db.run('DELETE FROM ProductInventory WHERE id = ?', id, (err) => {
      if (err) {
        reject(err)
      }
      resolve()
    })
  })
}
export { productInventory, deleteProduct }

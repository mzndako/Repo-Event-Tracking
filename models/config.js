const sqlite = require('sqlite3').verbose()
const db = new sqlite3.Database('database/db')

const find = (tableName, array)=>{
  db.each
}

module.exports = db
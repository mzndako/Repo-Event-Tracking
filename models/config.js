const sqlite = require('sqlite3').verbose()
const db = new sqlite.Database('database/db.sqlite')

const find = (tableName, array)=>{
  
}

db.serialize();

module.exports = db
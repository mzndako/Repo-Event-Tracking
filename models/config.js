const sqlite = require('sqlite3').verbose()
const db = new sqlite.Database('database/db.sqlite')

const find = (tableName, where, {join, join_colum})=>{
  let sql = `SELECT * FROM ${tableName}`
  if(where && where[0]){
    sql += where[0]
  }
  return db.all(sql, (err, result) => {
    if(err){
      return Promise.reject(err)
    }
    return Promise.resolve(result)
  })
}
const test = async function() {
  //db.run("CREATE TABLE lorem (info TEXT)");
 
  //var stmt = db.prepare("INSERT INTO lorem VALUES (?)");
  //for (var i = 0; i < 10; i++) {
  //    stmt.run("Ipsum " + i);
  //}
  //stmt.finalize();
 
  db.all("SELECT rowid AS id, info FROM lorem", (err, rows)=>console.log("one time", rows));
  
}

fu

module.exports = db
const sqlite = require('sqlite3').verbose()
const db = new sqlite.Database('database/db.sqlite')

const find = (tableName, whereCommand)=>{
  let whereBind = []
  let sql = `SELECT * FROM ${tableName}`
  if(whereCommand && whereCommand[0]){
    sql += ` where ${whereCommand[0]}`
    whereBind = whereCommand.slice(1)
  }
  
  return db.all(sql, whereComma, (err, result) => {
    console.log(result, err)
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

find("lorem", ['info = ?', 'Ipsum 1'])

module.exports = db
const sqlite = require('sqlite3').verbose()
const db = new sqlite.Database('database/db.sqlite')

const find = (query, whereBind=[])=>{
  return db.all(sql, whereBind, (err, result) => {
    console.log(result, err)
    if(err){
      return Promise.reject(err)
    }
    return Promise.resolve(result)
  })
}

const insert = (query, values) => {
  var statement = db.prepare("INSERT INTO lorem VALUES (?)");
  for (let i = 0; i < values.length; i++) {
    stmt.run(values[i]);
  }
  stmt.finalize();
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
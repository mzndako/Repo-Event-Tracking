const sqlite = require('sqlite3').verbose()
const db = new sqlite.Database('database/db.sqlite')

const setupDatabase = () => {
  try{
    db.run('CREATE TABLE users(ID integer NOT NULL PRIMARY KEY, name text)')
  }catch(error){
    console.log(error)
  }
}

const find = (query, whereBind=[])=>{
  console.log(query)
  return db.all(query, whereBind, (err, result) => {
    console.log(result, err)
    if(err){
      return Promise.reject(err)
    }
    return Promise.resolve(result)
  })
}

const insert = (query, values) => {
  var statement = db.prepare(query);
  console.log(values)
  for (let i = 0; i < values.length; i++) {
    console.log(values[i])
    statement.run(values[i])
  }
  const x = statement.finalize()
  console.log(x)
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

setupDatabase()

//insert("INSERT INTO users VALUES (?)", [[55, 'mzndako']])

find("select * from users",[], ['info = ?', 'Ipsum 1'])

module.exports = db
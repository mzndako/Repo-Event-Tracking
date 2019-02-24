const sqlite = require('sqlite3').verbose()
const db = new sqlite.Database('database/db.sqlite')

const setupDatabase = () => {
  try{
    db.run('CREATE TABLE IF NOT EXISTS mzEE(mz text, name text)')
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
  statement.run(values)
  return statement.finalize(a=>console.log())
}

 
setupDatabase()

var x = await insert("INSERT INTO mzee VALUES ( ?, ?)", ['okay1', 'mzndako3'])

find("select * from mzee")

module.exports = db
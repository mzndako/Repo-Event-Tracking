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
  console.log(values)
  for (let i = 0; i < values.length; i++) {
    //statement.set(i+1, values[i])
  }
  statement.run(values)
  const x = statement.finalize()
  console.log("answer", x)
}


setupDatabase()

insert("INSERT INTO mzee VALUES ( ?, ?), (?, ?)", ['okay', 'mzndako', ''])

find("select * from mzee",[], ['info = ?', 'Ipsum 1'])

module.exports = db
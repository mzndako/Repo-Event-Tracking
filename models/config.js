const sqlite = require('sqlite3').verbose()
const db = new sqlite.Database('database/db.sqlite')

const setupDatabase = () => {
    db.run('CREATE TABLE IF NOT EXISTS events(id INTEGER, type VARCHAR(30), author_id INTEGER, repo_id INTEGER, created_at DATETIME, PRIMARY KEY(id))')

}

const find = async (query, whereBind=[])=>{
  console.log(query)
  return db.all(query, whereBind, (err, result) => {
    console.log(result, err)
    if(err){
      return Promise.reject(err)
    }
    return Promise.resolve(result)
  })
}

const insert = async (query, values) => {
  var statement = db.prepare(query);
  statement.run(values)
  const x = await statement.finalize(a=>console.log("aaa", a))
  console.log("xxx," , x)
}

 
setupDatabase()

insert("insert in")

module.exports = db
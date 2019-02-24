const sqlite = require('sqlite3').verbose()
var db = new sqlite.Database('database/db.sqlite')

db.setupDatabase = () => {
    db.run('CREATE TABLE IF NOT EXISTS events(id INTEGER, type VARCHAR(50), author_id INTEGER, repo_id INTEGER, created_at DATETIME, PRIMARY KEY(id))')
    db.run('CREATE TABLE IF NOT EXISTS author(id INTEGER, login VARCHAR(50), avatar_url VARCHAR(500), PRIMARY KEY(id))')
    db.run('CREATE TABLE IF NOT EXISTS repo(id INTEGER, name VARCHAR(200), url VARCHAR(500), PRIMARY KEY(id))')

}

/**
 * Query the database
 * @param {String} query - SQL String
 * @param {Array} whereBind - The array of bind value for the where statement
 * @return The query result as a promise
 */
db.find = async (query, whereBind=[])=>{
  console.log(query)
  return db.all(query, whereBind, (err, result) => {
    console.log(result, err)
    if(err){
      return Promise.reject(err)
    }
    return Promise.resolve(result)
  })
}

/**
 * Insert into the database
 * @param {String} query - The insert query String
 * @param {Array} array - The binded value to be inserted into the system
 */
db.insert = async (query, values) => {
  var statement = db.prepare(query);
  statement.run(values)
  const x = await statement.finalize(a=>console.log("aaa", a))
  console.log("xxx," , x)
}

 
setupDatabase()

module.exports = db
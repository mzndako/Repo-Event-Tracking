const sqlite = require('sqlite3').verbose()
var db = new sqlite.Database('database/db.sqlite')

/**
 * Call the function to setup the database
 */
db.setupDatabase = async () => {
  db.serialize(() => {
    db.run('DROP TABLE IF EXISTS events');
    db.run('DROP TABLE IF EXISTS actors');
    db.run('DROP TABLE IF EXISTS repos');
  
    db.serialize(() => {
      db.run('CREATE TABLE IF NOT EXISTS events(id INTEGER, type VARCHAR(50), actor_id INTEGER, repo_id INTEGER, created_at DATETIME, PRIMARY KEY(id))');
      db.run('CREATE TABLE IF NOT EXISTS actors(id INTEGER, login VARCHAR(50), avatar_url VARCHAR(500), PRIMARY KEY(id))');
      db.run('CREATE TABLE IF NOT EXISTS repos(id INTEGER, name VARCHAR(200), url VARCHAR(500), PRIMARY KEY(id))');
    });
  });
};

db.dropAllTables = async () => {
  
  console.log("done droping")
  return Promise.resolve();
}

/**
 * Query the database
 * @param {String} query - SQL String
 * @param {Array} whereBind - The array of bind value for the where statement
 * @return The query result as a promise
 */
db.find = (query, whereBind=[])=>{
  return new Promise((resolve, reject) => {
    db.all(query, whereBind, (err, result) => {
      console.log(result);
      if (err) {
        return reject(err);
      };

      return resolve(result);
    })
  }) 
}

/**
 * Insert into a table
 * @param {String} query - The insert query String
 * @param {Array} array - The binded values to be inserted into the table
 * @return A promise
 */
db.insert = async (query, values) => {
  let statement = db.prepare(query);
  statement.run(values) // Bind the values
  return statement.finalize()
}

/**
 * Update entry in a table
 * @param {String} query - The insert query String
 * @param {Array} array - The binded values to be inserted into the table
 * @return A promise
 */
db.update = async (query, values) => {
  let statement = db.prepare(query);
  statement.run(values) // Bind the values
  return statement.finalize()
}

/**
 * Delete entry in a table
 */
db.delete = async (query) => {
  return await db.run(query)
}

// Drop all tables and create a new one
db.dropAllTables().then(result=>db.setupDatabase())


//db.find('SELECT * FROM events ')
//db.insert("UPDATE actors SET login = ? WHERE id=?", ['mz', 3213163])
//db.find('SELECT * FROM actors where id = 3213163')
//db.find('SELECT * FROM repos ')

module.exports = db
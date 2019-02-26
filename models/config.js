const sqlite = require('sqlite3').verbose();
var db = new sqlite.Database('database/db1.sqlite');

/**
 * Call the function to setup the database by creating the necessary tables
 */
db.setupDatabase = async (dropTable) => {
  db.serialize(() => {
    // Drop the tables if the dropTable parameter is set
    if (dropTable) {
      db.run('DROP TABLE IF EXISTS events');
      db.run('DROP TABLE IF EXISTS actors');
      db.run('DROP TABLE IF EXISTS repos');
    }
    db.serialize(() => {
      db.run('CREATE TABLE IF NOT EXISTS events(id INTEGER, type VARCHAR(50), actor_id INTEGER, repo_id INTEGER, created_at DATETIME, PRIMARY KEY(id))');
      db.run('CREATE TABLE IF NOT EXISTS actors(id INTEGER, login VARCHAR(50), avatar_url VARCHAR(500), PRIMARY KEY(id))');
      db.run('CREATE TABLE IF NOT EXISTS repos(id INTEGER, name VARCHAR(200), url VARCHAR(500), PRIMARY KEY(id))');
    });
  });
};

/**
 * Query the database
 * @param {String} query - SQL String
 * @param {Array} whereBind - The array of bind value for the where statement
 * @return The query result as a promise
 */
db.find = (query, whereBind = []) => {
  return new Promise((resolve, reject) => {
    db.all(query, whereBind, (err, result) => {
      // console.log(result);
      if (err) {
        return reject(err);
      };

      return resolve(result);
    });
  });
};

/**
 * Insert data into a table
 * @param {String} query - The insert query String
 * @param {Array} array - The bind parameter values to be inserted into the table
 * @return A promise
 */
db.insert = async (query, values) => {
  let statement = db.prepare(query);
  statement.run(values); // Bind the values
  return statement.finalize();
};

/**
 * Update entry in a table
 * @param {String} query - The insert query String
 * @param {Array} array - The binded values to be inserted into the table
 * @return A promise
 */
db.update = async (query, values) => {
  let statement = db.prepare(query);
  statement.run(values); // Bind the values
  return statement.finalize();
};

/**
 * Delete entry in a table
 */
db.delete = async (query) => {
  return await db.run(query);
};

// This create the first tables
db.setupDatabase(false);
db.find('Select created_at, (select count(*) from events as t1 where t1.created_at < t2.dat and datediff(t2.created_at,t1.created_at)=1) as str from events as t2')

module.exports = db;

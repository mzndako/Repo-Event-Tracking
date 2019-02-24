const database = require('./../models/config');

const getAllEvents = () => {
  let sql = 'SELECT * FROM events INNER JOIN repos ON events.repo_id = repos.id INNER JOIN actors ON events.actor_id = actor.id';
  
  return database.find(sql).then(results => {
    return Promise.resolve(results);
  }).catch(error => Promise.reject(error));
};

const addEvent = async (data) => {
  let sql = 'SELECT id FROM events where id = ?';
  let bindParam = 
  sql = 'INSERT INTO events (id, type, actor_id, repo_id, created_at) VALUES (?, ?, ?, ?, ?)';
  let bindParam = [data.id]
  await database.insert
}

module.exports = {
  getAllEvents
};

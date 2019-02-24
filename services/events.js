const database = require('./../models/config');

const getAllEvents = () => {
  let sql = 'SELECT * FROM events INNER JOIN repos ON events.repo_id = repos.id INNER JOIN actors ON events.actor_id = actor.id';
  
  return database.find(sql).then(results => {
    return Promise.resolve(results);
  }).catch(error => Promise.reject(error));
};

const addEvent = async (data) => {
  try{
    let sql = 'SELECT id FROM events where id = ?';
    let bindParam = [data.id];
    let results = database.find(sql, bindParam);
    if (results.length > 0){
      return Promise.reject("Event already created")
    }
    
    // Insert into the events TABLE
    sql = 'INSERT INTO events (id, type, actor_id, repo_id, created_at) VALUES (?, ?, ?, ?, ?)';
    bindParam = [data.id, data.type, data.actor.id, data.repo.id, new Date()];
    await database.insert(sql, bindParam);
    
    // Search whether the user exist in the actor TABLE
    let sql = 'SELECT id FROM actors where id = ?';
    let bindParam = [data.actor.id];
    let results = database.find(sql, bindParam);
    if (results.length > 0){
      return Promise.reject("Event already created")
    }
    sql = 'INSERT INTO actors (id, login, avatar_url) VALUES (?, ?, ?)';
    
    
  }catch(error){
    return Promise.reject(error);
  }
  
}

module.exports = {
  getAllEvents
};

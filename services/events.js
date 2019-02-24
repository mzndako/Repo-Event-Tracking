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
    
    // Search whether the actor exist in the actors TABLE
    sql = 'SELECT id FROM actors where id = ?';
    bindParam = [data.actor.id];
    results = database.find(sql, bindParam);
    if (results.length === 0){
      // Create a new user as this does exist
      sql = 'INSERT INTO actors (id, login, avatar_url) VALUES (?, ?, ?)';
      bindParam = [data.actor.id, data.actor.login, data.actor.avatar_url];
      await database.insert(sql, bindParam);
    }
    
    // Search whether the repo exist in the repos TABLE
    sql = 'SELECT id FROM repos where id = ?';
    bindParam = [data.actor.id];
    results = database.find(sql, bindParam);
    if (results.length === 0){
      // Create a new user as this does exist
      sql = 'INSERT INTO repos (id, login, avatar_url) VALUES (?, ?, ?)';
      bindParam = [data.actor.id, data.actor.login, data.actor.avatar_url];
      await database.insert(sql, bindParam);
    }
    
    
  }catch(error){
    return Promise.reject(error);
  }
  
}

module.exports = {
  getAllEvents
};

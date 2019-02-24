const database = require('./../models/config');

const getAllEvents = () => {
  let sql = 'SELECT events.id as event_id, * FROM events INNER JOIN repos ON events.repo_id = repos.id INNER JOIN actors ON events.actor_id = actors.id';
  
  return database.find(sql).then(results => {
    
    return Promise.resolve(processedResults);
  }).catch(error => Promise.reject(error));
};

const addEvent = async (data) => {
  try {
    let sql = 'SELECT id FROM events where id = ?';
    let bindParam = [data.id];
    let results = await database.find(sql, bindParam);

    if (results.length > 0) {
      return Promise.reject({error: 'Event already created'});
    }

    // Insert into the events TABLE
    sql = 'INSERT INTO events (id, type, actor_id, repo_id, created_at) VALUES (?, ?, ?, ?, ?)';
    bindParam = [data.id, data.type, data.actor.id, data.repo.id, new Date()];
    await database.insert(sql, bindParam);

    // Search whether the actor exist in the actors TABLE
    sql = 'SELECT id FROM actors where id = ?';
    bindParam = [data.actor.id];
    results = await database.find(sql, bindParam);
    if (results.length === 0) {
      // Create a new actor
      sql = 'INSERT INTO actors (id, login, avatar_url) VALUES (?, ?, ?)';
      bindParam = [data.actor.id, data.actor.login, data.actor.avatar_url];
      await database.insert(sql, bindParam);
    };

    // Search whether the repo exist in the repos TABLE
    sql = 'SELECT id FROM repos where id = ?';
    bindParam = [data.repo.id];
    results = await database.find(sql, bindParam);
    if (results.length === 0) {
      // Create a new repo
      sql = 'INSERT INTO repos (id, name, url) VALUES (?, ?, ?)';
      bindParam = [data.repo.id, data.repo.name, data.repo.url];
      await database.insert(sql, bindParam);
    };

    return Promise.resolve('Successful');
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * Get Events by actorId
 * @param {Integer} actorId - Actor Id
 */
const getByActor = (actorId) => {
  
}

/**
 * Properly group the actor and repo inside the event
 */
const processEvent = (events) => {
  let processedResults = [];
  for(let i = 0; i < results.length; i++){
     let result = results[i];
     let value = {
       id: result.event_id,
       type: result.type,
       actor: {
         id: result.actor_id,
         login: result.login,
         avatar_url: result.avatar_url
       },
       repo: {
         id: result.repo_id,
         name: result.name,
         url: result.url
        },
        created_at: result.created_at
      };
    
    processedResults.push(value);
  }
  return processedResults;
}

module.exports = {
  getAllEvents,
  addEvent
};

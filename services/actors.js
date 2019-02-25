const database = require('./../models/config');

/**
 * Retrieve all actors
 */
const getAllActors = () => {
  let sql = 'SELECT actors.*, count(events.id) as event_count from actors inner join events on actors.id = events.actor_id GROUP BY events.actor_id order by event_count DESC'

  return database.find(sql).then(events => {
    let results = events.map(event => {
      delete event.event_count;
      return event;
    });
    return Promise.resolve(results);
  }).catch(error => Promise.reject(error));
};

/**
 * Update actor
 * @param {
 */
const updateActor = async (actor) => {
  let {id, login, avatar_url} = actor;
  try{
    let sql = 'SELECT * FROM actors WHERE id = ?';
    let bindParam = [id];
    
    let result = database.find(sql, bindParam);
    if(result.length === 0){
      return Promise.reject(404); // Actor not found
    }
    
    let dbActor = result[0];
    if(dbActor.avatar_url !== avatar_url){
      return Promise.reject(400); // Not allowed to update the avatar_url
    }
    
    sql = 'UPDATE actors SET login = ? WHERE id = ?';
    bindParam = [login, id];
    database.update(sql, bindParam);
    
    return Promise.resolve(200);
  }catch(error){
    return Promise.reject(error);
  }
}

module.exports = {
  getAllActors,
  updateActor
}
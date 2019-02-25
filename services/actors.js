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
 * @param {Object} actor - Actor object containing the id, login and avatar_url
 */
const updateActor = async (actor) => {
  let {id, login, avatar_url} = actor;
  try{
    let dbActor = result[0];
    if(dbActor.avatar_url !== avatar_url){
      return Promise.reject(400); // Not allowed to update the avatar_url
    }
    
    sql = 'UPDATE actors SET login = ? WHERE id = ?';
    bindParam = [login, id];
    database.update(sql, bindParam);

    return Promise.resolve(200);
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * Get an actor detail
 * @param {String} actorId - Actor unique id
 * @return A promise of Actor details or null if actor not found
 */
const getActor = async (actorId) => {
  let sql = 'SELECT * FROM actors WHERE id = ?';
  let bindParam = [actorId];

  try {
    let result = await database.find(sql, bindParam);
    if (result.length === 0) {
       return null; // No Actor not found
    };
  } catch (error) {
    return null;
  }

  return result[0];
};

module.exports = {
  getAllActors,
  updateActor,
  getActor
}
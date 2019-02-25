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
  let {id, avatar_url} = actor;
  try{
    let sql = 'UPDATE actors SET avatar_url = ? WHERE id = ?';
    let bindParam = [avatar_url, id];
    await database.update(sql, bindParam);

    return Promise.resolve('Updated');
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
    return result[0];
  } catch (error) {
    return null;
  }
};

/**
 * Get an actor streak
 * @param {String} actorId - Actor unique id
 * @return A promise of Actor details or null if actor not found
 */
const getStreak = async (actorId) => {
  return getAllActors().then(events => {
    let actors = {};
    let compare = {id: "", count: 0};
    for (let i = 0; i < events.length; i++) {
      let actor = events[i].actor;
      if(!actors[actor.id]){
        actors[actor.id] = actor;
      }
      
      if(compare.id && compare.id !== actor.id){
        if()
        actors[compare.id].count = compare.count;
        compare.count = 0;
      }
      compare.id = actor.id;
      compare.count++;
    }
  });
};

module.exports = {
  getAllActors,
  updateActor,
  getActor,
  getStreak
}
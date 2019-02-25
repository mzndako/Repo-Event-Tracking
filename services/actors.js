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
 * 
 */
const updateActor = (actor) => {
  let {id, login, avatar_url} = actor;
  try{
    let sql = 'SELECT * '
    let result = database.find()
    return Promise.resolve()
  }catch(error){
    return Promise.reject(error);
  }
}

module.exports = {
  getAllActors,
  updateActor
}
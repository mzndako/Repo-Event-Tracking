const database = require('./../models/config');
const eventsServices = require('./events');

/**
 * Retrieve all actors
 */
const getAllActors = () => {
  let sql = 'SELECT actors.*, count(events.id) as event_count, max(created_at) as date from actors inner join events on actors.id = events.actor_id GROUP BY events.actor_id order by event_count DESC, date DESC'

  return database.find(sql).then(events => {
    let results = events.map(event => {
      delete event.event_count;
      event.date = undefined;
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
  return eventsServices.getAllEvents('created_at DESC').then(events => {
    let actors = {};
    let compare = {id: "", count: 0, created_at: ""};
    
    for (let i = 0; i < events.length; i++) {
      let actor = events[i].actor;
      // console.log(actor);
      if(!actors[actor.id]){
        actors[actor.id] = actor;
        actors[actor.id].count = 1;
        actors[actor.id].counting = 1;
        actors[actor.id].created_at = events[i].created_at;
        continue;
      }

      if(date_diff_indays(actors[actor.id].created_at, events[i].created_at) === 1){
        actors[actor.id].counting++; 
        if(actors[actor.id].counting > actors[actor.id].pea){
          actors[actor.id].peak = actors[actor.id].count;
        }
      }else{
        actors[actor.id].count = 1;
      }
      actors[actor.id].created_at = events[i].created_at;
    }
    
      
    let newActors = [];
    for(let key in actors){
      if(!actors.hasOwnProperty(key)){
        continue;
      }
      newActors.push(actors[key]);
    }
    let sortedActors = newActors.sort((a, b) => {
      if (a.count < b.count){
        return 1;
      }
      if(a.count > b.count){
        return -1;
      }
      if(a.count === b.count){
        let date1 = new Date(a.created_at).getTime();
        let date2 = new Date(b.created_at).getTime();
        if(date1 < date2){
          return 1;
        } else if (date1 > date2) {
          return -1;
        }
      }
      if (a.login < b.login) {
        return 1;
      } else if(a.login > b.login) {
        return -1;
      }
      return 0;
    });
    sortedActors = sortedActors.map(actor => {
      return {
        id: actor.id,
        login: actor.login,
        avatar_url: actor.avatar_url
      }
    })
    return Promise.resolve(sortedActors);
  }).catch(error => Promise.reject(error));
};

const date_diff_indays = (date1, date2) => {
  let dt1 = new Date(date1);
  let dt2 = new Date(date2);
  return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate()) ) /(1000 * 60 * 60 * 24));
}

module.exports = {
  getAllActors,
  updateActor,
  getActor,
  getStreak
}
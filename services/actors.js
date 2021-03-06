const database = require('./../models/config');
const eventsServices = require('./events');

/**
 * Retrieve all actors
 */
const getAllActors = () => {
  let sql = 'SELECT actors.*, count(events.id) as event_count, max(created_at) as date from actors inner join events on actors.id = events.actor_id GROUP BY events.actor_id order by event_count DESC, date DESC'

  return database.find(sql).then(events => {
    let results = events.map(event => {
      // Remove the event_count and date from the event object
      event.event_count = undefined;
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
 * Get actor records ordered by maximum streak
 * @param {String} actorId - Actor unique id
 * @return A promise of Actor details or null if actor not found
 */
const getStreak = async (actorId) => {
  return eventsServices.getAllEvents('created_at ASC').then(events => {
    let actors = {};

    for (let i = 0; i < events.length; i++) {
      let actor = events[i].actor;

      // Check if the actor has already been inserted into the actors object
      if(!actors[actor.id]){
        actors[actor.id] = actor;
        actors[actor.id].count = 1;
        actors[actor.id].counting = 1;
        actors[actor.id].created_at = events[i].created_at;
        continue;
      }
      
      // Check the day differences between the current 
      if(date_diff_indays(actors[actor.id].created_at, events[i].created_at) === 1){
        actors[actor.id].counting++; 
        if(actors[actor.id].counting > actors[actor.id].count){
          actors[actor.id].count = actors[actor.id].counting;
        }
      }else{
        actors[actor.id].counting = 0;
      }
      actors[actor.id].created_at = events[i].created_at;
    }
    
      
    let newActors = [];
    for(let key in actors){
      if(!actors.hasOwnProperty(key)){
        continue; //Keep if its inherited property
      }
      newActors.push(actors[key]);
    }
    let sortedActors = newActors.sort((a, b) => {
      // Sort base on highest streak
      if (a.count < b.count){
        return 1;
      }
      if(a.count > b.count){
        return -1;
      }
      
      // Sort by date if the Streak are the same 
      if(a.count === b.count){
        let date1 = new Date(a.created_at).getTime();
        let date2 = new Date(b.created_at).getTime();
        if(date1 < date2){
          return 1;
        } else if (date1 > date2) {
          return -1;
        }
      }
      
      // Further sort by login name if the date are the same
      if (a.login < b.login) {
        return 1;
      } else if(a.login > b.login) {
        return -1;
      }
      return 0;
    });
    
    // Remove the unwanted properties 
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

/**
 * Calculate the day differences between two date
 * @param {String} date1 - The first date (from date)
 * @param {String} date2 - The second date (to date)
 * @return The number of day(s) between the first date and the second date
 */
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
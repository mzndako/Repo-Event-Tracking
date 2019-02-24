const database = require('./../models/config');

/**
 * Retrieve all actors
 */
const getAllActors = () => {
  c

  return database.find(sql).then(events => {
    let results = processEvents(events);
    return Promise.resolve(results);
  }).catch(error => Promise.reject(error));
};
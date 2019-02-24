const database = require('./../models/config');

const getAllEvents = () => {
  let sql = 'SELECT * FROM events INNER JOIN repo WHERE events.id = repo'
  database.find()
};

module.exports = {
  getAllEvents
};

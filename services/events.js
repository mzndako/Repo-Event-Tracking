const database = require('./../models/config');

const getAllEvents = () => {
  let sql = 'SELECT * FROM events'
  database.find()
};

module.exports = {
  getAllEvents
};

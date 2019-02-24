const database = require('./../models/config');

const getAllEvents = () => {
  let sql = 'SELECT * FROM events INNER JOIN'
  database.find()
};

module.exports = {
  getAllEvents
};

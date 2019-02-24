const database = require('./../models/config');

const getAllEvents = () => {
  let sql = 'SELECT * FROM events INNER JOIN repo WHERE re'
  database.find()
};

module.exports = {
  getAllEvents
};

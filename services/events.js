const database = require('./../models/config');

const getAllEvents = () => {
  let sql = 'SELECT * FROM events INNER JOIN repo wh'
  database.find()
};

module.exports = {
  getAllEvents
};

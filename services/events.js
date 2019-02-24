const database = require('./../models/config');

const getAllEvents = () => {
  let sql = 'SELECT * '
  database.find()
};

module.exports = {
  getAllEvents
};

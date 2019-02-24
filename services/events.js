const database = require('./../models/config');

const getAllEvents = () => {
  let sql = 'SELECT * FROM events INNER JOIN repo WHERE events.repo_id = repo.id I'
  database.find()
};

module.exports = {
  getAllEvents
};

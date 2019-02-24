const database = require('./../models/config');

const getAllEvents = () => {
  let sql = 'SELECT * FROM events INNER JOIN repo WHERE events.repo_id = repo.id INNER'
  database.find()
};

module.exports = {
  getAllEvents
};

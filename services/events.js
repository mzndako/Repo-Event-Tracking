const database = require('./../models/config');

const getAllEvents = async () => {
  let sql = 'SELECT * FROM events INNER JOIN repo WHERE events.repo_id = repo.id INNER JOIN author WHERE events.author_id = author.id'
  let result = database.find(sql)
};

module.exports = {
  getAllEvents
};

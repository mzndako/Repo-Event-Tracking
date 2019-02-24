const database = require('./../models/config');

const getAllEvents = await () => {
  let sql = 'SELECT * FROM events INNER JOIN repo WHERE events.repo_id = repo.id INNER JOIN author WHERE events.author_id = author.id'
  database.find(sql)
};

module.exports = {
  getAllEvents
};

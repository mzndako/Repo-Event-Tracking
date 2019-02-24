const eventsServices = require('./../services/events');

/**
 * Get all events
 * @param {Object} req - The Request Object
 * @param {Object} res - The Response Object
 * @return rESP
 */
const getAllEvents = (req, res) => {
  eventsServices.getAllEvents().then(results => {
    res.status(200).send(results)
  });
};

var addEvent = () => {

};


var getByActor = () => {

};


var eraseEvents = () => {

};

module.exports = {
	getAllEvents: getAllEvents,
	addEvent: addEvent,
	getByActor: getByActor,
	eraseEvents: eraseEvents
};


















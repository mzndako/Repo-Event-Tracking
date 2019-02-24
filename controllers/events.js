const eventsServices = require('./../services/events');
const {validate, processError} = require('./../services/validator');
/**
 * Get all events
 * @param {Object} req - The Request Object
 * @param {Object} res - The Response Object
 * @return Response Resource
 */

const getAllEvents = (req, res) => {
  return eventsServices.getAllEvents().then(results => {
    res.status(200).send(results);
  });
};

const addEvent = (req, res) => {
  let data = req.body;
  let validateRule = {
    'id': 'Please provide a valid Id',
    'type': 'Please provide a type',
    'actor'
  }
  let validated = validate(data, ) 
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


















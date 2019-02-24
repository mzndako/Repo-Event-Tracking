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

/**
 * Get all events
 * @param {Object} req - The Request Object
 * @param {Object} res - The Response Object
 * @return Response Resource
 */
const addEvent = (req, res) => {
  let data = req.body;
  let validationRule = {
    'id': 'Please provide a valid Id',
    'type': 'Please provide a type',
    'actor': 'Please provide actor',
    'repo': 'Please provide a valid repo detail'
  };

  // Make sure the needed are sent to the server
  let validated = validate(data, validationRule);
  if (validated !== true) {
    return res.status(404).send(processError(validated));
  };

  eventsServices.addEvent(data).then(result => {
    return res.status(201).send({message: 'Successful'});
  }).catch(error => res.status(400).send(processError(error)));
};

const getByActor = (req, res) => {
  let actorId = req.params.actorId;
  if (!actorId) {
    return res.status(400).send(processError('Invalid Actor Id'));
  }
  
  eventsServices.getByActor(actorId).then(events => {
    if (events.length === 0) {
      return res.status(404).send(processError('Actor Id not found'));
    }
    res.status(200).send(events);
  }).catch(error => res.status(404).send(processError(error)));
};


const eraseEvents = () => {
  eventsServices.eraseEvents().then(result => {
    
  }).catch(error)
};

module.exports = {
	getAllEvents: getAllEvents,
	addEvent: addEvent,
	getByActor: getByActor,
	eraseEvents: eraseEvents
};


















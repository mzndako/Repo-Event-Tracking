const actorsServices = require('./../services/actors')
const {processError} = require('./../services/validator');

var getAllActors = () => {
  actorsServices.getAllActors().then(actors => {
    res.
  }).catch(error => res.status(400).send(processError(error)))
};

var updateActor = () => {

};

var getStreak = () => {

};


module.exports = {
	updateActor: updateActor,
	getAllActors: getAllActors,
	getStreak: getStreak
};


















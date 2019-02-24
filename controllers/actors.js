const actorsServices = require('./../services/actors')

var getAllActors = () => {
  actorsServices.getAllActors().then(actors => {
    
  }).catch(error => res.status(400).send())
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


















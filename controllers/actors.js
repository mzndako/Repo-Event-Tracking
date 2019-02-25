const actorsServices = require('./../services/actors')
const {processError} = require('./../services/validator');

var getAllActors = (req, res) => {
  actorsServices.getAllActors().then(actors => {
    res.status(200).send(actors);
  }).catch(error => res.status(400).send(processError(error)))
};

var updateActor = (req, res) => {
  let actor = req.body.actor;
  actorsServices.getActor(actor.id).then(retrievedActor => {
    if(!retrievedActor){
      return res.status(404).send(processError('Actor not found'))
    }
    if(actor.avatar_url === retr)
  })
};

var getStreak = () => {

};


module.exports = {
	updateActor: updateActor,
	getAllActors: getAllActors,
	getStreak: getStreak
};


















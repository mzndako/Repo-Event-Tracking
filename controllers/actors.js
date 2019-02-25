const actorsServices = require('./../services/actors')
const {processError} = require('./../services/validator');

var getAllActors = (req, res) => {
  actorsServices.getAllActors().then(actors => {
    res.status(200).send(actors);
  }).catch(error => res.status(400).send(processError(error)))
};

var updateActor = a(req, res) => {
  let actor = req.body.actor;
  actorsServices.getActor(actor.id).then(retrievedActor => {
    if(!retrievedActor){
      return res.status(404).send(processError('Actor not found'))
    }
    if(actor.login !== retrievedActor.login){
      return res.status(400).send(processError('You can only update avatar_url'))
    }
    actorsServices.updateActor(actor).then(result => {
      res.status(200).send(result)
    }).catch
  })
};

var getStreak = () => {

};


module.exports = {
	updateActor: updateActor,
	getAllActors: getAllActors,
	getStreak: getStreak
};


















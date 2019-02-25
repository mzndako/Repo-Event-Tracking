const actorsServices = require('./../services/actors')
const {processError} = require('./../services/validator');

var getAllActors = (req, res) => {
  actorsServices.getAllActors().then(actors => {
    res.status(200).send(actors);
  }).catch(error => res.status(400).send(processError(error)))
};

var updateActor = async (req, res) => {
  let actor = req.body.actor;
  try {
    let retrievedActor = await actorsServices.getActor(actor.id);

    if (!retrievedActor) {
      return res.status(404).send(processError('Actor not found'));
    }

    if (actor.login !== retrievedActor.login) {
      return res.status(400).send(processError('You can only update avatar_url'));
    }

    let updated = await actorsServices.updateActor(actor);
    res.status(200).send(updated);
  } catch (error) {
    res.status(400).send(processError(error))
  }
};

var getStreak = () => {

};


module.exports = {
	updateActor: updateActor,
	getAllActors: getAllActors,
	getStreak: getStreak
};


















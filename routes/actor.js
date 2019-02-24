var express = require('express');
var router = express.Router();
const actorsController = require('./../controllers/actors')
// Routes related to actor.
router.get('/', actorsController.getAllActors);
router.put('/', actorsController.updateActor);
router.get('/streak', actorsController.getStreak);

module.exports = router;
const express = require('express');
const router = express.Router();
const eventController = require('./../controllers/events');
// Routes related to event

router.get('/', eventController.getAllEvents);
router.post('/', eventController.addEvent);
router.post('/actor/:acto', eventController.addEvent);

module.exports = router;

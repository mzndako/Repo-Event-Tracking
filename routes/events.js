const express = require('express');
const router = express.Router();
const eventController = require('./../controllers/events');
// Routes related to event

router.post('/', eventController.getAllEvents)
get('eventController.getAllEvents');

module.exports = router;

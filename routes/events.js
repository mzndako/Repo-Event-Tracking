const express = require('express');
const router = express.Router();
const eventController = require('./../controllers/events');
// Routes related to event

router.post('/', eventController.getAllEvents)
router.posget('eventController.getAllEvents');

module.exports = router;

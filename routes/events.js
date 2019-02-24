const express = require('express');
const router = express.Router();
const eventController = require('./../controllers/events');
// Routes related to event

router.g('/', eventController.getAllEvents);
router.post('/', eventController.getAllEvents);

module.exports = router;

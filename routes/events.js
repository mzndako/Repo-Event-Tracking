const express = require('express');
const router = express.Router();
const eventController = require('./../controllers/events');
// Routes related to event

router.('/', eventController.getAllEvents);

module.exports = router;

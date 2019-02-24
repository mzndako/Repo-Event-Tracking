const express = require('express');
const router = express.Router();
const eventController = require('./../controllers/events');
// Routes related to event

router.use('/').get()eventController.getAllEvents);

module.exports = router;

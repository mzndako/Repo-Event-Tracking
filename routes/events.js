const express = require('express');
const router = express.Router();
const eventController = require('./../controllers/events');
// Routes related to event

router.get('/', eventController.getAllEvents);
router.post('/', eventController.addE);

module.exports = router;

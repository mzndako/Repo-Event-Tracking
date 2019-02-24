var express = require('express');
const router = express.Router();
const eventController = require('./../controllers/events')
// Routes related to event
router.get("/", eventController.getAllEvents)
module.exports = router;
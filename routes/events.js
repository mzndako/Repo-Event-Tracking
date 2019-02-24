var express = require('express');
var router = express.Router();
const eventController = require('./../controllers/events')
// Routes related to event

router.get("/events", eventController)
module.exports = router;
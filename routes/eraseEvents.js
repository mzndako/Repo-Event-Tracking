var express = require('express');
var router = express.Router();
const eventsController = require('./../controllers/events')
// Route related to delete events
router.delete('/', eventsController.eraseE)

module.exports = router;
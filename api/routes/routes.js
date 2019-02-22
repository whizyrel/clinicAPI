/* eslint-disable new-cap */
/* eslint-disable max-len */
const express = require('express');
const router = express.Router();
const shift = require('../controllers/shift-controller');
const authCheck = require('../middlewares/check-auth-query');

// route for shift schedule, req.params returns an object to passed into right function
router.get('/shifts', authCheck.shiftVerification, shift.shiftMaker);

// route for leave schedule, and req.query/req.params returns an object to passed into the right function buh req.query will be used
router.get('/leaveSchedules', authCheck.leaveVerification, shift.leaveMaker);

module.exports = router;

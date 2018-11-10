const express = require("express");
const router = express.Router();
const controller = require('../controllers/app');

/* console.log(controller().dataChunk());
const leaveMonth = controller().setLeaveMonth();
console.log(leaveMonth);
const person = controller().getData().personObj(7);
console.log(person);
const month = controller().getData().monthObj();
const shift = controller().createShift(month);
console.log(month);
console.log(shift);
const leaveSchedules = controller().getLeaveSchedule(person, leaveMonth);
console.log(leaveSchedules); */

// route for shift schedule, req.params returns an object to passed into right function
router.get('/shifts/length=:no', function(req, res, next) {

    res.send({
        title: "shift",
        type: "GET",
        body: req.params,
        shifts: controller().makeShifts(parseInt(req.params.no), controller().getData().monthObj())
    });
});

// route for leave schedule, req.params returns an object to passed into right function
router.get('/leaveSchedules/level=:levelNo&&length=:length', function(req, res, next) {
    res.send({
        title: "leaveSchedule",
        type: "GET",
        body: req.params,
        leaveSchedules: controller().makeLeaveSchedules(parseInt(req.params.levelNo), parseInt(req.params.length))
    });
});

module.exports = router;
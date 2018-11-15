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
router.get('/shifts', function(req, res, next) {
    if (isNaN(parseInt(req.query.length))) {
        res.status(422).json({
            error: 'the query isnt a valid format'
        });
    } else {
        // use return to prevent running through middleware twice
        return res.status(200).send({
            title: "Shifts",
            type: "GET",
            messgae: 'Shifts sucessffully received',
            shifts: controller().makeShifts(parseInt(req.query.length), controller().getData().monthObj())
        });
    }
    next();
});

// route for leave schedule, and req.query/req.params returns an object to passed into the right function buh req.query will be used
router.get('/leaveSchedules', function(req, res, next) {
    if (isNaN(parseInt(req.query.length) && parseInt(req.query.levelNo))) {
        res.status(422).json({
            error: 'the query isnt a valid format'
        });
    } else {
        // use return to prevent running through middleware twice
        return res.status(200).send({
            title: "LeaveSchedules",
            type: "GET",
            messgae: 'Leave Schedules sucessfully received',
            leaveSchedules: controller().makeLeaveSchedules(parseInt(req.query.levelNo), parseInt(req.query.length))
        });
    }
    next();
});

module.exports = router;
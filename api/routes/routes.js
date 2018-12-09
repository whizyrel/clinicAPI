const express = require("express");
const router = express.Router();
const controller = require("../controllers/app");

// route for shift schedule, req.params returns an object to passed into right function
router.get("/shifts", function(req, res, next) {
  if (isNaN(parseInt(req.query.length))) {
    res.status(422).json({
      error: "the query isnt a valid format"
    });
  } else {
    // use return to prevent running through middleware twice
    return res.status(200).json(
      controller().makeShifts(
        parseInt(req.query.length),
        controller()
          .getData()
          .monthObj()
      )
    );
  }
  next();
});

// route for leave schedule, and req.query/req.params returns an object to passed into the right function buh req.query will be used
router.get("/leaveSchedules", function(req, res, next) {
  if (isNaN(parseInt(req.query.length) && parseInt(req.query.levelNo))) {
    res.status(422).json({
      error: "the query isnt a valid format"
    });
  } else {
    // use return to prevent running through middleware twice
    return res
      .status(200)
      .json(
        controller().makeLeaveSchedules(
          parseInt(req.query.levelNo),
          parseInt(req.query.length)
        )
      );
  }
  next();
});

module.exports = router;
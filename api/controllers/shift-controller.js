const controller = require("../controllers/shift-engine")();
let reqParser = require('../helpers/req-parser');
reqParser = new reqParser();

// console.log(reqParser.lengthParser('1%7C2'));

exports.shiftMaker = function(req, res, next) {
  if (isNaN(parseInt(req.query.length))) {
    res.status(422).json({
      error: "the query isnt a valid format"
    });
  } else {
    return res.status(200).json(
      controller.makeShifts(
        parseInt(req.query.length),
        controller
          .getData()
          .monthObj()
      )
    );
    // use return to prevent running through middleware twice
  }
  next();
};

exports.leaveMaker = function(req, res, next) {
  if (isNaN(parseInt(req.query.length) && parseInt(req.query.levelNo))) {
    res.status(422).json({
      error: "Error! Incorrect Query Format"
    });
  } else {
    let result = [];
    const levelArr = reqParser.lengthParser(req.query.levelNo);

    if (req.query.length.includes('|') || req.query.levelNo.includes('|')) {
      for (let i = 0; i < levelArr.length; i++) {
        result.push(controller.makeLeaveSchedules(
          parseInt(levelArr[i]),
          parseInt(req.query.length)
        )[0]);
      }
      return res.status(200).json(result);
    } else {
      // use return to prevent running through middleware twice
      return res
        .status(200)
        .json(
          controller.makeLeaveSchedules(
            parseInt(req.query.levelNo),
            parseInt(req.query.length)
          )
        );
    }
  }
  next();
};
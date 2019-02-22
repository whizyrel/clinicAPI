const controller = require('../controllers/shift-engine');
const reqParser = require('../helpers/req-parser');

// console.log(reqParser.lengthParser('1%7C2'));

exports.shiftMaker = function(req, res, next) {
  const preference = req.query.pref;
  const month = req.query.month;
  console.log('month is: ' + month);
  console.log('preference is ' + preference);

  if (isNaN(parseInt(req.query.length))) {
    res.status(422).json({
      error: 'the query isnt a valid format',
    });
  } else {
    return res.status(200).json(
        controller.makeShifts(
            parseInt(req.query.length),
            preference, month === undefined ? undefined : month
        )
    );
    // use return to prevent running through middleware twice
  }
  next();
};

exports.leaveMaker = function(req, res, next) {
  const month = req.query.month;
  console.log('leave month is: ' + month);
  if (isNaN(parseInt(req.query.length) && parseInt(req.query.levelNo))) {
    res.status(422).json({
      error: 'Error! Incorrect Query Format',
    });
  } else {
    const result = [];
    const levelArr = reqParser.lengthParser(req.query.levelNo);

    if (req.query.length.includes('|') || req.query.levelNo.includes('|')) {
      for (let i = 0; i < levelArr.length; i++) {
        result.push(controller.makeLeaveSchedules(
            parseInt(levelArr[i]),
            parseInt(req.query.length), month
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
                  parseInt(req.query.length),
                  month
              )
          );
    }
  }
  next();
};

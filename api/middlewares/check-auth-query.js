/* eslint-disable max-len */
exports.shiftVerification = (req, res, next) => {
  const bool = req.query.length !== undefined && req.query.length !== null && req.query.length !== '';
  if (bool) {
    next();
  } else {
    res.status(404).json({message: 'Error! Please check your query and try again'});
  }
};
exports.leaveVerification = (req, res, next) => {
  const bool = (req.query.length !== undefined && req.query.length !== null && req.query.length !== '') && (req.query.levelNo !== undefined && req.query.levelNo !== null && req.query.levelNo !== '');
  if (bool) {
    next();
  } else {
    res.status(404).json({message: 'Error! Please check your query and try again'});
  }
};

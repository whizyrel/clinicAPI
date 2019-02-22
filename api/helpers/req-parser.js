/* eslint-disable require-jsdoc */
class ReqParser {
  constructor() {}
  lengthParser(length) {
    let lengthArr = length.split('|');
    console.log(lengthArr);
    lengthArr = lengthArr.map((cur) => {
      console.log(cur);
      return parseInt(cur);
    });
    console.log(lengthArr);
    return lengthArr;
  }
}

module.exports = new ReqParser();

/* eslint-disable require-jsdoc */
/* eslint-disable max-len */
const monthsArr = require('../resources/months');
const date = new Date();

const Month = class {
  constructor(month = new Date().getMonth()) {
    this.name = () => {
      return monthsArr[month].name;
    };
    this.length = () => {
      // false || true for leap year
      return Month.leapStatus() === false ? monthsArr[month].length : ++monthsArr[month].length;
    };
  }

  static leapStatus() {
    const status = new Date(date.getFullYear(), 1, 29);
    const splitStr = status.toString().split(' ');
    // returns false || true for leap year
    return splitStr[1] !== 'Feb' ? false : true;
  }

  static search(string) {
    for (const month of monthsArr) {
      if (month.name === string) {
        return monthsArr.indexOf(month);
      }
    }
  }

  index(string) {
    const month = string.charAt(0).toUpperCase() + string.substring(1);
    // console.log(month);
    const res = Month.search(month);
    // console.log(res);
    return res;
  }
};

// new Month().index('December');

module.exports = Month;

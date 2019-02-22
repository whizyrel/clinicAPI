/* eslint-disable require-jsdoc */
const Person = class {
  constructor(level) {
    this.level = level;
  }
  leaveLength() {
    let a;
    let rest;
    let first;
    let second;
    let val;

    const shiftLength = [21, 30, 42];

      this.level <= 5 ? (val = 5) : this.level >= 7 ? (val = 7) : (val = 6);

      switch (val) {
        case 5:
          [a, ...rest] = shiftLength;
          break;

        case 6:
          [first, a, ...rest] = shiftLength;
          break;

        case 7:
          [first, second, a] = shiftLength;
          break;

        default:
          return 'level doesn\'t exist';
      }
      return a;
  }
};

module.exports = Person;

/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
const months = require('../resources/months');
const Month = require('../helpers/module-months');
const Person = require('../helpers/person');

const dataCtrl = () => {
  const date = new Date();
  const currMonth = date.getMonth();
  const currYear = date.getFullYear();
  const monthsArr = months;
  const currMonthName = monthsArr[currMonth].name;

  const leaveSchedule = (obj, month) => {
    month = parseInt(month);
    // console.log('month inside leaveschedule is: ' + month);
    let leaveMonthYear;

    const leaveMonth = new Month(month);
    const data = {
      leaveLength: obj.leaveLength(),
      leaveMonth: leaveMonth.name(),
      leaveMonthLength: leaveMonth.length(),
      startYear: currYear,
    };
    // console.log('leave month name is: ' + data.leaveMonth);

    // leave start date, added 1 so it never starts from 0;
    // @ts-ignore
    data.startDate = Math.floor(Math.random() * data.leaveMonthLength) + 1;

    // (mapped) days left in leave month
    // @ts-ignore
    data.restDays = data.leaveMonthLength - data.startDate;

    // (unmapped) days left in leave days, negative if end date is in current month; positive if th .update: subtracted 1
    // @ts-ignore
    data.leaveDaysLeft = data.leaveLength - data.restDays - 1;

    // if leave month is 11: december, next month is 0, else next month is leave month + 1
    month === 11 ? (leaveMonthYear = {
      nextMonth: 0,
      year: currYear + 1,
    }) : (leaveMonthYear = {
      nextMonth: month + 1,
      year: currYear,
    });

    // @ts-ignore
    data.endYear = leaveMonthYear.year;

    // console.log(leaveMonthYear.nextMonth);
    // following month Object
    // @ts-ignore
    data.nextMonth = new Month(leaveMonthYear.nextMonth).name();
    // console.log(data.nextMonth);

    // @ts-ignore
    data.nextMonthLength = new Month(leaveMonthYear.nextMonth).length();

    // @ts-ignore
    data.startMonth = data.leaveMonth;

    // @ts-ignore
    if (data.leaveDaysLeft > 0) {
      // for rest days less than leave length
      // @ts-ignore
      const nextRemDays = data.nextMonthLength - data.leaveDaysLeft;

      if (nextRemDays <= 0) {
        // leave days left is greater than length of month after leave month
        month === 10 ? _thirdMonth = 0 : _thirdMonth = leaveMonthYear.nextMonth + 1;

        // fix .name of undefined error from months === 10 monthsArr[nonsense]

        const thirdMonth = new Month(_thirdMonth);
        // @ts-ignore
        data.thirdMonth = thirdMonth.name();
        // @ts-ignore
        data.thirdMonthLength = thirdMonth.length();

        // @ts-ignore
        data.endMonth = thirdMonth.name();

        // data.endDate = (nextRemDays + thirdMonth.length());
        // @ts-ignore
        data.endDate = -nextRemDays;

        // @ts-ignore
        data.fullDate = `leave starts on ${data.startMonth} ${
          data.startDate
        }, ${data.startYear} and ends on ${data.endMonth} ${data.endDate}, ${
          data.endYear
        }`;
      } else if (nextRemDays > 0) {
        // leave days left is less than length of month after leave month

        // @ts-ignore
        data.endMonth = monthsArr[leaveMonthYear.nextMonth].name;

        // @ts-ignore
        data.endDate = data.leaveDaysLeft;
      }

      // @ts-ignore
      data.fullDate = `leave starts on ${data.startMonth} ${data.startDate}, ${
        data.startYear
      } and ends on ${data.endMonth} ${data.endDate}, ${data.endYear}`;
      // @ts-ignore
    } else if (data.leaveDaysLeft <= 0) {
      // for rest days greater than leave length
      // @ts-ignore
      data.endDate = data.startDate + data.leaveLength - 1;

      // @ts-ignore
      data.startDate > 10 ? (data.endDate = -data.nextMonthLength) : data.endDate;

      // @ts-ignore
      data.startDate > 10 && month === 11 ? data.endMonth = monthsArr[leaveMonthYear.nextMonth].name : data.endMonth = data.leaveMonth;

      // @ts-ignore
      data.fullDate = `leave starts on ${data.startMonth} ${data.startDate}, ${
        data.startYear
      } and ends on ${data.endMonth} ${data.endDate}, ${data.endYear}`;
    }
    return data;
  };

  return {
    dataChunk: () => {
      return {
        currMonth: currMonth,
        currMonthName: currMonthName,
        currYear: currYear,
        monthsArray: monthsArr,
      };
    },
    setLeaveMonth: () => {
      const month = Math.floor(Math.random() * 12);
      return month;
    },
    getData: (monthNumber = currMonth) => {
      return {
        personObj: function(level) {
          return new Person(level);
        },
        monthObj: function() {
          // console.log(currMonth);
          return new Month(monthNumber);
        },
      };
    },
    createShift: (month, preference = null) => {
      // @ts-ignorelet lastEl;
      const shiftSchedule = [];
      const shiftPool = ['M', 'N', 'O', 'O', 'L'];

      // consider preference
      // random first element
      shiftSchedule.push(
          shiftPool[Math.floor(Math.random() * shiftPool.length)]
      );

      // iteration to fill shift schedule till == month.length
      while (shiftSchedule.length < month.length()) {
        // determine last shift schedule element from shiftPool
        lastEl = shiftPool.indexOf(shiftSchedule[shiftSchedule.length - 1]);

        if (shiftPool[lastEl + 1] !== undefined) {
          // push next element in shiftPool -> fixed O, O simultaneity
          shiftSchedule[shiftSchedule.length - 1] == 'O' &&
            shiftSchedule[shiftSchedule.length - 2] == 'O' ?
            shiftSchedule.push(shiftPool[shiftPool.lastIndexOf('O') + 1]) : shiftSchedule.push(shiftPool[lastEl + 1]);
        } else {
          // push first element in shift pool
          shiftSchedule.push(shiftPool[shiftPool.length - shiftPool.length]);
        }
      }
      if (preference !== null) {
        preference = preference.split('|');
        console.log(preference);
        // consider preference populate shiftSchedule with preference
        // using 50 50 preference normal balance
        // length = Math.random(0.5 * shiftSchedule.length);
        for (i = 0; i < shiftSchedule.length; i++) {
          const pos = Math.floor(Math.random() * shiftSchedule.length);
          shiftSchedule.fill(preference[Math.floor(Math.random() * preference.length)].toUpperCase(), pos, pos + 1);
        }
      }
      return shiftSchedule;
    },
    getLeaveSchedule: (obj, month) => {
      return leaveSchedule(obj, month);
    },
    makeShifts: (amt, preference, month = dataCtrl().getData().monthObj()) => {
      console.log(month);
      typeof month === 'object' ? month = month :
        isNaN(month) ?
        month = dataCtrl().getData(new Month().index(month)).monthObj() :
        month = new Month(month);
      const shifts = [];
      console.log(month.name());
      console.log(month.length());

      // if isNaN month ? get index in monthsArr : continue with number
      // isNaN(parseInt(month)) ? month = new Month(new Month().index(month)) : month;

      while (shifts.length < amt) {
        shifts.push(dataCtrl().createShift(month, preference));
      }

      // let next;
      // currMonth == 11 ? next = 0 : next = currMonth + 1;
      return {
        month: month.name(),
        year: currYear,
        shifts: shifts,
      };
    },
    makeLeaveSchedules: (level, length, month = dataCtrl().setLeaveMonth()) => {
      const leaveSchedules = [];
      console.log(month);
      typeof month === 'number' ? month = month :
        (isNaN(month) ?
        month = new Month().index(month) :
        (typeof month === 'undefined' || month == '' ? month = dataCtrl().setLeaveMonth() : month = month));

      console.log(month);

      while (leaveSchedules.length < length) {
        leaveSchedules.push(
            dataCtrl().getLeaveSchedule(
                dataCtrl()
                    .getData()
                    .personObj(level),
                month
            )
        );
      }
      return leaveSchedules;
    },
  };
};

module.exports = dataCtrl();

/* Your Code Here */

// createEmployeeRecord
function createEmployeeRecord(array) {
  const employeeRecord = {
    firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents: [],
    timeOutEvents: [],
  };
  return employeeRecord;
}

// createEmployeeRecords
function createEmployeeRecords(arrOfArr) {
  return arrOfArr.map((array) => createEmployeeRecord(array));
}

// createTimeInEvent
function createTimeInEvent(dateStamp) {
  let [date, hour] = dateStamp.split(" ");
  this.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(hour, 10),
    date,
  });
  return this;
}

// createTimeOutEvent
function createTimeOutEvent(dateStamp) {
  let [date, hour] = dateStamp.split(" ");
  this.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hour, 10),
    date,
  });
  return this;
}

// hoursWorkedOnDate
function hoursWorkedOnDate(date) {
  const timeIn = this.timeInEvents.find(
    (timeInEvent) => timeInEvent.date === date
  );
  const timeOut = this.timeOutEvents.find(
    (timeOutEvent) => timeOutEvent.date === date
  );
  const result = (timeOut.hour - timeIn.hour) / 100;
  return result;
}

// wagesEarnedOnDate
function wagesEarnedOnDate(dateStamp) {
  let payRate = this.payPerHour;
  return payRate * hoursWorkedOnDate.call(this, dateStamp);
}

// findEmployeeByFirstName
function findEmployeeByFirstName(employeeRecords, firstName) {
  return employeeRecords.find(
    (employeeRecord) => employeeRecord.firstName === firstName
  );
}

// calculatePayroll
function calculatePayroll(employeeRecords) {
  let payRoll = employeeRecords.reduce(
    (sum, record) => allWagesFor.call(record) + sum,
    0
  );
  return payRoll;
}
/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
  let eligibleDates = this.timeInEvents.map(function (e) {
    return e.date;
  });

  let payable = eligibleDates.reduce(
    function (memo, d) {
      return memo + wagesEarnedOnDate.call(this, d);
    }.bind(this),
    0
  ); // <== Hm, why did we need to add bind() there? We'll discuss soon!

  return payable;
};

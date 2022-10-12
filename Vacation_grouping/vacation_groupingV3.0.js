const jsonData = require('./input.json');
const fs = require('fs');

function compare(a, b) {
  if (a.user.name < b.user.name) {
    return -1;
  }
  if (a.user.name > b.user.name) {
    return 1;
  }
  return 0;
}

function vacationGrouping(sortedInput) {
  const newArr = [];
  sortedInput.reduce((prev, el) => {
    const { user, startDate, endDate } = el;
    const { user: prevUser, startDate: prevStartDate, endDate: prevEndDate } = prev;
    if (prevUser?.name === user.name) {
      if (prevStartDate !== startDate && prevEndDate !== endDate) { // "&& prevEndDate !== endDate" is optional
        newArr.at(-1).weekends.push({ startDate, endDate });
      }
    }
    if (prevUser?.name !== user.name) {
      newArr.push({ userId: user._id, name: user.name, weekends: [{ startDate, endDate }] });
    }
    return el;
  }, {});
  return JSON.stringify(newArr, null, 2);
}

const sortedInput = jsonData.sort(compare);
const data = vacationGrouping(sortedInput);
fs.writeFile('outputV3.json', data, err => {
  if (err) throw err;
});

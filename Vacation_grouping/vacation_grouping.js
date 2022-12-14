const jsonData = require('./input.json');
const fs = require('fs');


function foo(data) {
  let arr = [];
  goto:for (let i of data) {
    let el = {};
    if (arr.length === 0) {
      {
        el["userId"] = i.user._id, el["name"] = i.user.name, el["weekends"] = [{
          startDate: i.startDate,
          endDate: i.endDate
        }]
      }
      arr.push(el);
      continue;
    }
    for (let j of Object.values(arr)) {
      if (i.user.name === j.name) {
        if (i.startDate !== j.weekends[0].startDate && i.endDate !== j.weekends[0].endDate) {
          j.weekends.push({ startDate: i.startDate, endDate: i.endDate });
        }
        continue goto;
      }
    }
    {
      el["userId"] = i.user._id, el["name"] = i.user.name, el["weekends"] = [{
        startDate: i.startDate,
        endDate: i.endDate
      }]
      arr.push(el);
    }
  }
  return arr;
}

fs.writeFile('output.json', JSON.stringify(foo(jsonData), null, 2), err => {
  if (err) throw err;
});

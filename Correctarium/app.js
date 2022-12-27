const moment = require("moment");

const getPriceAndHours = (lang, file_ext, charsLength) => {
  const fileExtensions = ["none", "doc", "docx", "rtf"];
  const coeficient = Object.values(fileExtensions).includes(file_ext) ? 1 : 1.2;
  let pricePerChar, minPrice, charLimit;

  switch (lang) {
    case "ua":
    case "ru":
      [pricePerChar, minPrice, charLimit] = [0.05, 50, 1333];
      break;
    case "en":
      [pricePerChar, minPrice, charLimit] = [0.12, 120, 333];
      break;
    default:
      pricePerChar = minPrice = charLimit = undefined;
  }

  if (charsLength <= charLimit)
    return {
      timeInMins: 60 * coeficient,
      price: (minPrice * coeficient).toFixed(2),
    };
  else {
    minPrice += (charsLength - charLimit) * pricePerChar;
    const timeInMins = Math.ceil(charsLength / charLimit) * 60 + 30;
    return {
      timeInMins: Math.ceil(timeInMins * coeficient),
      price: (minPrice * coeficient).toFixed(2),
    };
  }
};

function calculateDate(time) {
  let m = moment();
  let addedTime;
  let timeInSeconds = time * 60;

  function isWorkingTime(momentTime) {
    const isWorkingTime =
      momentTime.weekday() === 0 ||
      momentTime.weekday() === 6 ||
      momentTime.hour() >= 19;
    return isWorkingTime;
  }
  function skipDay(momentTime) {
    const nextDay = momentTime.add(1, "d").startOf("d").add(10, "h");
    return nextDay;
  }

  function skipNotWorkingHours(momentTime) {
    const workingHours = momentTime.startOf("d").add(10, "h");
    return workingHours;
  }

  function addMinutesTo18(momentTime, timeInSeconds) {
    if (momentTime.minute() + timeInSeconds / 60 > 60) {
      timeInSeconds = (momentTime.minute() + timeInSeconds / 60) % 60;
      const momentTimeStamp = momentTime.add(60 - momentTime.minute(), "m");
      return { timeInSeconds, momentTimeStamp };
    } else {
      const momentTimeStamp = momentTime.add(timeInSeconds / 60, "m");
      timeInSeconds -= timeInSeconds;
      return { timeInSeconds, momentTimeStamp };
    }
  }

  function addTimeGTHour(momentTime, timeInSeconds) {
    let minutesInSeconds = (60 - momentTime.minute()) * 60;
    if (minutesInSeconds === 3600) {
      momentTime.add(1, "h");
    } else {
      momentTime = skipDay(momentTime);
    }
    timeInSeconds -= minutesInSeconds;
    return { momentTime, timeInSeconds };
  }

  function addHourOrRemainingMinutes(momentTime, timeInSeconds) {
    if (timeInSeconds < 3600) {
      momentTime.add(Math.ceil(timeInSeconds / 60), "m");
      timeInSeconds -= timeInSeconds;
    } else {
      momentTime.add(1, "h");
      timeInSeconds -= 3600;
    }
    return { momentTime, timeInSeconds };
  }

  while (timeInSeconds > 0) {
    if (isWorkingTime(m)) {
      m = skipDay(m);
    } else if (m.hour() < 10) {
      m = skipNotWorkingHours(m);
    } else if (m.hour() === 18) {
      if (timeInSeconds < 3600) {
        addedTime = addMinutesTo18(m, timeInSeconds);
        m = addedTime.momentTimeStamp;
        timeInSeconds = addedTime.timeInSeconds;
      } else {
        addedTime = addTimeGTHour(m, timeInSeconds);
        m = addedTime.momentTime;
        timeInSeconds = addedTime.timeInSeconds;
      }
    } else {
      addedTime = addHourOrRemainingMinutes(m, timeInSeconds);
      m = addedTime.momentTime;
      timeInSeconds = addedTime.timeInSeconds;
    }
  }
  // return { date: m.locale("ru").calendar(), timeStamp: m.unix() };
  return `${m.day()}, ${m.format("H:mm")}`; // testing
}

module.exports = { calculateDate, getPriceAndHours };

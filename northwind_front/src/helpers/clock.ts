const currentTime = () => {
  const date = new Date();

  let hh = date.getHours();
  let mm = date.getMinutes();
  let ss = date.getSeconds();

  const timeNumbers = [hh, mm, ss];

  let time = "";
  timeNumbers.forEach((el: number | string, i) => {
    if (+el < 10) {
      el = ("0" + el).slice(-2);
    }
    if (i > 0) {
      el = ":" + el;
    }
    time += el;
  });

  return time;
};

export default currentTime;

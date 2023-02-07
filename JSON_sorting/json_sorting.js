const axios = require("axios").default;
const urls = require("./links.js");

function findVal(object, key) {
  let value;
  Object.keys(object).some((k) => {
    if (k === key) {
      value = object[k];
      return true;
    }
    if (object[k] && typeof object[k] === "object") {
      value = findVal(object[k], key);
      return value !== undefined;
    }
  });
  return value;
}

const getJson = async (link) => {
  for (let i = 0; i < 3; i++) {
    try {
      const { data: body } = await axios.get(link);
      return [link, body];
    } catch (e) {
      if (e.response.status >= 400 && i === 2)
        throw new Error(`${link}: — ${e.response.status} status :(`);
    }
  }
};

async function printValues() {
  let falseTrueValues = [];
  await Promise.all(
    urls.map(async (url) => {
      try {
        const jsonData = await getJson(url);
        const keyValue = findVal(jsonData[1], "isDone");
        console.log(`${jsonData[0]}:  isDone — ${keyValue}`);
        falseTrueValues.push(keyValue);
      } catch (e) {
        console.log(e.message);
      }
    })
  );
  const values = falseTrueValues.reduce((arr, el) => {
    arr[el] = (arr[el] || 0) + 1;
    return arr;
  }, {});
  console.log(`
Значение True: ${values[true]},
Значение False: ${values[false]}`);
}

printValues();

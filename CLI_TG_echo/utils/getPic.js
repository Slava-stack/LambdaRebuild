const SECRET = require("../.env");

const axios = require("axios").default;
getPic = async () => {
  const { data } = await axios.get(picsUrl, {
    responseType: "arraybuffer",
  });
  return data;
};

module.exports = { getPic };

const axios = require('axios').default;
getPic = async () => {
  const { data } = await axios.get('https://picsum.photos/200/300', { responseType: "arraybuffer" });
  return data;
};

module.exports = { getPic };
S
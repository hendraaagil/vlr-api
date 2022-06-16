const axios = require('axios');
const cheerio = require('cheerio');

const { BASE_URL } = require('../constants/url');

const getScrape = async (page, path) => {
  const url = `${BASE_URL}/${
    path === 'results' ? 'matches/results' : 'matches'
  }?page=${page}`;
  const { data } = await axios.get(url);
  const $ = cheerio.load(data);

  return $;
};

module.exports = getScrape;

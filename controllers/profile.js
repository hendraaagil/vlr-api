const { SITE_URL } = require('../constant/url');

const getProfile = (req, res) => {
  res.status(200).json({
    list: {
      schedules: SITE_URL + '/api/schedules',
      results: SITE_URL + '/api/results',
    },
    author: 'Hendra Agil',
    source: 'https://github.com/hendraaagil/vlr-api',
  });
};

module.exports = { getProfile };

const { SITE_URL } = require('../constants/url');

const getProfile = (req, res) => {
  res.status(200).json({
    list: {
      schedules: SITE_URL + '/api/schedules',
      results: SITE_URL + '/api/results',
    },
    author: {
      name: 'Hendra Agil',
      site: 'https://hendraaagil.dev',
    },
    source: 'https://github.com/hendraaagil/vlr-api',
  });
};

module.exports = { getProfile };

const getScrape = require('../libs/getScrape');
const getResponse = require('../libs/getResponse');
const getPagination = require('../libs/getPagination');

const getResult = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const $ = await getScrape(page, 'results');
    const response = getResponse($, 'results');
    const pagination = await getPagination('results', page);

    res.status(200).json({
      message: 'Successfully get result data',
      pagination,
      response,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = { getResult };

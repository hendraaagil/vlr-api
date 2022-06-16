const getScrape = require('../libs/getScrape');
const getResponse = require('../libs/getResponse');
const getPagination = require('../libs/getPagination');

const getSchedule = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const $ = await getScrape(page, 'schedules');
    const response = getResponse($, 'schedules');
    const pagination = await getPagination('schedules', page);

    res.status(200).json({
      message: 'Successfully get schedule data',
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

module.exports = { getSchedule };

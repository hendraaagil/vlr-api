const getScrape = require('../lib/getScrape');
const getMaxpage = require('../lib/getMaxpage');
const getResponse = require('../lib/getResponse');

const getSchedule = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const $ = await getScrape(page, 'matches');

    // Find max pages
    const maxPage = await getMaxpage(page, 'matches');
    if (Number(req.query.page) > maxPage) {
      return res.status(404).json({
        message: `Data from page ${req.query.page} is not found!`,
      });
    }

    const response = getResponse($, 'matches');

    res.status(200).json({
      message: 'Successfully get schedule data',
      maxPage: maxPage,
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

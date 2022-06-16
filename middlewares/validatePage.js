const getMaxpage = require('../libs/getMaxpage');

const validatePage = async (req, res, next) => {
  const path = req.path.replace(/\/api\//g, '');
  const page = req.query.page || 1;
  const maxPage = await getMaxpage(page, path);
  if (Number(req.query.page) > maxPage) {
    return res.status(404).json({
      message: `Data from page ${req.query.page} is not found!`,
    });
  }
  next();
};

module.exports = validatePage;

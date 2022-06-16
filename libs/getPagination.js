const { SITE_URL } = require('../constants/url');
const getMaxpage = require('./getMaxpage');

const getPagination = async (path, currentPage) => {
  const maxPage = await getMaxpage(currentPage, path);
  let prevPage = 0;
  if (Number(currentPage) > 1) {
    prevPage = Number(currentPage) - 1;
  }
  let nextPage = 0;
  if (Number(currentPage) > 0 && Number(currentPage) + 1 <= maxPage) {
    nextPage = Number(currentPage) + 1;
  }
  const pagination = {
    last: `${SITE_URL}/api/${path}?page=${maxPage}`,
    next: nextPage ? `${SITE_URL}/api/${path}?page=${nextPage}` : null,
    prev: prevPage ? `${SITE_URL}/api/${path}?page=${prevPage}` : null,
  };

  return pagination;
};

module.exports = getPagination;

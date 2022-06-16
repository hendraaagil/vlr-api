const getScrape = require('./getScrape');

const getMaxpage = async (page, path) => {
  const $ = await getScrape(page, path);
  const maxPage = $(
    '#wrapper > .col-container > .mod-1 > .action-container > .action-container-pages'
  )
    .children()
    .last()
    .text();

  return Number(maxPage);
};

module.exports = getMaxpage;

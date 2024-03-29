const { BASE_URL } = require('../constants/url');

const getResponse = ($, path) => {
  const propertyName = path === 'schedules' ? 'schedules' : 'results';
  // Find list dates
  const listDates = $('#wrapper > .col-container > .mod-1 > .wf-label');
  const dates = [];
  listDates.each((index, el) => {
    const date = el.children[0].data
      .replace(/\t/g, '')
      .replace(/\n/g, '')
      .trim();
    dates.push(date);
  });

  // Find list cards
  const listCards = $('#wrapper > .col-container > .mod-1 > .wf-card');
  const filteredCards = [];
  listCards.each((index, el) => {
    filteredCards.push(el.children.filter((item) => item.name === 'a'));
  });
  filteredCards.shift();

  const response = [];
  filteredCards.map((card, index) => {
    const schedules = [];
    card.map((item) => {
      const time = $(item)
        .children('.match-item-time')
        .text()
        .replace(/\t/g, '')
        .replace(/\n/g, '');

      const elTeams = $(item)
        .children('.match-item-vs')
        .children('.match-item-vs-team');
      const teams = [];
      elTeams.map((index, team) => {
        const name = $(team)
          .children('.match-item-vs-team-name')
          .children('.text-of')
          .text()
          .replace(/\t/g, '')
          .replace(/\n/g, '');
        const flag = $(team)
          .children('.match-item-vs-team-name')
          .children('.text-of')
          .children('.flag')
          .attr('class')
          .slice(-2);
        const score = $(team)
          .children('.match-item-vs-team-score')
          .text()
          .replace(/–/g, '-')
          .trim();
        teams.push({
          flag: BASE_URL + `/img/icons/flags/32/${flag}.png`,
          name,
          score,
        });
      });

      const status = $(item)
        .children('.match-item-eta')
        .children('.ml')
        .children('.ml-status')
        .text();

      const event = $(item).children('.match-item-event').text().split('\n');
      const eventName = event[3].replace(/\t/g, '').replace(/\n/g, '');
      const eventStage = event[2]
        .replace(/\t/g, '')
        .replace(/\n/g, '')
        .replace(/–/g, ' - ');

      const eventIcon =
        'https:' +
        $(item).children('.match-item-icon').children('img').attr('src');
      const schedule = {
        eventIcon,
        eventName,
        eventStage,
        link: BASE_URL + item.attribs.href,
        status,
        teams,
        time,
      };

      schedules.push(schedule);
    });

    const data = {
      date: dates[index],
    };
    data[propertyName] = schedules;

    response.push(data);
  });

  const formattedResponse = [];
  response.map((item) => {
    item[propertyName] = item[propertyName].map((schedule) => {
      const time = new Date(`${item.date} ${schedule.time}`);
      const newTime = new Date(time.setHours(time.getHours() + 4));
      formattedResponse.push({
        ...schedule,
        time: newTime,
      });
    });
  });

  return formattedResponse;
};

module.exports = getResponse;

const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

const { getProfile } = require('./controllers/profile');
const { getSchedule } = require('./controllers/schedule');
const { getResult } = require('./controllers/result');
const validatePage = require('./middlewares/validatePage');
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.redirect('/api');
});
app.get('/api', getProfile);
app.get('/api/schedules', validatePage, getSchedule);
app.get('/api/results', validatePage, getResult);

app.use('/', (req, res) => {
  res.status(404).json({
    message: 'Path not found!',
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

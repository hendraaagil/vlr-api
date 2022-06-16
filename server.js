const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

const { getProfile } = require('./controllers/profile');
const { getSchedule } = require('./controllers/schedule');
const { getResult } = require('./controllers/result');
const PORT = process.env.PORT || 3000;

app.get('/api', getProfile);
app.get('/api/schedules', getSchedule);
app.get('/api/results', getResult);

app.use('/', (req, res) => {
  res.status(404).json({
    message: 'Path not found!',
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

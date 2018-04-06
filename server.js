const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
// const timers = require('data.json');

const app = express();

const DATA_FILE = path.join(__dirname, 'data.json');

app.set('port', (process.env.PORT || 4200));

app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  next();
});

// GET all timers
// app.get('api/timers', (req, res) => {
//   timers.getTimers().then(data => res.send(data), (error) => {
//     console.error(error);
//     res.status(500).send({
//       error: 'There was an error',
//     });
//   });
// });
app.get('/api/timers', (req, res) => {
  fs.readFile(DATA_FILE, (err, data) => {
    res.setHeader('Cache-Control', 'no-cache');
    res.json(JSON.parse(data));
  });
});

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});

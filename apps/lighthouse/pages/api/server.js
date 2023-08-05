const express = require('express');
const app = express();
const port = 3001;

const crawl = require('./crawler');

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // update to match the domain you will make the request from
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.get('/crawl', async (req, res) => {
  const result = await crawl();
  res.json(result);
});

app.listen(3001, function () {
  console.log('CORS-enabled web server listening on port 3001');
});

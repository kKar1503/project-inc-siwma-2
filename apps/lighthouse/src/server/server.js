const dotenv = require('dotenv');

dotenv.config();

const express = require('express');
const app = express();
const port = 3001;

const crawl = require('./crawler');

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', `${process.env.NEXT_PUBLIC_FRONTEND_URL}`);
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(express.json());

app.post('/crawl', async (req, res) => {
  const { urls } = req.body;
  try {
    const results = await crawl(urls);
    res.json(results);
  } catch (error) {
    console.error('Error in /crawl route', error);
    res.status(500).send('Error during crawling');
  }
});

app.listen(3001, function () {
  console.log(`CORS-enabled web server listening on port ${port}`);
});

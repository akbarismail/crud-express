const express = require('express');
const app = express();
const cors = require('cors');
const compression = require('compression');
require('dotenv').config();

app.use(cors());
app.use(compression());

// middleware log
const log = function (req, res, next) {
  console.log(`${Date.now()} ${req.ip} ${req.originalUrl}`);
  next();
};
app.use(log);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const routes = require('./routes');
app.use(routes);

// middleware handle 404
const notFound = (req, res, next) => {
  res.json({
    status: 'error',
    message: 'resource tidak ditemukan',
  });
};
app.use(notFound);

// middleware error handling
const errorHandling = (err, req, res, next) => {
  console.error(err);
  res.status(500).send('Terjadi kesalahan');
};
app.use(errorHandling);

const port = 3000;
app.listen(port, () =>
  console.log(`server running at http://localhost:${port}`)
);

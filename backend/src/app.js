const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const compression = require('compression');
const helmet = require('helmet');
const cors = require('cors');

const middlewares = require('./middlewares');
const api = require('./api');

const app = express();
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));
app.use(
  cors({
    origin: process.env.VUE_APP_URL,
    credentials: true,
  })
);
app.use(morgan('tiny'));
app.use(compression());
app.use(helmet());

app.use('/api/v1', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;

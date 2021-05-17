const express = require('express');
require('dotenv').config();
const helmet = require('helmet');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const rateLimit = require('express-rate-limit');
const router = require('./routes');
const { createUser, login } = require('./controllers/users.js');
const auth = require('./middlewares/auth.js');
const errorHandler = require('./middlewares/error-handler.js');
const { requestLogger, errorLogger } = require('./middlewares/logger.js');
const { validateCreateUser, validateLogin } = require('./middlewares/validations.js');

const { NODE_ENV, DB_CONN } = process.env;

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

mongoose.connect(NODE_ENV === 'production' ? DB_CONN : 'mongodb://localhost:27017/bitfilmsdb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const { PORT = 3000 } = process.env;
const app = express();
app.use(bodyParser.json());
app.use(requestLogger);
app.use(limiter);
app.use(helmet());
app.use(helmet.hsts());
app.post('/api/signup', validateCreateUser, createUser);
app.post('/api/signin', validateLogin, login);
app.use(auth);
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);
app.listen(PORT, () => {
  console.log('App start. NODE_ENV=', NODE_ENV, DB_CONN);
});

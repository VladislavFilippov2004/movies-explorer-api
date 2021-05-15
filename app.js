const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const router = require('./routes');
const { createUser, login } = require('./controllers/users.js');
const auth = require('./middlewares/auth.js');
const errorHandler = require('./middlewares/error-handler.js');
const { requestLogger, errorLogger } = require('./middlewares/logger.js');
const { validateCreateUser, validateLogin } = require('./middlewares/validations.js');

const { NODE_ENV } = process.env;

mongoose.connect('mongodb://localhost:27017/bitfilmsdb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});
const { PORT = 3000 } = process.env;
const app = express();
app.use(bodyParser.json());
app.use(requestLogger);
app.post('/api/signup', validateCreateUser, createUser);
app.post('/api/signin', validateLogin, login);
app.use(auth);
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);
app.listen(PORT, () => {
  console.log('app start', NODE_ENV);
});

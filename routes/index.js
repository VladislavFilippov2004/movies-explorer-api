const router = require('express').Router();
const usersRouter = require('./users.js');
const moviesRouter = require('./movies.js');
const NotFoundError = require('../errors/not-found.js');

router.use('/api/users', usersRouter);
router.use('/api/movies', moviesRouter);
router.use('/*', (req, res, next) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден'));
});
module.exports = router;

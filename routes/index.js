const router = require('express').Router();
const usersRouter = require('./users.js');
const moviesRouter = require('./movies.js');

router.use('/api/users', usersRouter);
router.use('/api/movies', moviesRouter);
module.exports = router;

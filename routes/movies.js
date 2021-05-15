const router = require('express').Router();
const { createMovie, getMovies, deleteMovie } = require('../controllers/movies.js');
const { validateCreateMovie, validateGetMovies, validateDeleteMovie } = require('../middlewares/validations.js');

router.post('/', validateCreateMovie, createMovie);
router.get('/', validateGetMovies, getMovies);
router.delete('/:movieId', validateDeleteMovie, deleteMovie);
module.exports = router;

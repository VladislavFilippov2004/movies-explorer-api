const Movie = require('../models/movie.js');
const BadRequestError = require('../errors/bad-request-error.js');
const NotFoundError = require('../errors/not-found.js');
const Forbidden = require('../errors/forbidden.js');

const createMovie = (req, res, next) => {
  const movieData = { owner: req.user._id, ...req.body };
  Movie.create(movieData)
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при создании фильма'));
      } else {
        next(err);
      }
    });
};
const getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.send(movies))
    .catch((err) => next(err));
};
const deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  Movie.findById(movieId)
    .orFail(new NotFoundError('Фильм не найден'))
    .then((movie) => {
      if (movie.owner.equals(req.user._id)) {
        Movie.findByIdAndRemove(movie)
          .then(() => {
            res.status(200).send({ message: 'Фильм успешно удалён' });
          });
      } else {
        throw new Forbidden('Нельзя удалять чужие карточки');
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы невалидные данные'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  createMovie,
  getMovies,
  deleteMovie,
};

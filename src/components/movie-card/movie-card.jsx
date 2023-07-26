import PropTypes from "prop-types";
export const MovieCard = ({ movie, onMovieClick }) => {
    return (
      <div
        onClick={() => {
          onMovieClick(movie);
        }}
      >
        {movie.title}
      </div>
    );
  };
MovieCard.propTypes = {
  movie: PropTypes.shape({
    description: PropTypes.string,
    director: PropTypes.shape({
      name: PropTypes.any
    }),
    genre: PropTypes.shape({
      name: PropTypes.any
    }),
    image: PropTypes.any,
    title: PropTypes.any
  }),
  onMovieClick: PropTypes.func
}

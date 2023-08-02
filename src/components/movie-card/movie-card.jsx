import PropTypes from "prop-types";
export const MovieCard = ({ movie, onMovieClick }) => {
    return (
      <div
        onClick={() => {
          onMovieClick(movie);
        }}
      >
        {movie.Title}
      </div>
    );
  };
MovieCard.propTypes = {
  movie: PropTypes.shape({
    Description: PropTypes.string,
    Director: PropTypes.shape({
      Name: PropTypes.any
    }),
    Genre: PropTypes.shape({
      Name: PropTypes.any
    }),
    Imagepath: PropTypes.any,
    Title: PropTypes.any
  }),
  onMovieClick: PropTypes.func
}

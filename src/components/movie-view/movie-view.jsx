import PropTypes from "prop-types"
export const MovieView = ({ movie, onBackClick }) => {
    return (
      <div>
        <div>
          {' '}
          <img src={movie.image} />
        </div>
        <div>
          <div>
            <span>Title: </span>
            <span>{movie.title}</span>
          </div>
          <div>
            <span>Genre: </span>
            <span>{movie.genre.name}</span>
          </div>
          <div>
            <span>Description: </span>
            <span>{movie.description}</span>
          </div>
          <div>
            <span>Director: </span>
            <span>{movie.director.name}</span>
          </div>
          <button onClick={onBackClick}>Back</button>
        </div>
      </div>
    );
  };

MovieView.propTypes = {
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
  onBackClick: PropTypes.func
}
  
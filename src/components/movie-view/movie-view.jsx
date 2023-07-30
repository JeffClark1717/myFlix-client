import PropTypes from "prop-types"
export const MovieView = ({ movie, onBackClick }) => {
    return (
      <div>
        <div>
          {' '}
          <img src={movie.ImagePath} />
        </div>
        <div>
          <div>
            <span>Title: </span>
            <span>{movie.Title}</span>
          </div>
          <div>
            <span>Genre: </span>
            <span>{movie.Genre.Name}</span>
          </div>
          <div>
            <span>Description: </span>
            <span>{movie.Description}</span>
          </div>
          <div>
            <span>Director: </span>
            <span>{movie.Director.Name}</span>
          </div>
          <button onClick={onBackClick}>Back</button>
        </div>
      </div>
    );
  };

MovieView.propTypes = {
  movie: PropTypes.shape({
    Description: PropTypes.string,
    Director: PropTypes.shape({
      name: PropTypes.any
    }),
    Genre: PropTypes.shape({
      name: PropTypes.any
    }),
    ImagePath: PropTypes.any,
    Title: PropTypes.any
  }),
  onBackClick: PropTypes.func
}
  
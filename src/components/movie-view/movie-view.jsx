import PropTypes from "prop-types"
import "./movie-view.scss";
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
        </div>
        <button onClick={onBackClick} className="back-button"  style={{ cursor: "pointer" }}>
        Back
      </button>
    </div>
    );
  };


MovieView.propTypes = {
  movie: PropTypes.shape({
    Description: PropTypes.string,
    Director: PropTypes.shape({
      Name: PropTypes.any
    }),
    Genre: PropTypes.shape({
      Name: PropTypes.any
    }),
    ImagePath: PropTypes.any,
    Title: PropTypes.any
  }),
  onBackClick: PropTypes.func
}
  
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie }) => {
  return (
      <Card className="h-100 bg-secondary text-white">
          <Card.Img variant="top" src={movie.ImagePath} />
          <Card.Body>
              <Card.Title>{movie.Title}</Card.Title>
              <Card.Text>Director: {movie.Director.Name}</Card.Text>
              <Card.Text>Description: {movie.Description}</Card.Text>
              <Link to={`/movies/${encodeURIComponent(movie.Title)}`}>
                  <Button variant="link">
                      Open
                  </Button>
              </Link>
          </Card.Body>
      </Card>
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
    ImagePath: PropTypes.any,
    Title: PropTypes.any
  }),
  onMovieClick: PropTypes.func
};

export default MovieCard; 
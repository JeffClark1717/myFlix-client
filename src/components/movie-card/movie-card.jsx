import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <Card>
      <Card.Img variant="top" src={movie.ImagePath} />
      <Card.Body onClick={() => onMovieClick(movie)}>
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>{movie.Director.Name}</Card.Text> 
        <Button onClick={() => onMovieClick(movie)} variant="link">
          Open
        </Button>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Description: PropTypes.string,
    Director: PropTypes.shape({
      Name: PropTypes.any.isRequired
    }),
    Genre: PropTypes.shape({
      Name: PropTypes.any
    }),
    ImagePath: PropTypes.any,
    Title: PropTypes.any
  }),
  onMovieClick: PropTypes.func
}; isRequired

export default MovieCard; 

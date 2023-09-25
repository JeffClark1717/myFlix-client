import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { Card } from "react-bootstrap";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./movie-view.scss";

export const MovieView = ({ movies, user, setUser, token }) => {
    const { movieTitle } = useParams();
    const [ isFavorite, setIsFavorite ] = useState(false);

    const movie = movies.find((m) => m.Title === movieTitle);

    useEffect(() => {
       const isFavorited = user.FavoriteMovies.includes(movie._id)
       setIsFavorite(isFavorited)
    }, [movie._id, user.FavoriteMovies]);

    const removeFavorite = () => {
        fetch(`https://notflix1717-51672d8e0ed0.herokuapp.com/users/${user.Username}/movies/${movie._id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        }).then((response) => {
            if (response.ok) {
                return response.json()
            }
        }).then((data) => {
            if (data) {
                setIsFavorite(false);
                localStorage.setItem("user", JSON.stringify(data));
                setUser(data);
            }
        })
    };

    const addToFavorite = () => {
        fetch(`https://notflix1717-51672d8e0ed0.herokuapp.com/users/${user.Username}/movies/${movie._id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        }).then((response) => {
            if (response.ok) {
                return response.json()
            }
        }).then((data) => {
            if (data) {
                setIsFavorite(true);
                localStorage.setItem("user", JSON.stringify(data));
                setUser(data);
            }
        })
    }

    return (
        <Card className="mt-1 mb-1 h-100 bg-secondary text-white" >
            <Card.Img variant="top" src={movie.ImagePath}/>
            <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
                <Card.Text>Description: {movie.Description}</Card.Text>
                <Card.Text>Director: {movie.Director.Name}</Card.Text>
                <Card.Text>Bio: {movie.Director.Bio}</Card.Text>
                <Card.Text>Genre: {movie.Genre.Name}</Card.Text>
                <Card.Text>Description: {movie.Genre.Description}</Card.Text>
            </Card.Body>

            {isFavorite ? (
                <Button onClick={removeFavorite}>Remove from favorites</Button>
            ) : (
                <Button onClick={addToFavorite}>Add to favorites</Button>
            )}

            <Link to={"/"}>
            <Button>Back</Button>
            </Link>
        </Card>
    )
}

MovieView.propTypes = {
  movies: PropTypes.arrayOf(
  PropTypes.shape({
  id: PropTypes.string,
  imagePath: PropTypes.string,
  Title: PropTypes.string,
  Description: PropTypes.string,
  Director: PropTypes.shape({
  Name: PropTypes.string,
  Bio: PropTypes.string,
  }).isRequired,
  Genre: PropTypes.shape({
  Name: PropTypes.string,
  Description: PropTypes.string,
  }).isRequired
  })
  ).isRequired,
  user: PropTypes.shape({
  Username: PropTypes.string.isRequired,
  FavoriteMovies: PropTypes.arrayOf(PropTypes.string).isRequired
  }).isRequired,
  setUser: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired
  };

export default MovieView;
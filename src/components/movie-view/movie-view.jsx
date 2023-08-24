import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { Card } from "react-bootstrap";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export const MovieView = ({ movies, user, setUser, token }) => {
    const { movieId } = useParams();
    const [ isFavourite, setIsFavourite ] = useState(false);

    useEffect(() => {
       const isFavourited = user.FavouriteMovies.includes(movieId)
       setIsFavourite(isFavourited)
    }, [movieId, user.FavouriteMovies]);

    const removeFavourite = () => {
        fetch(`https://notflix1717-51672d8e0ed0.herokuapp.com/users/${user.Username}/${movieId}`, {
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
                setIsFavourite(false);
                localStorage.setItem("user", JSON.stringify(data));
                setUser(data);
            }
        })
    };

    const addToFavourite = () => {
        fetch(`https://movie-api-es93.herokuapp.com/users/${user.Username}/${movieId}`, {
            method: "PUT",
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
                setIsFavourite(true);
                localStorage.setItem("user", JSON.stringify(data));
                setUser(data);
            }
        })
    }

    const movie = movies.find((m) => m.id === movieId);

    return (
        <Card className="mt-1 mb-1 h-100 bg-secondary text-white" >
            <Card.Img variant="top" src={movie.image}/>
            <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
                <Card.Text>Description: {movie.description}</Card.Text>
                <Card.Text>Director: {movie.director.name}</Card.Text>
                <Card.Text>Bio: {movie.director.bio}</Card.Text>
                <Card.Text>Genre: {movie.genre.name}</Card.Text>
                <Card.Text>Description: {movie.genre.description}</Card.Text>
            </Card.Body>

            {isFavourite ? (
                <Button onClick={removeFavourite}>Remove from favorites</Button>
            ) : (
                <Button onClick={addToFavourite}>Add to favorites</Button>
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
  id: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  director: PropTypes.shape({
  name: PropTypes.string.isRequired,
  bio: PropTypes.string,
  }).isRequired,
  genre: PropTypes.shape({
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  }).isRequired
  })
  ).isRequired,
  user: PropTypes.shape({
  Username: PropTypes.string.isRequired,
  FavouriteMovies: PropTypes.arrayOf(PropTypes.string).isRequired
  }).isRequired,
  setUser: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired
  };

export default MovieView;
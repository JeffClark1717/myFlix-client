import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";

export const MainView = () => {
  const storedToken = localStorage.getItem("token");
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const [movie, setMovie] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] = useState(storedUser? storedUser : null);
  const [token, setToken] = useState(storedToken? storedToken : null);

  useEffect(() => {
    if (!token) return;
  
    fetch("https://notflix1717-51672d8e0ed0.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` }
})
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        const moviesFromApi = data.map((movie) => {
          return {
            _id: movie._id,
            title: movie.title,
            director: {
              name: movie.director.name,
              bio: movie.director.bio,
              birth: movie.director.birth
            },
            description: movie.description,
            genre: {
            name: movie.genre.name,
            description: movie.genre.description
            },
            imageUrl: movie.imageUrl,
            featured: movie.featured
          };
        });
        setMovie(moviesFromApi);
      })

      .catch((error) => {
        console.error("Error fetching movies:", error);
      });
  }, [token]);

  if (!user) {
    return (
      <>
        <LoginView onLoggedIn={(user, token) => {
          setUser(user);
          setToken(token);
        }} />
        or
        <SignupView />
      </>
    );
  }

  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    );
  }

  if (movie.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
         <button onClick={() => {
          setUser(null);
          setToken(null);
          localStorage.clear();
        }}>Logout</button>
      {movie.map((movie) => (
        <MovieCard
          key={movie._id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};

   /* const [movies, setMovies] = useState([
        {
            id: "ObjectId('648a25b28d925836d83d5c21')",
            title: "Step Brothers",
            image: "public/MV5BODViZDg3ZjYtMzhiYS00YTVkLTk4MzktYWUxMTlkYjc1NjdlXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_FMjpg_UX1000_.jpg",
            description: "Two 40 year old losers are forced to become roommates when their parents marry eachother.",
            director: "Adam Mckay",
            genre: "Comedy"
        },
        {
            id: "ObjectId('648b6800c193c47998e76983')",
            title: "Top Gun",
            image: "public/MV5BZWYzOGEwNTgtNWU3NS00ZTQ0LWJkODUtMmVhMjIwMjA1ZmQwXkEyXkFqcGdeQXVyMjkwOTAyMDU@._V1_.jpg",
            description: "As students at the United States Navys elite fighter weapons school compete to be best in the class, one daring young pilot learns a few things from a civilian instructor that are not taught in the classroom.",
            director: "Tony Scott",
            genre: "Action"
        },
        {
            id: "ObjectId('648b691ac193c47998e76984')",
            title: "Dumb and Dumber",
            image: "public/dumb.jpg",
            description: "After a woman leaves a briefcase at the airport terminal, a dumb limo driver and his dumber friend set out on a hilarious cross-country road trip to Aspen to return it.",
            director: "Peter Farelly",
            genre: "Comedy"
        },
    ]);  */

    // https://notflix1717-51672d8e0ed0.herokuapp.com/movies
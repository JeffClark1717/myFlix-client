import { useState, useEffect } from 'react';
import { MovieCard } from "../movie-card/movie-card.jsx";
import { MovieView } from "../movie-view/movie-view.jsx";
//  import { LoginView } from "../login-view/login-view";


export const MainView = () => {
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [user, setUser] = useState(null);

  useEffect(() => {
    fetch('https://notflix1717-51672d8e0ed0.herokuapp.com/movies')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setMovies(data);
        
      }).catch(e => console.log(e));
  }, []);

    if (selectedMovie) {
        return (
            <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
        ); 
    }
console.log(movies);
    if (movies.length === 0) {
        return <div>This list is empty!</div>;
    }

    return (
        <div>
            {movies.map((movie) => (
                <MovieCard
                    key={movie._id}
                    movie={movie}
                    onMovieClick={(newSelectedMovie) => {
                        setSelectedMovie(newSelectedMovie);
                    }}
                />
            ))
            }
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
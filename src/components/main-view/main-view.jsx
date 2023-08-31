import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view";
import { Col, InputGroup, Row, Form } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export const MainView = () => {
  const storedToken = localStorage.getItem("token");
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const [movies, setMovies] = useState([]);
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [Search, setSearch] = useState("");

  const onLoggedOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
  };

  useEffect(() => {
    if (!token) return;

    fetch("https://notflix1717-51672d8e0ed0.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((movie) => ({
          _id: movie._id,
          Title: movie.Title,
          Director: {
            Name: movie.Director.Name,
            Bio: movie.Director.Bio,
            Birthday: movie.Director.Birthdate
          },
          Description: movie.Description,
          Genre: {
            Name: movie.Genre.Name,
            Description: movie.Genre.Description
          },
          ImagePath: movie.ImagePath,
          Featured: movie.Featured
        }));
        setMovies(moviesFromApi);
        console.log(moviesFromApi);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
      });
  }, [token]);

  return (
    <BrowserRouter>
      <NavigationBar
        user={user}
        onLoggedOut={onLoggedOut}
      />
      <Row className="justify-content-md-center">
        <Routes>
          <Route path="/signup"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <SignupView />
                  </Col>
                )}
              </>
            }
          />
          <Route path="/login"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col>
                    <LoginView onLoggedIn={(user, token) => {
                      setUser(user);
                      setToken(token);
                    }}/>
                  </Col>
                )}
              </>
            }
          />
          <Route path="/movies/:movieTitle"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>No movies</Col>
                ) : (
                  <Col md={6} className="application">
                    <MovieView movies={movies} user={user} token={token} setUser={(user) =>{
                          setUser(user);
                        }}/>
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) :
                  movies.length === 0 ? (
                    <Col> The List is Empty!</Col>
                  ) : (
                    <>
                      <Row className="my-3">
                        <form>
                          <InputGroup>
                            <Form.Control
                              onChange={(e) => setSearch(e.target.value)}
                              placeholder="Search Movie Titles"
                              aria-label="Search Movie Titles"
                            />
                          </InputGroup>
                        </form>
                      </Row>
                      {movies.filter((movie) => {
                        return Search === "" ?
                          movie :
                          movie.Title.toLowerCase().includes(Search.toLowerCase());
                      }

                      ).map((movie) => (

                        <Col className="mb-4" key={movie._id} md={3}>
                          <MovieCard
                            movie={movie}
                            token={token}
                            user={user}
                            setUser={setUser}
                          />

                        </Col>

                      ))}



                    </>
                  )
                }
              </>
            }
          />
      
    <Route path="/profile"
        element={
          <>
            { !user ? (
              <Navigate to="/login" replace />
            ) : (
              <Col>
               <ProfileView user={user} movies={movies} token={token} setUser={(user) => {
                      if( user !== null){
                        setUser(user);
                      }
                      else{
                        setUser(null);
                      }
                    }} 
                    onLogout={() => {
          setUser(null);
          setToken(null);
          localStorage.clear();
        }}
                    />
              </Col>
            )}
          </>
        }
        />
         <Route
            path="/watch-list"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) :
                  user.FavoriteMovies.length === 0 ? (
                    <Col> The List is Empty!</Col>
                  ) : (
                    <>

                      {movies.filter((movie) => user.FavoriteMovies.includes(movie._id)).map((movie) => (
                        <Col className="mb-4" key={movie._id} md={3}>
                          <MovieCard
                            movie={movie}
                            token={token}
                            user={user}
                            setUser={setUser} />
                        </Col>
                      ))}
                    </>
                  )
                }
              </>
            }

          />
          <Route
            path="/users/:username"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : (
                  <Col md={8}>
                    <ProfileView
                      movies={movies}
                      setUser={setUser} />
                  </Col>
                )}
              </>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};
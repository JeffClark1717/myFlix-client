import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export const MainView = () => {
  const storedToken = localStorage.getItem("token");
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const [movies, setMovies] = useState([]);
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [filter, setFilter] = useState("");

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
            Birthday: movie.Director.Birthday
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
        onLoggedOut={() => {
          setUser(null);
          setToken(null);
          localStorage.clear();
        }}
      />
      <Row className="justify-content-md-center">
        <Routes>
          <Route path="/signup"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col>
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
          <Route path="/"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>No movies</Col>
                ) : (
                  <>
                    {movies.map((movie) => (
                      <Col className="mb-5 d-flex" key={movie.id} xs={12} sm={6} md={4} lg={3}>
                        <MovieCard movie={movie} user={user} token={token} setUser={(user) =>{
                          setUser(user);
                        }} />
                      </Col>
                    ))}
                  </>
                )}
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
            path="/"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : (
                  <>
                    <Row className="mt-1 mb-1">
                        <Form.Control
                        type="text"
                        placeholder="Search..."
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        />
                    </Row>
                    {movies.length === 0 ? (
                      <Col>This list is empty!</Col>
                    ) : (
                      movies
                        .filter((movie) =>
                          movie.Title
                            .toLowerCase()
                            .includes(filter.toLowerCase())
                        )
                        .map((movie) => (
                          <Col className="mb-5" key={movie.id} md={4}>
                            <MovieCard movie={movie} />
                          </Col>
                        ))
                    )}
                  </>
                )}
              </>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};
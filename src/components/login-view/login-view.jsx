import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import PropTypes from 'prop-types';

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  LoginView.propTypes = {
    onLoggedIn: PropTypes.func.isRequired,
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
    };

    fetch("https://notflix1717-51672d8e0ed0.herokuapp.com/login", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then((response) => {
      if (response.ok) {
        return response.json();
        
      } else {
        alert ("login failed");
      }
    })
    .then((data) => {
      if (data) {
        console.log(data)
        onLoggedIn (data.user.Username, data.token)
      }
    })
    .catch((error) => {
      console.error("An error occurred:", error);
    });
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          minLength="3" 
        />
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

/*  https://notflix1717-51672d8e0ed0.herokuapp.com/login-view.json  */
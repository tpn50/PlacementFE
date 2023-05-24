import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./SignIn.css"; // Import the CSS file

const SignIn = () => {
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (event) => {
    setLogin({
      ...login,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:8000/signin", login);
      setError(null);
      navigate("/interviews");
    } catch (error) {
      console.error("Error submitting form", error);
      setError(error.response.data.message);
    }
    setLogin({
      email: "",
      password: "",
    });
  };

  return (
    <div className="signin-container">
      <h1>Login</h1>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={login.email}
          onChange={handleChange}
        />
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={login.password}
          onChange={handleChange}
        />
        <button className="signin-btn">Sign In</button>
      </form>
    </div>
  );
};

export default SignIn;

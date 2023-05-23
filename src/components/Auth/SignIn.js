import React, { useState } from "react";
import axios from "axios";

const SignIn = () => {
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);

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
      setError(null); // Reset the error when we successfully log in
    } catch (error) {
      console.error("Error submitting form", error);
      setError(error.response.data.message); // Set the error state to the message returned from the server
    }
    setLogin({
      email: "",
      password: "",
    });
  };

  return (
    <div>
      <h1>Login</h1>
      {error && <p>{error}</p>} {/* Render the error message if it exists */}
      <form onSubmit={handleSubmit}>
        <label>E-mail</label>
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
        <button>SignIn</button>
      </form>
    </div>
  );
};

export default SignIn;

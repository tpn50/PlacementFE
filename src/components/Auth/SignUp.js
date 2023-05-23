import React, { useState } from "react";
import axios from "axios";

const SignUp = () => {
  const [signup, setSignup] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (event) => {
    setSignup({
      ...signup,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:8000/signup", signup);
      setError(null);
      setSuccess("User successfully created!");
    } catch (error) {
      console.error("Error submitting form", error);
      setError("Error creating user");
      setSuccess(null);
    }
    setSignup({
      name: "",
      email: "",
      password: "",
    });
  };

  return (
    <div>
      <h1>SignUp</h1>
      {error && <p>{error}</p>}
      {success && <p>{success}</p>}
      <form onSubmit={handleSubmit}>
        <label>Full Name</label>
        <input
          type="text"
          name="name"
          value={signup.name}
          onChange={handleChange}
        />
        <label>E-mail</label>
        <input
          type="email"
          name="email"
          value={signup.email}
          onChange={handleChange}
        />
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={signup.password}
          onChange={handleChange}
        />
        <button>SignUp</button>
      </form>
    </div>
  );
};

export default SignUp;

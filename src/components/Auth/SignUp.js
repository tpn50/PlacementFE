import React, { useState } from "react";
import axios from "axios";
import "./SignUp.css"; // Import the CSS file

const SignUp = () => {
  const [signup, setSignup] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    setSignup({
      ...signup,
      [event.target.name]: event.target.value,
    });
    console.log(signup);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:8000/signup", signup);
    } catch (error) {
      console.error("Error submitting form", error);
    }
    setSignup({
      name: "",
      email: "",
      password: "",
    });
  };

  return (
    <div className="signup-container">
      <h1>SignUp</h1>
      <form className="signup-form" onSubmit={handleSubmit}>
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

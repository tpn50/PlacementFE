import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./InterviewForm.css"; // Import the CSS file

const InterviewForm = () => {
  const [interview, setInterview] = useState({
    company: "",
    date_of_visit: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const navigate = useNavigate();

  const handleChange = (event) => {
    setInterview({
      ...interview,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(
        "https://placementbackend.onrender.com/home/addinterview",
        interview
      );
      setError(null);
      setSuccess("Interview successfully created!");
      setInterview({
        company: "",
        date_of_visit: "",
      });
      navigate("/interviews");
    } catch (error) {
      console.error("Error submitting form", error);
      setError("Error creating interview");
      setSuccess(null);
    }
  };

  return (
    <div className="interview-form-container">
      <div className="interview-form">
        <h1>Interview Form</h1>
        {error && <p>{error}</p>}
        {success && <p>{success}</p>}
        <form onSubmit={handleSubmit}>
          <label>Company Name</label>
          <input
            type="text"
            name="company"
            value={interview.company}
            onChange={handleChange}
          />
          <label>Date of Visit</label>
          <input
            type="date"
            name="date_of_visit"
            value={interview.date_of_visit}
            onChange={handleChange}
          />
          <button>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default InterviewForm;

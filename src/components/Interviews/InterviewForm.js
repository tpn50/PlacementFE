import React, { useState } from "react";
import axios from "axios";

const InterviewForm = () => {
  const [interview, setInterview] = useState({
    company: "",
    date_of_visit: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (event) => {
    setInterview({
      ...interview,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:8000/home/addinterview", interview);
      setError(null);
      setSuccess("Interview successfully created!");
    } catch (error) {
      console.error("Error submitting form", error);
      setError("Error creating interview");
      setSuccess(null);
    }
    setInterview({
      company: "",
      date_of_visit: "",
    });
  };

  return (
    <div>
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
  );
};

export default InterviewForm;

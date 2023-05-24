import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./StudentForm.css"; // Import the CSS file

const StudentForm = () => {
  const [student, setStudent] = useState({
    email: "",
    batch: "",
    name: "",
    college: "",
    status: "",
    scores: {
      dsa: "",
      webd: "",
      react: "",
    },
  });
  const [success, setSuccess] = useState(null);

  const navigate = useNavigate(); // Added line

  const handleChange = (event) => {
    setStudent({
      ...student,
      [event.target.name]: event.target.value,
    });
  };

  const handleScoreChange = (event) => {
    setStudent({
      ...student,
      scores: {
        ...student.scores,
        [event.target.name]: event.target.value,
      },
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:8000/home/addstudent", student);
      setSuccess("Student Added Successfully");

      // Navigate back to /students route after successful submission
      navigate("/students"); // Added line
    } catch (error) {
      console.error("Error submitting form", error);
      setSuccess(null);
    }
    setStudent({
      email: "",
      batch: "",
      name: "",
      college: "",
      status: "",
      scores: {
        dsa: "",
        webd: "",
        react: "",
      },
    });
  };

  return (
    <div className="student-form-container">
      <h1>Student Form</h1>
      {success && <p>{success}</p>}
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={student.email}
          onChange={handleChange}
          required
        />

        <label>Batch</label>
        <input
          type="text"
          name="batch"
          value={student.batch}
          onChange={handleChange}
          required
        />

        <label>Full Name</label>
        <input
          type="text"
          name="name"
          value={student.name}
          onChange={handleChange}
          required
        />

        <label>College</label>
        <input
          type="text"
          name="college"
          value={student.college}
          onChange={handleChange}
          required
        />

        <label>Status</label>
        <select
          name="status"
          value={student.status}
          onChange={handleChange}
          required
        >
          <option value="">--Please choose an option--</option>
          <option value="Placed">Placed</option>
          <option value="Not Placed">Not Placed</option>
        </select>

        <label>DSA Final Score</label>
        <input
          type="number"
          name="dsa"
          value={student.scores.dsa}
          onChange={handleScoreChange}
          required
        />

        <label>WebD Final Score</label>
        <input
          type="number"
          name="webd"
          value={student.scores.webd}
          onChange={handleScoreChange}
          required
        />

        <label>React Final Score</label>
        <input
          type="number"
          name="react"
          value={student.scores.react}
          onChange={handleScoreChange}
          required
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default StudentForm;

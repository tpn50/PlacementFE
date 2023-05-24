import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./InterviewList.css"; // Import the CSS file

const InterviewList = () => {
  const [interviews, setInterviews] = useState([]);

  useEffect(() => {
    fetchInterviews();
  }, []);

  const fetchInterviews = async () => {
    try {
      const response = await axios.get(
        "https://placementbackend.onrender.com/home/interviews"
      );
      setInterviews(response.data.interviews);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="interview-list-container">
      <div className="interview-list">
        <h1>Interview List</h1>
        <ul>
          {interviews.map((interview) => (
            <li key={interview._id}>
              <p>Company: {interview.company}</p>
              <p>Date of Visit: {interview.date_of_visit}</p>
            </li>
          ))}
        </ul>
        <Link to="/addinterview">
          <button>Add Interview</button>
        </Link>
      </div>
    </div>
  );
};

export default InterviewList;

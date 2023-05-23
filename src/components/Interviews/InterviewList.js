import axios from "axios";
import React, { useEffect, useState } from "react";

const InterviewList = () => {
  const [interviews, setInterviews] = useState([]);

  useEffect(() => {
    fetchInterviews();
  }, []);

  const fetchInterviews = async () => {
    try {
      const response = await axios.get("http://localhost:8000/home/interviews");
      setInterviews(response.data.interviews);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Interview List</h1>
      <ul>
        {interviews.map((interview) => (
          <li key={interview._id}>
            <p>Company: {interview.company}</p>
            <p>Date of Visit: {interview.date_of_visit}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InterviewList;

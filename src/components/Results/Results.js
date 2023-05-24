import React, { useState, useEffect } from "react";
import axios from "axios";
import { saveAs } from "file-saver";
import "./Results.css"; // Import the CSS file

const Results = () => {
  const [interviews, setInterviews] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedInterview, setSelectedInterview] = useState("");
  const [selectedStudent, setSelectedStudent] = useState("");

  // Fetch interviews and students when component mounts
  useEffect(() => {
    fetchInterviews();
    fetchStudents();
  }, []);

  const fetchInterviews = () => {
    axios
      .get("http://localhost:8000/home/interviews")
      .then((response) => {
        setInterviews(response.data.interviews);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const fetchStudents = () => {
    axios
      .get("http://localhost:8000/home/students")
      .then((response) => {
        setStudents(response.data.students);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const addStudentToInterview = () => {
    axios
      .post("http://localhost:8000/home/interview/addStudent", {
        interviewId: selectedInterview,
        studentId: selectedStudent,
      })
      .then((response) => {
        console.log(response.data);
        // Update interviews and students after adding student
        fetchInterviews();
        fetchStudents();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const removeStudentFromInterview = () => {
    axios
      .post("http://localhost:8000/home/interview/removeStudent", {
        interviewId: selectedInterview,
        studentId: selectedStudent,
      })
      .then((response) => {
        console.log(response.data);
        // Update interviews and students after removing student
        fetchInterviews();
        fetchStudents();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const downloadResults = () => {
    axios
      .get("http://localhost:8000/home/downloadCSV", { responseType: "blob" })
      .then((response) => {
        const blob = new Blob([response.data], { type: "text/csv" });
        saveAs(blob, "results.csv");
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data);
        } else {
          console.log("Error", error.message);
        }
      });
  };

  return (
    <div className="results-container">
      <div className="results-list">
        <hr></hr>
        <h2>Interviews</h2>
        {interviews.map((interview) => (
          <div key={interview._id}>
            <h3>{interview.company}</h3>
            <p>Date of Visit: {interview.date_of_visit}</p>
            <h4>Eligible Students:</h4>
            {interview.eligibleStudents.length > 0 ? (
              <ul>
                {interview.eligibleStudents.map((studentId) => {
                  const student = students.find(
                    (student) => student._id === studentId
                  );
                  return <li key={student._id}>{student.name}</li>;
                })}
              </ul>
            ) : (
              <p>No eligible students for this interview</p>
            )}
            <hr></hr>
          </div>
        ))}
        <h2>Add or Remove Student</h2>
        <select onChange={(e) => setSelectedInterview(e.target.value)}>
          <option>Select Interview</option>
          {interviews.map((interview) => (
            <option key={interview._id} value={interview._id}>
              {interview.company}
            </option>
          ))}
        </select>
        <select onChange={(e) => setSelectedStudent(e.target.value)}>
          <option>Select Student</option>
          {students.map((student) => (
            <option key={student._id} value={student._id}>
              {student.name}
            </option>
          ))}
        </select>
        <button onClick={addStudentToInterview}>Add Student</button>
        <button onClick={removeStudentFromInterview}>Remove Student</button>
        <button onClick={downloadResults}>Download Results</button>
      </div>
    </div>
  );
};

export default Results;

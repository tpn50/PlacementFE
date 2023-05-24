import React, { useState, useEffect } from "react";
import axios from "axios";
import { saveAs } from "file-saver";
import "./Results.css";
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

  const fetchStudents = async () => {
    try {
      const response = await axios.get(
        "https://placementbackend.onrender.com/home/students"
      );
      setStudents(response.data.students);
    } catch (error) {
      console.log(error);
    }
  };

  const addStudentToInterview = () => {
    axios
      .post("https://placementbackend.onrender.com/interview/addStudent", {
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
      .post(
        "https://placementbackend.onrender.com/home/interview/removeStudent",
        {
          interviewId: selectedInterview,
          studentId: selectedStudent,
        }
      )
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
      .get("https://placementbackend.onrender.com/home/downloadCSV", {
        responseType: "blob",
      })
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
    <div className="results">
      <h2 className="results__title">Interviews</h2>
      {interviews.map((interview) => (
        <div key={interview._id} className="results__interview">
          <h3 className="results__company">{interview.company}</h3>
          <p className="results__date">
            Date of Visit: {interview.date_of_visit}
          </p>
          <h4 className="results__eligible-title">Eligible Students:</h4>
          {interview.eligibleStudents.length > 0 ? (
            <ul className="results__students">
              {interview.eligibleStudents.map((studentId) => {
                const student = students.find(
                  (student) => student._id === studentId
                );
                return student ? (
                  <li key={student._id} className="results__student">
                    {student.name}
                  </li>
                ) : null;
              })}
            </ul>
          ) : (
            <p className="results__no-students">
              No eligible students for this interview
            </p>
          )}
        </div>
      ))}

      <h2 className="results__action-title">Add or Remove Student</h2>
      <div className="results__form">
        <select
          onChange={(e) => setSelectedInterview(e.target.value)}
          className="results__select"
        >
          <option>Select Interview</option>
          {interviews.map((interview) => (
            <option key={interview._id} value={interview._id}>
              {interview.company}
            </option>
          ))}
        </select>

        <select
          onChange={(e) => setSelectedStudent(e.target.value)}
          className="results__select"
        >
          <option>Select Student</option>
          {students.map((student) => (
            <option key={student._id} value={student._id}>
              {student.name}
            </option>
          ))}
        </select>

        <div className="results__button-group">
          <button onClick={addStudentToInterview} className="results__button">
            Add Student
          </button>
          <button
            onClick={removeStudentFromInterview}
            className="results__button"
          >
            Remove Student
          </button>
        </div>
      </div>

      <button onClick={downloadResults} className="results__download">
        Download Results
      </button>
    </div>
  );
};

export default Results;

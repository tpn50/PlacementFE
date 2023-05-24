import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./StudentList.css"; // Import the CSS file

const StudentList = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, []);

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

  return (
    <div className="student-list-container">
      <h1>Student List</h1>
      <ul className="student-list">
        {students.map((student) => (
          <li key={student._id} className="student-item">
            <p>
              <strong>Name:</strong> {student.name}
            </p>
            <p>
              <strong>Email:</strong> {student.email}
            </p>
            <p>
              <strong>College:</strong> {student.college}
            </p>
            <p>
              <strong>Status:</strong> {student.status}
            </p>
          </li>
        ))}
      </ul>
      <Link to="/addstudent">
        <button>Add Student</button>
      </Link>
    </div>
  );
};

export default StudentList;

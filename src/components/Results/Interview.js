// Interview.js
import React from "react";

const Interview = ({
  interview,
  students,
  addStudentToEligibility,
  removeStudentFromEligibility,
}) => {
  return (
    <div>
      <h2>{interview.company}</h2>
      <p>{interview.date_of_visit}</p>
      {interview.eligibleStudents.map((student) => (
        <div key={student._id}>
          <p>{student.name}</p>
          <button
            onClick={() =>
              removeStudentFromEligibility(student._id, interview._id)
            }
          >
            Remove from eligibility
          </button>
        </div>
      ))}
      {students.map((student) => (
        <div key={student._id}>
          <p>{student.name}</p>
          <button
            onClick={() => addStudentToEligibility(student._id, interview._id)}
          >
            Add to eligibility
          </button>
        </div>
      ))}
    </div>
  );
};

export default Interview;

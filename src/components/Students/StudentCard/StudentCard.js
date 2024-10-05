import React from 'react';
import './StudentCard.css';

const StudentCard = ({ student, onUpdate, onDelete }) => {
  return (
    <div className="student-card">
      <div className='ic1'>
      <img src={`http://localhost:5000/uploads/${student.photoFile}`} alt={`${student.firstName} ${student.lastName}`} />
      </div>
      <h3>{student.firstName} {student.lastName}</h3>
      <p>Guardian: {student.parentName}</p>
      <p>Previous School: {student.previousSchool}</p>
      <p>Previous Class: {student.previousClass}</p>
      <p>Present Class: {student.presentClass}</p>
      <p>Term 1: {student.term1}</p>
      <p>Term 2: {student.term2}</p>
      <p>Term 3: {student.term3}</p>
      <div className='bc1'>
      <button onClick={() => onUpdate(student)}>Edit</button>
      <button onClick={() => onDelete(student._id)}>Delete</button>
      </div>
    </div>
  );
};

export default StudentCard;

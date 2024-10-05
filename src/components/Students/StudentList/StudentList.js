import React from 'react';
import StudentCard from '../StudentCard/StudentCard';
import './StudentList.css';

const StudentList = ({ students, onUpdate, onDelete }) => {
  return (
    <div className="student-list">
      {students.map((student) => (
        <StudentCard key={student._id} student={student} onUpdate={onUpdate} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default StudentList;

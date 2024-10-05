import React, { useEffect, useState } from 'react';
import axios from 'axios';
import StudentForm from '../StudentForm/StudentForm';
import StudentList from '../StudentList/StudentList';
import './Student.css'
import Header from '../../Header/Header';

const Student = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchStudents = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get("http://localhost:5000/students");
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students", error);
      setError("Failed to fetch students.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = (student) => {
    setSelectedStudent(student);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/students/${id}`);
      fetchStudents();
    } catch (error) {
      console.error("Error deleting student", error);
      setError("Failed to delete student.");
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="app-container">
      <Header/>
      <h1>Student Management System</h1>
      <div className='c2'>
      <StudentForm selectedStudent={selectedStudent} fetchStudents={fetchStudents} />
      <div className='c3'>
      {loading && <p>Loading students...</p>}
      {error && <p className="error-message">{error}</p>}
      <StudentList students={students} onUpdate={handleUpdate} onDelete={handleDelete} />
      </div>
      </div>
    </div>
  );
};

export default Student;

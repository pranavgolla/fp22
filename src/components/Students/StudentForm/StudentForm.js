import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './StudentForm.css';

const StudentForm = ({ selectedStudent, fetchStudents }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [parentName, setParentName] = useState("");
  const [previousSchool, setPreviousSchool] = useState("");
  const [previousClass, setPreviousClass] = useState("");
  const [presentClass, setPresentClass] = useState("");
  const [term1, setTerm1] = useState("");
  const [term2, setTerm2] = useState("");
  const [term3, setTerm3] = useState("");
  const [password, setPassword] = useState("");
  const [photoFile, setPhotoFile] = useState(null);

  useEffect(() => {
    if (selectedStudent) {
      setFirstName(selectedStudent.firstName);
      setLastName(selectedStudent.lastName);
      setParentName(selectedStudent.parentName);
      setPreviousSchool(selectedStudent.previousSchool);
      setPreviousClass(selectedStudent.previousClass);
      setPresentClass(selectedStudent.presentClass);
      setTerm1(selectedStudent.term1);
      setTerm2(selectedStudent.term2);
      setTerm3(selectedStudent.term3);
      setPassword("");
      setPhotoFile(null);
    }
  }, [selectedStudent]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("parentName", parentName);
    formData.append("previousSchool", previousSchool);
    formData.append("previousClass", previousClass);
    formData.append("presentClass", presentClass);
    formData.append("term1", term1);
    formData.append("term2", term2);
    formData.append("term3", term3);
    formData.append("password", password);
    formData.append("role","Student")
    if (photoFile) {
      formData.append("photoFile", photoFile);
    }

    try {
      if (selectedStudent) {
        await axios.put(`http://localhost:5000/students/${selectedStudent._id}`, formData);
      } else {
        await axios.post("http://localhost:5000/students", formData);
      }
      fetchStudents();
      resetForm();
    } catch (error) {
      console.error("Error saving student", error);
    }
  };

  const resetForm = () => {
    setFirstName("");
    setLastName("");
    setParentName("");
    setPreviousSchool("");
    setPreviousClass("");
    setPresentClass("");
    setTerm1("");
    setTerm2("");
    setTerm3("");
    setPassword("");
    setPhotoFile(null);
  };

  return (
    <form onSubmit={handleSubmit} className="student-form">
      <input
        type="text"
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Parent/Guardian Name"
        value={parentName}
        onChange={(e) => setParentName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Previous School"
        value={previousSchool}
        onChange={(e) => setPreviousSchool(e.target.value)}
      />
      <input
        type="text"
        placeholder="Previous Class"
        value={previousClass}
        onChange={(e) => setPreviousClass(e.target.value)}
      />
      <input
        type="text"
        placeholder="Present Class"
        value={presentClass}
        onChange={(e) => setPresentClass(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Term 1"
        value={term1}
        onChange={(e) => setTerm1(e.target.value)}
      />
      <input
        type="number"
        placeholder="Term 2"
        value={term2}
        onChange={(e) => setTerm2(e.target.value)}
      />
      <input
        type="number"
        placeholder="Term 3"
        value={term3}
        onChange={(e) => setTerm3(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setPhotoFile(e.target.files[0])}
      />
      <button type="submit">{selectedStudent ? "Update Student" : "Add Student"}</button>
      <button type="button" onClick={resetForm}>Reset</button>
    </form>
  );
};

export default StudentForm;

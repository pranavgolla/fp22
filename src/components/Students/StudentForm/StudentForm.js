import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './StudentForm.css';

const StudentForm = ({ selectedStudent, fetchStudents }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [parentName, setParentName] = useState("");
  const [mothername, setMotherName]=useState("");
  const [previousSchool, setPreviousSchool] = useState("");
  const [previousClass, setPreviousClass] = useState("");
  const [presentClass, setPresentClass] = useState("");
  const [term1, setTerm1] = useState("");
  const [term2, setTerm2] = useState("");
  const [term3, setTerm3] = useState("");
  const [email,setEmail]=useState("");
  const [password, setPassword] = useState("");
  const [photoFile, setPhotoFile] = useState(null);

  useEffect(() => {
    if (selectedStudent) {
      setFirstName(selectedStudent.firstName);
      setLastName(selectedStudent.lastName);
      setParentName(selectedStudent.parentName);
      setMotherName(selectedStudent.mothername);
      setPreviousSchool(selectedStudent.previousSchool);
      setPreviousClass(selectedStudent.previousClass);
      setPresentClass(selectedStudent.presentClass);
      setTerm1(selectedStudent.term1);
      setTerm2(selectedStudent.term2);
      setTerm3(selectedStudent.term3);
      setEmail(selectedStudent.email);
      setPassword("");
      setPhotoFile(null);
    }
  }, [selectedStudent]);



  const [file, setFile] = useState(null);
  // const [userId, setUserId] = useState('');
  const [uploadStatus, setUploadStatus] = useState('');

  const handleFileChange = (e) => {
      setFile(e.target.files[0]);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("parentName", parentName);
    formData.append("motherName", mothername);
    formData.append("previousSchool", previousSchool);
    formData.append("previousClass", previousClass);
    formData.append("presentClass", presentClass);
    formData.append("term1", term1);
    formData.append("term2", term2);
    formData.append("term3", term3);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("role", "Student");
    if (photoFile) formData.append("photoFile", photoFile);
  
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
  
    // Aadhaar file upload logic
    const formDataa = new FormData();
    formDataa.append('aadhaarFile', file);
  
    try {
      const response = await axios.post('http://localhost:5000/uploada', formDataa, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setUploadStatus(response.data.message);
    } catch (error) {
      console.error('Error uploading Aadhaar:', error);
      setUploadStatus('Error uploading Aadhaar');
    }
  };
  

  const resetForm = () => {
    setFirstName("");
    setLastName("");
    setParentName("");
    setMotherName("")
    setPreviousSchool("");
    setPreviousClass("");
    setPresentClass("");
    setTerm1("");
    setTerm2("");
    setTerm3("");
    setEmail("");
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
        placeholder="Father Name"
        value={parentName}
        onChange={(e) => setParentName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Mother Name"
        value={mothername}
        onChange={(e) => setMotherName(e.target.value)}
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
        disabled
      />
      <input
        type="number"
        placeholder="Term 3"
        value={term3}
        onChange={(e) => setTerm3(e.target.value)}
        disabled
      />
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <h4 style={{textAlign:'left'}}>Upload Passport Size photo</h4>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setPhotoFile(e.target.files[0])}
      />
      
            <h4 style={{textAlign:'left'}}>Upload Aadhaar</h4>
           
                <input type="file" onChange={handleFileChange} required />
           
            {uploadStatus && <p>{uploadStatus}</p>}
        
      <button type="submit">{selectedStudent ? "Update Student" : "Add Student"}</button>
      <button type="button" onClick={resetForm}>Reset</button>
    </form>
  );
};

export default StudentForm;

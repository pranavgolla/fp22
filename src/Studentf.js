import React, { useState } from "react";
import axios from "axios"; // for making HTTP requests

const FormComponent = () => {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    parentName: "",
    previousSchool: "",
    previousClass: "",
    presentClass: "",
    term1: "",
    term2: "",
    term3: "",
    password: "", // New password field
  });

  const [photoFile, setPhotoFile] = useState(null);
  const [viewFormat, setViewFormat] = useState("grid");

  const handleViewChange = (format) => {
    setViewFormat(format);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setPhotoFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }
    if (photoFile) data.append("photoFile", photoFile);

    try {
      const response = await axios.post("http://localhost:5000/students", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert(response.data.message);
      fetchStudents(); // fetch updated students after submission
    } catch (error) {
      console.error("There was an error submitting the form!", error);
    }
  };

  const fetchStudents = async () => {
    try {
      const response = await axios.get("http://localhost:5000/students");
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students", error);
    }
  };

  // Fetch students when component mounts
  React.useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div style={containerStyle}>
      <div style={{ width: "40%", padding: "10px" }}>
        <h3>Add Student</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First Name"
            required
            style={inputStyle}
          />
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            required
            style={inputStyle}
          />
          <input
            type="text"
            name="parentName"
            value={formData.parentName}
            onChange={handleChange}
            placeholder="Parent/Guardian Name"
            required
            style={inputStyle}
          />
          <input
            type="text"
            name="previousSchool"
            value={formData.previousSchool}
            onChange={handleChange}
            placeholder="Previous School"
            required
            style={inputStyle}
          />
          <input
            type="text"
            name="previousClass"
            value={formData.previousClass}
            onChange={handleChange}
            placeholder="Previous Class"
            required
            style={inputStyle}
          />
          <input
            type="text"
            name="presentClass"
            value={formData.presentClass}
            onChange={handleChange}
            placeholder="Present Class"
            required
            style={inputStyle}
          />
          <input
            type="number"
            name="term1"
            value={formData.term1}
            onChange={handleChange}
            placeholder="Fees Term 1"
            style={inputStyle}
          />
          <input
            type="number"
            name="term2"
            value={formData.term2}
            onChange={handleChange}
            placeholder="Fees Term 2"
            style={inputStyle}
          />
          <input
            type="number"
            name="term3"
            value={formData.term3}
            onChange={handleChange}
            placeholder="Fees Term 3"
            style={inputStyle}
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
            style={inputStyle}
          />
          <div style={dragDropStyles}>
            <label>
              Upload Photo
              <input type="file" name="photoFile" onChange={handleFileChange} />
            </label>
          </div>
          <button type="submit" style={buttonStyle}>
            Submit
          </button>
        </form>
      </div>

      {/* Student List Section */}
      <div style={{ width: "60%", padding: "10px" }}>
        <h3>Student List</h3>
        <div style={viewButtonStyle}>
          <button onClick={() => handleViewChange("grid")}>Grid View</button>
          <button onClick={() => handleViewChange("list")}>List View</button>
        </div>
        <div style={viewFormat === "grid" ? gridViewStyle : listViewStyle}>
          {students.map((student) => (
            <div key={student._id} style={studentCardStyle}>
              <p>
                Name: {student.firstName} {student.lastName}
              </p>
              <p>Parent: {student.parentName}</p>
              <p>Previous School: {student.previousSchool}</p>
              <p>Present Class: {student.presentClass}</p>
              <p>Term 1 Fees: {student.term1}</p>
              <p>Term 2 Fees: {student.term2}</p>
              <p>Term 3 Fees: {student.term3}</p>
              <p>Password: {student.password}</p> {/* Display password */}
              {student.photoFile && (
                <img
                  src={`http://localhost:5000/uploads/${student.photoFile}`}
                  alt="Student"
                  style={imageStyle}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Styling (for better layout)
const containerStyle = { display: "flex" };
const inputStyle = { display: "block", margin: "10px 0", padding: "5px" };
const buttonStyle = { padding: "10px 20px", margin: "10px 0" };
const dragDropStyles = { margin: "10px 0", padding: "10px", border: "1px solid #ddd" };
const gridViewStyle = { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px" };
const listViewStyle = { display: "block" };
const studentCardStyle = { border: "1px solid #ddd", padding: "10px", marginBottom: "10px" };
const imageStyle = { width: "100px", height: "100px", objectFit: "cover" };
const viewButtonStyle = { marginBottom: "10px" };

export default FormComponent;

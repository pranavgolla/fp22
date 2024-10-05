import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate for routing
import './AdminRegistration.css'; // Import CSS for styling

const AdminRegistration = () => {
  const [adminData, setAdminData] = useState({
    name: "",
    email: "",
    password: "",
    role: "Admin", // Default value set to "Admin"
  });

  const navigate = useNavigate(); // Hook to navigate to different routes

  const handleChange = (e) => {
    setAdminData({
      ...adminData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/register",
        adminData
      );
      console.log("Registration successful:", response.data);
      // Optionally, navigate to the login page after successful registration
      navigate('/login');
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  return (
    <div className="registration-container">
      <h2>Admin Registration</h2>
      <form onSubmit={handleSubmit} className="registration-form">
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={adminData.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={adminData.email}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={adminData.password}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Role:
          <select
            name="role"
            value={adminData.role} // "Admin" is selected by default
            onChange={handleChange} // Update the state when selection changes
            required
            disabled
          >
            <option value="Admin">Admin</option>
            <option value="Teacher">Teacher</option>
            <option value="Class Teacher">Class Teacher</option>
            <option value="Parent">Parent</option>
            <option value="Student">Student</option>
          </select>
        </label>
        <button type="submit" className="register-button">Register</button>
      </form>
      <button className="login-button" onClick={() => navigate('/login')}>Go to Login</button>
    </div>
  );
};

export default AdminRegistration;

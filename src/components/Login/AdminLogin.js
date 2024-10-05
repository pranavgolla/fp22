import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';  // Import js-cookie library
import './AdminLogin.css'; // Import the CSS file

const AdminLogin = () => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    role: 'Admin',
  });
  const navigate = useNavigate(); // Hook to navigate after login

  useEffect(() => {
    // Check if the token is present in either localStorage or cookies
    const token = localStorage.getItem('token') || Cookies.get('token');

    // If the token is not found, redirect to login
    if (!token) {
      navigate('/login');
    } else {
      navigate('/students');
    }
  }, [navigate]);

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/login', loginData);
      console.log('Login successful:', response.data);

      // Assuming the response contains the JWT token
      const token = response.data.token;

      // Set the JWT token in localStorage
      localStorage.setItem('token', token);

      // Set the JWT token in cookies
      Cookies.set('token', token, { expires: 7, secure: true, sameSite: 'strict' });  // Expires in 7 days

      // Redirect to the home page
      navigate('/students');
    } catch (error) {
      console.error('Login error:', error);
      setError('Invalid credentials');
    }
  };

  return (
    <div className="login-container">
      <h2>Admin Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={loginData.email}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={loginData.password}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Role:
          <select name="role" value={loginData.role} onChange={handleChange}>
            <option value="Admin">Admin</option>
            <option value="Teacher">Teacher</option>
            <option value="Class Teacher">Class Teacher</option>
            <option value="Parent">Parent</option>
            <option value="Student">Student</option>
          </select>
        </label>
        <br />
        <button type="submit" className="login-button">Login</button>
        <button type="button" className="register-button" onClick={() => navigate('/register')}>Go to Register</button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default AdminLogin;

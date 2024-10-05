import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Header from '../Header/Header';

const Home = () => {
  const navigate = useNavigate();
   
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    // padding: "20px",
    backgroundColor: "#F9F9F9",
    minHeight: "100vh",
    margin:"0px",
    boxSizing: "border-box",
  };

  useEffect(() => {
    // Check if the token is present in either localStorage or cookies
    const token = localStorage.getItem('token') || Cookies.get('token');

    // If the token is not found, redirect to login
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  // Logout function to clear cookies and localStorage
  // const handleLogout = () => {
  //   // Remove token from localStorage
  //   localStorage.removeItem('token');
  //   // Remove token from cookies
  //   Cookies.remove('token');
  //   // Redirect to login page
  //   navigate('/login');
  

  return (
    // <div>
    //   <h1>Welcome to the Admin Dashboard</h1>
    //   <p>This is the home page that you can see after a successful login.</p>

    //   {/* Add additional content and features for the Admin Dashboard */}
    //   {/* <button onClick={handleLogout}>Logout</button> */}
    // </div>
    <div style={containerStyle}>
    <Header/>
    {/* <ProductForm /> */}
  </div>
  );
};

export default Home;

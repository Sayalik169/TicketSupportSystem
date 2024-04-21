import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, fetchTickets } from '../actions/auth'; // Assuming actions for login and fetching tickets
import { useNavigate } from 'react-router-dom';

import '../styles/userlogin.css';
const EndUserLogin = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const credentials = {
      name: name,
      password: password,
    };

    try {
      const response = await fetch('https://localhost:7198/api/Student_API/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      //   const data = await response.json();
      //   alert('Login success');
      //   dispatch(loginUser(data));  // Dispatch login success action
      //  console.log('Login sucess data- ',data);
      //   navigate('/end-user/dashboard'); // Redirect to dashboard on success

      const data = await response.json(); // Assuming response is JSON
      const headers = response.headers; // Access headers after consuming body
      
      console.log('login data', data);
      console.log('login header', headers.get('Authorization'));
      
      //const authorizationHeader = data.get('username');
     
      if (data != null) {
        dispatch(loginUser(data)); // Admin login - dispatch action and redirect
        console.log('Admin Login successful!', data);
        navigate('/admin/dashboard'); // Redirect to admin dashboard
      }
      else {
        dispatch(loginUser(data)); // Regular user login - dispatch action and redirect
        console.log('Login successful!', data);
        navigate('/end-user/dashboard'); // Redirect to user dashboard
      }
    } catch (error) {
      console.error('Login error:', error);
      // Display error message (optional)
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  // try {
  //   const response = await fetch('https://localhost:7198/api/Student_API/login', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ name, password }),
  //   });

  //   if (response.ok) {
  //     const data = await response.json();
  //     dispatch(loginUser(data)); // Assuming data contains user information
  //     alert("Login successful!");
  //     console.log('Login successful!', data);
  //     navigate('/end-user/dashboard'); // Navigate to dashboard after success




  //   } else {
  //     alert("Error logging in");
  //     throw new Error(`Login failed: ${response.statusText}`);
  //   }
  // } catch (error) {
  //   console.error('Login error:', error);
  //   // Set registerError state with an informative error message (if using Redux)
  // }

  //   dispatch(loginUser({ name, password }));
  // };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>End User Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder="Enter username"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default EndUserLogin;

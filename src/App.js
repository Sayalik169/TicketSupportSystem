// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store'; // Assuming your Redux store
import EndUserLogin from './components/EndUserLogin';
import EndUserRegister from './components/EndUserRegister';
import EndUserDashboard from './components/EndUserDashboard';
import TechSupportDashboard from './components/TechSupportDashboard';
import AdminDashboard from './components/AdminDashboard';
import PrivateRoute from './components/PrivateRoute'; // Assuming this is your private route component (updated for v6)
import CreateTicketForm from './components/CreateTicketForm';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  //const navigate = useNavigate(); 
  const handleLoginSuccess = () => {
    // Perform actions on successful login (e.g., update Redux store)
    //navigate('/end-user/dashboard'); // Redirect to dashboard on success
  };

  const handleError = (error) => {
    // Optional centralized error handling (e.g., display a global error message)
    console.error('Login error:', error);
  };

  return (
    <Provider store={store}>
      <Router>
        <Routes>
        <Route path="/" element={<AdminDashboard />} />
          <Route
            exact
            path="/end-user/login"
            element={<EndUserLogin onLoginSuccess={handleLoginSuccess} handleError={handleError} />}
          />
          <Route exact path="/end-user/register" element={<EndUserRegister />} />
          <>
          <Route exact path="/end-user/dashboard" element={<EndUserDashboard />} />
          <Route exact path="/end-user/create-ticket" element={<CreateTicketForm />} />
          
          <Route exact path="/tech-support/dashboard" element={<TechSupportDashboard />} />
          <Route exact path="/admin/dashboard" element={<AdminDashboard />} />
        </>
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;

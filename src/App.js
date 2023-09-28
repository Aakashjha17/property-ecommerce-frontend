import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import Login from './pages/Login'
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/login/PrivateRoute';
import UserDetails from './pages/UserDetails';
import PropertyForm from './pages/AddProperty';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/user" element={<PrivateRoute />}>
          <Route path="/user" element={<UserDetails />} />
        </Route>
        <Route path="/add-property" element={<PrivateRoute />}>
          <Route path="/add-property" element={<PropertyForm />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;

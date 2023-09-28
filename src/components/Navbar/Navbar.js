import React, { useContext } from 'react';
import './navbar.css';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext'; // Make sure to import your UserContext from the correct path

const Navbar = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(UserContext);

  const handleLogout = () => {
    // Perform logout logic here, e.g., clear user credentials, update context, etc.
    dispatch({ type: 'USER_LOGOUT' });
    // Redirect to the home page or another appropriate route after logout
    navigate('/');
  };

  return (
    <div>
      <div className='navbar'>
        <div className='logo'>
          <h1 className=''>Rental</h1>
          <p className='home' onClick={() => navigate('/')}>Home</p>
          <p className='add' onClick={() => navigate('/user')}>My Property</p>
        </div>
        <div className='buttons'>
          {state.userInfo ? (
            <button className='login' onClick={handleLogout}>Logout</button>
          ) : (
            <>
              <button className='login' onClick={() => navigate('/login')}>Login</button>
              <button className='signup' onClick={() => navigate('/signup')}>Signup</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
// import React, { useContext, useEffect } from 'react';
// import { Route, Routes, useNavigate } from 'react-router-dom';
// import { UserContext } from '../../context/UserContext';

// const PrivateRoute = ({ children, ...rest }) => {
//   const { state } = useContext(UserContext);
//   const { userInfo } = state;
//   const navigate = useNavigate();
//   console.log(rest);
//   useEffect(() => {
//     if (!userInfo?.email) {
//       // If there's no logged-in user, navigate to the "/login" route.
//       navigate('/login', { state: { from: rest.location } });
//     }
//   }, [userInfo, navigate, rest.location]);

//   return ( <Routes><Route {...rest} element={children} /> </Routes> );
// };

// export default PrivateRoute;

import React, { useContext, useEffect } from 'react';
import { Outlet, Route, useNavigate } from 'react-router-dom'; // Import Outlet
import { UserContext } from '../../context/UserContext';

const PrivateRoute = () => {
  const { state } = useContext(UserContext);
  const { userInfo } = state;
  const navigate = useNavigate();
  const { email, token } = userInfo?.UserData || {};

  useEffect(() => {
    if (!email) {
      // If there's no logged-in user, navigate to the "/login" route.
      navigate('/login');
    }
  }, [email, token, navigate]);

  return (
    <div>
      {/* Your PrivateRoute component content */}
      <Outlet /> {/* Render child routes */}
    </div>
  );
};

export default PrivateRoute;
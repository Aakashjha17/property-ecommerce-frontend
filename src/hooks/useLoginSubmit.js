import Cookies from 'js-cookie';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import UserServices from '../services/User-Services';
import { notifyError, notifySuccess } from '../utils/toast';

const useLoginSubmit = () => {
  const [loading, setLoading] = useState(false);
  const { dispatch } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = ({ name,email, password,password_confirmation }) => {

    setLoading(true);
    const cookieTimeOut = 0.5;

    if (location.pathname === '/login') {
      UserServices.loginUser({ email, password })
        .then((res) => {
          if (res) {
            setLoading(false);
            notifySuccess('Login Success!');
            dispatch({ type: 'USER_LOGIN', payload: res });
            Cookies.set('userInfo', JSON.stringify(res), {
              expires: cookieTimeOut,
            });
            navigate('/');
          }
        })
        .catch((err) => {
          notifyError(err ? err.response.data.message : err.message);
          setLoading(false);
        });
    }

    if (location.pathname === '/signup') {
      UserServices.registerUser({ name, email, password,password_confirmation })
        .then((res) => {
          if (res) {
            setLoading(false);
            notifySuccess('Register Success!');
            dispatch({ type: 'USER_LOGIN', payload: res });
            Cookies.set('userInfo', JSON.stringify(res), {
              expires: cookieTimeOut,
            });
            navigate('/');
          }
        })
        .catch((err) => {
          notifyError(err ? err.response.data.message : err.message);
          setLoading(false);
        });
    }
  };
  return {
    onSubmit,
    register,
    handleSubmit,
    errors,
    loading,
  };
};

export default useLoginSubmit;
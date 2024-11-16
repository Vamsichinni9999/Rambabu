import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const URL='http://localhost:3000/'
  const [user, setUser] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState(''); // State to hold error message
  const navigate = useNavigate();

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const loginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${URL}user/login`, user);
      console.log(response.data);

      // Store tokens and role in local storage
      localStorage.setItem('accesstoken', response.data.accesstoken);
      localStorage.setItem('refreshtoken', response.data.refreshtoken);
      localStorage.setItem('userRole', response.data.user.role); // Store role correctly

      navigate('/'); // Redirect to home page after successful login
    } catch (err) {
      setError('Login failed. Please check your credentials.'); // Set error message
      console.error(err);
    }
  };

  return (
    <div className='login-page'>
      <form className='log' onSubmit={loginSubmit}>
      <img className='regimg' src='img1.jpg'/>
        <input
          type='email'
          name='email'
          placeholder='Email'
          value={user.email}
          onChange={onChangeInput}
          required
        />
        <input
          type='password'
          name='password'
          placeholder='Password'
          value={user.password}
          onChange={onChangeInput}
          required
        />
        <button type='submit'>Login</button>
        {error && <div className='error-message'>{error}</div>} {/* Display error message */}
        <Link className='Link' to='/register'>Don't have an account? Register</Link>
      </form>
    </div>
  );
};

export default Login;

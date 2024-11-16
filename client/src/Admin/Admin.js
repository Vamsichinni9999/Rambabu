import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const URL='http://localhost:3000/'
  const [user, setUser] = useState({
    email: '',
    password: ''
  });
  const navigate=useNavigate()
  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const loginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${URL}user/login`, user);
      console.log(response.data);
      localStorage.setItem('accesstoken', response.data.accesstoken);
      localStorage.setItem('refreshtoken', response.data.refreshtoken);
      localStorage.setItem('userRole', response.data.user.role);
      navigate('/AddProduct');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className='admin-page'>
      <form className='admin' onSubmit={loginSubmit}>
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
      </form>
    </div>
  );
};

export default Admin;

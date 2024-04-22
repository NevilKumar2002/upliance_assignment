import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './style.css';

const LoginPage = ({ setShowLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = e => {
    e.preventDefault();
    console.log('Entered email:', email);

    // Retrieve user data using entered email
    const userData = JSON.parse(localStorage.getItem('userData')) || [];
    const user = userData.find(user => user.email === email);

    console.log('Retrieved user data:', user);

    if (user && user.password === password) {
      toast.success('Login Successful!');
      // Reset form fields
      setEmail('');
      setPassword('');
    } else {
      toast.error('Invalid email or password');
    }
  };

  return (
    <div className="login-container">
      <ToastContainer toastStyle={{
        fontSize: '16px',
        fontFamily: 'Arial, sans-serif',
        borderRadius: '8px',
      }} />
    
      <form onSubmit={handleLogin}>
      <h2 style={{textAlign:'center', color:'pink',textDecoration:'underline'}}>Login Page</h2>
        <div className='name-input-div'>
          <label>Email:</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        </div>
        <div className='name-input-div'>
          <label>Password:</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        </div>
        <button type="submit" className='btn'>Login</button>
        <p>Don't have an Account? <span onClick={() => setShowLogin(false)}>Register</span></p>
      </form>
    </div>
  );
};

export default LoginPage;

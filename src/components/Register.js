import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './style.css';
import { v4 as uuidv4 } from 'uuid';

const RegisterPage = ({ setShowLogin }) => {
  const [userData, setUserData] = useState({
    name: '',
    address: '',
    email: '',
    phone: '',
    password: ''
  });

  const [unsavedChanges, setUnsavedChanges] = useState(false);

  useEffect(() => {
    const handleWindowClose = (event) => {
      if (unsavedChanges) {
        event.preventDefault();
        event.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleWindowClose);

    return () => {
      window.removeEventListener('beforeunload', handleWindowClose);
    };
  }, [unsavedChanges]);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setUserData(prevData => ({
      ...prevData,
      [name]: value
    }));
    setUnsavedChanges(true);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const existingUsers = JSON.parse(localStorage.getItem('userData')) || [];
    const userExists = existingUsers.some(user => user.email === userData.email);
    
    if (userExists) {
      toast.error('User already exists!');
      return;
    }

    const userId = uuidv4(); // Generate unique user ID
    const userDataWithId = { ...userData, id: userId };
    saveUserDataToLocalStorage(userDataWithId); // Save data to local storage
    alert('User with id ' + userId );
    toast.success('Registration Successful!'); // Show success message
    setUserData({ // Reset form fields
      name: '',
      address: '',
      email: '',
      phone: '',
      password: ''
    });
    setUnsavedChanges(false);
  };
  
  const saveUserDataToLocalStorage = data => {
    const existingData = JSON.parse(localStorage.getItem('userData')) || [];
    const updatedData = [...existingData, data];
    localStorage.setItem('userData', JSON.stringify(updatedData));
  };

  return (
    <div className="register-container">
      <ToastContainer toastStyle={{
        fontSize: '16px',
        fontFamily: 'Arial, sans-serif',
        borderRadius: '8px',
      }} />
     
      <form onSubmit={handleSubmit}>
      <h2 style={{textAlign:'center', color:'pink',textDecoration:'underline'}}>Registration Form</h2>
        <div className='name-input-div'>
          <label>Name:</label>
          <input type="text" name="name" value={userData.name} onChange={handleInputChange} required />
        </div>
       
        <div className='name-input-div'>
          <label>Email:</label>
          <input type="email" name="email" value={userData.email} onChange={handleInputChange} required />
        </div>
        <div className='name-input-div'>
          <label>Phone:</label>
          <input type="tel" name="phone" value={userData.phone} onChange={handleInputChange} required />
        </div>
        <div className='name-input-div'>
          <label>Password:</label>
          <input type="password" name="password" value={userData.password} onChange={handleInputChange} required />
        </div>
        <div className='name-input-div'>
          <label>Address:</label>
          <input type="text" name="address" value={userData.address} onChange={handleInputChange} required />
        </div>
        <button type="submit" className='btn'>Register</button>
        <p>Already have an Account? <span onClick={() => setShowLogin(true)}>Login</span></p>
      </form>
    </div>
  );
};

export default RegisterPage;

// import React, { useState } from 'react';
// import { v4 as uuidv4 } from 'uuid';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import './style.css';

// const RegisterPage = ({ setShowLogin }) => {
//   const [userData, setUserData] = useState({
//     name: '',
//     address: '',
//     email: '',
//     phone: '',
//     password: ''
//   });

//   const handleInputChange = e => {
//     const { name, value } = e.target;
//     setUserData(prevData => ({
//       ...prevData,
//       [name]: value
//     }));
//   };

//   const handleSubmit = e => {
//     e.preventDefault();
//     const userId = uuidv4(); // Generate unique user ID
//     const userDataWithId = { ...userData, id: userId };
//     console.log('User data to be saved:', userDataWithId);
//     saveUserDataToLocalStorage(userDataWithId); // Save data to local storage
//     toast.success('Registration Successful!'); // Show success message
//     setUserData({ // Reset form fields
//       name: '',
//       address: '',
//       email: '',
//       phone: '',
//       password: ''
//     });
//   };
  
//   const saveUserDataToLocalStorage = data => {
//     const existingData = JSON.parse(localStorage.getItem('userData')) || [];
//     const updatedData = [...existingData, data];
//     localStorage.setItem('userData', JSON.stringify(updatedData));
//   };

//   return (
//     <div className="register-container">
//       <ToastContainer toastStyle={{
//         fontSize: '16px',
//         fontFamily: 'Arial, sans-serif',
//         borderRadius: '8px',
//       }} />
     
//       <form onSubmit={handleSubmit}>
//       <h2 style={{textAlign:'center', color:'pink',textDecoration:'underline'}}>Registration Form</h2>
//         <div className='name-input-div'>
//           <label>Name:</label>
//           <input type="text" name="name" value={userData.name} onChange={handleInputChange} required />
//         </div>
       
//         <div className='name-input-div'>
//           <label>Email:</label>
//           <input type="email" name="email" value={userData.email} onChange={handleInputChange} required />
//         </div>
//         <div className='name-input-div'>
//           <label>Phone:</label>
//           <input type="tel" name="phone" value={userData.phone} onChange={handleInputChange} required />
//         </div>
//         <div className='name-input-div'>
//           <label>Password:</label>
//           <input type="password" name="password" value={userData.password} onChange={handleInputChange} required />
//         </div>
//         <div className='name-input-div'>
//           <label>Address:</label>
//           <input type="text" name="address" value={userData.address} onChange={handleInputChange} required />
//         </div>
//         <button type="submit" className='btn'>Register</button>
//         <p>Already have an Account? <span onClick={() => setShowLogin(true)}>Login</span></p>
//       </form>
//     </div>
//   );
// };

// export default RegisterPage;

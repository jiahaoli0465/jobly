import React, { useState } from 'react';
import { Button, TextField, Box } from '@mui/material';
import { useAuth } from './AuthContext'; // Ensure this is correctly imported
import { Navigate } from 'react-router-dom';

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    firstName: '',
    lastName: '',
  });
  const [error, setError] = useState(''); // State to store error messages
  const { signup, currentUser } = useAuth(); // Use the signup function and currentUser from useAuth

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(data => ({
      ...data,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Reset errors
    try {
      await signup(formData); // Use signup from the context
        
    } catch (err) {
      // Assuming the error is a string or an array of strings
      setError(err instanceof Array ? err.join(', ') : err.toString());
    }
  };
  if (currentUser) {
    return <Navigate to="/" />;
}

  return (
    <div style={{width:'100vw', height:'90vh', display:'flex', justifyContent:'center', alignItems:'center'}}>
      <div style={{width:'350px'}}>
        <h1 style={{marginLeft:'10px'}}>Sign Up</h1>
        <Box component="form" onSubmit={handleSubmit} sx={{ '& > :not(style)': { m: 1 } }}>
          <TextField
            label="Username"
            variant="outlined"
            name="username"
            value={formData.username}
            onChange={handleChange}
            fullWidth
            error={!!error} // Show error state if there is an error
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            name="password"
            value={formData.password}
            onChange={handleChange}
            fullWidth
            error={!!error}
          />
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            name="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            error={!!error}
          />
          <TextField
            label="First Name"
            variant="outlined"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            fullWidth
            error={!!error}
          />
          <TextField
            label="Last Name"
            variant="outlined"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            fullWidth
            error={!!error}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Sign Up
          </Button>
          {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>} 
        </Box>
      </div>
    </div>
  );
};

export default SignUpForm;

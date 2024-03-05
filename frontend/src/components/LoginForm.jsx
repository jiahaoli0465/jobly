import React, { useState } from 'react';
import { Button, TextField, Box } from '@mui/material';
import { useAuth } from './AuthContext';
import { Navigate } from 'react-router-dom';
const LoginForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState(''); // Add state to handle errors
  const { login, currentUser } = useAuth(); // Use the signup function and currentUser from useAuth

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(data => ({
      ...data,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Reset error message
    try {
      await login(formData); // Use the login method from the context
    } catch (err) {
      // Assuming the error is an array of messages or a single message
      setError(err instanceof Array ? err.join(', ') : err.toString());
    }
  };

  if (currentUser) {
    return <Navigate to="/" />;
}


  return (
    <div style={{width:'100vw', height:'90vh', display:'flex', justifyContent:'center', alignItems:'center'}}>
      <div style={{width:'350px'}}>
        <h1 style={{marginLeft:'10px'}}>Login</h1>
        <Box component="form" onSubmit={handleSubmit} sx={{ '& > :not(style)': { m: 1 } }}>
          <TextField
            label="Username"
            variant="outlined"
            name="username"
            value={formData.username}
            onChange={handleChange}
            fullWidth
            error={!!error} // Add error prop to indicate an error state
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            name="password"
            value={formData.password}
            onChange={handleChange}
            fullWidth
            error={!!error} // Add error prop to indicate an error state
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Login
          </Button>
          {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>} // Display any error message
        </Box>
      </div>
    </div>
  );
};

export default LoginForm;

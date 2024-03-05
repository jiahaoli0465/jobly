import React from 'react';
import { Typography, Box, Container, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';

// Placeholder for user authentication logic


const HomePage = () => {
    const { currentUser, logout } = useAuth();

  return (
    <Container component="main" maxWidth="md" sx={{ marginTop: '250px' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Jobly
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          All the jobs in one, convenient place.
        </Typography>
        
        {/* Conditional rendering based on user's login status */}
        {currentUser ? (
          <Typography variant="h6" component="h3">
            Welcome back, {currentUser.firstName}
          </Typography>
        ) : (
          <Box>
            <Typography variant="h6" component="h3" gutterBottom>
              Welcome to Jobly
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
              <Button variant="contained" component={Link} to="/login" color="primary">
                Log In
              </Button>
              <Button variant="outlined" component={Link} to="/signup" color="primary">
                Sign Up
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default HomePage;

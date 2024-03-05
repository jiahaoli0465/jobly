import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext'; // Import useAuth hook
import { Button, TextField, Box } from '@mui/material';
import JoblyApi from '../JoblyApi'; // Adjust the import path as necessary
import { Navigate } from 'react-router-dom';
const ProfileForm = () => {
    const { currentUser, updateUser } = useAuth(); // Use the current user and setter from context
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        // You can also include password if you want users to be able to change it
    });
    const [success, setSuccess] = useState(false); // To indicate if update was successful
    const [error, setError] = useState(''); // To store error messages

    // Load the current user's information into the form
    useEffect(() => {
        if (currentUser) {
            setFormData({
                firstName: currentUser.firstName,
                lastName: currentUser.lastName,
                email: currentUser.email,
            });
        }
    }, [currentUser]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(data => ({ ...data, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccess(false); // Reset success status
        try {
            // Update user information via API
            const updatedUser = await updateUser(currentUser.username, formData);

            setSuccess(true);
            return (<Navigate to="/" />)

        } catch (err) {
            setError(err);
        }
    };

    return (
        <div style={{width:'100vw', height:'90vh', display:'flex', justifyContent:'center', alignItems:'center'}}>
        <div style={{width:'350px'}}>
          <h1 style={{marginLeft:'10px'}}>Edit Profile</h1>
        <Box component="form" onSubmit={handleSubmit}>
            <TextField
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                fullWidth
                style={{marginBottom:'10px'}}
            />
            <TextField
            
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                fullWidth
                style={{marginBottom:'10px'}}

            />
            <TextField
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                fullWidth
                style={{marginBottom:'10px'}}

            />
            {/* Include password fields if needed */}
            <Button type="submit" variant="contained" color="primary">
                Save Changes
            </Button>
            {success && <div>Profile updated successfully!</div>}
            {error && <div style={{ color: 'red' }}>{error.message}</div>}
        </Box>
        </div>
        </div>
    );
};

export default ProfileForm;

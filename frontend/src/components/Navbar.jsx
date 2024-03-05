// At the top of Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Import the CSS file
import { useAuth } from './AuthContext';


const Navbar = () => {
    // const { state } = useUserContext(); // Uncomment once context is properly set up
    // const state = { user: 'hi' }; // Remove or replace when using actual user context
    const { currentUser, logout } = useAuth();

    return (
        <nav className="navbar">
            <h1><Link to="/">Jobly</Link></h1>
            <ul>
                {currentUser ? (
                    // Links to display when user is logged in
                    <>
                        <li><Link to="/companies">Companies</Link></li>
                        <li><Link to="/jobs">Jobs</Link></li>
                        <li><Link to="/profile">Profile</Link></li>
                        <li style={{
                            cursor: 'pointer',
                        
                        }} onClick={logout}>Logout</li>
                    </>
                ) : (
                    // Links to display when no user is logged in
                    <>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/signup">Sign Up</Link></li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;

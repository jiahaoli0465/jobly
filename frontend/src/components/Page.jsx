// In Page.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import './Page.css';

// Import your page components
import HomePage from './HomePage';
import CompaniesPage from './CompaniesPage';
import Company from './Company';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import JobsPage from './JobsPage';
import ProfileForm from './ProfileForm'; 


// Import the AuthProvider
import { AuthProvider } from './AuthContext';

const Page = () => {
    return (
        <AuthProvider> {/* Wrap the Router and Pages within AuthProvider */}
            <Router>
                <div className='Page'>
                    <Navbar />
                    <Routes>
                        <Route path="/login" element={<LoginForm />} />
                        <Route path="/signup" element={<SignUpForm />} />
                        {/* <Route path="/profile" element={<ProfilePage />} /> Uncomment and adjust when ProfilePage is ready */}
                        <Route path="/companies" element={<CompaniesPage />} />
                        <Route path="/jobs" element={<JobsPage />} />
                        <Route path="/companies/:companyId" element={<Company />} />
                        {/* <Route path="/logout" element={<LogoutComponent />} /> Uncomment and adjust when LogoutComponent is ready */}
                        <Route path="/" element={<HomePage />} />
                        <Route path='/profile' element={<ProfileForm />} />
                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    );
};

export default Page;

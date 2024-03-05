import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, Button, styled } from '@mui/material';
import { useAuth } from './AuthContext'; // Ensure this is correctly imported
import JoblyApi from '../JoblyApi'; // Adjust the import path as necessary

// Styled components
const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: '#f5f5f5', // Change as needed
  borderRadius: '4px',
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
  margin: '12px',
  padding: '16px',
  width: '500px', // Adjust width as needed

}));

const StyledTitle = styled(Typography)(({ theme }) => ({
    color: '#333', // Adjust the color as needed
    fontWeight: 'bold',
    marginBottom: '8px',
}));

const StyledInfo = styled(Typography)(({ theme }) => ({
    color: '#666', // Adjust the color as needed
}));

const JobCard = ({ companyHandle, companyName, equity, id, salary, title, hasApplied }) => {
    const navigate = useNavigate();
    const [applied, setApplied] = useState(hasApplied);
    const { currentUser } = useAuth(); // Use the currentUser from context to check for login status

    const formatSalary = (salary) => {
        return salary ? `$${salary.toLocaleString()}` : 'Not provided';
    };

    const formatEquity = (equity) => {
        return equity ? `${equity * 100}% equity` : 'No equity';
    };

    const handleApply = async () => {
        if (currentUser) { // Ensure there is a logged-in user
            try {
                const jobId = await JoblyApi.applyToJob(currentUser.username, id);
                if (jobId) {
                    setApplied(true); // Update state to reflect the new applied status
                }
            } catch (err) {
                console.error("Apply to job failed:", err);
                setApplied(true);
                // Optionally, handle error, e.g., showing a message
            }
        } else {
            navigate('/login'); // Redirect non-logged-in users to login page
        }
    };



    return (
        <StyledCard >
            <CardContent>
                <StyledTitle variant="h6">{title}</StyledTitle>
                <StyledInfo variant="body1">{companyName}</StyledInfo>
                <StyledInfo variant="body2">Salary: {formatSalary(salary)}</StyledInfo>
                <StyledInfo variant="body2">Equity: {formatEquity(equity)}</StyledInfo>
                {currentUser && (
                    <Button 
                        variant="contained" 
                        color="primary" 
                        disabled={applied}
                        onClick={handleApply}
                    >
                        {applied ? 'Applied' : 'Apply'}
                    </Button>
                )}
            </CardContent>
        </StyledCard>
    );
};

export default JobCard;

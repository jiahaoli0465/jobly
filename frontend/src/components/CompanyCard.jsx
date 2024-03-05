import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { Card, CardContent, Typography, styled } from '@mui/material';

const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: '#FFE4C4',
  borderRadius: '4px',
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
  padding: '16px',
  width: '600px',
  margin: '12px',
}));

const StyledTitle = styled(Typography)(({ theme }) => ({
    color: '#333333',
    fontWeight: 'bold',
    marginBottom: '8px',
}));

const StyledDescription = styled(Typography)(({ theme }) => ({
    color: '#4d4d4d',
}));

const CompanyCard = ({ title, description, id }) => {
  const navigate = useNavigate(); // Use the useNavigate hook

  return (
    <StyledCard style={{cursor:'pointer'}} onClick={() => navigate(`/companies/${id}`)}> 
      <CardContent>
        <StyledTitle variant="h6">{title}</StyledTitle>
        <StyledDescription variant="body2">{description}</StyledDescription>
      </CardContent>
    </StyledCard>
  );
};

export default CompanyCard;

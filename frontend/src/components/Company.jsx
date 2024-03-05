import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, CircularProgress } from '@mui/material';
import JobCard from './JobCard'; // Make sure you have a JobCard component
import JoblyApi from '../JoblyApi'; // Your API for fetching company and job data

const Company = () => {
  const { companyId } = useParams(); // Assuming you're using React Router and companyId is the URL param
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const companyData = await JoblyApi.getCompany(companyId);
        setCompany(companyData);
      } catch (error) {
        console.error('Error fetching company:', error);
        setError('Failed to load company data');
      } finally {
        setLoading(false);
      }
    };

    fetchCompany();
  }, [companyId]);

  if (loading) {
    return <CircularProgress />; // Or any other loading indicator you prefer
  }

  if (error) {
    return <Typography variant="body1" color="error">{error}</Typography>;
  }

  return (
    <div style={{width:'100vw', display:'flex', justifyContent:'center'}}>

    <Box sx={{ margin: '20px' }}>
      <Typography variant="h4">{company.name}</Typography>
      <Typography variant="body1" sx={{ marginBottom: '20px' }}>{company.description}</Typography>
      <Typography variant="h5">Available Jobs:</Typography>
      {company.jobs && company.jobs.length > 0 ? (
        company.jobs.map((job) => (
          <JobCard key={job.id} {...job} />
        ))
      ) : (
        <Typography variant="body1">No available jobs at the moment.</Typography>
      )}
    </Box>
    </div>

  );
};

export default Company;

import React, { useEffect, useState } from 'react';
import { TextField, InputAdornment, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import JobCard from './JobCard'; // Use JobCard instead of CompanyCard
import JoblyApi from '../JoblyApi';

const JobsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [jobs, setJobs] = useState([]); // Rename to jobs
  const [message, setMessage] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const searchResults = await JoblyApi.getJobs(searchTerm); // Change to getJobs
      setJobs(searchResults); // Update state with search results
    } catch (error) {
      console.error('Error fetching jobs:', error);
      setMessage('Error fetching jobs: ' + error);
    }
  };

  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const allJobs = await JoblyApi.getAllJobs(); // Ensure this method exists and is correct
        setJobs(allJobs); // Update state with all jobs
      } catch (error) {
        console.error('Error fetching jobs:', error);
        setMessage('Error fetching jobs: ' + error);
      }
    };

    fetchAllJobs();
  }, []);

  return (
    <div style={{ width: '100vw' }}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        padding="2rem"
      >
        <TextField
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search jobs..."
          focused={false}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          style={{ width: '400px' }}
        />
        {message && (
          <div
            style={{
              width: '500px',
              height: '50px',
              backgroundColor: '#FF7F7F',
              margin: '10px',
              textAlign: 'center',
            }}
          >
            <p>{message}</p>
          </div>
        )}
        {jobs.map((job) => (
          <JobCard
            key={job.id}
            title={job.title}
            companyName={job.companyName} // Adjust these properties based on your JobCard component and API response
            salary={job.salary}
            equity={job.equity}
            id={job.id}
          />
        ))}
      </Box>
    </div>
  );
};

export default JobsPage;

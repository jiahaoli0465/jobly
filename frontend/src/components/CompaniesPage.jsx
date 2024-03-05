import React, { useEffect, useState } from 'react';
import { TextField, InputAdornment, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CompanyCard from './CompanyCard';
import JoblyApi from '../JoblyApi';

const CompaniesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [companies, setCompanies] = useState([]);
  const [message, setMessage] = useState();

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const searchResults = await JoblyApi.getCompany(searchTerm);
      console.log(searchResults);
      let company = [];
      company.push(searchResults);
      setCompanies(company);
    } catch (error) {
      console.error('Error fetching companies:', error);
      setMessage('Error fetching companies: ' + error);
    }
  };

  useEffect(() => {
    const fetchAllCompanies = async () => {
      try {
        const companies = await JoblyApi.getAllCompanies();
        setCompanies(companies);
      } catch (error) {
        console.error('Error fetching companies:', error);
      }
    };

    fetchAllCompanies();
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
          placeholder="Search companies..."
          focused={false}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            style: {
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(0, 0, 0, 0.23)',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(0, 0, 0, 0.87)',
              },
            },
          }}
          style={{ width: '400px' }}
        />
        {message ? (
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
        ) : null}
        {companies.map((company) => (
          <CompanyCard
            key={company.handle}
            title={company.name}
            description={company.description}
            id={company.handle}
          />
        ))}
      </Box>
    </div>
  );
};

export default CompaniesPage;
import React, { createContext, useContext, useState, useEffect } from 'react';
import JoblyApi from '../JoblyApi';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    JoblyApi.token = token;
    if (token) {
      getCurrentUser();
    } else {
      setCurrentUser(null);
    }
  }, [token]);

  const getCurrentUser = async () => {
    try {
        const decoded = JoblyApi.decodeToken(token);
        const username = decoded.username; // Adjust based on your token's payload structure
        const userData = await JoblyApi.getCurrentUser(username);
        setCurrentUser(userData);
    } catch (error) {
        console.error("Cannot load user data:", error);
        logout();
    }
};

  const login = async (loginData) => {
    try {
      const token = await JoblyApi.login(loginData);
      setToken(token);
      localStorage.setItem('token', token);
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const signup = async (signupData) => {
    try {
      const token = await JoblyApi.signup(signupData);
      setToken(token);
      localStorage.setItem('token', token);
    } catch (error) {
      console.error("Signup failed:", error);
      throw error;
    }
  };

  const updateUser = async (username, userData) => {
    try {
      const updatedUser = await JoblyApi.updateUser(username, userData);
      setCurrentUser(updatedUser);
    } catch (error) {
      console.error("Update user failed:", error);
      throw error;
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setToken(null);
    localStorage.removeItem('token');
    JoblyApi.token = null;
  };

  const value = {
    currentUser,
    token,
    login,
    logout,
    updateUser,
    signup, // Make sure to include the signup function here
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

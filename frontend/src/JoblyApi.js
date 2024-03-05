import axios from "axios";
import { jwtDecode } from 'jwt-decode';
const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

class JoblyApi {
    static token;

    static async request(endpoint, data = {}, method = "get") {
        console.debug("API Call:", endpoint, data, method);
        const url = `${BASE_URL}/${endpoint}`;
        const headers = { Authorization: `Bearer ${JoblyApi.token}` };
        const params = (method === "get") ? data : {};

        try {
            return (await axios({ url, method, data, params, headers })).data;
        } catch (err) {
            console.error("API Error:", err.response);
            let message = err.response.data.error.message;
            throw Array.isArray(message) ? message : [message];
        }
    }

    /** User and Authentication API Routes **/

    // Authenticate user and get token
    static async login({ username, password }) {
        const res = await this.request(`auth/token`, { username, password }, "post");
        return res.token; // Assume response format is { token: "..."}
    }

    // Register new user and get token
    static async signup(userData) {
        const res = await this.request(`auth/register`, userData, "post");
        return res.token; // Assume response format is { token: "..."}
    }

    // Get current user's details
    static async getCurrentUser(username) {
        const res = await this.request(`users/${username}`);
        return res.user; // Adjust according to your backend response
    }

    // Update current user's details
    static async updateUser(username, userData) {
        const res = await this.request(`users/${username}`, userData, "patch");
        return res.user; // Adjust according to your backend response
    }

    /** Job and Company API Routes **/

    // Existing methods...

    static async getCompany(handle) {
        const res = await this.request(`companies/${handle}`);
        return res.company;
    }

    static async getAllCompanies() {
        const res = await this.request(`companies`);
        return res.companies;
    }

    static async getAllJobs() {
        const res = await this.request(`jobs`);
        return res.jobs;
    }
    static decodeToken(token) {
      try {
          return jwtDecode(token);
      } catch (error) {
          console.error("Token decoding failed:", error);
          // Handle decoding errors, e.g., by returning null or throwing an error
          return null; // or throw new Error("Invalid token");
      }
  }
  static async applyToJob(username, jobId) {
    try {
        const res = await this.request(`users/${username}/jobs/${jobId}`, {}, 'post');
        return res.applied; // Or return the entire response as needed
    } catch (err) {
        console.error("Application error:", err.response);
        throw err;
    }
}


}

export default JoblyApi;

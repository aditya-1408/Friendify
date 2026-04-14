import axios from 'axios';  // Import the axios library for making HTTP requests,axios is a promise-based HTTP client for the browser and Node.js.

export const axiosInstance = axios.create({ // 
    baseURL: 'http://localhost:5001/api',
    withCredentials: true,
}) // Create an instance of axios with a base URL and withCredentials set to true. This instance can be used throughout the application to make HTTP requests to the specified base URL, and it will include credentials (like cookies) in the requests.
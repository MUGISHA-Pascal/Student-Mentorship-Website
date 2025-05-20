import axios from "axios";

const apiClient = axios.create({
  // baseURL: 'https://api.goyoungafrica.org/api/v1',
  baseURL: "http://localhost:3000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;

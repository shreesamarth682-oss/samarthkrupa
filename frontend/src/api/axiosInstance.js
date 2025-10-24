import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // update after deploy
});

export default api;

import axios from "axios";

const api = axios.create({
   baseURL: "https://samarthkrupa-1.onrender.com/api", // update after deploy
});

export default api;

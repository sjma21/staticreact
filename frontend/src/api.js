import axios from "axios";
const api = axios.create({
    baseURL: "https://staticreact-1.onrender.com",
});

export default api;
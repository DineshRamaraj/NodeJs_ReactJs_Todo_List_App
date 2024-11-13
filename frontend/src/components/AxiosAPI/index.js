import axios from "axios";

const api = axios.create({
  baseURL: "https://nxt-todo-app.onrender.com/api",
});

export default api;

import axios from "axios";

export const apiClient = axios.create({
  baseURL: "https://newsapi.org/v2",
  headers: {
    "x-api-key": import.meta.env.VITE_API_KEY,
  },
});

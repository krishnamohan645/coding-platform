import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api",
  // baseURL: "https://coding-platform.up.railway.app/api",
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    if (config.data instanceof FormData) {
      delete config.headers["Content-Type"];
    } else {
      config.headers["Content-Type"] = "application/json";
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default axiosInstance;

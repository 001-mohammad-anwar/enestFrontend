import axios from "axios"
import SummaryApi from "../commonApi's/SummaryApi"
 const Axios = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,
    headers: {
        Accept: "application/json"
    },
 });



Axios.interceptors.request.use(

  (config) => {

    // GET TOKEN
    const token = localStorage.getItem("token");



    // ADD TOKEN IN HEADER
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }



    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);



// RESPONSE INTERCEPTOR
Axios.interceptors.response.use(

  (response) => {
    return response;
  },

  async(error) => {

    // UNAUTHORIZED
    if (error.response?.status === 401) {

      localStorage.removeItem("token");

      window.location.href = "/login";
    }



    return Promise.reject(error);
  }
);

export default Axios;



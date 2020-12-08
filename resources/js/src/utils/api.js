import axios from "axios"
import useGlobalAuthUser from "../global_hooks/auth_user"

const API = axios.create({
  baseURL: process.env.MIX_BASE_URL
});

API.interceptors.request.use(
  async config => {
    config.headers = {
      'Authorization': `${localStorage.getItem('bearer_token')}`,
      'Accept': 'application/json'
    }
    return config;
  },
  error => {
    Promise.reject(error)
  });

// Add a response interceptor
API.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  if (error.response.status === 401)
  {
    localStorage.setItem('bearer_token', null)
    window.location.href = '/login'
  }
  return Promise.reject(error);
});

export default API

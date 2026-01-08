// import axios from "axios";
// import React from "react";
// const axiosSecure = axios.create({
//   baseURL: import.meta.env.VITE_API_URL,
// });
// const useAxiosSecure = () => {
//   return axiosSecure;
// };

// export default useAxiosSecure;

import { useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import useAuth from "./useAuth";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const useAxiosSecure = () => {
  const { user, signOutUser, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      // Add request interceptor
      const requestInterceptor = axiosInstance.interceptors.request.use(
        async (config) => {
          try {
            // Get Firebase ID token
            const token = await user.getIdToken();
            config.headers.Authorization = `Bearer ${token}`;
            config.headers.email = user.email;
            return config;
          } catch (error) {
            console.error("Error getting Firebase token:", error);
            // If token fails, still send the email for basic auth
            config.headers.email = user.email;
            return config;
          }
        }
      );

      // Add response interceptor
      const responseInterceptor = axiosInstance.interceptors.response.use(
        (res) => res,
        (err) => {
          if (err?.response?.status === 401 || err?.response?.status === 403) {
            signOutUser()
              .then(() => {
                console.log("Logged out successfully.");
              })
              .catch(console.error);
            navigate("/login");
          }
          return Promise.reject(err);
        }
      );

      // Cleanup to prevent multiple interceptors on re-renders
      return () => {
        axiosInstance.interceptors.request.eject(requestInterceptor);
        axiosInstance.interceptors.response.eject(responseInterceptor);
      };
    }
  }, [user, loading, signOutUser, navigate]);

  return axiosInstance;
};

export default useAxiosSecure;

import axios from "axios";
import { signOut } from "next-auth/react";

const ApiReq = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_DOMAIN,
  withCredentials: true,
});

// Add a response interceptor
ApiReq.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { response } = error;

    // Check if the response is a 401 status code (Unauthorized)
    if (response && response.status === 401) {
      // Sign out the user and redirect to the login page
      await signOut({ callbackUrl: "/" });
      // window.location.replace("/my-account");
    }

    return Promise.reject(error);
  }
);

export default ApiReq;

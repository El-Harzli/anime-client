import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;

export const axiosPublic = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

axiosPrivate.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 or 403
    if ((error?.response?.status === 401 || error?.response?.status === 403) && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshResponse = await axiosPublic.get('/auth/refresh', { withCredentials: true });
        const newAccessToken = refreshResponse?.data?.accessToken;

        if (!newAccessToken) throw new Error('No new token returned');

        // Update headers globally and on this request
        axiosPrivate.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

        return axiosPrivate(originalRequest);
      } catch (refreshError) {
        console.error('❌ Token refresh failed:', refreshError);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);


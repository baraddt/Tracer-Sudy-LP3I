import axios from 'axios';
import { refreshToken } from './AuthService';

// const API_URL = 'http://192.168.100.25:5000';
const API_URL = 'https://z40z3w8b-5000.asse.devtunnels.ms';

const axiosClient = axios.create({
    baseURL: API_URL,
    // timeout: 5000, 
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            console.log('[Interceptor] Access token expired. Attempting to refresh token...');
            originalRequest._retry = true;

            try {
                const storedRefreshToken = sessionStorage.getItem('refreshToken');
                if (!storedRefreshToken) {
                    console.error('[Interceptor] Refresh token not found in sessionStorage. User might need to log in again.');
                    throw new Error('Refresh token is unavailable.');
                }

                const newAccessToken = await refreshToken(storedRefreshToken);
                console.log('[Interceptor] Token refreshed successfully:', newAccessToken);

                sessionStorage.setItem('accessToken', newAccessToken);

                // Update the original request with the new token and retry
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return axiosClient(originalRequest);
            } catch (refreshError) {
                console.error('[Interceptor] Failed to refresh token:', refreshError.message);

                if (refreshError.response && refreshError.response.status === 401) {
                    console.error('[Interceptor] Refresh token has expired. Redirecting to login page...');
                    sessionStorage.clear();
                    localStorage.clear();
                    window.location.href = '/';
                }

                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default axiosClient;

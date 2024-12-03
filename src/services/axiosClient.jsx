import axios from 'axios';
import { refreshToken } from './AuthService';

const API_URL = 'http://192.168.18.176:5000'; 

const axiosClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosClient.interceptors.response.use(
    (response) => response, 
    async (error) => {
        const originalRequest = error.config;

        
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            console.log('Access token kedaluwarsa. Mencoba refresh token...');
            originalRequest._retry = true;

            try {
                
                const storedRefreshToken = localStorage.getItem('refreshToken'); 
                if (!storedRefreshToken) {
                    console.error('Refresh token tidak ditemukan.');
                    throw new Error('Refresh token tidak tersedia.');
                }

                
                const newAccessToken = await refreshToken(storedRefreshToken);

                console.log('Token berhasil diperbarui:', newAccessToken);

                
                localStorage.setItem('accessToken', newAccessToken);

                
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return axiosClient(originalRequest); 
            } catch (refreshError) {
                console.error('Gagal refresh token:', refreshError.message);
                return Promise.reject(refreshError); 
            }
        }

        return Promise.reject(error); 
    }
);


export default axiosClient;

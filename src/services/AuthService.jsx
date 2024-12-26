import axios from 'axios';
import axiosClient from './axiosClient';

// const API_URL = 'http://192.168.100.25:5000';
const API_URL = 'https://z40z3w8b-5000.asse.devtunnels.ms';

export const refreshToken = async (refreshToken) => {
    try {
        console.log('Try Refresh Token:', refreshToken);

        if (!refreshToken) {
            console.error('No refresh token available to send for refreshing access token.');
            throw new Error('Refresh token is missing.');
        }

        const response = await axiosClient.post(
            `/users/refresh`,
            {}, // Body kosong
            {
                headers: {
                    'Authorization': `Bearer ${refreshToken}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        console.log('Token Succesfully Updated:', response.data.accessToken);

        return response.data.accessToken;
    } catch (error) {
        if (error.response) {
            console.error('Error refreshing token, Response:', error.response.data);
            console.error('Headers:', error.response.headers); // Header untuk analisis tambahan
            console.error('Status:', error.response.status); // Status HTTP untuk identifikasi masalah
        } else {
            console.error('Error refreshing token, No response received from server:', error.message);
        }

        throw error;
    }
};

// services/AuthService.js
const AuthService = {
    login: async (email, password) => {
        try {
            console.log('Data yang dikirim:', { email, password });


            const response = await axios.post(
                `${API_URL}/users/login`,
                { email, password }
                // ,
                // {
                //     headers: {
                //         'Content-Type': 'application/json',
                //     },
                // }
            );

            console.log('Respons dari server:', response.data);


            if (response.data && response.data.message === 'Login berhasil') {

                sessionStorage.setItem('accessToken', response.data.token.accessToken);
                sessionStorage.setItem('refreshToken', response.data.token.refreshToken);
                localStorage.setItem('role', response.data.user.role);
                localStorage.setItem('user', JSON.stringify(response.data.user));

                console.log('Data pengguna yang diterima:', response.data.user);

                return response.data.user.role;
            } else {
                throw new Error('Login gagal. Silakan cek email dan password.');
            }
        } catch (err) {
            console.error('Login error:', err.response?.data || err.message);

            if (err.code === 'ECONNABORTED') {
                throw new Error('Request timeout, cek koneksi internet lu.');
            }

            if (err.response) {
                if (err.response.status === 401) {
                    throw new Error('Email atau password salah.');
                } else {
                    throw new Error(err.response.data.message || 'Terjadi kesalahan. Coba lagi nanti.');
                }
            } else {
                throw new Error('Terjadi kesalahan saat login. Coba lagi nanti.');
            }
        }
    },

    logout: () => {
        // Hapus token dan role dari local storage
        localStorage.clear()
        sessionStorage.removeItem('accessToken');
        sessionStorage.removeItem('refreshToken');
        // localStorage.removeItem('role');
        // localStorage.removeItem('formData');
        // localStorage.removeItem('tracerId');
        // localStorage.removeItem('user');
    },
};

export default AuthService;

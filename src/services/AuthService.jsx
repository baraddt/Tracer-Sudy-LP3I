import axios from 'axios';

const API_URL = 'http://192.168.18.176:5000';

export const refreshToken = async (refreshToken) => {
    try {
       
        console.log('Mencoba refresh token:', refreshToken);

        const response = await axios.post(
            `${API_URL}/users/refresh`,
            {},
            {
                headers: {
                    'Authorization': `Bearer ${refreshToken}`, 
                    'Content-Type': 'application/json',
                },
            }
        );

        
        console.log('Token berhasil diperbarui:', response.data.accessToken);

        return response.data.accessToken; 
    } catch (error) {
        
        if (error.response) {
            
            console.error('Error refreshing token, Response:', error.response.data);
            console.error('Status:', error.response.status);
        } else {
            
            console.error('Error refreshing token, No response:', error.message);
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
                { email, password },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            console.log('Respons dari server:', response.data); 

            
            if (response.data && response.data.message === 'Succesfully Login') {
                
                localStorage.setItem('accessToken', response.data.token.accessToken);
                localStorage.setItem('refreshToken', response.data.token.refreshToken);
                localStorage.setItem('role', response.data.user.role); 
                localStorage.setItem('user', JSON.stringify(response.data.user)); 

                console.log('Data pengguna yang diterima:', response.data.user);

                return response.data.user.role; 
            } else {
                throw new Error('Login gagal. Silakan cek email dan password.');
            }
        } catch (err) {
            console.error('Login error:', err.response?.data || err.message);

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
        localStorage.removeItem('accessToken');
        localStorage.removeItem('role');
        localStorage.removeItem('tracerId');
        localStorage.removeItem('user');
        localStorage.removeItem('refreshToken');
    },
};

export default AuthService;

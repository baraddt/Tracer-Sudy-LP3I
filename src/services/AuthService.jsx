import dummyUsers from './dummyUsers';

// services/AuthService.js
const AuthService = {
    login: async (credentials) => {
        const user = dummyUsers.find(
            (user) =>
                user.username === credentials.username &&
                user.password === credentials.password
        );

        if (user) {
            // Simpan token dan peran pengguna di local storage
            localStorage.setItem('token', user.token);
            localStorage.setItem('role', user.role);
            console.log("Role yang disimpan:", user.role);
            return true;
        }
        return false;
    },

    logout: () => {
        // Hapus token dan role dari local storage
        localStorage.removeItem('token');
        localStorage.removeItem('role');
    },
};

export default AuthService;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthService from '../services/AuthService.jsx'; // Pastikan untuk mengimpor AuthService
import dummyUsers from '../../src/services/dummyUsers';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
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
            return {
                success: true,
                token: user.token,
                role: user.role,
            };
        }
        return { success: false }; // Mengembalikan objek dengan properti success
    },

    logout: () => {
        // Hapus token dan role dari local storage
        localStorage.removeItem('token');
        localStorage.removeItem('role');
    },
};

  const handleLogin = async (e) => {
    e.preventDefault(); // Mencegah refresh halaman
    const response = await AuthService.login({ username, password });

    if (response && response.success) {
      // Simpan token dan role di localStorage
      localStorage.setItem('token', response.token); // Simpan token
      localStorage.setItem('role', response.role); // Simpan role
      
      console.log("Role yang didapat:", response.role); // Debugging

      if (response.role === 'super_admin') {
        navigate('/super_admin/dashboard'); // Navigasi ke dashboard super admin
      } else if (response.role === 'admin') {
        navigate('/admin/dashboard_admin'); // Navigasi ke dashboard admin
      } else {
        navigate('/pengguna/dashboard'); // Navigasi ke dashboard pengguna
      }
    } else {
      // Tampilkan pesan kesalahan
      alert('Login gagal. Silakan coba lagi.');
    }
  };


  return (
    <div className="container-fluid vh-100 d-flex">
      <div className="row w-100 flex-grow-1">
        {/* Bagian kiri: Logo dan Vektor */}
        <div className="col-md-6 d-flex flex-column align-items-center justify-content-center" style={{ padding: '0' }}>
          <img src="/logo-lp3i.png" alt="Logo" width="160" className="mt-5" />
          <img src="/vektor.png" alt="Vektor" width="440" className="img-fluid mb-4" />
        </div>

        {/* Bagian kanan: Formulir Login */}
        <div className="col-md-6 d-flex align-items-center justify-content-center">
          <div className="rounded bg-white p-5" style={{ width: '100%', height: '100%' }}>
            <div className="rounded bg-white p-5 d-flex flex-column justify-content-center" style={{ width: '100%', height: '100%' }}>
              <h2 className="mb-2 mt-lg-5" style={{ color: '#00426D' }}>Welcome Back!</h2>
              <p className="mb-4">Sign in to continue to Tracer Study</p>

              <label className="form-label">NIM</label>
              <input
                type="text"
                placeholder="Input NIM"
                className="form-control mb-3 text-secondary"
                value={username}
                onChange={(e) => setUsername(e.target.value)} // Menangani perubahan input username
              />

              <label className="form-label">Password</label>
              <input
                type="password"
                placeholder="Password"
                className="form-control mb-3 text-secondary"
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Menangani perubahan input password
              />
              <div className="d-flex justify-content-end">
                <Link to="/pengguna/pusatbantuan">
                  <button type="button" className="btn btn-link p-0">Lupa Kata Sandi?</button>
                </Link>
              </div>
              <button type="button" className="btn btn-success mt-3 w-100" onClick={handleLogin}>Sign In</button> {/* Mengubah Link menjadi button */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

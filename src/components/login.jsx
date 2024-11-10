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
        localStorage.setItem('token', user.token);
        localStorage.setItem('role', user.role);
        return {
          success: true,
          token: user.token,
          role: user.role,
        };
      }
      return { success: false };
    },

    logout: () => {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
    },
  };

  const handleLogin = async () => {
    const response = await AuthService.login({ username, password });

    if (response && response.success) {
      localStorage.setItem('token', response.token);
      localStorage.setItem('role', response.role);

      if (response.role === 'super_admin') {
        navigate('/super_admin/dashboard');
      } else if (response.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/pengguna/dashboard');
      }
    } else {
      alert('Login gagal. Silakan coba lagi.');
    }
  };

  return (
    <div className="container-fluid vh-100 d-flex">
      <div className="row w-100 flex-grow-1">
        <div className="col-md-3 d-flex flex-column align-items-center justify-content-center" style={{ padding: '0' }}>
          <img src="/logo-lp3i.png" alt="Logo" width="160" className="mt-5" />
          <img src="/vektor.png" alt="Vektor" width="440" className="img-fluid mb-4" />
        </div>

        <div className="col-md-9 d-flex align-items-center justify-content-center">
          <div className="rounded bg-white p-5" style={{ width: '100%', height: '100%' }}>
            <form
              onSubmit={(e) => {
                e.preventDefault(); // Mencegah halaman refresh
                handleLogin();
              }}
              className="rounded bg-white p-5 d-flex flex-column justify-content-center"
              style={{ width: '100%', height: '100%' }}
            >
              <h2 className="mb-2 mt-lg-5" style={{ color: '#00426D' }}>Welcome Back!</h2>
              <p className="mb-4">Sign in to continue to Tracer Study</p>

              <label className="form-label w-75">Username</label>
              <input
                type="text"
                placeholder="Username"
                className="form-control mb-3 text-secondary w-50"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />

              <label className="form-label">Password</label>
              <input
                type="password"
                placeholder="Password"
                className="form-control mb-3 text-secondary w-50"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="d-flex">
                <Link to="/super_admin/forgot-password">
                  <button type="button" className="btn btn-link p-0">Lupa Kata Sandi?</button>
                </Link>
              </div>
              <button type="submit" className="btn btn-success mt-3 w-50">Sign In</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

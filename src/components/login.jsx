import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthService from '../services/AuthService';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();


  const handleLogin = async () => {
    try {
      const role = await AuthService.login(email, password); // Memanggil AuthService

      // Pengecekan role untuk navigasi
      if (role === '672d79e1861bcc3c8128d855') {
        navigate('/super_admin/dashboard');
      } else if (role === '672d79e7861bcc3c8128d857') {
        navigate('/admin/dashboard');
      } else {
        setError('Role tidak dikenali. Hubungi admin.');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row w-100 flex-grow-1">
        <div className="col-md-4 d-flex flex-column align-items-center justify-content-center" style={{ padding: '0' }}>
          <img src="/logo-lp3i.png" alt="Logo" width="160" className="mt-5" />
          <img src="/vektor.png" alt="Vektor" width="440" className="img-fluid mb-4" />
        </div>

        <div className="col-md-8 d-flex align-items-center justify-content-center">
          <div className="rounded bg-white p-5" style={{ width: '100%', height: '100%' }}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
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
                placeholder="Email"
                className="form-control mb-3 text-secondary w-50"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
              {error && <div className="mt-3 text-danger">{error}</div>}
            </form>
            <div className="d-flex mt-1 ">
              <button className="btn btn-primary me-3">Login Kampus</button>
              <Link to="/p">
                <button className="btn btn-secondary">Login Mahasiswa</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

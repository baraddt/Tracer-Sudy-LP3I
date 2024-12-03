import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosClient from '../services/axiosClient';

export default function Login() {
  const [nim, setNim] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      console.log('Data yang dikirim:', { nim, password }); // Debugging input

      // Kirim permintaan login ke API
      const response = await axiosClient.post(
        '/mahasiswa/login',
        {
          nim,
          password,
        },
        {
          headers: {
            'Content-Type': 'application/json', // Content-Type header (default untuk JSON)
          },
        }
      );

      console.log('Respons dari server:', response.data); // Debugging respons

      // Memeriksa apakah login berhasil berdasarkan message
      if (response.data && response.data.message === 'Login berhasil') {
        // Simpan token dan data pengguna ke localStorage
        localStorage.setItem('accessToken', response.data.token.accessToken);
        localStorage.setItem('refreshToken', response.data.token.refreshToken);
        localStorage.setItem('role', response.data.user.role);
        localStorage.setItem('user', JSON.stringify(response.data.user)); // Menyimpan data user

        // Debugging struktur data user
        console.log('Data pengguna yang diterima:', response.data.user);

        // Navigasi ke dashboard mahasiswa setelah login berhasil
        navigate('/pengguna/dashboard'); // Ganti dengan halaman yang sesuai untuk mahasiswa

      } else {
        setError('Login gagal. Silakan cek nim dan password.');
      }
    } catch (err) {
      if (err.response) {
        if (err.response.status === 401) {
          setError('nim atau password salah.');
        } else {
          setError(`Terjadi kesalahan: ${err.response.data.message || 'Coba lagi nanti.'}`);
        }
        console.error('Error respons:', err.response ? err.response.data : err.message);
      } else {
        setError('Terjadi kesalahan saat login. Coba lagi nanti.');
      }
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
                placeholder="NIM"
                className="form-control mb-3 text-secondary w-50"
                value={nim}
                onChange={(e) => setNim(e.target.value)}
              />

              <label className="form-label">Password</label>
              <input
                type="password"
                placeholder="Password"
                className="form-control mb-3 text-secondary w-50"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="submit" className="btn btn-success mt-3 w-50">Sign In</button>
              {/* {error && <div className="mt-3 text-danger">{error}</div>} */}
            </form>
            <div className="d-flex mt-1 ">
              <Link to="/">
                <button className="btn btn-secondary me-3">Login Kampus</button>
              </Link>
              <button className="btn btn-primary">Login Mahasiswa</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthService from '../services/AuthService';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [isHovered1, setIsHovered1] = useState(false);
  const [isHovered2, setIsHovered2] = useState(false);

  const handleLogin = async () => {
    try {
      const roleId = await AuthService.login(email, password); // Memanggil AuthService

      // Pengecekan role untuk navigasi
      if (roleId === '675112cf0a99a51d309ed817') {
        navigate('/super_admin/dashboard');
      } else if (roleId === '675112d60a99a51d309ed819') {
        navigate('/admin/dashboard');
      } else if (roleId === '675114850a99a51d309ed823') {
        navigate('/admin/dashboard');
      } else {
        setError('Role tidak dikenali. Hubungi admin.');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container mt-5 d-flex">
      <div className="row w-100 flex-grow-1 p-sm-4 p-md-4 p-4">
        <div className="col-md-4 d-none d-md-flex flex-column align-items-center justify-content-center" style={{ padding: '0' }}>
          <img src="/logo-lp3i.png" alt="Logo" width="160" className="mt-5" />
          <img src="/vector1.png" alt="Vektor" width="440" className="img-fluid mb-0" />
        </div>
        <div className="col-sm-12 col-md-8 d-flex align-items-center justify-content-center">
          <div className="rounded bg-white p-1 p-sm-3 p-md-5" style={{ width: '100%', height: '100%' }}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleLogin();
              }}
              className="rounded bg-white p-5 d-flex flex-column justify-content-center"
              style={{ width: '100%', height: '100%' }}
            >
              <span className="mb-2 mt-lg-5 fs-2" style={{ color: '#00426D' }}>Welcome Back!</span>
              <p className="mb-4">Sign in to continue to Tracer Study</p>

              <div className="form-group col-12 col-sm-11 col-md-6" style={{ position: 'relative', marginBottom: '1.1rem' }}>
                <input
                  type="text"
                  id="email"
                  className="form-control custom-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                />
                <label htmlFor="email" className="custom-label">Email</label>
              </div>
              <div className="form-group col-12 col-sm-11 col-md-6 mt-2" style={{ position: 'relative', marginBottom: '1.1rem' }}>
                <input
                  type="password"
                  id="password"
                  className="form-control custom-input"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label htmlFor="password" className="custom-label">Password</label>
              </div>

              <div className="d-flex">
                <Link to="/super_admin/forgot-password">
                  <button type="button" className="btn btn-link p-0 text-primary">Lupa Kata Sandi?</button>
                </Link>
              </div>
              <button type="submit" className="btn btn-success mt-3 col-12 col-sm-11 col-md-6">Sign In</button>
              {error && <div className="mt-3 text-danger">{error}</div>}
              <div className="d-md-flex mt-5 mt-md-3">
                <button
                  className="fw-regular text-primary"
                  style={{
                    padding: "10px 20px",
                    backgroundColor: "transparent",
                    border: isHovered1 ? "2px solid #00426D" : "2px solid transparent",
                    borderRadius: '10px',
                    transition: "border 0.3s ease, color 0.3s ease",
                    cursor: "pointer",
                    color: isHovered1 ? "#007bff" : "black",
                  }}
                  onMouseEnter={() => setIsHovered1(true)}
                  onMouseLeave={() => setIsHovered1(false)}
                >
                  Login Kampus
                </button>
                <Link to="/p">
                  <button
                    className="fw-regular text-secondary"
                    style={{
                      padding: "10px 20px",
                      backgroundColor: "transparent",
                      border: isHovered2 ? "2px solid #A1A8AA" : "2px solid transparent",
                      borderRadius: '10px',
                      transition: "border 0.3s ease, color 0.3s ease",
                      cursor: "pointer",
                      color: isHovered2 ? "#007bff" : "black",
                    }}
                    onMouseEnter={() => setIsHovered2(true)}
                    onMouseLeave={() => setIsHovered2(false)}
                  >
                    Login Mahasiswa
                  </button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { Link } from 'react-router-dom';

export default function Login() {
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

              <label className="form-label">Username</label>
              <input type="text" placeholder="Username" className="form-control mb-3 text-secondary" />

              <label className="form-label">Password</label>
              <input type="password" placeholder="Password" className="form-control mb-3 text-secondary" />
              <div className="d-flex justify-content-end">
                <Link to="/forgot-password">
                  <button type="button" className="btn btn-link p-0">Lupa Kata Sandi?</button>
                </Link>
              </div>
              <Link to="/dashboard">
                <button type="button" className="btn btn-success mt-3 w-100">Sign In</button>
              </Link>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

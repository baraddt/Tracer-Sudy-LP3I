import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function Navbar() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const toggleProfileDropdown = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid d-flex align-items-center">
        {/* Logo dan Brand */}
        <Link className="navbar-brand me-auto" to="/">
          <img src="/logo-lp3i.png" width="45" height="60" alt="" /> Tracer Study LP3I
        </Link>

        {/* Button untuk Toggle di Layar Kecil */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menu Navbar */}
        <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
          {/* Wrapper dengan center alignment untuk menu utama */}
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="./dashboard">
                <i className="bi bi-bar-chart"></i> Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="./tracerstudy">
                <i className="bi bi-clipboard"></i> Tracer Study
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="./kampus">
                <i className="bi bi-building"></i> Kampus
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="./user">
                <i className="bi bi-person"></i> User
              </Link>
            </li>

            {/* Dropdown Arsip */}
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="arsipDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="bi bi-archive"></i> Arsip
              </a>
              <ul className="dropdown-menu" aria-labelledby="arsipDropdown">
                <li>
                  <Link className="dropdown-item" to="./arsip">
                    <i className="bi bi-journal-text"></i> Tracer Study
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="./arsip">
                    <i className="bi bi-chat-left-dots"></i> Pengaduan
                  </Link>
                </li>
              </ul>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="./pusatbantuan">
                <i className="bi bi-question-circle"></i> Pusat Bantuan
              </Link>
            </li>
          </ul>
        </div>

        {/* Profile dropdown tetap di kanan */}
        <div className="d-flex align-items-center profile-dropdown ms-auto" onClick={toggleProfileDropdown} style={{ cursor: 'pointer' }}>
          <img
            src="/profile.jpg"
            alt="Profile"
            width="50"
            height="50"
            className="rounded-circle me-2 p-2"
          />
          <div className="d-flex flex-column">
            <span className="fw-bold">Mario DB</span>
            <small className="text-muted">Super Admin</small>
          </div>
          <i className={`ms-2 bi bi-caret-down-fill ${isProfileOpen ? 'rotate' : ''}`}></i>

          {/* Dropdown Content */}
          {isProfileOpen && (
            <ul
              className="dropdown-menu show mt-1 p-2 shadow-sm rounded me-2"
              style={{
                position: "absolute",
                top: "100%", // Menempatkan dropdown tepat di bawah elemen profil
                right: 0,
                zIndex: 1000, // Memastikan dropdown berada di lapisan atas
                marginTop: "0.5rem", // Jarak kecil agar terlihat rapi
              }}
            >
              <li>
                <Link className="dropdown-item text-success" to="/profile">
                  <i className="bi bi-person"></i> Akun
                </Link>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <Link className="dropdown-item text-danger" to="/">
                  <i className="bi bi-box-arrow-right"></i> Logout
                </Link>
              </li>
            </ul>
          )}

        </div>
      </div>
    </nav>
  );
}

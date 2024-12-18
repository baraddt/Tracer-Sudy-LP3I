import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/AuthService';
import getRoleName from '../services/roleCheck';
import ModalLogout from './compModals/modalLogout';

export default function Navbar() {
  const [userName, setUserName] = useState('');
  const [roleName, setRoleName] = useState('');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const toggleProfileDropdown = () => {
    setIsProfileOpen(!isProfileOpen);
  };
  const navigate = useNavigate();

  const handleLogout = () => {
    AuthService.logout();
    navigate('/');
  };



  useEffect(() => {
    // Ambil data user dari localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData); // Urai JSON menjadi objek
      setUserName(user.nama || 'Pengguna'); // Pastikan ada fallback jika nama tidak tersedia
      setRoleName(getRoleName(user.role)); // Ambil role
    }
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid d-flex align-items-center">
        {/* Logo dan Brand */}
        <Link className="navbar-brand me-auto" to="#" style={{ color: '#00426D' }}>
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
              <Link className="nav-link" to="./admin/dashboard" style={{ color: '#00426D' }}>
                <i className="bi bi-border-style"></i> Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="./admin/tracerstudy" style={{ color: '#00426D' }}>
                <i className="bi bi-clipboard"></i> Tracer Study
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="./admin/kampus" style={{ color: '#00426D' }}>
                <i className="bi bi-building"></i> Kampus
              </Link>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                style={{ color: '#00426D' }}
                href="#"
                id="penggunaDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="bi bi-archive"></i> Pengguna
              </a>
              <ul className="dropdown-menu" aria-labelledby="penggunaDropdown">
                <li>
                  <Link className="dropdown-item" to="./admin/addadmin">
                    <i className="bi bi-journal-text"></i> Admin
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="./admin/addmahasiswa">
                    <i className="bi bi-chat-left-dots"></i> Mahasiswa
                  </Link>
                </li>
              </ul>
            </li>

            {/* Dropdown Arsip */}
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                style={{ color: '#00426D' }}
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
                  <Link className="dropdown-item" to="./admin/arsiptracer">
                    <i className="bi bi-journal-text"></i> Tracer Study
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="./admin/arsippengaduan">
                    <i className="bi bi-chat-left-dots"></i> Pengaduan
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="./admin/pusatbantuan" style={{ color: '#00426D' }}>
                <i className="bi bi-question-circle"></i> Pusat Bantuan
              </Link>
            </li>
            <li>
              <div className="d-flex align-items-center justify-content-end profile-dropdown ms-auto d-md-none d-sm-flex d-flex" onClick={toggleProfileDropdown} style={{ cursor: 'pointer' }}>
                <img
                  src="/photo-profil.jpg"
                  alt="Profile"
                  width="50"
                  height="50"
                  className="rounded-circle me-2 p-2"
                />
                <div className="d-flex flex-column">
                  <span className="fw-semibold" style={{ color: '#00426D' }}>{userName}</span>
                  <small className="text-muted">{roleName}</small>
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
                      <Link className="dropdown-item text-success" to="/admin/profile">
                        <i className="bi bi-person"></i> Akun
                      </Link>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <Link className="dropdown-item text-danger" onClick={() => setShowLogoutModal(true)}>
                        <i className="bi bi-box-arrow-right"></i> Logout
                      </Link>
                    </li>
                  </ul>
                )}
              </div>
            </li>
          </ul>
        </div>

        {/* Profile dropdown tetap di kanan */}
        <div className="d-sm-none d-none d-md-flex align-items-center profile-dropdown ms-auto" onClick={toggleProfileDropdown} style={{ cursor: 'pointer' }}>
          <img
            src="/photo-profil.jpg"
            alt="Profile"
            width="50"
            height="50"
            className="rounded-circle me-2 p-2"
          />
          <div className="d-flex flex-column">
            <span className="fw-semibold" style={{ color: '#00426D' }}>{userName}</span>
            <small className="text-muted">{roleName}</small>
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
                <Link className="dropdown-item text-success" to="/admin/profile">
                  <i className="bi bi-person"></i> Akun
                </Link>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <Link className="dropdown-item text-danger" onClick={() => setShowLogoutModal(true)}>
                  <i className="bi bi-box-arrow-right"></i> Logout
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>
      <ModalLogout
        show={showLogoutModal}
        onLogout={handleLogout}
        onCancel={() => setShowLogoutModal(false)}
      />
    </nav>
  );
}

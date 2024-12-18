import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import AuthService from '../services/AuthService';
import getRoleName from '../services/roleCheck';
import ModalLogout from './compModals/modalLogout';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {

  const [userName, setUserName] = useState('');
  const [roleName, setRoleName] = useState('');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const toggleProfileDropdown = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const navigate = useNavigate();

  const handleLogoutPengguna = () => {
    AuthService.logout();
    navigate('/p');
  };

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      setUserName(user.nama || 'Pengguna');
      setRoleName(getRoleName(user.role));
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
              <Link className="nav-link" to="./pengguna/dashboard" style={{ color: '#00426D' }}>
                <i className="bi bi-border-style"></i> Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="./pengguna/tracerstudy" style={{ color: '#00426D' }}>
                <i className="bi bi-clipboard"></i> Tracer Study
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="./pengguna/kampus" style={{ color: '#00426D' }}>
                <i className="bi bi-building"></i> Kampus
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="./pengguna/pusatbantuan" style={{ color: '#00426D' }}>
                <i className="bi bi-question-circle"></i> FAQ
              </Link>
            </li>
            {/* <li className="nav-item">
              <Link className="nav-link" to="./pengguna/pusatbantuan" style={{ color: '#00426D' }}>
                <i className="bi bi-question-circle"></i> Pusat Bantuan
              </Link>
            </li> */}
            <li>
              <div className="d-flex d-sm-flex d-md-none align-items-center justify-content-end profile-dropdown ms-auto" onClick={toggleProfileDropdown} style={{ cursor: 'pointer' }}>
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
                      <Link className="dropdown-item text-success" to="./pengguna/profile">
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
        <div className="d-md-flex align-items-center profile-dropdown ms-auto d-none d-sm-none" onClick={toggleProfileDropdown} style={{ cursor: 'pointer' }}>
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
                <Link className="dropdown-item text-success" to="./pengguna/profile">
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
        onLogout={handleLogoutPengguna}
        onCancel={() => setShowLogoutModal(false)}
      />
    </nav>
  );
}

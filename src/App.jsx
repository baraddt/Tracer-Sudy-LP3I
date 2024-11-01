import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Login from './pages/login';
import ForgotPassword from './pages/forgot-password';
import Dashboard from './Pages/Dashboard';
import Tracer from './pages/tracerstudy';
import Kampus from './pages/kampus';
import KampusEdit from './pages/kampusedit';
import User from './pages/user';
import Arsip from './pages/arsip';
import PusatBantuan from './pages/pusatbantuan';
import Profile from './pages/profile';
import Programstudy from './pages/programstudy';
import Psdku from './pages/psdku';
import Navbar from './components/navbar';
import Footer from './components/footer';

function AppContent() {
  const location = useLocation();
  const isAuthPage = location.pathname === '/' || location.pathname === '/forgot-password';

  return (
    <>
      {/* Hanya tampilkan Navbar dan Footer jika bukan halaman login/forgot-password */}
      {!isAuthPage && <Navbar />}
      <Routes>
        <Route path="/" element={<Login />} /> {/* Halaman login di URL default */}
        <Route path="/forgot-password" element={<ForgotPassword />} /> {/* Route untuk halaman lupa password */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/tracerstudy" element={<Tracer />} />
        <Route path="/kampus" element={<Kampus />} />
        <Route path="/kampusedit" element={<KampusEdit />} />
        <Route path="/user" element={<User />} />
        <Route path="/arsip" element={<Arsip />} />
        <Route path="/pusatbantuan" element={<PusatBantuan />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/psdku" element={<Psdku />} />
        <Route path="/programstudy" element={<Programstudy />} />
      </Routes>
      {!isAuthPage && <Footer />} {/* Hanya tampilkan Footer jika bukan halaman login/forgot-password */}
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

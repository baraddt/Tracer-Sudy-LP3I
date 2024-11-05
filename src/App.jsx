import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Login from './components/login';
import ForgotPassword from './pages/super_admin/forgot-password';
import Dashboard from './pages/super_admin/dashboard';
import Tracer from './pages/super_admin/tracerstudy';
import TracerAdd from './pages/super_admin/tracerstudyadd';
import TracerGolongan from './pages/super_admin/tracerstudy-golongan-kegiatan';
import TracerBankSoal from './pages/super_admin/tracerstudy-bank-soal';
import TracerVerifikasi from './pages/super_admin/tracerstudy-verifikasi-akhir';
import TracerPreview from './pages/super_admin/tracerstudy-preview';
import Kampus from './pages/super_admin/kampus';
import KampusEdit from './pages/super_admin/kampusedit';
import User from './pages/super_admin/user';
import ArsipPengaduan from './pages/super_admin/arsippengaduan';
import ArsipTracer from './pages/super_admin/arsiptracer';
import PusatBantuan from './pages/super_admin/pusatbantuan';
import Profile from './pages/super_admin/profile';
import Programstudy from './pages/super_admin/programstudy';
import Psdku from './pages/super_admin/psdku';
import DashboardPengguna from './pages/pengguna/dashboard';
import Navbar from './components/navbar';
import NavbarPengguna from './components/navbarPengguna';
import Footer from './components/footer';

function AppContent() {
  const location = useLocation();
  const isAuthPage = location.pathname === '/' || location.pathname === '/forgot-password';
  const isSuperAdminPage = location.pathname.startsWith('/super_admin');
  const isPenggunaPage = location.pathname.startsWith('/pengguna');

  return (
    <>
      {/* Menampilkan Navbar yang berbeda berdasarkan halaman */}
      {!isAuthPage && isSuperAdminPage && <Navbar />}
      {!isAuthPage && isPenggunaPage && <NavbarPengguna />}

      <Routes>
        {/* Route Super Admin */}
        <Route path="/" element={<Login />} /> {/* Halaman login di URL default */}
        <Route path="/super_admin/forgot-password" element={<ForgotPassword />} /> {/* Route untuk halaman lupa password */}
        <Route path="/super_admin/dashboard" element={<Dashboard />} />
        <Route path="/super_admin/tracerstudy" element={<Tracer />} />
        <Route path="/super_admin/tracerstudyadd" element={<TracerAdd />} />
        <Route path="/super_admin/tracerstudy-golongan-kegiatan" element={<TracerGolongan />} />
        <Route path="/super_admin/tracerstudy-bank-soal" element={<TracerBankSoal />} />
        <Route path="/super_admin/tracerstudy-verifikasi-akhir" element={<TracerVerifikasi />} />
        <Route path="/super_admin/tracerstudy-preview" element={<TracerPreview />} />
        <Route path="/super_admin/kampus" element={<Kampus />} />
        <Route path="/super_admin/kampusedit" element={<KampusEdit />} />
        <Route path="/super_admin/user" element={<User />} />
        <Route path="/super_admin/arsippengaduan" element={<ArsipPengaduan />} />
        <Route path="/super_admin/arsiptracer" element={<ArsipTracer />} />
        <Route path="/super_admin/pusatbantuan" element={<PusatBantuan />} />
        <Route path="/super_admin/profile" element={<Profile />} />
        <Route path="/super_admin/psdku" element={<Psdku />} />
        <Route path="/super_admin/programstudy" element={<Programstudy />} />

        {/* Route Pengguna */}
        <Route path="/pengguna/dashboard" element={<DashboardPengguna />} />
      </Routes>
      
      {/* Hanya tampilkan Footer jika bukan halaman login/forgot-password */}
      {!isAuthPage && <Footer />}
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

import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

// Import Bagian Super Admin
import Login from './components/login';
import ForgotPassword from './pages/super_admin/forgot-password';
import Dashboard from './pages/super_admin/dashboard';
import Tracer from './pages/super_admin/tracerstudy';
import TracerAdd from './pages/super_admin/tracerstudyadd';
import TracerGolongan from './pages/super_admin/tracerstudy-golongan-kegiatan';
import TracerBankSoal from './pages/super_admin/tracerstudy-bank-soal';
import TracerVerifikasi from './pages/super_admin/tracerstudy-verifikasi-akhir';
import TracerPreview from './pages/super_admin/tracerstudy-preview';
import TracerPreviewKuesioner from './pages/super_admin/tracerstudy-preview-kuesioner';
import TracerPreviewResponden from './pages/super_admin/tracerstudy-preview-responden';
import Kampus from './pages/super_admin/kampus';
import KampusEdit from './pages/super_admin/kampusedit';
import User from './pages/super_admin/user';
import ArsipPengaduan from './pages/super_admin/arsippengaduan';
import ArsipTracer from './pages/super_admin/arsiptracer';
import PusatBantuan from './pages/super_admin/pusatbantuan';
import Profile from './pages/super_admin/profile';
import Programstudy from './pages/super_admin/programstudy';
import Psdku from './pages/super_admin/psdku';

// Import Bagian Pengguna
import DashboardPengguna from './pages/pengguna/dashboard';
import TracerStudy from './pages/pengguna/tracerstudy';
import FormTracer from './pages/pengguna/formtracer';
import InfoKampus from './pages/pengguna/kampus';
import PusatBantuanPengguna from './pages/pengguna/pusatbantuan'
import ProfilePengguna from './pages/pengguna/profile';
import Navbar from './components/navbar';
import NavbarPengguna from './components/navbarPengguna';
import Footer from './components/footer';

function AppContent() {
  const location = useLocation();
  const isAuthPage = location.pathname === '/' || location.pathname === '/super_admin/forgot-password' || location.pathname === '/pengguna/formtracer';
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
        <Route path="/super_admin/tracerstudy-preview-kuesioner" element={<TracerPreviewKuesioner />} />
        <Route path="/super_admin/tracerstudy-preview-responden" element={<TracerPreviewResponden />} />
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
        <Route path="/pengguna/tracerstudy" element={<TracerStudy />} />
        <Route path="/pengguna/kampus" element={<InfoKampus />} />
        <Route path="/pengguna/pusatbantuan" element={<PusatBantuanPengguna />} />
        <Route path="/pengguna/profile" element={<ProfilePengguna />} />
        <Route path="/pengguna/formtracer" element={<FormTracer />} />
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

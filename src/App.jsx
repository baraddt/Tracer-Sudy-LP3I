import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
// import './services/axios';

// component
import Pdf from './components/pdf';

// Import Bagian Super Admin
import Navbar from './components/navbar';
import Login from './components/login';
import ForgotPassword from './pages/super_admin/forgot-password';
import Dashboard from './pages/super_admin/dashboard';
import Tracer from './pages/super_admin/tracerstudy';
import TracerAdd from './pages/super_admin/tracerstudyadd';
import TracerGolongan from './pages/super_admin/tracerstudy-golongan-kegiatan';
import TracerBankSoal from './pages/super_admin/tracerstudy-bank-soal';
import TracerVerifikasi from './pages/super_admin/tracerstudy-verifikasi-akhir';
import TracerPreview from './pages/super_admin/tracerstudy-preview';
import GetTracerPreview from './pages/super_admin/tracerstudy-getpreview';
import GetTracerPreviewKuesioner from './pages/super_admin/tracerstudy-getpreview-kuesioner';
import GetTracerPreviewResponden from './pages/super_admin/tracerstudy-getpreview-responden';
import GetTracerPreviewKriteria from './pages/super_admin/tracerstudy-getpreview-kriteria';
import TracerPreviewKuesioner from './pages/super_admin/tracerstudy-preview-kuesioner';
import TracerPreviewResponden from './pages/super_admin/tracerstudy-preview-responden';
import TracerEdit from './pages/super_admin/tracerstudy-edit';
import TracerEditSkala from './pages/super_admin/tracerstudy-editskala';
import Kampus from './pages/super_admin/kampus';
import KampusEdit from './pages/super_admin/kampusedit';
import User from './pages/super_admin/user';
import ArsipPengaduan from './pages/super_admin/arsippengaduan';
import ArsipTracer from './pages/super_admin/arsiptracer';
import PusatBantuan from './pages/super_admin/pusatbantuan';
import Profile from './pages/super_admin/profile';
import Programstudy from './pages/super_admin/programstudy';
import Psdku from './pages/super_admin/psdku';
import Footer from './components/footer';


// import bagian admin
import NavbarAdmin from './components/navbarAdmin';
import DashboardAdmin from './pages/admin/dashboard';
import TracerStudyAdmin from './pages/admin/tracerstudy';
import TracerAddAdmin from './pages/admin/traceradd';
import TracerSkala from './pages/admin/tracerskala';
import TracerBankSoalAdmin from './pages/admin/tracerbanksoal';
import TracerAtensi from './pages/admin/traceratensi';
import TracerPreviewAdmin from './pages/admin/tracerpreview';
import PreviewKueionser from './pages/admin/tracer-preview-kuesioner';
import PreviewResponden from './pages/admin/tracer-preview-responden';
import KampusAdmin from './pages/admin/kampus';
import ProgramStudyAdmin from './pages/admin/programstudy';
import AddAdmin from './pages/admin/addadmin';
import AddMahasiswa from './pages/admin/addmahasiswa';
import ArsipPengaduanAdmin from './pages/admin/arsippengaduan';
import ArsipTracerAdmin from './pages/admin/arsiptracer';
import ProfileAdmin from './pages/admin/profile';
import PusatBantuanAdmin from './pages/admin/pusatbantuan';

// Import Bagian Pengguna
import LoginPengguna from './components/loginPengguna';
import DashboardPengguna from './pages/pengguna/dashboard';
import TracerStudy from './pages/pengguna/tracerstudy';
import FormTracer from './pages/pengguna/formtracer';
import InfoKampus from './pages/pengguna/kampus';
import PusatBantuanPengguna from './pages/pengguna/pusatbantuan'
import ProfilePengguna from './pages/pengguna/profile';
import NavbarPengguna from './components/navbarPengguna';
import loginPengguna from './components/loginPengguna';

function AppContent() {
  const location = useLocation();
  const isAuthPage = location.pathname === '/' || location.pathname === '/super_admin/forgot-password' || location.pathname === '/pengguna/formtracer' || location.pathname === '/pdf' || location.pathname === '/p';
  const isSuperAdminPage = location.pathname.startsWith('/super_admin');
  const isAdminPage = location.pathname.startsWith('/admin');
  const isPenggunaPage = location.pathname.startsWith('/pengguna');

  return (
    <>
      {/* Menampilkan Navbar yang berbeda berdasarkan halaman */}
      {!isAuthPage && isSuperAdminPage && <Navbar />}
      {!isAuthPage && isAdminPage && <NavbarAdmin />}
      {!isAuthPage && isPenggunaPage && <NavbarPengguna />}

      <Routes>
        {/* component route */}
        <Route path="pdf" element={<Pdf />} />

        {/* Route Super Admin */}
        <Route path="/" element={<Login />} /> {/* Halaman login di URL default */}
        <Route path="/loginPengguna" element={<loginPengguna />} /> {/* Halaman login di URL default */}
        <Route path="/super_admin/forgot-password" element={<ForgotPassword />} /> {/* Route untuk halaman lupa password */}
        <Route path="/super_admin/dashboard" element={<Dashboard />} />
        <Route path="/super_admin/tracerstudy" element={<Tracer />} />
        <Route path="/super_admin/tracerstudyadd" element={<TracerAdd />} />
        <Route path="/super_admin/tracerstudy-golongan-kegiatan" element={<TracerGolongan />} />
        <Route path="/super_admin/tracerstudy-bank-soal" element={<TracerBankSoal />} />
        <Route path="/super_admin/tracerstudy-verifikasi-akhir" element={<TracerVerifikasi />} />
        <Route path="/super_admin/tracerstudy-preview" element={<TracerPreview />} />
        <Route path="/super_admin/tracerstudy-getpreview/:id" element={<GetTracerPreview />} />
        <Route path="/super_admin/tracerstudy-getpreview-kuesioner/:id" element={<GetTracerPreviewKuesioner />} />
        <Route path="/super_admin/tracerstudy-getpreview-responden/:id" element={<GetTracerPreviewResponden />} />
        <Route path="/super_admin/tracerstudy-getpreview-kriteria/:id" element={<GetTracerPreviewKriteria />} />
        <Route path="/super_admin/tracerstudy-edit/:id" element={<TracerEdit />} />
        <Route path="/super_admin/tracerstudy-editskala" element={<TracerEditSkala />} />
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


        {/* Route Admin */}
        <Route path="/admin/dashboard" element={<DashboardAdmin />} />
        <Route path="/admin/tracerstudy" element={<TracerStudyAdmin />} />
        <Route path="/admin/traceradd" element={<TracerAddAdmin />} />
        <Route path="/admin/tracerskala" element={<TracerSkala />} />
        <Route path="/admin/tracerbanksoal" element={<TracerBankSoalAdmin />} />
        <Route path="/admin/traceratensi" element={<TracerAtensi />} />
        <Route path="/admin/tracerpreview" element={<TracerPreviewAdmin />} />
        <Route path="/admin/tracer-preview-kuesioner" element={<PreviewKueionser />} />
        <Route path="/admin/tracer-preview-responden" element={<PreviewKueionser />} />
        <Route path="/admin/previewresponden" element={<PreviewResponden />} />
        <Route path="/admin/kampus" element={<KampusAdmin />} />
        <Route path="/admin/programstudy" element={<ProgramStudyAdmin />} />
        <Route path="/admin/addadmin" element={<AddAdmin />} />
        <Route path="/admin/addmahasiswa" element={<AddMahasiswa />} />
        <Route path="/admin/arsippengaduan" element={<ArsipPengaduanAdmin />} />
        <Route path="/admin/arsiptracer" element={<ArsipTracerAdmin />} />
        <Route path="/admin/pusatbantuan" element={<PusatBantuanAdmin />} />
        <Route path="/admin/profile" element={<ProfileAdmin />} />

        {/* Route Pengguna */}
        <Route path="/p" element={<LoginPengguna />} />
        <Route path="/pengguna/dashboard" element={<DashboardPengguna />} />
        <Route path="/pengguna/tracerstudy" element={<TracerStudy />} />
        <Route path="/pengguna/kampus" element={<InfoKampus />} />
        <Route path="/pengguna/pusatbantuan" element={<PusatBantuanPengguna />} />
        <Route path="/pengguna/profile" element={<ProfilePengguna />} />
        <Route path="/pengguna/formtracer/:id_tracer" element={<FormTracer />} />
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

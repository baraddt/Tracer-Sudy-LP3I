import { useState, useEffect } from 'react';

export default function () {
    const [userName, setUserName] = useState('');
    const [nim, setNim] = useState('');
    const [email, setEmail] = useState('');
    const [kondisi, setKondisi] = useState('')

    useEffect(() => {
        // Ambil data user dari localStorage
        const userData = localStorage.getItem('user');
        if (userData) {
            const user = JSON.parse(userData); // Urai JSON menjadi objek
            setUserName(user.nama || 'Pengguna'); // Pastikan ada fallback jika nama tidak tersedia
            setNim(user.nim || 'N/A'); // Fallback kalau nip nggak ada
            setEmail(user.email || 'N/A'); // Fallback kalau email nggak ada
        }
    }, []);

    useEffect(() => {
        // Ambil data user dari localStorage
        const formData = localStorage.getItem('formData');
        if (formData) {
            const form = JSON.parse(formData); // Urai JSON menjadi objek
            setKondisi(form.kondisi || '-'); // Pastikan ada fallback jika nama tidak tersedia
        }
    }, []);

    const [showPassword, setShowPassword] = useState(false); // State untuk visibility password

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const password = 'Waduh123';

    const [showModal, setShowModal] = useState(false);

    // Function untuk membuka modal
    const openEditModal = () => {
        setShowModal(true);
    };

    // Function untuk menutup modal
    const closeEditModal = () => {
        setShowModal(false);
    };

    return (
        <div className="container mt-4">

            <div className="row">
                {/* Right Section */}
                <div className="col-md-5">
                    <div className="d-flex bg-white">
                        <div className="p-2">
                            <img className="rounded-circle" src="/photo-profil.jpg" alt="" width='auto' height='100px' />
                        </div>
                        <div className="row p-2 mt-2">
                            <span>{userName}</span>
                            <span>{nim}</span>
                            <span>Politeknik LP3I Tasikmalaya</span>
                        </div>
                    </div>

                    <div className="d-flex justify-content-between bg-white mt-4 p-3 rounded me-3 col-12">
                        <div className="me-5 col-5">
                            <h4>Info Pribadi</h4>
                            <h6 className="mt-5">Program Study</h6>
                            <h6 className="mt-4">Jenjang</h6>
                            <h6 className="mt-4">Jenis Kelamin</h6>
                            <h6 className="mt-4">Email</h6>
                            <h6 className="mt-4">Password</h6>
                            <h6 className="mt-4">Tempat tgl Lahir</h6>
                            <h6 className="mt-4">Alamat</h6>
                        </div>
                        <div className="text-secondary mt-5 col-6">
                            <h6 className="mt-sm-3">Manajement Informatika</h6>
                            <h6 className="mt-4">D3</h6>
                            <h6 className="mt-4">Laki Laki</h6>
                            <h6 className="mt-4 text-truncate">{email}</h6>
                            <div className="input-group mt-4 d-flex justify-content-between">
                                <span className="me-2">
                                    {showPassword ? password : '●●●●●●●●'} {/* Tampilkan password atau hidden */}
                                </span>
                                <button
                                    type="button"
                                    className="border-0 bg-transparent" // Tombol mata pakai Bootstrap
                                    onClick={togglePasswordVisibility}
                                >
                                    {showPassword ? <i class="bi bi-eyeglasses"></i>
                                        : '👀'} {/* Ganti emoji kalau mau */}
                                </button>
                            </div>
                            <h6 className="mt-4">30 April 2019</h6>
                            <h6 className="mt-4 text-truncate">
                                Jl. Pahlawan No.59, Sukaluyu,Kec. Cibeunying Kaler, Kota Bandung, Jawa Barat 40123
                            </h6>
                        </div>
                    </div>
                </div>
                {/* Left Section */}
                <div className="col-md-7">
                    <div className="form-container p-4 rounded shadow-sm bg-white">
                        <div className="mb-4">
                            <h4>Info Status</h4> <hr />
                            <div className="row-cols-2 gap-3">
                                <label>Program Study</label>
                                <label>Kondisi Saat Ini</label>
                                <label className="mt-1 text-secondary">Manajement Informatika</label>
                                <label className="mt-1 text-secondary">{kondisi}</label>
                                <label className="mt-5">Bidang Pekerjaan</label>
                                <label>Kategori Pekerjaan</label>
                                <label className="mt-1 text-secondary">Teknik Informasi</label>
                                <label className="mt-1 text-secondary">IT Support</label>
                                <label className="mt-5">Jenis Pekerjaan</label>
                                <label>Status Pekerjaan</label>
                                <label className="mt-1 text-secondary">Software Developer</label>
                                <label className="mt-1 text-secondary">Part Time</label>
                            </div>
                        </div>
                    </div>
                    <div className="text-end">
                        <button className="btn btn-primary mt-2" onClick={openEditModal}>
                            Edit Profil
                        </button>
                    </div>
                </div>
            </div>
            {/* Modal */}
            {showModal && (
                <div className="modal fade show d-block" tabIndex="-1">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Edit Profil</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={closeEditModal}
                                ></button>
                            </div>
                            <div className="modal-body">
                                {/* Form Edit Profil */}
                                <form>
                                    <div className="row mb-3">
                                        <div className="col-md-6">
                                            <label htmlFor="nama" className="form-label">
                                                Nama
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="nama"
                                                defaultValue="Atep Bootstrap"
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="jenisKelamin" className="form-label">
                                                Jenis Kelamin
                                            </label>
                                            <select className="form-select" id="jenisKelamin">
                                                <option defaultValue>Tidak diketahui</option>
                                                <option>Laki-laki</option>
                                                <option>Perempuan</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-md-6">
                                            <label htmlFor="nim" className="form-label">
                                                NIM
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="nim"
                                                defaultValue="20232022"
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="jenjang" className="form-label">
                                                Jenjang
                                            </label>
                                            <select className="form-select" id="jenjang">
                                                <option defaultValue>Diploma 3 (D3)</option>
                                                <option>Diploma 4 (D4)</option>
                                                <option>Sarjana (S1)</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-md-6">
                                            <label htmlFor="email" className="form-label">
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                className="form-control"
                                                id="email"
                                                defaultValue="waasdih@gmail.com"
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="pendidikan" className="form-label">
                                                Pendidikan
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="pendidikan"
                                                defaultValue="Politeknik LP3I Tasikmalaya"
                                            />
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-md-6">
                                            <label htmlFor="ttl" className="form-label">
                                                TTL
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="ttl"
                                                defaultValue="London, 23 Desember 2023"
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="alamat" className="form-label">
                                                Alamat
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="alamat"
                                                defaultValue="Jalan Garut Subarto No. 246, Kota Bandung, Jawa Barat, 40273"
                                            />
                                        </div>
                                    </div> <hr />
                                    <h6 className="mt-4 mb-3">Edit Informasi Status</h6>
                                    <div className="row mb-3">
                                        <div className="col-md-6">
                                            <label htmlFor="programStudi" className="form-label">
                                                Program Studi
                                            </label>
                                            <select className="form-select" id="programStudi">
                                                <option defaultValue>Manajemen Informatika</option>
                                            </select>
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="kondisiSaatIni" className="form-label">
                                                Kondisi Saat Ini
                                            </label>
                                            <select className="form-select" id="kondisiSaatIni">
                                                <option defaultValue>Bekerja</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-md-6">
                                            <label htmlFor="bidangPekerjaan" className="form-label">
                                                Bidang Pekerjaan
                                            </label>
                                            <select className="form-select" id="bidangPekerjaan">
                                                <option defaultValue>Teknologi Informasi</option>
                                            </select>
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="kategoriPekerjaan" className="form-label">
                                                Kategori Pekerjaan
                                            </label>
                                            <select className="form-select" id="kategoriPekerjaan">
                                                <option defaultValue>Teknik dan IT</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-md-6">
                                            <label htmlFor="jenisPekerjaan" className="form-label">
                                                Jenis Pekerjaan
                                            </label>
                                            <select className="form-select" id="jenisPekerjaan">
                                                <option defaultValue>Developer Software</option>
                                            </select>
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="statusPekerjaan" className="form-label">
                                                Status Pekerjaan
                                            </label>
                                            <select className="form-select" id="statusPekerjaan">
                                                <option defaultValue>Pekerja Tetap</option>
                                            </select>
                                        </div>
                                    </div>
                                    <small className="text-muted">
                                        *Jika Bidang, Kategori, Jenis Pekerjaan di atas tidak ada
                                        yang sesuai dengan yang Anda jalani, Maka pilih yang hampir
                                        sesuai (Mendekati).
                                    </small>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={closeEditModal}
                                >
                                    Batal
                                </button>
                                <button type="button" className="btn btn-success">
                                    Update
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
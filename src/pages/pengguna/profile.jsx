import { useState, useEffect } from 'react';

export default function () {
    const [userName, setUserName] = useState('');
    const [nim, setNim] = useState('');
    const [email, setEmail] = useState('');

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

    const [showPassword, setShowPassword] = useState(false); // State untuk visibility password

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const password = 'Waduh123';

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
                            <h6 className="mt-4">{email}</h6>
                            <div className="input-group mt-4 d-flex justify-content-between">
                                <span className="me-2">
                                    {showPassword ? password : '●●●●●●●●'} {/* Tampilkan password atau hidden */}
                                </span>
                                <button
                                    type="button"
                                    className="border-0 bg-transparent" // Tombol mata pakai Bootstrap
                                    onClick={togglePasswordVisibility}
                                >
                                    {showPassword ? '🙈' : '👁️'} {/* Ganti emoji kalau mau */}
                                </button>
                            </div>
                            <h6 className="mt-4">30 April 2019</h6>
                            <h6 className="mt-4">
                                Jl. Pahlawan No.59, Sukaluyu, <br />
                                Kec. Cibeunying Kaler, <br /> Kota Bandung, Jawa Barat 40123
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
                                <label className="mt-1 text-secondary">Bekerja</label>
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
                        <button className="mt-2 btn btn-success">Edit Profil</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
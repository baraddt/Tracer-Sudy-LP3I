import React, { useState, useEffect } from 'react';

export default function () {
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        // Timer untuk menampilkan modal setelah 5 detik
        const timer = setTimeout(() => {
            setIsModalOpen(true);
        }, 5000);

        // Clear timeout jika user berpindah dari halaman dashboard sebelum 5 detik
        return () => clearTimeout(timer);
    }, []);

    const handleClickOutside = (event) => {
        const modalElement = document.querySelector('.modal-dialog');
        if (modalElement && !modalElement.contains(event.target)) {
            setIsModalOpen(false);  // Menutup modal jika klik di luar modal
        }
    };

    useEffect(() => {
        // Menambahkan event listener ketika modal terbuka
        if (isModalOpen) {
            document.addEventListener('click', handleClickOutside);
        }

        // Membersihkan event listener ketika modal ditutup
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [isModalOpen]);


    return (
        <div className="container mt-1">
            <div className="row rounded bg-white p-3 align-items-center"
                style={{
                    backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('/background-pengguna.jpg')",
                    backgroundSize: 'cover',
                    width: 'auto',
                    height: '520px',
                    backgroundPosition: "top",
                    color: "white",
                }}>

                <div>
                    <h3>Ayo Berpartisipasi di <br />
                        Tracer Study LP3I !
                    </h3>
                    <p>"Masa Lalu Tercatat, Masa Depan Terarah"</p>
                </div>
            </div>
            <div className="mt-4">
                <h4>Daftar Kegiatan Tracer Study</h4>
            </div>
            <div className="d-flex gap-5 justify-content-center mt-4">

                {/* Card Total Responden */}
                <div className="card col-md-2 d-flex align-items-center justify-content-center p-2 shadow-sm text-white" style={{ backgroundColor: '#00426D' }}>
                    <div className="d-flex align-items-center">
                        <i className="bi bi-clock-fill display-6 me-3" style={{ fontSize: '2rem' }}></i>
                        <div className="text-start">
                            <h6 className="rounded bg-primary bg-opacity-50 p-1"><i className="bi bi-circle-fill me-2"></i>Berlangsung</h6>
                            <h6 className="mt-4"><i className="bi bi-4-square display-6 me-2"></i>Kuesioner</h6>
                        </div>
                    </div>
                </div>

                {/* Card Bekerja */}
                <div className="card col-md-2 d-flex align-items-center justify-content-center p-2 shadow-sm text-white" style={{ backgroundColor: '#F7964B' }}>
                    <div className="d-flex align-items-center">
                        <i className="bi bi-calendar4 display-6 me-3" style={{ fontSize: '2rem' }}></i>
                        <div className="text-start">
                            <h6 className="rounded bg-warning bg-opacity-50 p-1"><i className="bi bi-circle-fill me-2"></i>Akan Datang</h6>
                            <h6 className="mt-4"><i className="bi bi-5-square display-6 me-2"></i>Kuesioner</h6>
                        </div>
                    </div>
                </div>

                {/* Card Wiraswasta */}
                <div className="card col-md-2 d-flex align-items-center justify-content-center p-2 shadow-sm text-white" style={{ backgroundColor: '#E80000' }}>
                    <div className="d-flex align-items-center">
                        <i className="bi bi-hourglass-bottom display-2 me-3" style={{ fontSize: '2rem' }}></i>
                        <div className="text-start">
                            <h6 className="rounded bg-danger p-1"><i className="bi bi-circle-fill me-2"></i>Berakhir</h6>
                            <h6 className="mt-4"><i className="bi bi-4-square display-6 me-2"></i>Kuesioner</h6>
                        </div>
                    </div>
                </div>

                {/* Card Mencari Kerja */}
                <div className="card col-md-2 d-flex align-items-center justify-content-center p-2 shadow-sm text-white" style={{ backgroundColor: '#0AB39C' }}>
                    <div className="d-flex align-items-center">
                        <i className="bi bi-check2-all display-6 me-3" style={{ fontSize: '2rem' }}></i>
                        <div className="text-start">
                            <h6 className="rounded bg-success bg-opacity-50 p-1"><i className="bi bi-circle-fill me-2"></i>Selesai</h6>
                            <h6 className="mt-4"><i className="bi bi-1-square display-6 me-2"></i>Kuesioner</h6>
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-center mt-4">
                <button className="btn btn-success">Selengkapnya</button>
            </div>
            {/* Modal inline dengan Bootstrap */}
            {isModalOpen && (
                <div className="modal show fade" style={{ display: 'block' }} tabIndex="-1">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Sebelum Melanjutkan Isi Formulir Dulu YA</h5>
                                <button type="button" className="btn-close" onClick={() => setIsModalOpen(false)} aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="row">
                                        {/* Kolom Kiri */}
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label htmlFor="nama" className="form-label">Program Study :</label>
                                                <select className="form-select" id="prodi" name="prodi">
                                                    <option value="">Pilih Program Study</option>
                                                    <option value="Manajement Informatika">Manajement Informatika</option>
                                                    <option value="Administrasi Bisnis">Administrasi Bisnis</option>
                                                    <option value="Manajement Perbangkan">Manajement Perbangkan</option>
                                                    <option value="Manajement Pemasaran">Manajement Pemasaran</option>
                                                    <option value="Bisnis Digital">Bisnis Digital</option>
                                                </select>
                                            </div>

                                            <div className="mb-3">
                                                <label htmlFor="email" className="form-label">Kondisi Saat Ini :</label>
                                                <select className="form-select" id="kondisi" name="kondisi">
                                                    <option value="">Pilih Kondisi</option>
                                                    <option value="Bekerja">Bekerja</option>
                                                    <option value="Wiraswasta">Wiraswasta</option>
                                                    <option value="Mencari Kerja">Mencari Kerja</option>
                                                    <option value="Melanjutkan Program Study">Melanjutkan Program Study</option>
                                                </select>
                                            </div>

                                            <div className="mb-3">
                                                <label htmlFor="telepon" className="form-label">Bidang Pekerjaan :</label>
                                                <select className="form-select" id="bidang" name="bidang">
                                                    <option value="">Pilih Bidang</option>
                                                    <option value="Teknik Informasi">Teknik Informasi</option>
                                                    <option value="Keuangan dan Akuntansi">Keuangan dan Akuntansi</option>
                                                    <option value="Pemasaran dan Penjualan">Pemasaran dan Penjualan</option>
                                                    <option value="Sumber Daya Manusia">Sumber Daya Manusia</option>
                                                    <option value="Kesehatan">Kesehatan</option>
                                                </select>
                                            </div>
                                        </div>

                                        {/* Kolom Kanan */}
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label htmlFor="department" className="form-label">Kategori Pekerjaan :</label>
                                                <select className="form-select" id="kategoriPekerjaan" name="kategoriPekerjaan">
                                                    <option value="">Pilih Kategori</option>
                                                    <option value="Full-time">Full-time</option>
                                                    <option value="Part-time">Part-time</option>
                                                    <option value="Kontrak">Kontrak</option>
                                                    <option value="Freelance">Freelance</option>
                                                    <option value="Magang">Magang</option>
                                                </select>
                                            </div>

                                            <div className="mb-3">
                                                <label htmlFor="position" className="form-label">Jenis Pekerjaan :</label>
                                                <select className="form-select" id="jenispekerjaan" name="jenispekerjaan">
                                                    <option value="">Pilih Jenis Pekerjaan</option>
                                                    <option value="Pengembangan Perangkat Lunak">Pengembangan Perangkat Lunak</option>
                                                    <option value="Desain Grafis">Desain Grafis</option>
                                                    <option value="Manajemen Proyek">Manajemen Proyek</option>
                                                    <option value="Analisis Data">Analisis Data</option>
                                                    <option value="Customer Support">Customer Support</option>
                                                </select>
                                            </div>

                                            <div className="mb-3">
                                                <label htmlFor="status" className="form-label">Status Pekerjaan :</label>
                                                <select className="form-select" id="status" name="status">
                                                    <option value="">Pilih Status</option>
                                                    <option value="Active">Active</option>
                                                    <option value="Inactive">Inactive</option>
                                                    <option value="Pending">Pending</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <button type="submit" className="btn btn-primary">Submit</button>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>Tutup</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
import { useState } from "react";

export default function () {
    const [showModalEdit, setShowModalEdit] = useState(false);

    const openEditModal = () => {
        setShowModalEdit(true);
    }


    return (
        <div className="container mt-4">
            <div
                className="row rounded bg-white p-3 align-items-center"
                style={{
                    backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/covercampus.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    color: "white",
                }}
            >
                {/* Foto di Kiri */}
                <div className="d-flex mt-2 text-center justify-content-between">
                    <h4>Profile</h4>
                    <button className="mt-6 border rounded p-2  bg-success bg-opacity-75 text-light" type="button" onClick={() => openEditModal()}>Edit Informasi</button>
                </div>
            </div>
            <div className="container mt-2">
                <div className="d-flex justify-content-between">
                    {/* Info di Kiri */}
                    <div
                        className="align-items-center bg-light p-2 rounded me-3"
                        style={{ flex: 1 }} // Mengatur proporsi ukuran Info
                    >
                        <h4>Info</h4>
                        <div className="me-5">
                            <div className='ms-6'>
                                <img src="/photo-profil.jpg" className='rounded-circle' alt="" width='150px' height='auto' />
                            </div>
                        </div>
                        <div className='d-flex justify-content-between'>
                            <div className="me-5">
                                <h6 className="mt-4">Nama</h6>
                                <h6 className="mt-4">Role</h6>
                                <h6 className="mt-4">Jabatan</h6>
                                <h6 className="mt-4">Pendidikan</h6>
                                <h6 className="mt-4">NIP</h6>
                                <h6 className="mt-4">Email</h6>
                            </div>
                            <div className="text-secondary mt-2">
                                <h6 className="mt-4">Atep</h6>
                                <h6 className="mt-4">Super Admin</h6>
                                <h6 className="mt-4">Rektor</h6>
                                <h6 className="mt-4">Politeknik LP3I Tasikmalaya</h6>
                                <h6 className="mt-4">203232281 1283</h6>
                                <h6 className="mt-4">atep@gmail.com</h6>
                            </div>
                        </div>
                    </div>

                    {/* About di Kanan */}
                    <div className="bg-light p-2 rounded" style={{ flex: 2 }}>
                        <h4 className="mt-2">About</h4>
                        <h6
                            className="text-secondary"
                            style={{ lineHeight: "1.6", marginBottom: "1rem", fontSize: '14px' }}
                        >
                            Nama saya Atep, dan saya menjabat sebagai Rektor Kampus LP3I Tasikmalaya.
                            Saya memiliki dedikasi yang tinggi dalam bidang pendidikan dan berkomitmen
                            untuk meningkatkan kualitas pembelajaran di kampus kami. Dalam peran ini,
                            saya bertanggung jawab memastikan mahasiswa mendapatkan pendidikan yang relevan
                            dan berkualitas.

                            <br /><br />

                            Sebagai pimpinan kampus, saya berusaha mempersiapkan mahasiswa untuk sukses,
                            baik dalam karier maupun kehidupan mereka. Melalui berbagai program dan pendekatan
                            yang inovatif, saya dan tim berfokus untuk memberikan lingkungan belajar yang mendukung
                            pengembangan keterampilan dan potensi mereka.

                            <br /><br />

                            Di luar pekerjaan, saya memiliki minat yang kuat dalam olahraga, terutama bermain
                            sepak bola, serta musik. Kedua hobi ini memberikan keseimbangan dan menyegarkan pikiran,
                            membantu saya tetap produktif dan bersemangat dalam menjalankan tugas sebagai rektor.
                        </h6>

                    </div>
                </div>
            </div>
            {/* Edit Profile */}
            {showModalEdit && (
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

    );
}

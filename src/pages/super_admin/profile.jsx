import { useState } from "react";

export default function () {
    const [showModalEdit, setShowModalEdit] = useState(false);

    const openEditModal = () => {
        setShowModalEdit(true);
    }
    const closeEditModal = () => {
        setShowModalEdit(false);
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
                    <div className="modal-dialog modal-dialog-centered modal-lg mt-5 mb-5">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="editProfileModalLabel">Edit Profil</h5>
                                <button type="button" onClick={() => closeEditModal()} class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                {/* <!-- Foto Profil --> */}
                                <div class="text-center mb-4">
                                    <img src="/photo-profil.jpg" className='rounded-circle me-2' alt="" width='150px' height='auto' />
                                    <button class="btn btn-outline-secondary btn-sm">
                                        <i class="bi bi-camera"></i>
                                    </button>
                                </div>

                                {/* <!-- Form --> */}
                                <form>
                                    <div class="row mb-3">
                                        {/* <!-- Nama --> */}
                                        <div class="col-md-6">
                                            <label for="name" class="form-label">Nama</label>
                                            <input type="text" id="name" class="form-control" placeholder="Nama" value="Atep" />
                                        </div>
                                        {/* <!-- Role --> */}
                                        <div class="col-md-6">
                                            <label for="role" class="form-label">Role</label>
                                            <input type="text" id="role" class="form-control" value="Super Admin" readonly />
                                        </div>
                                    </div>

                                    <div class="row mb-3">
                                        {/* <!-- Jabatan --> */}
                                        <div class="col-md-6">
                                            <label for="jabatan" class="form-label">Jabatan</label>
                                            <input type="text" id="jabatan" class="form-control" placeholder="Jabatan" value="IT Support" />
                                        </div>
                                        {/* <!-- NIP --> */}
                                        <div class="col-md-6">
                                            <label for="nip" class="form-label">NIP</label>
                                            <input type="text" id="nip" class="form-control" placeholder="NIP" value="19830930 201003 1 003" />
                                        </div>
                                    </div>

                                    <div class="mb-3">
                                        {/* <!-- Email --> */}
                                        <label for="email" class="form-label">Email</label>
                                        <input type="email" id="email" class="form-control" placeholder="Email" value="Atep@example.com" />
                                    </div>

                                    <div class="mb-3">
                                        {/* <!-- Pendidikan --> */}
                                        <label for="education" class="form-label">Pendidikan</label>
                                        <input type="text" id="education" class="form-control" placeholder="Pendidikan" value="Universitas Indonesia" />
                                    </div>

                                    <div class="mb-3">
                                        {/* <!-- About --> */}
                                        <label for="about" class="form-label">About</label>
                                        <textarea id="about" class="form-control" rows="3">IT Support Kampus bertugas untuk memastikan operasional teknologi informasi di lingkungan kampus berjalan lancar dan efisien. Tim ini memberikan dukungan teknis kepada dosen</textarea>
                                    </div>
                                </form>
                            </div>
                            <div class="modal-footer">
                                <button type="button" onClick={() => closeEditModal()} class="btn btn-danger" data-bs-dismiss="modal">Batal</button>
                                <button type="button" class="btn btn-success">Update</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>

    );
}

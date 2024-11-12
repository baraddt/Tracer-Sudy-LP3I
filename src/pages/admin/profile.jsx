import { Link } from 'react-router-dom';

export default function () {
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
                    <button className="mt-6 border rounded p-2  bg-success bg-opacity-75 text-light" type="button">Edit Informasi</button>
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
                            style={{ lineHeight: "1.6", marginBottom: "1rem", fontSize: '14px'}}
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
        </div>

    );
}
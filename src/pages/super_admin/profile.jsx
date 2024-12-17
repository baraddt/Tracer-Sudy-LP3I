import { useState, useEffect } from 'react';
import getRoleName from '../../services/roleCheck';


export default function () {
    const [userName, setUserName] = useState('');
    const [roleName, setRoleName] = useState('');
    const [nip, setNip] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        // Ambil data user dari localStorage
        const userData = localStorage.getItem('user');
        if (userData) {
            const user = JSON.parse(userData); 
            setUserName(user.nama || 'Pengguna'); 
            setRoleName(getRoleName(user.role)); 
            setNip(user.nip || 'N/A'); 
            setEmail(user.email || 'N/A'); 
        }
    }, []);

    return (
        <div className="container mt-4" style={{ paddingLeft: '24px', paddingRight: '24px' }}>
            <div
                className="row rounded bg-white p-3 align-items-center"
                style={{
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    color: "white",
                }}
            >
                {/* Foto di Kiri */}
                <div className="d-flex mt-2 text-center justify-content-between">
                    <h4 className='text-dark'>Profile</h4>
                    <button className="mt-6 btn btn-success" type="button">Edit Informasi</button>
                </div>
            </div>
            <div className="container mt-2">
                <div className="d-row d-md-flex d-sm-row justify-content-between">
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
                                <h6 className="mt-4">{userName}</h6>
                                <h6 className="mt-4">{roleName}</h6>
                                <h6 className="mt-4">Rektor</h6>
                                <h6 className="mt-4">Politeknik LP3I Tasikmalaya</h6>
                                <h6 className="mt-4">{nip}</h6>
                                <h6 className="mt-4">{email}</h6>
                            </div>
                        </div>
                    </div>

                    {/* About di Kanan */}
                    <div className="bg-light p-2 rounded mt-sm-4 mt-md-0 mt-4" style={{ flex: 2 }}>
                        <h4 className="mt-2">About</h4>
                        <h6
                            className="text-secondary"
                            style={{ lineHeight: "1.6", marginBottom: "1rem", fontSize: '14px' }}
                        >
                            Nama saya {userName}, dan saya menjabat sebagai Rektor Kampus LP3I Tasikmalaya.
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

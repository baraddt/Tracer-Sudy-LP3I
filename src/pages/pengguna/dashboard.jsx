import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function () {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [jenisOptions, setJenisOptions] = useState([]);
    const [posisiOptions, setPosisiOptions] = useState([]);
    const [bidangOptions, setBidangOptions] = useState([]);
    const [kondisiOptions, setKondisiOptions] = useState([]);
    const storedUser = localStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : {};
    const [formData, setFormData] = useState({
        id_mahasiswa: user.id || "",
        pekerjaan: [
            {
                bidang: "",
                jenis_pekerjaan: [
                    {
                        jenis: "",
                        posisi: ""
                    }
                ]
            }
        ]
    });
    const fetchPekerjaan = async () => {
        try {
            const response = await axios.get('http://192.168.18.176:5000/pekerjaan/all');

            setJenisOptions(response.data.data);
            setPosisiOptions(response.data.data);
            console.log(response.data.data);

        } catch (err) {
            console.error("Error feching data:", err.message);

        }
    };

    const fetchBidang = async () => {
        try {
            const response = await axios.get('http://192.168.18.176:5000/pekerjaan/bidang');
            setBidangOptions(response.data.data)
            console.log(response.data);

        } catch (err) {
            console.error("Error feching data:", err.message);

        }
    };

    const fetchKondisi = async () => {
        try {
            const response = await axios.get('http://192.168.18.176:5000/mahasiswa/get/kondisi');
            setKondisiOptions(response.data.data);
            console.log(response.data);

        } catch (err) {
            console.error("Error Feching Data:", err.message);

        }
    };

    useEffect(() => {
        fetchPekerjaan();
        fetchBidang();
        fetchKondisi();
    }, []);

    useEffect(() => {
        // Timer untuk menampilkan modal setelah 5 detik
        const timer = setTimeout(() => {
            setIsModalOpen(true);
        }, 3000);

        // Clear timeout jika user berpindah dari halaman dashboard sebelum 5 detik
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const fetchJenisPekerjaan = async () => {
            try {
                const response = await axios.get('http://192.168.18.176:5000/pekerjaan/jenis');
                if (response.status === 200) {
                    setJenisOptions(response.data.data); // Menyimpan jenis pekerjaan dalam state
                } else {
                    console.error("Gagal mendapatkan data jenis pekerjaan");
                }
            } catch (error) {
                console.error("Error fetching jenis pekerjaan:", error);
            }
        };

        fetchJenisPekerjaan();
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

    const handleChangeBidang = (e) => {
        const { value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            pekerjaan: prevData.pekerjaan.map((pekerjaan, index) => {
                if (index === 0) { // Misalkan hanya ingin update pekerjaan pertama
                    return {
                        ...pekerjaan,
                        bidang: value
                    };
                }
                return pekerjaan;
            })
        }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Simpan ke localStorage jika diperlukan
            localStorage.setItem("formData", JSON.stringify(formData));

            const accessToken = localStorage.getItem('accessToken');
            console.log('Token yang ditemukan:', accessToken);
            if (!accessToken) {
                console.error('Token tidak ditemukan');
                return;
            };

            console.log("Data yang akan dikirim:", formData);


            const response = await axios.post(`http://192.168.18.176:5000/mahasiswa/addmahasiswakondisi`, formData, {
                headers: {
                    'Content-Type': "application/json",
                    'Authorization': `Bearer ${accessToken}`
                }
            });

            if (response.status === 200) {
                console.log("Data berhasil dikirim ke API:", response.data);
                setIsModalOpen(false);  // Tutup modal setelah submit
            } else {
                console.log("Terjadi kesalahan di API:", response.data);
            }
        } catch (error) {
            if (error.response) {
                console.error("Gagal mengirim data ke API:", error.response.data);
            } else {
                console.error("Gagal mengirim data:", error.message);
            }
        }
    };

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
            <Link to='/pengguna/tracerstudy'>
                <div className="text-center mt-4">
                    <button className="btn btn-success">Selengkapnya</button>
                </div>
            </Link>
            {isModalOpen && (
                <div className="modal show fade" style={{ display: 'block' }} tabIndex="-1">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Sebelum Melanjutkan Isi Formulir Dulu YA</h5>
                                <button type="button" className="btn-close" onClick={() => setIsModalOpen(false)} aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="row">
                                        {/* Kolom Kiri */}
                                        <div className="col-md-6">
                                            {/* <div className="mb-3">
                                                <label htmlFor="nama" className="form-label">Program Study :</label>
                                                <select className="form-select" id="prodi" name="prodi" value={formData.prodi} onChange={handleChange}>
                                                    <option value="">Pilih Program Study</option>
                                                    <option value="Manajement Informatika">Manajement Informatika</option>
                                                    <option value="Administrasi Bisnis">Administrasi Bisnis</option>
                                                    <option value="Manajement Perbangkan">Manajement Perbangkan</option>
                                                    <option value="Manajement Pemasaran">Manajement Pemasaran</option>
                                                    <option value="Bisnis Digital">Bisnis Digital</option>
                                                </select>
                                            </div> */}

                                            <div className="mb-3">
                                                <label htmlFor="kondisi" className="form-label">Kondisi Saat Ini :</label>
                                                <select className="form-select" id="kondisi" name="kondisi" value={formData.kondisi} onChange={handleChange}>
                                                    <option value="">Pilih Kondisi</option>
                                                    {Array.isArray(kondisiOptions) && kondisiOptions.map((option) => (
                                                        <option key={option._id} value={option._id}>
                                                            {option.kondisi}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            {/* <div className="mb-3">
                                                <label htmlFor="status" className="form-label">Status Pekerjaan :</label>
                                                <select className="form-select" id="status" name="status" value={formData.status} onChange={handleChange}>
                                                    <option value="">Pilih Status</option>
                                                    <option value="Active">Full-Time</option>
                                                    <option value="Active">Part-Time</option>
                                                    <option value="Active">Kontrak</option>
                                                    <option value="Inactive">Freelance</option>
                                                    <option value="Pending">On-call</option>
                                                    <option value="Pending">Volunteer</option>
                                                </select>
                                            </div> */}
                                        </div>

                                        {/* Kolom Kanan */}
                                        <div className="col-md-6">
                                            <label htmlFor="kondisi" className="form-label">Bidang Pekerjaan :</label>
                                            <select
                                                className="form-select"
                                                id="bidangpekerjaan"
                                                name="bidang"
                                                value={formData.pekerjaan[0]?.bidang || ""}
                                                onChange={handleChangeBidang}
                                            >
                                                <option value="">Pilih Bidang</option>
                                                {bidangOptions.map((option, index) => (
                                                    <option key={index} value={option}>
                                                        {option}
                                                    </option>
                                                ))}
                                            </select>

                                            <label className='mt-2 mb-2'>Jenis Pekerjaan :</label>
                                            <select
                                                className="form-select"
                                                id="jenispekerjaan"
                                                name="jenispekerjaan"
                                                value={formData.pekerjaan[0].jenis_pekerjaan[0].jenis}
                                                onChange={(e) => {
                                                    setFormData(prevData => ({
                                                        ...prevData,
                                                        pekerjaan: [
                                                            {
                                                                ...prevData.pekerjaan[0],
                                                                jenis_pekerjaan: [
                                                                    {
                                                                        ...prevData.pekerjaan[0].jenis_pekerjaan[0],
                                                                        jenis: e.target.value
                                                                    }
                                                                ]
                                                            }
                                                        ]
                                                    }));
                                                }}
                                            >
                                                <option value="">Pilih Jenis</option>
                                                {Array.isArray(jenisOptions) && jenisOptions.map((jenis, index) => (
                                                    <option key={index} value={jenis}>
                                                        {jenis}
                                                    </option>
                                                ))}
                                            </select>

                                            <label className='mt-2 mb-2'>Posisi Pekerjaan :</label>
                                            <select
                                                className="form-select"
                                                id="posisipekerjaan"
                                                name="posisipekerjaan"
                                                value={formData.pekerjaan[0].jenis_pekerjaan[0].posisi} // Menetapkan value untuk posisi
                                                onChange={(e) => setFormData(prevData => ({
                                                    ...prevData,
                                                    pekerjaan: Array.isArray(prevData.pekerjaan)
                                                        ? prevData.pekerjaan.map((item, index) =>
                                                            index === 0 // Memastikan kita hanya memodifikasi pekerjaan pertama
                                                                ? {
                                                                    ...item,
                                                                    jenis_pekerjaan: [{
                                                                        ...item.jenis_pekerjaan[0], // Salin objek jenis_pekerjaan pertama
                                                                        posisi: e.target.value // Update posisi
                                                                    }]
                                                                }
                                                                : item
                                                        )
                                                        : [] // Jika pekerjaan bukan array, set ke array kosong
                                                }))}
                                            >
                                                <option value="">Pilih Posisi</option>
                                                {Array.isArray(posisiOptions) && posisiOptions.map((option) => (
                                                    option.pekerjaan && option.pekerjaan[0]?.jenisPekerjaan?.map((jenis) => (
                                                        jenis.posisi.map((posisi, idx) => (
                                                            <option key={idx} value={posisi}>
                                                                {posisi}
                                                            </option>
                                                        ))
                                                    ))
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <button type="submit" className="btn btn-primary">Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
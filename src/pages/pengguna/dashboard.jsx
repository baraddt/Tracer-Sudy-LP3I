import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import axios from 'axios';
import axiosClient from '../../services/axiosClient';

export default function () {
    const [events, setEvents] = useState([]);
    const [isCompleted, setIsCompleted] = useState(false);

    // Mengambil data event dari API
    const fetchEvent = async () => {
        try {
            const response = await axiosClient.get('/mahasiswa/tracer_mahasiswa')
            setEvents(response.data.data);
            console.log(response.data.data);

            setIsCompleted(data.id_responden.includes(studentId))

        } catch (err) {
            console.error("Error Feching Data:", err.message);

        }
    };

    useEffect(() => {
        fetchEvent();
    }, []);

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
            const response = await axiosClient.get('/pekerjaan/all');
            setPosisiOptions(response.data.data);
        } catch (err) {
            console.error("Error feching data:", err.message);
        }
    };

    const fetchBidang = async () => {
        try {
            const response = await axiosClient.get('/pekerjaan/bidang');
            setBidangOptions(response.data.data)
            console.log(response.data);

        } catch (err) {
            console.error("Error feching data:", err.message);

        }
    };

    const fetchKondisi = async () => {
        try {
            const response = await axiosClient.get('/mahasiswa/get/kondisi');
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
        const storedFormData = localStorage.getItem("formData");

        if (storedFormData) {
            try {
                const parsedFormData = JSON.parse(storedFormData);
                setFormData(parsedFormData);
                console.log("Form data ditemukan di localStorage:", parsedFormData);
                setIsModalOpen(false)
            } catch (error) {
                console.error("Error parsing formData:", error);
            }
        } else {
            console.log("formData tidak ditemukan di localStorage.");
            setIsModalOpen(true)
        }
    }, []);

    useEffect(() => {
        const fetchJenisPekerjaan = async () => {
            try {
                const response = await axiosClient.get('/pekerjaan/jenis');
                console.log("Data Jenis:", response.data); // Cek data yang diterima
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

            const accessToken = sessionStorage.getItem('accessToken');
            console.log('Token yang ditemukan:', accessToken);
            if (!accessToken) {
                console.error('Token tidak ditemukan');
                return;
            };

            console.log("Data yang akan dikirim:", formData);

            // Ambil data user dari localStorage
            const user = JSON.parse(localStorage.getItem('user'));
            if (!user || !user.id) {
                console.error('ID Mahasiswa tidak ditemukan');
                return;
            }

            const mahasiswaId = user.id;  // Ambil ID mahasiswa dari localStorage

            // Kirim data ke API dengan ID mahasiswa di URL
            const response = await axiosClient.post(`/mahasiswa/add_kondisi/${mahasiswaId}`, formData);

            setIsModalOpen(false);
            console.log("data berhasil", response.data);
            

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
                {/* Berlangsung */}
                <div className="bg-light p-2">
                    <span className="border rounded bg-primary bg-opacity-25 p-1" style={{ color: '#00426D' }}>
                        <i className="bi bi-circle-fill me-2"></i>Berlangsung
                    </span>
                    <div className="d-flex row gap-5 justify-content-center mt-4">
                        {/* Mapping data events untuk menampilkan kartu */}
                        {events.length > 0 ? (
                            events.map((event, index) => (
                                <div key={index} className="card col-md-3 d-flex justify-content-center p-2 shadow-sm">
                                    <img
                                        src={event?.id_detail?.banner ? `http://192.168.18.176:5000/${event.id_detail.banner}` : '/media/'}
                                        alt={event?.id_detail?.nama_kegiatan || 'Gambar tidak tersedia'}
                                        style={{ maxWidth: '100%', height: 'auto' }} // Untuk memastikan gambar responsif
                                    />
                                    <span className="mt-3">{event.id_detail.nama_kegiatan}</span>
                                    <span className="mt-3">{event.id_detail.kategori_kegiatan}</span>
                                    <span className="mt-3 text-danger">
                                        {new Date(event.id_detail.tanggal_mulai).toLocaleDateString()} -{" "}
                                        {new Date(event.id_detail.tanggal_berakhir).toLocaleDateString()}
                                    </span>
                                    {/* <span className="text-secondary mt-3">* Skala Kegiatan</span>
                                
                                <span className="text-secondary mt-3">* Tahun Lulusan</span> */}
                                    {/* <span>{event.skala_kegiatan.tahun_lulusan}</span> */}
                                    <Link to={`/pengguna/formtracer/${event._id}`}>
                                        <button
                                            className="mt-4 rounded btn btn-success col-md-12"
                                            disabled={isCompleted}
                                        >
                                            {isCompleted ? "Anda Sudah Isi" : "Mulai"}
                                        </button>
                                    </Link>
                                </div>
                            ))
                        ) : (
                            <div>Tidak ada event yang tersedia</div>
                        )}
                    </div>
                </div>
            </div>
            {isModalOpen && (
                <div className="modal show fade mt-5 p-sm-4 p-4" style={{ display: 'block' }} tabIndex="-1">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Mohon Untuk Mengisi Formulir Dibawah Ini</h5>
                                <button type="button" className="btn-close" onClick={() => setIsModalOpen(false)} aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="row">
                                        {/* Kolom Kiri */}
                                        <div className="col-md-6">
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
                                                {Array.isArray(bidangOptions) && bidangOptions.map((bidang, index) => (
                                                    <option key={index} value={bidang}>
                                                        {bidang}
                                                    </option>
                                                ))}
                                            </select>

                                            <label className='mt-2 mb-2'>Jenis Pekerjaan :</label>
                                            <select
                                                className="form-select"
                                                id="jenispekerjaan"
                                                name="jenis"
                                                value={formData.pekerjaan[0]?.jenis_pekerjaan[0]?.jenis || ""}
                                                onChange={(e) => setFormData(prevData => ({
                                                    ...prevData,
                                                    pekerjaan: Array.isArray(prevData.pekerjaan)
                                                        ? prevData.pekerjaan.map((item, index) =>
                                                            index === 0
                                                                ? {
                                                                    ...item,
                                                                    jenis_pekerjaan: [{
                                                                        ...item.jenis_pekerjaan[0],
                                                                        jenis: e.target.value // Update jenis pekerjaan
                                                                    }]
                                                                }
                                                                : item
                                                        )
                                                        : [] // Jika pekerjaan bukan array, set ke array kosong
                                                }))}
                                            >
                                                <option value="">Pilih Jenis Pekerjaan</option>
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
                                                value={formData.pekerjaan[0]?.jenis_pekerjaan[0]?.posisi || ""}
                                                onChange={(e) => setFormData(prevData => ({
                                                    ...prevData,
                                                    pekerjaan: Array.isArray(prevData.pekerjaan)
                                                        ? prevData.pekerjaan.map((item, index) =>
                                                            index === 0
                                                                ? {
                                                                    ...item,
                                                                    jenis_pekerjaan: [{
                                                                        ...item.jenis_pekerjaan[0],
                                                                        posisi: e.target.value
                                                                    }]
                                                                }
                                                                : item
                                                        )
                                                        : []
                                                }))}
                                            >
                                                <option value="">Pilih Posisi</option>
                                                {Array.isArray(posisiOptions) && posisiOptions.map((option, optionIdx) => (
                                                    option.pekerjaan?.[0]?.jenisPekerjaan?.map((jenis, jenisIdx) => (
                                                        jenis.posisi.map((posisi, posisiIdx) => (
                                                            <option key={posisiIdx} value={posisi}>
                                                                {posisi}
                                                            </option>
                                                        ))
                                                    ))
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <button type="submit" className="btn btn-primary mt-4">Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
import React, { useEffect, useState } from "react";
import axiosClient from "../../services/axiosClient";
import { Link, useNavigate } from 'react-router-dom';

export default function () {
    const navigate = useNavigate();
    const [dataTracerId, setDataTracerId] = useState(null);
    const [dataAtensi, setDataAtensi] = useState([]);
    const [dataHorizontal, setDataHorizontal] = useState([]);
    const [newAtensi, setNewAtensi] = useState({
        atensi_horizontal: [],
        atensi_vertikal: [],
    });

    useEffect(() => {
        const tracerId = localStorage.getItem('tracerId'); // Ambil ID dari localStorage
        if (!tracerId) {
            console.error("Tracer ID tidak ditemukan di localStorage.");
            navigate('/super_admin/tracerstudy-bank-soal'); // Redirect ke step 1 jika ID tidak ditemukan
        } else {
            setDataTracerId(tracerId); // Simpan ke state
            console.log("Tracer ID diambil dari localStorage:", tracerId);
        }
    }, [navigate]);

    // const fetchTracer = async () => {
    //     try {
    //         const response = await axiosClient.get('/tracerstudy/all');
    //         if (response.data.data && response.data.data.length > 0) {
    //             setDataTracerId(response.data.data[0]._id); // Mengambil ID dari data tracer pertama
    //             console.log("ID tracer yang diambil:", response.data.data[0]._id); // Memastikan ID sudah benar
    //         } else {
    //             console.error("Data tracer kosong atau tidak ditemukan");
    //         }
    //     } catch (error) {
    //         console.error("Error fetching data:", error.message);
    //     }
    // };

    const fetchVertikal = async () => {
        try {
            const response = await axiosClient.get('/tracerstudy/atensi_vertikal/all');
            setDataAtensi(response.data.data);
        } catch (error) {
            console.error("Error fetching data:", error.message);
        }
    };

    const fetchHorizontal = async () => {
        try {
            const response = await axiosClient.get('/tracerstudy/atensi_horizontal/all');
            setDataHorizontal(response.data.data);

        } catch (error) {
            console.error("Error feching data:", error.message);

        }
    };

    useEffect(() => {
        // fetchTracer();
        fetchVertikal();
        fetchHorizontal();
    }, []);

    // mengirim atensi ke API tracerSTudy
    const AddAtensi = async () => {
        try {
            if (!dataTracerId) {
                throw new Error("ID tracer tidak ditemukan.");
            }

            const response = await axiosClient.post(
                `/tracerstudy/atensi/apply/${dataTracerId}`,
                newAtensi
            );

            console.log("Atensi yang berhasil ditambahkan:", response.data);
        } catch (error) {
            console.error("Error adding atensi:", error.message);
        }
    };


    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewSkala((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const tracerIdFromLocalStorage = localStorage.getItem('tracerId'); // Ambil ID dari localStorage
        console.log("Tracer ID yang diambil dari localStorage:", tracerIdFromLocalStorage); // Tampilkan ID dari localStorage
        console.log("ID yang akan diedit:", dataTracerId);

        // Masukkan semua ID atensi_horizontal dan atensi_vertikal ke state newAtensi
        setNewAtensi({
            atensi_horizontal: dataHorizontal.map((item) => item._id), // Mengambil ID dari data horizontal
            atensi_vertikal: dataAtensi.map((item) => item._id), // Mengambil ID dari data vertikal
        });

        console.log("ID yang akan diedit:", dataTracerId); // Tampilkan ID di console untuk memeriksa
        // Panggil fungsi AddAtensi untuk mengirim data
        AddAtensi();
    };


    return (
        <div className="container rounded my-4 bg-white">
            {/* Progress Steps */}
            <div className="row mb-4">
                <div className="col">
                    <ul className="mt-3 gap-3 text-white nav nav-pills justify-content-center">
                        <li className="nav-item">
                            <span className="active border rounded bg-secondary bg-opacity-50 p-2">Detail Kegiatan</span>
                        </li>
                        <li className="nav-item">
                            <span className="active border rounded bg-secondary bg-opacity-50 p-2">Golongan Kegiatan</span>
                        </li>
                        <li className="nav-item">
                            <span className="active border rounded bg-secondary bg-opacity-50 p-2">Bank soal</span>
                        </li>
                        <li className="nav-item">
                            <span className="active border rounded bg-primary bg-opacity-50 p-2">Kriteria Atensi</span>
                        </li>
                        <li className="nav-item">
                            <span className="active border rounded bg-secondary bg-opacity-50 p-2">Preview</span>
                        </li>
                    </ul>
                </div>
            </div>

            {/* heading */}
            <div className="form-group">
                <label style={{ fontSize: '19px', color: '#00426D' }}>Kriteria Ketentuan Hasil Evaluasi Tracer Study</label>
                <p className="text-secondary" style={{ fontSize: '13px' }}>Standar yang digunakan menilai keberhasilan lulusan suatu Institusi pendidikan
                    dalam memasuki dunia kerja, melanjutkan pendidikan,
                    atau mengembangkan karir mereka setelah lulus</p>
            </div>

            <form onSubmit={handleSubmit}>
                {/* Table Atensi Horizontal */}
                <div className="mt-4">
                    <h4 className='text-center mb-4'>Atensi Horizontal</h4>
                    <table className="table">
                        <thead>
                            <tr>
                                <th className='fw-semibold'>Kriteria</th>
                                <th className='fw-semibold'>Deksripsi</th>
                                <th className='fw-semibold'>Min</th>
                                <th className='fw-semibold'>Max</th>
                                <th className='fw-semibold'>Atensi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataHorizontal.length > 0 ? (
                                dataHorizontal.map((item, index) => (
                                    <tr key={index}>
                                        <td
                                            className={`text-white fw-normal text-center d-inline-block p-5 ${item.kriteria === "Sangat Tidak Selaras"
                                                ? "bg-danger"
                                                : item.kriteria === "Tidak Selaras"
                                                    ? "bg-warning"
                                                    : item.kriteria === "Cukup Selaras"
                                                        ? "bg-success"
                                                        : item.kriteria === "Selaras"
                                                            ? "bg-info"
                                                            : item.kriteria === "Sangat Selaras"
                                                                ? "bg-primary"
                                                                : "bg-black"
                                                }`}
                                            style={{ width: "150px", height: "150px" }}
                                        >
                                            {item.kriteria}
                                        </td>

                                        <td
                                            className="fw-normal pb-5"
                                            style={{
                                                wordWrap: "break-word",
                                                whiteSpace: "normal",
                                                overflow: "hidden",
                                                height: "auto",
                                                maxWidth: "200px",
                                            }}
                                        >
                                            {item.deskripsi || "Tidak ada deskripsi"}
                                        </td>
                                        <td
                                            className="fw-normal pb-5"
                                            style={{
                                                wordWrap: "break-word",
                                                whiteSpace: "normal",
                                                overflow: "hidden",
                                                height: "auto",
                                                maxWidth: "200px",
                                            }}
                                        >
                                            {item.min}
                                        </td>
                                        <td
                                            className="fw-normal pb-5"
                                            style={{
                                                wordWrap: "break-word",
                                                whiteSpace: "normal",
                                                overflow: "hidden",
                                                height: "auto",
                                                maxWidth: "200px",
                                            }}
                                        >
                                            {item.max}
                                        </td>
                                        <td
                                            className="fw-normal pb-5"
                                            style={{
                                                wordWrap: "break-word",
                                                whiteSpace: "normal",
                                                overflow: "hidden",
                                                height: "auto",
                                                maxWidth: "200px",
                                            }}
                                        >
                                            {item.atensi || "Tidak ada evaluasi"}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3" className="text-center">Data tidak ditemukan</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                {/* Table Atensi Horizontal */}
                <div className="mt-5">
                    <h4 className="text-center mb-4">Atensi Vertical</h4>
                    <table className="table">
                        <thead>
                            <tr>
                                <th className='fw-semibold'>Kriteria</th>
                                <th className='fw-semibold'>Deksripsi</th>
                                <th className='fw-semibold'>Logika</th>
                                <th className='fw-semibold'>Atensi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataAtensi.length > 0 ? (
                                dataAtensi.map((item, index) => (
                                    <tr key={index}>
                                        <td
                                            className={`text-white fw-normal text-center d-inline-block p-5 ${item.kriteria === "Rendah"
                                                ? "bg-danger"
                                                : item.kriteria === "Sama"
                                                    ? "bg-warning"
                                                    : item.kriteria === "Tinggi"
                                                        ? "bg-primary"
                                                        : "bg-black"
                                                }`}
                                            style={{ width: "150px", height: "150px" }}
                                        >
                                            {item.kriteria}
                                        </td>

                                        <td
                                            className="fw-normal pb-5"
                                            style={{
                                                wordWrap: "break-word",
                                                whiteSpace: "normal",
                                                overflow: "hidden",
                                                height: "auto",
                                                maxWidth: "200px",
                                            }}
                                        >
                                            {item.deskripsi || "Tidak ada deskripsi"}
                                        </td>
                                        <td
                                            className="fw-normal pb-5"
                                            style={{
                                                wordWrap: "break-word",
                                                whiteSpace: "normal",
                                                overflow: "hidden",
                                                height: "auto",
                                                maxWidth: "200px",
                                            }}
                                        >
                                            {item.logika || "Tidak ada evaluasi"}
                                        </td>
                                        <td
                                            className="fw-normal pb-5"
                                            style={{
                                                wordWrap: "break-word",
                                                whiteSpace: "normal",
                                                overflow: "hidden",
                                                height: "auto",
                                                maxWidth: "200px",
                                            }}
                                        >
                                            {item.atensi || "Tidak ada evaluasi"}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3" className="text-center">Data tidak ditemukan</td>
                                </tr>
                            )}
                        </tbody>

                    </table>
                    <div className="text-end mb-5">
                        <button type="button" className="btn btn-success" onClick={handleSubmit}>
                            Terapkan Atensi
                        </button>
                    </div>

                </div>
            </form>


            {/* Buttons */}
            <div className="d-flex justify-content-between mt-4">
                <div>
                    <button type="button" className="btn btn-primary mb-3">Simpan ke Draft</button>
                </div>
                <div>
                    <Link to='/super_admin/tracerstudy-bank-soal'>
                        <button type="button" className="btn btn-danger mb-3 me-3">Sebelumnnya</button>
                    </Link>
                    <Link to='/super_admin/tracerstudy-preview'>
                        <button type="submit" className="btn btn-success mb-3">Selanjutnya</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
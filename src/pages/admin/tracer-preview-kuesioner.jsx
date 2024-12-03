import { useEffect, useState } from 'react';
import axiosClient from '../../services/axiosClient';
import { Link } from 'react-router-dom';

export default function () {
    const [tracerList, setTracerList] = useState(null);  // Menyimpan data tracer
    const [error, setError] = useState(null);  // Menyimpan error jika ada
    const [dataTracerId, setDataTracerId] = useState(null);
    const [bankSoalList, setBankSoalList] = useState([]);


    // Fungsi untuk mengambil data utama dari API
    const fetchData = async () => {
        try {
            const tracerIdFromLocalStorage = localStorage.getItem('tracerId');  // Ambil tracerId dari localStorage
            if (tracerIdFromLocalStorage) {
                setDataTracerId(tracerIdFromLocalStorage);  // Set tracerId dari localStorage
                console.log("Tracer ID yang diambil dari localStorage:", tracerIdFromLocalStorage);
                // Panggil fetchDetailData dengan tracerId yang diambil
                await fetchDetailData(tracerIdFromLocalStorage);
            } else {
                console.error("Tracer ID tidak ditemukan di localStorage");
            }
        } catch (error) {
            console.error("Error fetching data:", error.message);
        }
    };

    // Fungsi untuk mengambil detail berdasarkan _id
    const fetchDetailData = async (id) => {
        try {
            // Mengambil data detail berdasarkan tracerId
            const response = await axiosClient.get(`/tracerstudy/${id}`);
            setTracerList(response.data.data);  // Menyimpan data yang diterima ke state
            console.log("Data tracer detail:", response.data.data);  // Untuk debugging
        } catch (error) {
            console.error("Error fetching detail data:", error.message);
            setError(error.message);  // Menyimpan error ke state jika terjadi kesalahan
        }
    };

    const fetchBankSoal = async () => {
        if (!dataTracerId) {
            console.error("ID Tracer belum tersedia.");
            return;
        }
        try {
            const response = await axiosClient.get(
                `/tracerstudy/bank_soal/get/${dataTracerId}`
            );
            if (response.data && response.data.data) {
                console.log("Data soal berhasil diambil:", response.data.data);
                setBankSoalList(response.data.data);
            } else {
                console.error("Bank soal kosong atau tidak ditemukan.");
            }
        } catch (error) {
            console.error("Error fetching data:", error.message);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (dataTracerId) {
            fetchBankSoal();
        }
    }, [dataTracerId]);

    return (
        <div className="container rounded my-4 bg-white">
            {error && <p>{error}</p>}
            {tracerList ? (
                <>
                    {/* Banner/Flyer */}
                    <div className="form-group">
                        <label className='border rounded bg-primary bg-opacity-25 p-1 mt-2' style={{ fontSize: '13px', color: '#00426D' }}>
                            <i className='bi bi-circle-fill me-2'></i>Preview
                        </label>
                        <p className="mt-5" style={{ fontSize: '25px', color: '#00426D' }}>
                            {tracerList.id_detail.nama_kegiatan}
                        </p>
                        <p className="text-secondary" style={{ fontSize: '15px' }}>
                            Dibuat oleh | Kampus Utama Politeknik LP3I | {new Date(tracerList.createdAt).toLocaleString()}
                        </p>
                    </div>

                    {/* Skala Kegiatan */}
                    <div>
                        <label className='border rounded bg-primary bg-opacity-25 p-1 me-2' style={{ color: '#00426D' }}>
                            {tracerList.skala_kegiatan.skala_kegiatan}
                        </label>
                    </div>

                    {/* Button Navigasi */}
                    <div className='d-flex gap-5 mt-4'>
                        <Link to='/admin/tracer-preview'>
                            <button className='border-0 bg-transparent'>Detail Kegiatan</button>
                        </Link>
                        <Link to='/admin/tracer-preview-kuesioner'>
                            <button className='border-0 border-bottom bg-transparent'>Kuesioner</button>
                        </Link>
                        <Link to='/admin/tracer-preview-responden'>
                            <button className='border-0 bg-transparent'>Responden</button>
                        </Link>
                    </div>

                    {/* Preview Section */}
                    <div className="preview mt-5">
                        <label style={{ fontSize: '19px' }}>Preview</label>
                        <p className="text-secondary" style={{ fontSize: '13px' }}>
                            Tampilan pertanyaan dan opsi jawaban:
                        </p>
                        <div className="d-flex flex-wrap">
                            {Array.isArray(bankSoalList) && bankSoalList.length > 0 ? (
                                bankSoalList.map((item, index) => (
                                    <div key={index} className="mb-4" style={{ width: '300px', marginRight: '20px' }}>
                                        <p style={{ fontSize: '13px' }}>{index + 1}. {item.soal}</p>
                                        <ul style={{ fontSize: '13px' }} className="list-unstyled">
                                            {item.jawaban.map((jawaban, optIndex) => (
                                                <li key={optIndex} className="d-flex align-items-center mb-2">
                                                    <input type="radio" disabled className="me-2" />
                                                    <label>{jawaban.jawaban}</label>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))
                            ) : (
                                <p className="text-muted">Belum ada soal yang ditambahkan untuk Tracer Study ini.</p>
                            )}
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="d-flex justify-content-between mt-4">
                        <div>
                            <button type="button" className="btn btn-primary mb-3">Simpan ke Draft</button>
                        </div>
                        <div>
                            {/* <Link to='/admin/tracerstudy-verifikasi-akhir'> */}
                            <button type="button" className="btn btn-danger mb-3 me-3">Batalkan</button>
                            {/* </Link> */}
                            <Link to='/admin/tracerstudy'>
                                <button type="submit" className="btn btn-success mb-3">Publikasi</button>
                            </Link>
                        </div>
                    </div>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    )
}
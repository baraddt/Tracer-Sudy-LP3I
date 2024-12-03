import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axiosClient from '../../services/axiosClient';

export default function TracerStudyPreview() {
    const navigate = useNavigate();
    const { id } = useParams(); // Ambil ID dari URL
    const [tracerDetail, setTracerDetail] = useState(null);
    const [bankSoalList, setBankSoalList] = useState([]);

    useEffect(() => {
        const fetchDetail = async () => {
            try {
                const response = await axiosClient.get(`/tracerstudy/${id}`);
                setTracerDetail(response.data.data); // Simpan detail ke state
            } catch (error) {
                console.error("Error fetching tracer detail:", error.message);
            }
        };

        if (id) {
            fetchDetail(); // Panggil API jika ID tersedia
        }
    }, [id]);

    const fetchBankSoal = async () => {
        try {
            const response = await axios.get(
                `/tracerstudy/bank_soal/get/${id}`);
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
        fetchBankSoal();
    }, []);



    return (
        <div className="container rounded my-4 bg-white">
            {tracerDetail ? (
                <div>
                    {/* Banner/Flyer */}
                    <div className="form-group">
                        <label className='border rounded bg-primary bg-opacity-25 p-1 mt-2' style={{ fontSize: '13px', color: '#00426D' }}>
                            <i className='bi bi-circle-fill me-2'></i>Preview
                        </label>
                        <p className="mt-5" style={{ fontSize: '25px', color: '#00426D' }}>
                            {tracerDetail.id_detail.nama_kegiatan}
                        </p>
                        <p className="text-secondary" style={{ fontSize: '15px' }}>
                            Dibuat oleh | Kampus Utama Politeknik LP3I | {new Date(tracerDetail.createdAt).toLocaleString()}
                        </p>
                    </div>

                    {/* Skala Kegiatan */}
                    <div>
                        <label className='border rounded bg-primary bg-opacity-25 p-1 me-2' style={{ color: '#00426D' }}>
                            {tracerDetail.skala_kegiatan.skala_kegiatan}
                        </label>
                    </div>

                    {/* Button Navigasi */}
                    <div className='d-flex gap-5 mt-4'>
                        <button className='border-0 bg-transparent' onClick={() => {
                            navigate(`/super_admin/tracerstudy-getpreview/${id}`)
                        }}>Detail Kegiatan</button>

                        <button className='border-0 border-bottom bg-transparent'>Kuesioner</button>

                        <button className='border-0 bg-transparent' onClick={() => {
                            navigate(`/super_admin/tracerstudy-getpreview-responden/${id}`)
                        }}>Responden</button>

                        <button className='border-0 bg-transparent' onClick={() => {
                            navigate(`/super_admin/tracerstudy-getpreview-kriteria/${id}`)
                        }}>Kriteria Ketuntasasn Hasil</button>
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
                            <Link to='/super_admin/tracerstudy'>
                                <button type="button" className="btn btn-danger mb-3 me-3">Kembali</button>
                            </Link>
                            <Link to='/super_admin/tracerstudy'>
                                <button type="submit" className="btn btn-success mb-3">Publikasi</button>
                            </Link>
                        </div>
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

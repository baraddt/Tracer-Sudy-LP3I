import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axiosClient from '../../services/axiosClient';


export default function () {
    const navigate = useNavigate();
    const { id } = useParams();
    const [tracerDetail, setTracerDetail] = useState(null);
    const [error, setError] = useState(null);


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

    const [respondents, setRespondents] = useState([]);

    // Fungsi untuk fetch data (dummy API)
    const fetchResponden = async () => {
        try {
            // Simulasi API call
            const response = {
                data: [
                    {
                        no: 1,
                        responden: "John Doe",
                        perguruanTinggi: "Universitas Indonesia",
                        programStudy: "Teknik Informatika",
                        status: "Submitted"
                    },
                    {
                        no: 2,
                        responden: "Jane Smith",
                        perguruanTinggi: "Institut Teknologi Bandung",
                        programStudy: "Manajemen Bisnis",
                        status: "Submitted"
                    },
                    {
                        no: 3,
                        responden: "Michael Johnson",
                        perguruanTinggi: "Universitas Gadjah Mada",
                        programStudy: "Sistem Informasi",
                        status: "Submitted"
                    },
                    {
                        no: 4,
                        responden: "Emily Davis",
                        perguruanTinggi: "Universitas Airlangga",
                        programStudy: "Psikologi",
                        status: "Submitted"
                    }
                ]
            };

            // Simulasi API response (kamu bisa ganti dengan axios.get() untuk API nyata)
            setRespondents(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    // useEffect untuk memanggil fetchData ketika komponen pertama kali dimuat
    useEffect(() => {
        fetchResponden();
    }, []);




    return (
        <div className="container rounded my-4 bg-white">
            {error && <p>{error}</p>}
            {tracerDetail ? (
                <>
                    {/* Banner/Flyer */}
                    <div className="form-group">
                        <label className='border rounded bg-primary bg-opacity-25 p-1 mt-2' style={{ fontSize: '13px', color: '#00426D' }}>
                            <i className='bi bi-circle-fill me-2'></i>Preview
                        </label>
                        <p className="mt-5" style={{ fontSize: '25px', color: '#00426D' }}>
                            {tracerDetail.id_detail.nama_kegiatan}
                        </p>
                        <p className="text-secondary" style={{ fontSize: '15px' }}>
                            Dibuat oleh | {tracerDetail.id_pembuat.nama} | {new Date(tracerDetail.createdAt).toLocaleString()}
                        </p>
                    </div>

                    {/* Skala Kegiatan */}
                    <div>
                        <label className='border rounded bg-primary bg-opacity-25 p-1 me-2' style={{ color: '#00426D' }}>
                            {tracerDetail.skala_kegiatan.skala_kegiatan}
                        </label>
                    </div>

                    {/* Button Navigasi*/}
                    <div className='d-flex gap-5 mt-4'>
                        <button className='border-0 bg-transparent' onClick={() => {
                            navigate(`/super_admin/tracerstudy-getpreview/${id}`)
                        }}>Detail Kegiatan</button>

                        <button className='border-0 bg-transparent' onClick={() => {
                            navigate(`/super_admin/tracerstudy-getpreview-kuesioner/${id}`)
                        }}>Kuesioner</button>

                        <button className='border-0 border-bottom bg-transparent'>Responden</button>

                        <button className='border-0 bg-transparent' onClick={() => {
                            navigate(`/super_admin/tracerstudy-getpreview-kriteria/${id}`)
                        }}>Kriteria Ketuntasasn Hasil</button>
                    </div>

                    {/* table responden */}

                    <div className='mt-4'>
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Responden</th>
                                    <th>Perguruan Tinggi</th>
                                    <th>Program Study</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {respondents.length > 0 ? (
                                    respondents.map((data, index) => (
                                        <tr key={data.no}>
                                            <td>{data.no}</td>
                                            <td>{data.responden}</td>
                                            <td>{data.perguruanTinggi}</td>
                                            <td>{data.programStudy}</td>
                                            <td className='text-success'>{data.status}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="text-center bg-danger bg-opacity-50">Belum ada data Responden.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
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
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    )
}
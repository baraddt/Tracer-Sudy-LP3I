import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axiosClient from '../../services/axiosClient';


export default function () {
    const [tracerData, setTracerData] = useState([]);
    const [progress, setProgress] = useState(50); // Inisialisasi progress dengan 50%
    const [isCompleted, setIsCompleted] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();
    const [tracerDetail, setTracerDetail] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const data = [
            { id: 1, program: "Teknik Informatika", responden: "John Doe", status: "Submitted" },
            { id: 2, program: "Manajemen Bisnis", responden: "Jane Smith", status: "Submitted" },
            { id: 3, program: "Sistem Informasi", responden: "Michael Johnson", status: "Submitted" },
            { id: 4, program: "Psikologi", responden: "Emily Davis", status: "Submitted" }
        ];
        setTracerData(data);
    }, []);

    const handlePrintPdf = () => {
        navigate('/pdf-viewer', {
            state: { tracerDetail },  // Mengirim data tracer ke halaman PDF
        });
    };

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

    useEffect(() => {
        if (progress === 100) {
            setIsCompleted(true);
        }
    }, [progress]);

    // Simulasi update progress
    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prevProgress) => {
                if (prevProgress < 100) {
                    return prevProgress + 10; // Update progress setiap 1 detik
                } else {
                    clearInterval(interval); // Hentikan interval setelah mencapai 100%
                    return 100;
                }
            });
        }, 1000); // Simulasi update setiap 1 detik
        return () => clearInterval(interval); // Cleanup interval
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

                        <button className='border-0 bg-transparent' onClick={() => {
                            navigate(`/super_admin/tracerstudy-getpreview-responden/${id}`)
                        }}>Responden</button>

                        <button className='border-0 border-bottom bg-transparent'>Kriteria Ketuntasasn Hasil</button>
                    </div>

                    {/* Generate */}

                    <div className="bg-white shadow rounded p-4 text-center" style={{ maxWidth: '600px', width: '100%' }}>
                        <h5 className="mb-3">Generate in progress...</h5>
                        <div className="progress mb-3">
                            <div
                                className="progress-bar progress-bar-striped progress-bar-animated"
                                role="progressbar"
                                style={{ width: `${progress}%` }}
                                aria-valuenow={progress}
                                aria-valuemin="0"
                                aria-valuemax="100"
                            ></div>
                        </div>
                        <p className="text-muted">
                            Proses pembuatan laporan sedang berlangsung. Mohon untuk tidak meninggalkan halaman ini
                            atau menutup jendela browser hingga proses selesai agar data dapat diproses dengan baik.
                        </p>
                        {isCompleted && (
                            <button className="btn btn-danger mt-3" onClick={handlePrintPdf}>
                                <i className='bi bi-file-pdf'></i> Cetak PDF
                            </button>
                        )}
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
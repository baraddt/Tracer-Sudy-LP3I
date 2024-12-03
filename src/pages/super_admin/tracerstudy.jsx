import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axiosClient from '../../services/axiosClient';


export default function () {
    const navigate = useNavigate();
    const [tracerList, setTracerList] = useState([]);
    const [error, setError] = useState(null);
    const [selectedTracer, setSelectedTracer] = useState(null);

    // fungsi mengambil data dari API
    const fetchData = async () => {
        try {
            const response = await axiosClient.get('/tracerstudy/all');
            setTracerList(response.data.data);
            console.log(response.data.data);
        } catch (error) {
            console.error("Error fetching data:", error.message);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const getTracerById = async (tracerId) => {
        try {
            const response = await axiosClient.get(`/tracerstudy/${tracerId}`);
            return response.data.data;
        } catch (error) {
            console.error("Error fetching tracer details:", error.message);
            return null;
        }
    };

    const deleteTracer = async (tracerId) => {
        try {
            const response = await axiosClient.delete(`/tracerstudy/delete/${tracerId}`);
            setTracerList((prevList) => prevList.filter((tracer) => tracer._id !== tracerId));

            console.log('Tracer Deleted Successfully:', response.data);
        } catch (error) {
            console.error('Error deleting tracer:', error.message);
        }
    };

    const handlePreviewTracer = async (tracerId) => {
        const TracerStudyDetails = await getTracerById(tracerId);
        if (TracerStudyDetails) {
            setSelectedTracer(TracerStudyDetails);
            navigate(`/super_admin/tracerstudy-getpreview/${tracerId}`); // Navigasi ke halaman preview
        }
    };

    const checkAndUpdateStatus = async () => {
        try {
            const response = await axiosClient.get('/tracerstudy/all');
            const tracerList = response.data.data;

            if (!tracerList || tracerList.length === 0) {
                console.log("Tidak ada data tracer untuk diperiksa.");
                return;
            }

            // Iterasi melalui semua data tracer
            for (const tracer of tracerList) {
                const today = new Date(); // Tanggal hari ini
                const tanggalBerakhir = new Date(tracer.id_detail.tanggal_berakhir); // Tanggal berakhir

                // Pastikan tracer memiliki status dan tanggal_berakhir valid
                if (tracer.status !== 'Selesai' && tracer.id_detail.tanggal_berakhir) {
                    if (today > tanggalBerakhir) {
                        // Jika tanggal sekarang lebih besar dari Tanggal Berakhir, ubah status ke "Selesai"
                        const updateResponse = await axiosClient.post(
                            `/tracerstudy/${tracer._id}/publish?status=Selesai`
                        );

                        console.log(`Status tracer ID ${tracer._id} berhasil diperbarui menjadi Selesai:`, updateResponse.data);

                        // Perbarui status di state lokal (opsional jika diperlukan untuk tampilan)
                        setTracerList((prevList) =>
                            prevList.map((item) =>
                                item._id === tracer._id ? { ...item, status: 'Selesai' } : item
                            )
                        );
                    } else {
                        // Jika belum melewati tanggal berakhir, log alasan
                        console.log(
                            `Status tracer ID ${tracer._id} belum diubah menjadi Selesai karena hari ini (${today.toLocaleDateString()}) belum melewati Tanggal Berakhir (${tanggalBerakhir.toLocaleDateString()}).`
                        );
                    }
                }
            }
        } catch (error) {
            console.error('Gagal memeriksa dan memperbarui status:', error.message);
        }
    };

    // Jalankan pemeriksaan saat komponen dimuat
    useEffect(() => {
        console.log("Memulai pemeriksaan status tracer...");
        checkAndUpdateStatus();
    }, []);



    return (
        <div className="container mt-4">
            <div className="rounded bg-white p-3">
                {/* Tombol untuk membuka modal */}
                <div className="d-flex flex-column align-items-end mb-3">
                    <Link to='/super_admin/tracerstudyadd'>
                        <button className="btn btn-success mb-2">
                            <i className="bi bi-plus"></i>Tambah
                        </button>
                    </Link>
                    <button className="btn btn-primary"><i className="bi bi-filter"></i> Filter</button>
                </div>

                {/* Form pencarian Tracer */}
                <div className="d-flex mb-3 col-12">
                    <input
                        type="search"
                        className="form-control me-2"
                        placeholder="Cari Kegiatan Yang Pernah Di Lakukan"
                    />
                    <input
                        type="date"
                        className="form-control me-2 w-50"
                        placeholder="Pilih Tanggal Mulai"
                    />
                    <input
                        type="date"
                        className="form-control me-2 w-50"
                        placeholder="Pilih Tanggal Berakhir"
                    />
                    <button className="btn btn-secondary d-flex align-items-center">
                        <i className="bi bi-search me-2"></i> Cari
                    </button>
                </div>
            </div>
            <div className="container mt-4">
                <div className="row rounded bg-white p-3 align-items-center">
                    <table className="table mt-4">
                        <thead>
                            <tr>
                                <th className="text-dark bg-secondary bg-opacity-50">#ID</th>
                                <th className="text-dark bg-secondary bg-opacity-50">Nama Kegiatan</th>
                                <th className="text-dark bg-secondary bg-opacity-50">Tanggal Mulai</th>
                                <th className="text-dark bg-secondary bg-opacity-50">Tanggal Berakhir</th>
                                <th className="text-dark bg-secondary bg-opacity-50 text-center">Status</th>
                                <th className="text-dark bg-secondary bg-opacity-50 text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tracerList.length > 0 ? (
                                tracerList.map((tracer, index) => (
                                    <tr key={tracer._id}>
                                        <td>{`#TS${index + 201}`}</td>
                                        <td>{tracer.id_detail.nama_kegiatan}</td>
                                        <td>{tracer.id_detail.tanggal_mulai || 'N/A'}</td>
                                        <td>{tracer.id_detail.tanggal_berakhir || 'N/A'}</td>
                                        <td className={`text-center ${tracer.status === 'Selesai' ? 'text-success' : tracer.status === 'Berlangsung' ? 'text-primary' : tracer.status === 'Draft' ? 'text-secondary' : 'text-danger'}`}>
                                            {tracer.status || 'N/A'}
                                        </td>
                                        <td className='text-center'>
                                            <button
                                                onClick={() => handlePreviewTracer(tracer._id)}
                                                className="btn-sm border-0 bg-transparent"
                                            >
                                                <i className="bi bi-eye-fill text-info"></i>
                                            </button>
                                            <button
                                                className="btn-sm me-2 border-0 bg-transparent"
                                                onClick={() => navigate(`/super_admin/tracerstudy-edit/${tracer._id}`)}
                                                disabled={tracer.status === 'Berlangsung' || tracer.status === 'Selesai'} // Nonaktifkan jika status "Berlangsung" atau "Selesai"
                                                style={{
                                                    color: tracer.status === 'Berlangsung' || tracer.status === 'Selesai' ? '#6c757d' : '#00426D', // Warna abu-abu jika nonaktif
                                                    cursor: tracer.status === 'Berlangsung' || tracer.status === 'Selesai' ? 'not-allowed' : 'pointer', // Ubah kursor jika nonaktif
                                                }}
                                            >
                                                <i className="bi bi-pencil-fill"></i>
                                            </button>
                                            <button className="btn-sm border-0 bg-transparent">
                                                <i className="bi bi-trash-fill text-danger" onClick={() => deleteTracer(tracer._id)}></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="text-center">
                                        Tidak ada data PSDKU.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
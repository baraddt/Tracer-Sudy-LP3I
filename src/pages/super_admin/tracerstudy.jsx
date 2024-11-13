import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';

export default function () {
    const [tracerList, setTracerList] = useState([]);
    const [error, setError] = useState(null);

    // fungsi mengambil data dari API
    const fetchData = async () => {
        try {
            const response = await axios.get('http://9l47d23v-5000.asse.devtunnels.ms/tracerstudy/all');
            setTracerList(response.data.data);
        } catch (error) {
            console.error("Error feching data:", error.message);
            
        }
    };

    useEffect(() => {
        fetchData();
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
                                        <td>{index + 1}</td>
                                        <td>{tracer.id_detail.nama_kegiatan}</td>
                                        <td>{tracer.id_detail.tanggal_mulai || 'N/A'}</td>
                                        <td>{tracer.id_detail.tanggal_berakhir || 'N/A'}</td>
                                        <td className={`text-center ${tracer.status === 'Selesai' ? 'text-success' : 'Draft' ? 'text-secondary' : 'Berlangsung' ? 'text-primary' : 'text-danger'}`}>
                                            {tracer.status || 'N/A'}
                                        </td>
                                        <td className='text-center'>
                                            <button className="btn-sm me-2 border-0 bg-transparent" onClick={() => openPreviewModal(psdku._id)}>
                                                <i className="bi bi-eye-fill text-info"></i>
                                            </button>
                                            <button className="btn-sm me-2 border-0 bg-transparent" onClick={() => openEditModal(psdku)}>
                                                <i className="bi bi-pencil-fill text-primary"></i>
                                            </button>
                                            <button className="btn-sm border-0 bg-transparent">
                                                <i className="bi bi-trash-fill text-danger" onClick={() => deletePsdku(psdku._id)}></i>
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
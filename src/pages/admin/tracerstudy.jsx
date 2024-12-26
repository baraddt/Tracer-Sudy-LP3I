import { useState, useEffect } from 'react'
import _ from 'lodash';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'
import axiosClient from '../../services/axiosClient';
import ModalSuccess from '../../components/compModals/modalsuccess';
import ModalFailed from '../../components/compModals/modalFailed';
import TracerDelete from '../../components/compModals/tracerDelete';
import ModalFilter from '../../components/compModals/modalFilter';


export default function () {
    const navigate = useNavigate();
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showFailedModal, setShowFailedModal] = useState(false);
    const [showFiltersModal, setShowFiltersModal] = useState(false);
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [tracerToDelete, setTracerToDelete] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [tracerList, setTracerList] = useState([]);
    const [error, setError] = useState(null);
    const [selectedTracer, setSelectedTracer] = useState(null);

    const fetchSearchResults = async (query) => {
        try {
            const response = await axios.get(`https://api.example.com/mahasiswa?q=${query}`);
            setSearchResults(response.data.results);
        } catch (error) {
            console.error("Error saat mencari data:", error);
            setSearchResults([]);
        }
    };

    const debouncedSearch = _.debounce((query) => {
        fetchSearchResults(query);
    }, 500);

    useEffect(() => {
        if (searchQuery) {
            debouncedSearch(searchQuery);
        } else {
            setSearchResults([]); // Kosongkan hasil jika query kosong
        }

        // Cleanup untuk debounce
        return () => debouncedSearch.cancel();
    }, [searchQuery]);

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

            setShowSuccessModal(true);
            console.log('Tracer Deleted Successfully:', response.data);
        } catch (error) {
            setShowFailedModal(true);
            console.error('Error deleting tracer:', error.message);
        }
    };

    const handleDeleteClick = (tracer) => {
        setTracerToDelete(tracer); // Menyimpan data pengguna yang akan dihapus
        setShowModalDelete(true); // Menampilkan modal konfirmasi
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

    const handleApplyFilters = (filters) => {
        console.log("Filters applied:", filters);
    };



    return (
        <div className="container mt-4">
            <div className="rounded bg-white p-3">
                <h4 className="mb-4 fw-semibold text-dark">Tracer Study</h4>
                {/* Tombol untuk membuka modal */}
                <div className="d-flex flex-column align-items-end mb-3">
                    <Link to='/admin/traceradd'>
                        <button className="btn btn-success mb-2">
                            <i className="bi bi-plus"></i>Tambah
                        </button>
                    </Link>
                    <button className="btn btn-primary" onClick={() => setShowFiltersModal(true)}><i className="bi bi-filter"></i> Filter</button>
                </div>
                {/* Form pencarian Tracer */}
                <div className="d-flex mb-3 col-7 col-sm-7 col-md-12">
                    <div className="w-100 me-2">
                        <label htmlFor="startDate" className="form-label text-dark">Nama Kegiatan</label>
                        <input
                            type="search"
                            className="form-control me-2"
                            placeholder="Cari Nama Kegiatan"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)} // Update query saat mengetik
                        />
                        {/* <button className="btn btn-secondary d-flex align-items-center">
                            <i className="bi bi-search me-2"></i> Cari
                        </button> */}
                    </div>

                    <div className="w-100 me-2 d-none d-md-block">
                        <label htmlFor="startDate" className="form-label text-dark">Tanggal Mulai</label>
                        <input
                            type="date"
                            id="startDate"
                            className="form-control"
                            placeholder="Pilih Tanggal Mulai"
                        />
                    </div>

                    <div className="w-100 d-none d-md-block">
                        <label htmlFor="endDate" className="form-label text-dark">Tanggal Berakhir</label>
                        <input
                            type="date"
                            id="endDate"
                            className="form-control"
                            placeholder="Pilih Tanggal Berakhir"
                        />
                    </div>
                </div>
            </div>
            <div className="container mt-4">
                <div className="row rounded bg-white p-3 align-items-center table-responsive-md">
                    <table className="table mt-4">
                        <thead className='table'>
                            <tr>
                                <th className="cstm-bg text-dark fw-semibold">#ID</th>
                                <th className="cstm-bg text-dark fw-semibold">Nama Kegiatan</th>
                                <th className="cstm-bg text-dark fw-semibold">Tanggal Mulai</th>
                                <th className="cstm-bg text-dark fw-semibold">Tanggal Berakhir</th>
                                <th className="cstm-bg text-dark fw-semibold cstm-bg text-center">Status</th>
                                <th className="cstm-bg text-dark fw-semibold text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {searchQuery && searchQuery.length > 0 ? (
                                // Jika ada query pencarian, tampilkan hasil pencarian (searchResults)
                                searchResults.length > 0 ? (
                                    searchResults.map((tracer) => (
                                        <tr key={tracer._id}>
                                            <td>{`#TS${index + 201}`}</td>
                                            <td className="text-truncate" style={{ maxWidth: '200px' }}>{tracer.id_detail.nama_kegiatan}</td>
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
                                                    <i className="bi bi-trash-fill text-danger" onClick={() => handleDeleteClick(tracer._id)}></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="7" className="text-center text-dark">Tidak ada hasil pencarian.</td>
                                    </tr>
                                )
                            ) : (
                                // Jika tidak ada query pencarian, tampilkan data awal
                                tracerList.length > 0 ? (
                                    tracerList.map((tracer, index) => (
                                        <tr key={tracer._id}>
                                            <td>{`#TS${index + 201}`}</td>
                                            <td className="text-truncate" style={{ maxWidth: '200px' }}>{tracer.id_detail.nama_kegiatan}</td>
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
                                                    <i className="bi bi-trash-fill text-danger" onClick={() => handleDeleteClick(tracer._id)}></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="text-center text-dark">
                                            Tidak ada data PSDKU.
                                        </td>
                                    </tr>
                                )
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            {/* Modal Success */}
            <ModalSuccess
                show={showSuccessModal}
                message="Action Success !"
                onClose={() => setShowSuccessModal(false)}
            />

            {/* Modal Failed */}
            <ModalFailed
                show={showFailedModal}
                message="Action Failed ! Try Again."
                onClose={() => setShowFailedModal(false)}
            />


            {/* Modal Konfirmasi Delete */}
            {tracerToDelete && (
                <TracerDelete
                    show={showModalDelete}
                    onClose={() => setShowModalDelete(false)}
                    message="Apakah Anda yakin ingin menghapus Kegiatan ini? Tindakan ini tidak bisa dibatalkan."
                    tracer={tracerToDelete}
                    deleteTracer={deleteTracer} // Mengirimkan fungsi deleteUser ke modal
                />
            )}

            <ModalFilter
                show={showFiltersModal}
                onClose={() => setShowFiltersModal(false)}
                onApply={handleApplyFilters}
            />
        </div>
    )
}
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'

export default function Psdku() {
    const [psdkuList, setPsdkuList] = useState([]); // State untuk menyimpan data PSDKU
    const [error, setError] = useState(null); // State untuk menangani error
    const [newPsdku, setNewPsdku] = useState({
        kodePt: '',
        psdku: '',
        akreditasi: '',
        status: '',
    });
    const [editPsdku, setEditPsdku] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showModalEdit, setShowModalEdit] = useState(false);
    const [showModalPreview, setShowModalPreview] = useState(false); // State untuk kontrol modal

    // Fungsi untuk mengambil data dari API
    const fetchData = async () => {
        try {
            const response = await axios.get('http://192.168.18.176:5000/kampus/all');
            setPsdkuList(response.data.data); // Pastikan untuk mengupdate psdkuList dengan response.data.data
        } catch (error) {
            console.error("Error fetching data:", error.message);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // fungsi untuk menambah data ke API
    const addPsdku = async () => {
        try {
            const response = await axios.post('http://192.168.18.176:5000/kampus/add', newPsdku);
            setPsdkuList((prevList) => [...prevList, response.data]); // Update the local list with the new data
            setNewPsdku({ kodePt: '', psdku: '', akreditasi: '', status: '' }); // Reset form
            setShowModal(false); // Tutup modal
        } catch (error) {
            console.error("Error adding PSDKU:", error.message);
            setError("Failed to add PSDKU. Please try again."); // Handle error
        }
    };

    // Fungsi untuk menangani perubahan input form
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewPsdku((prevPsdku) => ({
            ...prevPsdku,
            [name]: value,
        }));
    };

    // Fungsi untuk menangani pengiriman form
    const handleSubmit = (e) => {
        e.preventDefault();
        addPsdku(); // Call the add function instead of updating the list directly
    };

    const openEditModal = (psdku) => {
        setEditPsdku(psdku);
        setShowModalEdit(true);
    };

    const openPreviewModal = (psdku) => {
        setEditPsdku(psdku);
        setShowModalPreview(true);
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditPsdku((prevPsdku) => ({
            ...prevPsdku,
            [name]: value,
        }));
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        setPsdkuList((prevList) =>
            prevList.map((psdku) =>
                psdku.kodePt === editPsdku.kodePt ? editPsdku : psdku
            )
        );
        setShowModalEdit(false);
    };


    return (
        <div className="container mt-4">
            {/* Header Section */}
            <div
                className="row rounded bg-white p-3 align-items-center"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/covercampus.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    color: "white",
                }}
            >
                <div className="col-md-3 text-center">
                    <img
                        src="/logo-lp3i.png"
                        alt="Profile"
                        className="img-fluid rounded"
                        width="150"
                        height="150"
                    />
                </div>
                <div className="col-md-9">
                    <div className="d-flex justify-content-between align-items-center">
                        <h1 className="mb-0">Politeknik LP3I Tasikmalaya</h1>
                        <p className="mb-0">318/KPT/I/2019 <br /> No. SK Pendirian</p>
                        <div>
                            <p className="mb-0">Baik <br /> Akreditasi</p>
                        </div>
                    </div>
                    <p className="mt-3">046053</p>
                    <p className="mt-5">
                        <i className="bi bi-geo-alt-fill"></i> Jl. Pahlawan No.59, Sukaluyu, <br />
                        Kec. Cibeunying Kaler, Kota Bandung, Jawa Barat 40123
                    </p>
                </div>
                <div className="mt-5">
                    <Link to="/super_admin/kampus">
                        <button className="me-2 border rounded p-2 bg-dark bg-opacity-50 text-light" type="button">
                            Overview
                        </button>
                    </Link>
                    <button className="me-2 border rounded bg-secondary bg-opacity-50 p-2 text-light">
                        PSDKU
                    </button>
                    <Link to="/super_admin/programstudy">
                        <button className="border rounded p-2 bg-dark bg-opacity-50 text-light" type="button">
                            Program Study
                        </button>
                    </Link>
                </div>
            </div>

            {/* Table Section */}
            <div className="container mt-4">
                <div className="row rounded bg-white p-3 align-items-center">
                    <div className="d-flex justify-content-between">
                        <h4>Daftar PSDKU</h4>
                        <button className="btn btn-success mb-2" onClick={() => setShowModal(true)}>
                            <i className="bi bi-plus"></i> Tambah
                        </button>
                    </div>
                    <table className="table mt-4">
                        <thead>
                            <tr>
                                <th className="text-white bg-secondary bg-opacity-50 text-start">No</th>
                                <th className="text-white bg-secondary bg-opacity-50 text-start">Kode PT</th>
                                <th className="text-white bg-secondary bg-opacity-50 text-start">PSDKU</th>
                                <th className="text-white bg-secondary bg-opacity-50 text-center">Akreditasi</th>
                                <th className="text-white bg-secondary bg-opacity-50 text-center">Status</th>
                                <th className="text-white bg-secondary bg-opacity-50 text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {psdkuList.length > 0 ? (
                                psdkuList.map((psdku, index) => (
                                    <tr key={psdku._id}>
                                        <td>{index + 1}</td>
                                        <td>{psdku.kode_pt}</td>
                                        <td>{psdku.psdku || 'N/A'}</td>
                                        <td className='text-center'>{psdku.akreditasi.akreditasi || 'N/A'}</td>
                                        <td className={`text-center ${psdku.status === 'Aktif' ? 'text-success' : 'text-danger'}`}>
                                            {psdku.status || 'N/A'}
                                        </td>
                                        <td className='text-center'>
                                            <button className="btn btn-primary btn-sm me-2" onClick={() => openPreviewModal(psdku)}>
                                                <i className="bi bi-eye"></i>
                                            </button>
                                            <button className="btn btn-warning btn-sm me-2" onClick={() => openEditModal(psdku)}>
                                                <i className="bi bi-pencil"></i>
                                            </button>
                                            <button className="btn btn-danger btn-sm">
                                                <i className="bi bi-trash"></i>
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

            {/* Modal Tambah PSDKU */}
            {showModal && (
                <div className="modal fade show d-block">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Tambah PSDKU</h5>
                                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleSubmit}>
                                    <input
                                        type="text"
                                        name="kodePt"
                                        value={newPsdku.kodePt}
                                        onChange={handleInputChange}
                                        className="form-control mb-2"
                                        placeholder="Kode PT"
                                        required
                                    />
                                    <input
                                        type="text"
                                        name="psdku"
                                        value={newPsdku.psdku}
                                        onChange={handleInputChange}
                                        className="form-control mb-2"
                                        placeholder="PSDKU"
                                        required
                                    />
                                    <input
                                        type="text"
                                        name="akreditasi"
                                        value={newPsdku.akreditasi}
                                        onChange={handleInputChange}
                                        className="form-control mb-2"
                                        placeholder="Akreditasi"
                                        required
                                    />
                                    <select
                                        name="status"
                                        value={newPsdku.status}
                                        onChange={handleInputChange}
                                        className="form-control mb-2"
                                        required
                                    >
                                        <option value="">Pilih Status</option>
                                        <option value="Aktif">Aktif</option>
                                        <option value="Non-Aktif">Non-Aktif</option>
                                    </select>
                                    <button type="submit" className="btn btn-primary">Simpan</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {/* Edit Modal */}
            {showModalEdit && (
                <div className="modal fade show d-block">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Edit PSDKU</h5>
                                <button type="button" className="btn-close" onClick={() => setShowModalEdit(false)}></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleEditSubmit}>
                                    <div className="mb-2">
                                        <label>Kode PT</label>
                                        <input
                                            type="text"
                                            name="kodePt"
                                            value={editPsdku.kodePt}
                                            onChange={handleEditChange}
                                            className="form-control"
                                            disabled
                                        />
                                    </div>
                                    <div className="mb-2">
                                        <label>PSDKU</label>
                                        <input
                                            type="text"
                                            name="psdku"
                                            value={editPsdku.psdku}
                                            onChange={handleEditChange}
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="mb-2">
                                        <label>Akreditasi</label>
                                        <input
                                            type="text"
                                            name="akreditasi"
                                            value={editPsdku.akreditasi}
                                            onChange={handleEditChange}
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="mb-2">
                                        <label>Status</label>
                                        <select
                                            name="status"
                                            value={editPsdku.status}
                                            onChange={handleEditChange}
                                            className="form-control"
                                            required
                                        >
                                            <option value="">Pilih Status</option>
                                            <option value="Aktif">Aktif</option>
                                            <option value="Non-Aktif">Non-Aktif</option>
                                        </select>
                                    </div>

                                    <button type="submit" className="btn btn-primary">
                                        Update
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {/* Modal Priview */}
            {showModalPreview && (
                <div className="modal fade show d-block">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Preview PSDKU</h5>
                                <button type="button" className="btn-close" onClick={() => setShowModalPreview(false)}></button>
                            </div>
                            <div className="modal-body">
                                <p>Kode PT: {editPsdku.kodePt}</p>
                                <p>PSDKU: {editPsdku.psdku}</p>
                                <p>Akreditasi: {editPsdku.akreditasi}</p>
                                <p>Status: {editPsdku.status}</p>
                                {/* Other fields for display */}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'

export default function Psdku() {
    const [psdkuList, setPsdkuList] = useState([]); // State untuk menyimpan data PSDKU
    const [error, setError] = useState(null); // State untuk menangani error
    const [newPsdku, setNewPsdku] = useState({
        kode_pt: '',
        tanggal_berdiri: '',
        tanggal_sk: '',
        pengguna: '',
        alamat: '',
        psdku: '',
        akreditasi: '',
        // status: '',
    });

    const [akreditasiOptions, setAkreditasiOptions] = useState([]); // State untuk menyimpan opsi akreditasi
    const [penggunaOptions, setPenggunaOptions] = useState([]); // State untuk menyimpan opsi pengguna
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

    // Fungsi untuk mengambil data akreditasi dari API
    const fetchAkreditasi = async () => {
        try {
            const response = await axios.get('http://192.168.18.176:5000/prodi/akreditasi/all');
            setAkreditasiOptions(response.data.data || []); // Simpan data akreditasi

        } catch (error) {
            console.error("Error fetching akreditasi data:", error.message);
        }
    };

    // Fungsi untuk mengambil data akreditasi dari API
    const fetchPengguna = async () => {
        try {
            const response = await axios.get('http://192.168.18.176:5000/users/all');
            setPenggunaOptions(response.data.data); // Simpan data akreditasi

        } catch (error) {
            console.error("Error fetching akreditasi data:", error.message);
        }
    };

    useEffect(() => {
        fetchData();
        fetchAkreditasi(); 
        fetchPengguna(); // Panggil fungsi fetchAkreditasi saat komponen dimuat
    }, []);

    // fungsi untuk menambah data ke API
    const addPsdku = async () => {
        try {
            const response = await axios.post('http://192.168.18.176:5000/kampus/add', newPsdku);
            setPsdkuList((prevList) => [...prevList, response.data]); // Update the local list with the new data

            fetchData();
            setNewPsdku({ kode_pt: '', tanggal_berdiri: '', tanggal_sk: '', alamat: '', psdku: '', pengguna: '', akreditasi: '' }); // Reset form
            setShowModal(false); // Tutup modal

        } catch (error) {
            console.log("Response data:", error.response.data);
            console.error("Error adding PSDKU:", error.message);
            setError("Failed to add PSDKU. Please try again."); // Handle error
        }
    };

    // Fungsi untuk mengirimkan data yang telah diedit ke API
    const handleEditSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.put(
                `http://192.168.18.176:5000/kampus/edit/${editPsdku._id}`,
                editPsdku
            );
            console.log('Psdku updated successfully:', response.data);
        } catch (error) {
            console.error('Error updating PSDKU:', error);
            setError(error.response?.data?.message || 'An error occurred');
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
        console.log('Data yang dipilih untuk diedit:', psdku);
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
                                        <td className='text-center'>{psdku.akreditasi?.akreditasi || 'N/A'}</td>
                                        <td className={`text-center ${psdku.status === 'Aktif' ? 'text-success' : 'text-danger'}`}>
                                            {psdku.status || 'N/A'}
                                        </td>
                                        <td className='text-center'>
                                            <button className="btn-sm me-2 border-0 bg-transparent" onClick={() => openPreviewModal(psdku)}>
                                                <i className="bi bi-eye-fill text-info"></i>
                                            </button>
                                            <button className="btn-sm me-2 border-0 bg-transparent" onClick={() => openEditModal(psdku)}>
                                                <i className="bi bi-pencil-fill text-primary"></i>
                                            </button>
                                            <button className="btn-sm border-0 bg-transparent">
                                                <i className="bi bi-trash-fill text-danger"></i>
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
                                        name="kode_pt"
                                        value={newPsdku.kode_pt}
                                        onChange={handleInputChange}
                                        className="form-control mb-2"
                                        placeholder="Kode PT"
                                        required
                                    />
                                    <input
                                        type="date"
                                        name="tanggal_berdiri"
                                        value={newPsdku.tanggal_berdiri}
                                        onChange={handleInputChange}
                                        className="form-control mb-2"
                                        placeholder="Tanggal Berdiri"
                                        required
                                    />
                                    <input
                                        type="text"
                                        name="tanggal_sk"
                                        value={newPsdku.tanggal_sk}
                                        onChange={handleInputChange}
                                        className="form-control mb-2"
                                        placeholder="Tanggal SK"
                                        required
                                    />
                                    <input
                                        type="text"
                                        name="alamat"
                                        value={newPsdku.alamat}
                                        onChange={handleInputChange}
                                        className="form-control mb-2"
                                        placeholder="Alamat"
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
                                    <select
                                        name="pengguna"
                                        value={newPsdku.pengguna}
                                        onChange={handleInputChange}
                                        className="form-control mb-2"
                                        required
                                    >
                                        <option value="">Pilih Pengguna</option>
                                        {Array.isArray(penggunaOptions) && penggunaOptions.map((option) => (
                                            <option key={option._id} value={option._id}>
                                                {option.nama} {/* Menampilkan nama Pengguna */}
                                            </option>
                                        ))}
                                    </select>
                                    <select
                                        name="akreditasi"
                                        value={newPsdku.akreditasi}
                                        onChange={handleInputChange}
                                        className="form-control mb-2"
                                        required
                                    >
                                        <option value="">Pilih Akreditasi</option>
                                        {Array.isArray(akreditasiOptions) && akreditasiOptions.map((option) => (
                                            <option key={option._id} value={option._id}>
                                                {option.akreditasi} {/* Menampilkan nama akreditasi */}
                                            </option>
                                        ))}
                                    </select>
                                    {/* <select
                                        name="status"
                                        value={newPsdku.status}
                                        onChange={handleInputChange}
                                        className="form-control mb-2"
                                        required
                                    >
                                        <option value="">Pilih Status</option>
                                        <option value="Aktif">Aktif</option>
                                        <option value="Non-Aktif">Non-Aktif</option>
                                    </select> */}
                                    <button type="submit" className="btn btn-primary">Simpan</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {/* Edit Modal */}
            {showModalEdit && (
                <div className="modal fade show d-block" id="editModal" tabIndex="-1" role="dialog" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Edit PSDKU</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setShowModalEdit(false)}
                                    aria-label="Close"
                                ></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleEditSubmit}>
                                    <div className="mb-2">
                                        <label>Kode PT</label>
                                        <input
                                            type="text"
                                            name="kode_pt"
                                            value={editPsdku.kode_pt} // Mengambil nilai dari state
                                            onChange={handleEditChange}
                                            className="form-control"
                                            disabled
                                        />
                                    </div>
                                    <div className="mb-2">
                                        <label>Tanggal Berdiri</label>
                                        <input
                                            type="text"
                                            name="tanggal_berdiri"
                                            value={editPsdku.tanggal_berdiri}
                                            onChange={handleEditChange}
                                            className="form-control"
                                            disabled
                                        />
                                    </div>
                                    <div className="mb-2">
                                        <label>Tanggal SK</label>
                                        <input
                                            type="text"
                                            name="tanggal_sk"
                                            value={editPsdku.tanggal_sk}
                                            onChange={handleEditChange}
                                            className="form-control"
                                            disabled
                                        />
                                    </div>
                                    <div className="mb-2">
                                        <label>Pengguna</label>
                                        <select
                                            name="pengguna"
                                            value={newPsdku.pengguna}  // Nilai pengguna yang dipilih
                                            onChange={handleInputChange}  // Menangani perubahan pilihan
                                            className="form-control mb-2"
                                            required
                                        >
                                            {Array.isArray(penggunaOptions) && penggunaOptions.map((option) => (
                                                <option key={option._id} value={option._id}>
                                                    {option.nama}  {/* Menampilkan nama pengguna */}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="mb-2">
                                        <label>Alamat</label>
                                        <input
                                            type="text"
                                            name="alamat"
                                            value={editPsdku.alamat}
                                            onChange={handleEditChange}
                                            className="form-control"
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
                                        <select
                                            name="akreditasi"
                                            value={newPsdku.akreditasi}  // Nilai pengguna yang dipilih
                                            onChange={handleInputChange}  // Menangani perubahan pilihan
                                            className="form-control mb-2"
                                            required
                                        >
                                            {Array.isArray(akreditasiOptions) && akreditasiOptions.map((option) => (
                                                <option key={option._id} value={option._id}>
                                                    {option.akreditasi}  {/* Menampilkan nama pengguna */}
                                                </option>
                                            ))}
                                        </select>
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
                                            <option value="Non Aktif">Non-Aktif</option>
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

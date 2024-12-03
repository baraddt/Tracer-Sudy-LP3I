import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosClient from '../../services/axiosClient';

export default function Psdku() {
    const [psdkuList, setPsdkuList] = useState([]); // State untuk menyimpan data PSDKU
    const [error, setError] = useState(null); // State untuk menangani error
    const [newPsdku, setNewPsdku] = useState({
        kode_pt: '',
        tanggal_berdiri: '',
        tanggal_sk: '',
        alamat: '',
        psdku: '',
        prodi: [],
        pengguna: [],
        akreditasi: '',
        // status: '',
    });

    const [akreditasiOptions, setAkreditasiOptions] = useState([]); // State untuk menyimpan opsi akreditasi
    const [penggunaOptions, setPenggunaOptions] = useState([]); // State untuk menyimpan opsi pengguna
    const [prodiOptions, setProdiOptions] = useState([]); // State untuk menyimpan opsi prodi
    const [editPsdku, setEditPsdku] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showModalEdit, setShowModalEdit] = useState(false);
    const [previewPsdku, setPreviewPsdku] = useState(null);
    const [showModalPreview, setShowModalPreview] = useState(false); // State untuk kontrol modal

    // Fungsi untuk mengambil data dari API
    const fetchData = async () => {
        try {
            const response = await axiosClient.get('/kampus/all');
            // const response = await axiosClient.get('https://9l47d23v-5000.asse.devtunnels.ms/kampus/all');
            setPsdkuList(response.data.data); // Pastikan untuk mengupdate psdkuList dengan response.data.data
        } catch (error) {
            console.error("Error fetching data:", error.message);
        }
    };



    // Fungsi untuk mengambil data akreditasi dari API
    const fetchAkreditasi = async () => {
        try {
            const response = await axiosClient.get('/prodi/akreditasi/all');
            // const response = await axiosClient.get('https://9l47d23v-5000.asse.devtunnels.ms/prodi/akreditasi/all');
            setAkreditasiOptions(response.data.data || []); // Simpan data akreditasi

        } catch (error) {
            console.error("Error fetching akreditasi data:", error.message);
        }
    };

    // Fungsi untuk mengambil data pengguna dari API
    const fetchPengguna = async () => {
        try {
            const response = await axiosClient.get('/users/all');
            // const response = await axiosClient.get('https://9l47d23v-5000.asse.devtunnels.ms/users/all');
            setPenggunaOptions(response.data.data); // Simpan data akreditasi

        } catch (error) {
            console.error("Error fetching akreditasi data:", error.message);
        }
    };

    // fungsi untuk mengambil prodi dari API
    const fetchProdi = async () => {
        try {
            const response = await axiosClient.get('/prodi/all');
            // const response = await axiosClient.get('https://9l47d23v-5000.asse.devtunnels.ms/prodi/all');
            setProdiOptions(response.data.data);
        } catch (error) {
            console.error(("Error feching data:", error.message));

        }
    };

    // Fungsi untuk refresh data
    const refreshData = async () => {
        try {
            await fetchData(); // Panggil fetchData untuk memperbarui data
        } catch (error) {
            console.error("Error fetching updated data:", error);
        }
    };

    // Fungsi untuk menambah atau mengedit data
    const handleSaveData = async (data) => {
        try {
            setPsdkuList(data);  // Simpan data baru atau data yang diedit

            // Tunggu 3 detik dan refresh data
            setTimeout(async () => {
                await refreshData();
            }, 3000);
        } catch (error) {
            console.error("Error saving data:", error);
        }
    };


    useEffect(() => {
        fetchData();
        fetchAkreditasi();
        fetchPengguna();
        fetchProdi();
    }, []);

    //Fungsi CRUD

    // fungsi untuk menambah data ke API
    const addPsdku = async () => {
        try {
            const response = await axiosClient.post('/kampus/add', newPsdku);
            // const response = await axiosClient.post('https://9l47d23v-5000.asse.devtunnels.ms/kampus/add', newPsdku);
            setPsdkuList((prevList) => [...prevList, response.data]); // Update list
            fetchData();
            setNewPsdku({ kode_pt: '', tanggal_berdiri: '', tanggal_sk: '', alamat: '', psdku: '', prodi: [], pengguna: [], akreditasi: '' }); // Reset form
            setShowModal(false); // Tutup modal

        } catch (error) {
            console.log("Response data:", error.response.data);
            console.error("Error adding PSDKU:", error.message);
            setError("Failed to add PSDKU. Please try again.");
        }
    };

    // Fungsi untuk menambahkan pengguna ke dalam array pengguna
    const handleAddPengguna = (penggunaId) => {

        if (!newPsdku.pengguna.includes(penggunaId)) {
            setNewPsdku((prevPsdku) => ({
                ...prevPsdku,
                pengguna: [...prevPsdku.pengguna, penggunaId], // Menambah pengguna ke array
            }));
        }
    };

    const handleAddProdi = (prodiId) => {

        if (!newPsdku.prodi.includes(prodiId)) {
            setNewPsdku((prevPsdku) => ({
                ...prevPsdku,
                prodi: [...prevPsdku.prodi, prodiId],
            }));
        }
    };

    // Fungsi untuk mengirimkan data yang telah diedit ke API
    const handleEditSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axiosClient.put(
                `/kampus/edit/${editPsdku._id}`, editPsdku);

            console.log("data yang di kirim :", editPsdku);
            console.log('Psdku updated successfully:', response.data);
            setShowModalEdit(false);
        } catch (error) {
            console.error('Error updating PSDKU:', error);
            setError(error.response?.data?.message || 'An error occurred');
        }
    };

    // Fungsi untuk menghapus data psdku
    const deletePsdku = async (psdkuId) => {
        try {
            const response = await axiosClient.delete(`/kampus/delete/${psdkuId}`);
            // const response = await axiosClient.delete(`https://9l47d23v-5000.asse.devtunnels.ms/kampus/delete/${psdkuId}`);

            // Menghapus data psdku dari state setelah dihapus dari API
            setPsdkuList((prevList) => prevList.filter((psdku) => psdku._id !== psdkuId));

            console.log('Psdku deleted successfully:', response.data);
        } catch (error) {
            console.error('Error deleting psdku:', error.message);
        }
    };

    // fungsi melihat detail psdku
    const getPsdkuById = async (psdkuId) => {
        try {
            const response = await axiosClient.get(`/kampus/${psdkuId}`);
            // const response = await axiosClient.get(`https://9l47d23v-5000.asse.devtunnels.ms/kampus/${psdkuId}`);
            setPreviewPsdku(response.data.data); // Simpan data ke state previewPsdku
            setShowModalPreview(true); // Buka modal preview setelah data berhasil diambil
            console.log(response.data);

        } catch (error) {
            console.error("Error fetching PSDKU by ID:", error.message);
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
        setEditPsdku({
            ...psdku,
            prodi: psdku.prodi?.map((p) => p._id) || [], // Pastikan 'prodi' adalah array
            pengguna: psdku.pengguna || [], // Pastikan 'pengguna' adalah array
            akreditasi: psdku.akreditasi?._id || "", // Misalnya ID akreditasi
        });
        setShowModalEdit(true);
    };
    // Fungsi untuk menghapus pengguna dari array pada saat menambah
    const handleNewRemovePengguna = (penggunaId) => {
        setNewPsdku((prevPsdku) => ({
            ...prevPsdku,
            pengguna: prevPsdku.pengguna.filter((id) => id !== penggunaId),
        }));
    };

    // Fungsi untuk menghapus prodi dari array pada saat menambah
    const handleNewRemoveProdi = (prodiId) => {
        setNewPsdku((prevPsdku) => ({
            ...prevPsdku,
            prodi: prevPsdku.prodi.filter((id) => id !== prodiId),
        }));
    };

    // Fungsi untuk menghapus pengguna dari array pada saat edit
    const handleEditRemovePengguna = (penggunaId) => {
        setEditPsdku((prevPsdku) => ({
            ...prevPsdku,
            pengguna: prevPsdku.pengguna.filter((id) => id !== penggunaId),
        }));
    };
    // Fungsi untuk menghapus prodi dari array pada saat edit
    const handleEditRemoveProdi = (prodiId) => {
        setEditPsdku((prevPsdku) => ({
            ...prevPsdku,
            prodi: prevPsdku.prodi.filter((id) => id !== prodiId),
        }));
    };


    // fungsi modal preview
    const openPreviewModal = (psdkuId) => {
        getPsdkuById(psdkuId);
    };

    // fungsi close modal preview
    const closePreviewModal = () => {
        setShowModalPreview(false);
        setPreviewPsdku(null);
    };

    const handleEditChange = (event) => {
        const { name, value } = event.target;
        if (name === 'prodi') {
            // Jika prodi, tambahkan prodi ke dalam array jika belum ada
            setEditPsdku((prevPsdku) => {
                const updatedProdi = prevPsdku.prodi.includes(value)
                    ? prevPsdku.prodi // Jika prodi sudah ada, jangan menambahkannya lagi
                    : [...prevPsdku.prodi, value]; // Tambahkan prodi baru
                return { ...prevPsdku, prodi: updatedProdi };
            });
        } else if (name === 'pengguna') {
            // Sama untuk pengguna jika diperlukan
            setEditPsdku((prevPsdku) => {
                const updatedPengguna = prevPsdku.pengguna.includes(value)
                    ? prevPsdku.pengguna
                    : [...prevPsdku.pengguna, value];
                return { ...prevPsdku, pengguna: updatedPengguna };
            });
        } else {
            setEditPsdku((prevPsdku) => ({ ...prevPsdku, [name]: value }));
        }
    };




    return (
        <div className="container mt-4" style={{ paddingLeft: '24px', paddingRight: '24px' }}>
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
                        <h4 className="mb-0">Politeknik Lembaga Pendidikan dan Pengembangan Profesi Indonesia</h4>
                        <p className="mb-0 ms-3 me-5 col-md-2">
                            318/KPT/I/2019 <br /> No. SK Pendirian
                        </p>
                        <p className="mb-0">
                            Baik <br /> Akreditasi
                        </p>
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

            {/* Modal Tambah PSDKU */}
            {showModal && (
                <div className="modal fade show d-block">
                    <div className="modal-dialog">
                        <div className="modal-content" style={{ width: '750px' }}>
                            <div className="modal-header">
                                <h5 className="modal-title">Tambah PSDKU</h5>
                                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleSubmit}>

                                    <input
                                        type="number"
                                        name="kode_pt"
                                        className="form-control mb-2"
                                        value={newPsdku.kode_pt}
                                        onChange={handleInputChange}
                                        placeholder="Kode PT"
                                        required
                                    />
                                    <div className='d-flex justify-content-between'>
                                        <input
                                            type="date"
                                            name="tanggal_berdiri"
                                            value={newPsdku.tanggal_berdiri}
                                            onChange={handleInputChange}
                                            className="form-control mb-2 w-75 me-4"
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
                                    </div>
                                    <div className='d-flex justify-content-between'>
                                        <input
                                            type="text"
                                            name="alamat"
                                            value={newPsdku.alamat}
                                            onChange={handleInputChange}
                                            className="form-control mb-2 w-75 me-4"
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
                                    </div>
                                    {/* Dropdown atau checkbox untuk memilih prodi */}
                                    <div className="form-group">
                                        <select
                                            id="prodi"
                                            value={newPsdku.prodi}
                                            className="form-control"
                                            onChange={(e) => handleAddProdi(e.target.value)}
                                        >
                                            <option value="">-- Pilih Prodi --</option>
                                            {prodiOptions.map((option) => (
                                                <option key={option._id} value={option._id}>
                                                    {option.nama}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="mt-2">
                                        <strong>Prodi yang Ditambahkan:</strong>
                                        <ul>
                                            {newPsdku.prodi.map((prodiId, index) => {
                                                const prodi = prodiOptions.find(option => option._id === prodiId);
                                                return prodi ? (
                                                    <li key={index}>
                                                        {prodi.nama}
                                                        <button
                                                            type="button"
                                                            className="btn btn-sm btn-danger ml-2 ms-5"
                                                            onClick={() => handleNewRemoveProdi(prodiId)}
                                                        >
                                                            -
                                                        </button>
                                                    </li>
                                                ) : null;
                                            })}
                                        </ul>
                                    </div>
                                    {/* Dropdown atau checkbox untuk memilih pengguna */}
                                    <div className="form-group">
                                        <select
                                            id="pengguna"
                                            value={newPsdku.pengguna}
                                            className="form-control"
                                            onChange={(e) => handleAddPengguna(e.target.value)}
                                        >
                                            <option value="">-- Pilih Pengguna --</option>
                                            {penggunaOptions.map((option) => (
                                                <option key={option._id} value={option._id}>
                                                    {option.nama}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="mt-2">
                                        <strong>Pengguna yang Ditambahkan:</strong>
                                        <ul>
                                            {newPsdku.pengguna.map((penggunaId, index) => {
                                                const pengguna = penggunaOptions.find(option => option._id === penggunaId);
                                                return pengguna ? (
                                                    <li key={index}>
                                                        {pengguna.nama}
                                                        <button
                                                            type="button"
                                                            className="btn btn-sm btn-danger ml-2 ms-5"
                                                            onClick={() => handleNewRemovePengguna(penggunaId)}
                                                        >
                                                            -
                                                        </button>
                                                    </li>
                                                ) : null;
                                            })}
                                        </ul>
                                    </div>
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
                                    <button type="submit" className="btn btn-success" onClick={() => handleSaveData(psdkuList)}>Tambahkan</button>
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
                                        <label>Prodi</label>
                                        <select
                                            name="prodi"
                                            value={editPsdku.prodi}
                                            onChange={handleEditChange}
                                            className="form-control mb-2"
                                        >
                                            {Array.isArray(prodiOptions) && prodiOptions.map((option) => (
                                                <option key={option._id} value={option._id}>
                                                    {option.nama}
                                                </option>
                                            ))}
                                        </select>

                                    </div>
                                    <div className="mt-2">
                                        <strong>Prodi yang Ditambahkan:</strong>
                                        <ul>
                                            {editPsdku.prodi.map((prodiId, index) => {
                                                const prodi = prodiOptions.find(option => option._id === prodiId);
                                                return prodi ? (
                                                    <li key={index}>
                                                        {prodi.nama}
                                                        <button
                                                            type="button"
                                                            className="btn btn-sm btn-danger ml-2 ms-4"
                                                            onClick={() => handleEditRemoveProdi(prodiId)}
                                                        >
                                                            -
                                                        </button>
                                                    </li>
                                                ) : null;
                                            })}
                                        </ul>
                                    </div>

                                    <div className="mb-2">
                                        <label>Pengguna</label>
                                        <select
                                            name="pengguna"
                                            value={editPsdku.pengguna}
                                            onChange={handleEditChange}
                                            className="form-control mb-2"
                                            required
                                        >
                                            {Array.isArray(penggunaOptions) && penggunaOptions.map((option) => (
                                                <option key={option._id} value={option._id}>
                                                    {option.nama} {/* Menampilkan nama pengguna */}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="mt-2">
                                        <strong>Pengguna yang Ditambahkan:</strong>
                                        <ul>
                                            {editPsdku.pengguna.map((penggunaId, index) => {
                                                const pengguna = penggunaOptions.find(option => option._id === penggunaId);
                                                return pengguna ? (
                                                    <li key={index}>
                                                        {pengguna.nama}
                                                        <button
                                                            type="button"
                                                            className="btn btn-sm btn-danger ml-2 ms-4"
                                                            onClick={() => handleEditRemovePengguna(penggunaId)}
                                                        >
                                                            -
                                                        </button>
                                                    </li>
                                                ) : null;
                                            })}
                                        </ul>
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
                                            value={editPsdku.akreditasi}
                                            onChange={handleEditChange} // Gunakan fungsi yang baru
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

                                    <button type="submit" className="btn btn-primary" onClick={() => handleSaveData(psdkuList)} >
                                        Update
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal Preview */}
            {showModalPreview && previewPsdku && (
                <div className="modal fade show d-block" tabIndex="-1" role="dialog" aria-hidden="true" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered" role="document"> {/* Gunakan kelas modal-dialog-centered */}
                        <div className="modal-content">
                            <div className="modal-header d-flex justify-content-between">
                                <h5 className="modal-title">Detail PSDKU</h5>
                                <button type="button" className="close" aria-label="Close" onClick={closePreviewModal}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <p><strong>Kode PT:</strong> {previewPsdku.kode_pt}</p>
                                <p><strong>Tanggal Berdiri:</strong> {previewPsdku.tanggal_berdiri}</p>
                                <p><strong>Tanggal SK:</strong> {previewPsdku.tanggal_sk}</p>
                                <p><strong>Alamat:</strong> {previewPsdku.alamat}</p>
                                <p><strong>PSDKU:</strong> {previewPsdku.psdku}</p>
                                <p><strong>Akreditasi:</strong> {previewPsdku.akreditasi?.akreditasi || 'N/A'}</p>

                                {/* Render Prodi */}
                                <p><strong>Prodi:</strong></p>
                                <ul>
                                    {previewPsdku.prodi && previewPsdku.prodi.length > 0 ? (
                                        previewPsdku.prodi.map((prodi) => (
                                            <li key={prodi._id}>{prodi.nama || 'N/A'}</li>
                                        ))
                                    ) : (
                                        <li>Tidak ada Prodi</li>
                                    )}
                                </ul>

                                {/* Render Pengguna */}
                                <p><h4>Pengguna:</h4></p>
                                <ul>
                                    {previewPsdku.pengguna && previewPsdku.pengguna.length > 0 ? (
                                        previewPsdku.pengguna.map((pengguna) => (
                                            <li key={pengguna._id}>{pengguna.nama || 'N/A'}</li>
                                        ))
                                    ) : (
                                        <li>Tidak ada pengguna</li>
                                    )}
                                </ul>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={closePreviewModal}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
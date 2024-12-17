import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosClient from '../../services/axiosClient';
// import axios from 'axios';
import PsdkuDelete from '../../components/compModals/psdkuDelete';
import ModalFailed from '../../components/compModals/modalFailed';
import ModalSuccess from '../../components/compModals/modalsuccess';

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
    const [psdkuToDelete, setPsdkuToDelete] = useState(null);
    const [editPsdku, setEditPsdku] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showModalEdit, setShowModalEdit] = useState(false);
    const [previewPsdku, setPreviewPsdku] = useState(null);
    const [showModalPreview, setShowModalPreview] = useState(false);
    const [showFailedModal, setShowFailedModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showModalDelete, setShowModalDelete] = useState(false);

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
            setShowModal(false);
            setShowSuccessModal(true);

        } catch (error) {

            setShowFailedModal(true);
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
            setShowSuccessModal(true);
        } catch (error) {
            setShowFailedModal(true);
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
            setShowSuccessModal(true);
        } catch (error) {
            setShowFailedModal(true);
            console.error('Error deleting psdku:', error.message);
        }
    };

    const handleDeleteClick = (psdku) => {
        setPsdkuToDelete(psdku); // Menyimpan data pengguna yang akan dihapus
        setShowModalDelete(true); // Menampilkan modal konfirmasi
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



    // const [provinces, setProvinces] = useState([]);
    // const [regencies, setRegencies] = useState([]);
    // const [districts, setDistricts] = useState([]);
    // const [villages, setVillages] = useState([]);
    // const [selectedProvince, setSelectedProvince] = useState(null);
    // const [selectedRegency, setSelectedRegency] = useState(null);
    // const [selectedDistrict, setSelectedDistrict] = useState(null);

    // // Fungsi untuk mengambil kabupaten berdasarkan id provinsi
    // const fetchProvinces = async () => {
    //     try {
    //         const response = await axios.get('/api/provinces.json');
    //         console.log('API Response:', response);
    //         setProvinces(response.data);
    //     } catch (error) {
    //         console.error('Error fetching provinces:', error.message);
    //     }
    // };


    // const fetchRegencies = async (provinceId) => {
    //     try {
    //         const response = await axios.get(`/api-wilayah-indonesia/api/regencies/${provinceId}.json`);
    //         setRegencies(response.data);  // Simpan data kabupaten
    //     } catch (error) {
    //         console.error("Error fetching regencies:", error.message);
    //     }
    // };

    // // Fungsi untuk mengambil kecamatan berdasarkan id kabupaten
    // const fetchDistricts = async (regencyId) => {
    //     try {
    //         const response = await axios.get(`/api-wilayah-indonesia/api/districts/${regencyId}.json`);
    //         setDistricts(response.data);  // Simpan data kecamatan
    //     } catch (error) {
    //         console.error("Error fetching districts:", error.message);
    //     }
    // };

    // // Fungsi untuk mengambil kelurahan berdasarkan id kecamatan
    // const fetchVillages = async (districtId) => {
    //     try {
    //         const response = await axios.get(`/api-wilayah-indonesia/api/villages/${districtId}.json`);
    //         setVillages(response.data);  // Simpan data kelurahan
    //     } catch (error) {
    //         console.error("Error fetching villages:", error.message);
    //     }
    // };

    // // Mengambil semua data ketika komponen dimuat pertama kali
    // useEffect(() => {
    //     fetchProvinces();  // Ambil data provinsi
    // }, []);

    // // Fungsi untuk menangani perubahan provinsi
    // const handleProvinceChange = (e) => {
    //     const provinceId = e.target.value;
    //     setSelectedProvince(provinceId);  // Simpan id provinsi yang dipilih
    //     fetchRegencies(provinceId);  // Ambil kabupaten berdasarkan provinsi
    // };

    // // Fungsi untuk menangani perubahan kabupaten
    // const handleRegencyChange = (e) => {
    //     const regencyId = e.target.value;
    //     setSelectedRegency(regencyId);  // Simpan id kabupaten yang dipilih
    //     fetchDistricts(regencyId);  // Ambil kecamatan berdasarkan kabupaten
    // };

    // // Fungsi untuk menangani perubahan kecamatan
    // const handleDistrictChange = (e) => {
    //     const districtId = e.target.value;
    //     setSelectedDistrict(districtId);  // Simpan id kecamatan yang dipilih
    //     fetchVillages(districtId);  // Ambil kelurahan berdasarkan kecamatan
    // };




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
                <div className="col-9">
                    <div className="d-row d-md-flex d-sm-row justify-content-between align-items-center">
                        <h4 className="mb-3 mb-sm-3 mb-md-0 text-light">Politeknik Lembaga Pendidikan dan Pengembangan Profesi Indonesia</h4>
                        <p className="mb-0 ms-md-3 me-md-5 col-md-2 text-light">
                            318/KPT/I/2019 <br /> No. SK Pendirian
                        </p>
                        <p className="mb-0 text-light">
                            Baik <br /> Akreditasi
                        </p>
                    </div>

                    <p className="mt-3 text-light">046053</p>
                    <p className="mt-5 text-light">
                        <i className="bi bi-geo-alt-fill text-light"></i> Jl. Pahlawan No.59, Sukaluyu, <br />
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
                <div className="row rounded table-responsive-sm table-responsive-md bg-white p-3 align-items-center">
                    <div className="d-flex justify-content-between">
                        <h4 className='text-dark'>Daftar PSDKU</h4>
                        <button className="btn btn-success mb-2" onClick={() => setShowModal(true)}>
                            <i className="bi bi-plus text-light"></i> Tambah
                        </button>
                        {/* <button className='btn btn-info' onClick={() => openEditModal(true)}>Cek Modal Edit</button>
                        <button className='btn btn-info' onClick={() => setShowModalPreview(true)}>Cek Modal Preview</button> */}
                    </div>
                    <table className="table mt-4">
                        <thead className='table table-secondary'>
                            <tr>
                                <th className="fw-semibold text-dark text-start">No</th>
                                <th className="fw-semibold text-dark text-start">Kode PT</th>
                                <th className="fw-semibold text-dark text-start text-truncate">PSDKU</th>
                                <th className="fw-semibold text-dark text-center">Akreditasi</th>
                                <th className="fw-semibold text-dark text-center">Status</th>
                                <th className="fw-semibold text-dark text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {psdkuList.length > 0 ? (
                                psdkuList.map((psdku, index) => (
                                    <tr key={psdku._id}>
                                        <td>{index + 1}</td>
                                        <td>{psdku.kode_pt}</td>
                                        <td className='text-truncate'>{psdku.psdku || 'N/A'}</td>
                                        <td className='text-center text-truncate'>{psdku.akreditasi?.akreditasi || 'N/A'}</td>
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
                                                <i className="bi bi-trash-fill text-danger" onClick={() => handleDeleteClick(psdku._id)}></i>
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
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal Tambah PSDKU */}
            {showModal && (
                <div className="modal fade show d-block" style={{ position: 'fixed', top: '50%', left: '45%', transform: 'translate(-50%, -50%)' }}>
                    <div className="modal-dialog">
                        <div className="modal-content" style={{ width: '800px' }}>
                            <div className="modal-header">
                                <h5 className="modal-title">Tambah PSDKU</h5>
                                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleSubmit}>
                                    <div className='d-flex justify-content-between'>
                                        <div className="w-100 w-80 me-4">
                                            <label htmlFor="kode_pt" className="form-label">Kode PT :</label>
                                            <input
                                                type="number"
                                                name="kode_pt"
                                                className="form-control mb-2"
                                                value={newPsdku.kode_pt}
                                                onChange={handleInputChange}
                                                placeholder="Kode PT"
                                                required
                                            />
                                        </div>
                                        <div className="w-100">
                                            <label htmlFor="psdku" className="form-label">PSDKU :</label>
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
                                    </div>
                                    <div className='d-flex justify-content-between'>
                                        <div className="w-100 w-80 me-4">
                                            <label htmlFor="tanggal_berdiri" className="form-label">Tanggal Berdiri :</label>
                                            <input
                                                type="date"
                                                name="tanggal_berdiri"
                                                value={newPsdku.tanggal_berdiri}
                                                onChange={handleInputChange}
                                                className="form-control mb-2"
                                                placeholder="Tanggal Berdiri"
                                                required
                                            />
                                        </div>
                                        <div className="w-100">
                                            <label htmlFor="tanggal_sk" className="form-label">Tanggal SK :</label>
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
                                    </div>
                                    <div className='d-flex justify-content-between'>
                                        <div className="w-100 w-80 me-4">
                                            <label htmlFor="alamat" className="form-label">Provinsi :</label>
                                            <div className="input-group mb-2">
                                                <select
                                                    id='provinsi'
                                                    // value={selectedProvince || ''}
                                                    className="form-control"
                                                    // onChange={handleProvinceChange}
                                                    required
                                                >
                                                    <option value="">Pilih Provinsi</option>
                                                    {/* Periksa apakah provinces adalah array sebelum menggunakan map */}
                                                    {/* {Array.isArray(provinces) && provinces.map(province => (
                                                        <option key={province.id} value={province.id}>{province.name}</option>
                                                    ))} */}
                                                </select>
                                                <span className="input-group-text">
                                                    <i className="bi bi-chevron-down"></i>
                                                </span>
                                            </div>
                                        </div>

                                        <div className="w-100">
                                            <label htmlFor="alamat" className="form-label">Kota :</label>
                                            <div className="input-group mb-2">
                                                <select
                                                    id="kota"
                                                    // value={selectedRegency || ''}
                                                    className='form-control'
                                                    // onChange={handleRegencyChange}
                                                    // disabled={!selectedProvince}
                                                    required
                                                >
                                                    <option value="">Pilih Kota</option>
                                                    {/* Periksa apakah regencies adalah array sebelum menggunakan map */}
                                                    {/* {Array.isArray(regencies) && regencies.map(regency => (
                                                        <option key={regency.id} value={regency.id}>{regency.name}</option>
                                                    ))} */}
                                                </select>
                                                <span className="input-group-text">
                                                    <i className="bi bi-chevron-down"></i>
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='d-flex justify-content-between'>
                                        <div className="w-100 w-80 me-4">
                                            <label htmlFor="alamat" className="form-label">Kabupaten :</label>
                                            <div className="input-group mb-2">
                                                <select
                                                    id="kabupaten"
                                                    // value={selectedDistrict || ''}
                                                    className='form-control'
                                                // onChange={handleDistrictChange}
                                                // disabled={!selectedRegency}
                                                >
                                                    <option value="">Pilih Kabupaten</option>
                                                    {/* Periksa apakah districts adalah array sebelum menggunakan map */}
                                                    {/* {Array.isArray(districts) && districts.map(district => (
                                                        <option key={district.id} value={district.id}>{district.name}</option>
                                                    ))} */}
                                                </select>
                                                <span className="input-group-text">
                                                    <i className="bi bi-chevron-down"></i>
                                                </span>
                                            </div>
                                        </div>

                                        <div className="w-100">
                                            <label htmlFor="alamat" className="form-label">Kelurahan :</label>
                                            <div className="input-group">
                                                <select
                                                    id="kelurahan"
                                                    // value={newPsdku.alamat || ''}
                                                    className='form-control'
                                                // disabled={!selectedDistrict}
                                                >
                                                    <option value="">Pilih Kelurahan</option>
                                                    {/* Periksa apakah villages adalah array sebelum menggunakan map */}
                                                    {/* {Array.isArray(villages) && villages.map(village => (
                                                        <option key={village.id} value={village.id}>{village.name}</option>
                                                    ))} */}
                                                </select>
                                                <span className="input-group-text">
                                                    <i className="bi bi-chevron-down"></i>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='d-flex justify-content-between mb-2'>
                                        <div className="form-group w-50 me-4">
                                            <label htmlFor="prodi" className="form-label">Pilih Prodi :</label>
                                            <div className="input-group mb-2">
                                                <select
                                                    id="prodi"
                                                    value={newPsdku.prodi}
                                                    className="form-control"
                                                    onChange={(e) => handleAddProdi(e.target.value)}
                                                >
                                                    <option value=""> Pilih Prodi </option>
                                                    {prodiOptions.map((option) => (
                                                        <option key={option._id} value={option._id}>
                                                            {option.nama}
                                                        </option>
                                                    ))}
                                                </select>
                                                <span className="input-group-text">
                                                    <i className="bi bi-chevron-down"></i>
                                                </span>
                                            </div>
                                        </div>

                                        <div className="mt-2">
                                            <span>Prodi yang Ditambahkan :</span>
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
                                    </div>
                                    <div className='d-flex justify-content-between mb-2'>
                                        <div className="form-group w-50 me-4">
                                            <label htmlFor="pengguna" className="form-label">Pilih Pengguna</label>
                                            <div className="input-group mb-2">
                                                <select
                                                    id="pengguna"
                                                    value={newPsdku.pengguna}
                                                    className="form-control"
                                                    onChange={(e) => handleAddPengguna(e.target.value)}
                                                >
                                                    <option value="">Pilih Pengguna</option>
                                                    {penggunaOptions.map((option) => (
                                                        <option key={option._id} value={option._id}>
                                                            {option.nama}
                                                        </option>
                                                    ))}
                                                </select>
                                                <span className="input-group-text">
                                                    <i className="bi bi-chevron-down"></i>
                                                </span>
                                            </div>
                                        </div>

                                        <div className="mt-2">
                                            <span>Pengguna yang Ditambahkan :</span>
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
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="akreditasi" className="form-label">Pilih Akreditasi :</label>
                                        <div className="input-group mb-4">
                                            <select
                                                name="akreditasi"
                                                value={newPsdku.akreditasi}
                                                onChange={handleInputChange}
                                                className="form-control"
                                                required
                                            >
                                                <option value="">Pilih Akreditasi</option>
                                                {Array.isArray(akreditasiOptions) && akreditasiOptions.map((option) => (
                                                    <option key={option._id} value={option._id}>
                                                        {option.akreditasi}
                                                    </option>
                                                ))}
                                            </select>
                                            <span className="input-group-text">
                                                <i className="bi bi-chevron-down"></i>
                                            </span>
                                        </div>
                                    </div>
                                    <button type="submit" className="btn btn-success" onClick={() => handleSaveData(psdkuList)}>Tambahkan</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div >
            )
            }
            {/* Edit Modal */}
            {
                showModalEdit && (
                    <div className="modal fade show d-block" id="editModal" tabIndex="-1" role="dialog" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content" style={{ width: '600px' }}>
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
                                        <div className='d-flex gap-2'>
                                            <div className="mb-2 w-50">
                                                <label className='mb-2'>Kode PT</label>
                                                <input
                                                    type="text"
                                                    name="kode_pt"
                                                    value={editPsdku.kode_pt} // Mengambil nilai dari state
                                                    onChange={handleEditChange}
                                                    className="form-control"
                                                    disabled
                                                />
                                            </div>
                                            <div className="mb-2 w-50">
                                                <label className='mb-2'>PSDKU</label>
                                                <input
                                                    type="text"
                                                    name="psdku"
                                                    value={editPsdku.psdku}
                                                    onChange={handleEditChange}
                                                    className="form-control"
                                                />
                                            </div>
                                        </div>
                                        <div className='d-flex gap-2'>
                                            <div className="mb-2 w-50">
                                                <label className='mb-2'>Tanggal Berdiri</label>
                                                <input
                                                    type="text"
                                                    name="tanggal_berdiri"
                                                    value={editPsdku.tanggal_berdiri}
                                                    onChange={handleEditChange}
                                                    className="form-control"
                                                    disabled
                                                />
                                            </div>
                                            <div className="mb-2 w-50">
                                                <label className='mb-2'>Tanggal SK</label>
                                                <input
                                                    type="text"
                                                    name="tanggal_sk"
                                                    value={editPsdku.tanggal_sk}
                                                    onChange={handleEditChange}
                                                    className="form-control"
                                                    disabled
                                                />
                                            </div>
                                        </div>
                                        <div className='d-flex justify-content-between'>
                                            <div className="mb-2 w-50">
                                                <label className='mb-2'>Prodi</label>
                                                <div className='input-group'>
                                                    <select
                                                        name="prodi"
                                                        value={editPsdku.prodi}
                                                        onChange={handleEditChange}
                                                        className="form-control"
                                                    >
                                                        {Array.isArray(prodiOptions) && prodiOptions.map((option) => (
                                                            <option key={option._id} value={option._id}>
                                                                {option.nama}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    <span className="input-group-text">
                                                        <i className="bi bi-chevron-down"></i>
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="mt-2">
                                                <span>Prodi yang Ditambahkan:</span>
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
                                        </div>
                                        <div className='d-flex justify-content-between'>
                                            <div className="mb-2 w-50">
                                                <label className='mb-2'>Pengguna</label>
                                                <div className='input-group'>
                                                    <select
                                                        name="pengguna"
                                                        value={editPsdku.pengguna}
                                                        onChange={handleEditChange}
                                                        className="form-control"
                                                        required
                                                    >
                                                        {Array.isArray(penggunaOptions) && penggunaOptions.map((option) => (
                                                            <option key={option._id} value={option._id}>
                                                                {option.nama} {/* Menampilkan nama pengguna */}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    <span className="input-group-text">
                                                        <i className="bi bi-chevron-down"></i>
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="mt-2">
                                                <span>Pengguna yang Ditambahkan:</span>
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
                                        </div>
                                        <div className='d-flex justify-content-between'>
                                            <div className="mb-2 w-50 me-3">
                                                <label className='mb-2'>Provinsi</label>
                                                <div className="input-group">
                                                    <input
                                                        type="text"
                                                        name="alamat"
                                                        value={editPsdku.alamat}
                                                        onChange={handleEditChange}
                                                        className="form-control"
                                                    />
                                                    <span className="input-group-text">
                                                        <i className="bi bi-chevron-down"></i>
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="mb-2 w-50">
                                                <label className='mb-2'>Kota</label>
                                                <div className='input-group'>
                                                    <input
                                                        type="text"
                                                        name="alamat"
                                                        value={editPsdku.alamat}
                                                        onChange={handleEditChange}
                                                        className="form-control"
                                                    />
                                                    <span className="input-group-text">
                                                        <i className="bi bi-chevron-down"></i>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='d-flex justify-content-between'>
                                            <div className="mb-2 w-50 me-3">
                                                <label className='mb-2'>Kabupaten</label>
                                                <div className="input-group">
                                                    <input
                                                        type="text"
                                                        name="alamat"
                                                        value={editPsdku.alamat}
                                                        onChange={handleEditChange}
                                                        className="form-control"
                                                    />
                                                    <span className="input-group-text">
                                                        <i className="bi bi-chevron-down"></i>
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="mb-2 w-50">
                                                <label className='mb-2'>Kecamatan</label>
                                                <div className="input-group">
                                                    <input
                                                        type="text"
                                                        name="alamat"
                                                        value={editPsdku.alamat}
                                                        onChange={handleEditChange}
                                                        className="form-control"
                                                    />
                                                    <span className="input-group-text">
                                                        <i className="bi bi-chevron-down"></i>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mb-2">
                                            <label className='mb-2'>Akreditasi</label>
                                            <div className="input-group">
                                                <select
                                                    name="akreditasi"
                                                    value={editPsdku.akreditasi}
                                                    onChange={handleEditChange} // Gunakan fungsi yang baru
                                                    className="form-control"
                                                    required
                                                >
                                                    {Array.isArray(akreditasiOptions) && akreditasiOptions.map((option) => (
                                                        <option key={option._id} value={option._id}>
                                                            {option.akreditasi}  {/* Menampilkan nama pengguna */}
                                                        </option>
                                                    ))}
                                                </select>
                                                <span className="input-group-text">
                                                    <i className="bi bi-chevron-down"></i>
                                                </span>
                                            </div>
                                        </div>
                                        <div className="">
                                            <label className='mb-2'>Status</label>
                                            <div className="input-group mb-3">
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
                                                <span className="input-group-text">
                                                    <i className="bi bi-chevron-down"></i>
                                                </span>
                                            </div>
                                        </div>

                                        <button type="submit" className="btn btn-primary" onClick={() => handleSaveData(psdkuList)} >
                                            Update
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }

            {/* Modal Priview */}
            {showModalPreview && (
                <div className="modal fade show d-block">
                    <div className="modal-dialog">
                        <div className="modal-content" style={{ width: '800px' }}>
                            <div className="modal-content shadow-lg">
                                <div className="modal-body p-4">
                                    <div className="text-center">
                                        {/* Nama */}
                                        <h5 className="fw-bold mb-1">Politeknik LP3I Bandung</h5>
                                        {/* Jabatan */}
                                        <p className="text-muted mb-4">460052</p>
                                    </div>
                                    {/* Info Tambahan */}
                                    <hr />
                                    <p className="text-center text-uppercase text-muted fw-bold mb-3">
                                        More Info
                                    </p>
                                    <div className="d-flex justify-content-between">
                                        <span className="fw-bold">Tgl Berdiri</span>
                                        <span>20 Desember 2024</span>
                                    </div>
                                    <div className="d-flex justify-content-between mt-2">
                                        <span className="fw-bold">Tgl SK</span>
                                        <span>SK/10/19/2004</span>
                                    </div>
                                    <div className="d-flex justify-content-between mt-2">
                                        <span className="fw-bold">Alamat</span>
                                        <span>Jawa Barat, Bandung, Cibiru, Sukarno Hatta 11</span>
                                    </div>
                                    <hr />
                                    <p className="text-center text-uppercase text-muted fw-bold mb-3">
                                        Prodi And Kaprodi
                                    </p>
                                    <div className="d-flex justify-content-between">
                                        <span className="fw-bold">Manajement Informatika</span>
                                        <span>Rita S.Pd</span>
                                    </div>
                                    <div className="d-flex justify-content-between mt-2">
                                        <span className="fw-bold">Administrasi Bisnis</span>
                                        <span>Nijar S.Pd</span>
                                    </div>
                                    <div className="d-flex justify-content-between mt-2">
                                        <span className="fw-bold">Manajement Keuangan Perbangkan</span>
                                        <span>Aripin S.Pd</span>
                                    </div>
                                </div>
                                <div className="modal-footer border-0">
                                    <button
                                        type="button"
                                        className="btn btn-secondary w-100 rounded-pill"
                                        onClick={() => setShowModalPreview(false)}
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

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
            {psdkuToDelete && (
                <PsdkuDelete
                    show={showModalDelete}
                    onClose={() => setShowModalDelete(false)}
                    message="Apakah Anda yakin ingin menghapus Psdku ini? Tindakan ini tidak bisa dibatalkan."
                    psdku={psdkuToDelete}
                    deletePsdku={deletePsdku} // Mengirimkan fungsi deleteUser ke modal
                />
            )}
        </div >
    );
}
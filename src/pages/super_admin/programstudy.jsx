import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function ProgramList() {
    const [programList, setProgramList] = useState([]);
    const [error, setError] = useState(null);
    const [newProgram, setNewProgram] = useState({
        kode: '',
        nama: '',
        jenjang: '',
        akreditasi: '',
        status: '',
    });
    const [akreditasiOptions, setAkreditasiOptions] = useState([]);
    const [jenjangOptions, setJenjangOptions] = useState([]);
    const [editProgram, setEditProgram] = useState(null);
    const [previewProgram, setPreviewProgram] = useState(null);
    const [showModalTambah, setShowModalTambah] = useState(false);
    const [showModalEdit, setShowModalEdit] = useState(false);
    const [showModalPreview, setShowModalPreview] = useState(false);

    // const dummyProgram = [
    //     { kodePs: '450052', programStudy: 'Administrasi Bisnis', jenjang: 'D3', akreditasi: 'Baik Sekali', status: 'Aktif' },
    //     { kodePs: '450053', programStudy: 'Manajemen Informatika', jenjang: 'D3', akreditasi: 'Baik Sekali', status: 'Aktif' },
    //     { kodePs: '450054', programStudy: 'Teknik Otomotif', jenjang: 'D2', akreditasi: 'Baik Sekali', status: 'Non-Aktif' },
    // ];

    // const fetchProgram = () => {
    //     setProgramList(dummyProgram);
    // };



    // fungsi untuk get data dari API
    const fetchData = async () => {
        try {
            // const response = await axios.get('http://192.168.18.176:5000/prodi/all');
            const response = await axios.get('https://9l47d23v-5000.asse.devtunnels.ms/prodi/all');

            setProgramList(response.data.data);
        } catch (error) {
            console.error("Error feching data:", error.message);
        }
    }

    // fungsi untuk get akreditasi dari API
    const fetchAkreditasi = async () => {
        try {
            // const response = await axios.get('http://192.168.18.176:5000/prodi/akreditasi/all');
            const response = await axios.get('https://9l47d23v-5000.asse.devtunnels.ms/prodi/akreditasi/all');

            setAkreditasiOptions(response.data.data || []);
        } catch (error) {
            console.error("Error feching akreditasi data:", error.message);
        }
    }

    // fungsi untuk get jenjang dari API

    const fetchJenjang = async () => {
        try {
            // const response = await axios.get('http://192.168.18.176:5000/prodi/jenjang/all');
            const response = await axios.get('https://9l47d23v-5000.asse.devtunnels.ms/prodi/jenjang/all');

            setJenjangOptions(response.data.data || []);
        } catch (error) {
            console.error("Error feching jenjang data:", error.message);

        }
    };

    // fungsi untuk refresh data
    const refreshData = async () => {
        try {
            await fetchData(); //panggil datanya
        } catch (error) {
            console.error("Error feching updated data:" , error);
            
        }
    };

    //fungsi untuk menambah atau mengedit data agar langsung refresh
    const handleSaveData = async (data) => {
        try {
            setProgramList(data); //simpan data baru atau data yang di edit

            // tunggu 3 detik dan refresh data
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
        fetchJenjang();
    }, []);


    // fungsi CRUD

    // fungsi untuk menambah data programstudy lewat API
    const AddProgram = async () => {
        try {
            // const response = await axios.post('http://192.168.18.176:5000/prodi/add', newProgram)
            const response = await axios.post('https://9l47d23v-5000.asse.devtunnels.ms/prodi/add', newProgram)
            setProgramList((prevList) => [...prevList, response.data]);
            fetchData();
            setNewProgram({ kode: '', nama: '', jenjang: '', akreditasi: '', status: '' });
            setShowModalTambah(false);
        } catch (error) {
            console.log('Response data:', error.response.data);
            console.error("Error Adding Program Study:", error.message);
            setError("Failed to add Program. Please Try Again..");

        }
    };

    // Fungsi untuk menghapus program study lewat APi
    const deleteProgram = async (programId) => {
        try {
            // const response = await axios.delete(`http://192.168.18.176:5000/prodi/delete/${psdkuId}`)
            const response = await axios.delete(`https://9l47d23v-5000.asse.devtunnels.ms/prodi/delete/${programId}`);

            setProgramList((prevList) => prevList.filter((program) => program._id !== programId));

            console.log('Program Study deleted successfully:' , response.data);
            
        } catch (error) {
            console.error('Error Delete Program Study');
            
        }
    };

    // fungsi melihat detail program study dari API
    const getProgramById = async (programId) => {
        try {
            const response = await axios.get(`https://9l47d23v-5000.asse.devtunnels.ms/prodi/${programId}`);
            setPreviewProgram(response.data.data);
            setShowModalPreview(true);
            console.log(response.data);
            
        } catch (error) {
            console.error("Error feching Program Study By ID:", error.message);
            
        }
    }


    //fungsi untuk mengedit data melalui API

    const handleEditSubmit = async (event) => {
        event.preventDefault();
        try {
            // const response = await axios.put(`http://192.168.18.176:5000/prodi/edit/${editProgram._id}`, editProgram);
            const response = await axios.put(`https://9l47d23v-5000.asse.devtunnels.ms/prodi/edit/${editProgram._id}`, editProgram);

            console.log("data yang terkirim:", editProgram);
            console.log('ProgramStudy updated Successfuly:', response.data);
            setShowModalEdit(false);
        } catch (error) {

            console.error("Error updating Program Study:", error.message);
            setError(error.response?.data?.message || 'An error occurred');
        }
    }




    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProgram((prevProgram) => ({
            ...prevProgram,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        AddProgram(); // Call the add function instead of updating the list directly
    };

    const openEditModal = (program) => {
        console.log('Data yang dipilih untuk diedit:', program);
        setEditProgram({
            ...program,
            jenjang: program.jenjang?._id || "",
            akreditasi: program.akreditasi?._id || "",
        });
        setShowModalEdit(true);
    };

    const openPreviewModal = (programId) => {
        getProgramById(programId);
    };

    const closePreviewModal = () => {
        setShowModalPreview(false);
        setPreviewProgram(null);
    }

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditProgram((prevProgram) => ({
            ...prevProgram,
            [name]: value,
        }));
    };




    return (
        <div className="container mt-4">
            <div
                className="row rounded bg-white p-3 align-items-center"
                style={{
                    backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/covercampus.jpg')",
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
                        <p className="mb-0">
                            318/KPT/I/2019 <br /> No. SK Pendirian
                        </p>
                        <div>
                            <p className="mb-0">
                                Baik <br /> Akreditasi
                            </p>
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
                        <button className="me-2 border rounded bg-dark bg-opacity-50 p-2 text-light" type="button">Overview</button>
                    </Link>
                    <Link to="/super_admin/psdku">
                        <button className="me-2 border rounded bg-dark bg-opacity-50 p-2 text-light" type="button">PSDKU</button>
                    </Link>
                    <button className="border rounded bg-secondary bg-opacity-50 p-2 text-light" type="button">Program Study</button>
                </div>
            </div>
            <div className="container mt-4">
                <div className="row rounded bg-white p-3 align-items-center">
                    <div className="d-flex justify-content-between">
                        <h4>Daftar Program Study</h4>
                        <button className="btn btn-success mb-2" onClick={() => setShowModalTambah(true)}>
                            <i className="bi bi-plus"></i> Tambah
                        </button>
                    </div>
                    <table className="table mt-4">
                        <thead>
                            <tr>
                                <th className="text-white bg-secondary bg-opacity-50 text-start">No</th>
                                <th className="text-white bg-secondary bg-opacity-50 text-start">Kode</th>
                                <th className="text-white bg-secondary bg-opacity-50 text-start">Program Study</th>
                                <th className="text-white bg-secondary bg-opacity-50 text-center">Jenjang</th>
                                <th className="text-white bg-secondary bg-opacity-50 text-center">Akreditasi</th>
                                <th className="text-white bg-secondary bg-opacity-50 text-center">Status</th>
                                <th className="text-white bg-secondary bg-opacity-50 text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {programList.length > 0 ? (
                                programList.map((program, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{program.kode}</td>
                                        <td>{program.nama || 'N/A'}</td>
                                        <td className='text-center'>{program.jenjang?.jenjang || 'N/A'}</td>
                                        <td className='text-center'>{program.akreditasi?.akreditasi || 'N/A'}</td>
                                        <td className={`text-center ${program.status === 'Aktif' ? 'text-success' : 'text-danger'}`}>
                                            {program.status || 'N/A'}
                                        </td>

                                        <td className='text-center'>
                                            <button className="btn-sm border-0 bg-transparent" onClick={() => openPreviewModal(program._id)}>
                                                <i className="bi bi-eye-fill text-info"></i>
                                            </button>
                                            <button className="btn-sm border-0 bg-transparent" onClick={() => openEditModal(program)}>
                                                <i className="bi bi-pencil-fill text-primary"></i>
                                            </button>
                                            <button className="btn-sm border-0 bg-transparent">
                                                <i className="bi bi-trash-fill text-danger" onClick={() => deleteProgram(program._id)}></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="text-center">
                                        Tidak ada data Program Study.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            {showModalTambah && (
                <div className="modal fade show d-block">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Tambah Program Study</h5>
                                <button type="button" className="btn-close" onClick={() => setShowModalTambah(false)}></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleSubmit}>
                                    <input
                                        type="text"
                                        name="kode"
                                        value={newProgram.kode}
                                        onChange={handleInputChange}
                                        className="form-control mb-2"
                                        placeholder="Kode PS"
                                        required
                                    />
                                    <input
                                        type="text"
                                        name="nama"
                                        value={newProgram.nama}
                                        onChange={handleInputChange}
                                        className="form-control mb-2"
                                        placeholder="Program Study"
                                        required
                                    />
                                    <select
                                        name="jenjang"
                                        value={newProgram.jenjang}
                                        onChange={handleInputChange}
                                        className="form-control mb-2"
                                        required
                                    >
                                        <option value="">Pilih Jenjang</option>
                                        {Array.isArray(jenjangOptions) && jenjangOptions.map((option) => (
                                            <option key={option._id} value={option._id}>
                                                {option.jenjang} {/* Menampilkan nama jenjang */}
                                            </option>
                                        ))}

                                    </select>
                                    <select
                                        name="akreditasi"
                                        value={newProgram.akreditasi}
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
                                    <select
                                        name="status"
                                        value={newProgram.status}
                                        onChange={handleInputChange}
                                        className="form-control mb-2"
                                        required
                                    >
                                        <option value="">Pilih Status</option>
                                        <option value="Aktif">Aktif</option>
                                        <option value="Non-Aktif">Non-Aktif</option>
                                    </select>
                                    <button type="submit" className="btn btn-primary" onClick={() => handleSaveData(programData)}>
                                        Simpan
                                    </button>
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
                                <h5 className="modal-title">Edit Program Study</h5>
                                <button type="button" className="btn-close" onClick={() => setShowModalEdit(false)}></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleEditSubmit}>
                                    <div className="mb-2">
                                        <label>Kode PS</label>
                                        <input
                                            type="text"
                                            name="kode"
                                            value={editProgram.kode}
                                            onChange={handleEditChange}
                                            className="form-control"
                                            disabled
                                        />
                                    </div>
                                    <div className="mb-2">
                                        <label>Program Study</label>
                                        <input
                                            type="text"
                                            name="nama"
                                            value={editProgram.nama}
                                            onChange={handleEditChange}
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="mb-2">
                                        <label>Jenjang</label>
                                        <select
                                            name="jenjang"
                                            value={editProgram.jenjang}
                                            onChange={handleEditChange}
                                            className="form-control mb-2"
                                            required
                                        >
                                            {Array.isArray(jenjangOptions) && jenjangOptions.map((option) => (
                                                <option key={option._id} value={option._id}>
                                                    {option.jenjang}  {/* Menampilkan nama jenjang */}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="mb-2">
                                        <label>Akreditasi</label>
                                        <select
                                            name="akreditasi"
                                            value={editProgram.akreditasi}
                                            onChange={handleEditChange}
                                            className="form-control mb-2"
                                            required
                                        >
                                            {Array.isArray(akreditasiOptions) && akreditasiOptions.map((option) => (
                                                <option key={option._id} value={option._id}>
                                                    {option.akreditasi}  {/* Menampilkan nama jenjang */}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="mb-2">
                                        <label>Status</label>
                                        <select
                                            name="status"
                                            value={editProgram.status}
                                            onChange={handleEditChange}  // Pastikan ini menggunakan handleEditChange
                                            className="form-control"
                                            required
                                        >
                                            <option value="">Pilih Status</option>
                                            <option value="Aktif">Aktif</option>
                                            <option value="Non-Aktif">Non-Aktif</option>
                                        </select>
                                    </div>

                                    <button type="submit" className="btn btn-primary" onClick={() => handleSaveData(programList)}>
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
                <div className="modal fade show d-block" tabIndex="-1" role="dialog" aria-hidden="true" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                <div className="modal-dialog modal-dialog-centered" role="document"> {/* Gunakan kelas modal-dialog-centered */}
                    <div className="modal-content">
                        <div className="modal-header d-flex justify-content-between">
                            <h5 className="modal-title">Detail Program Study</h5>
                            <button type="button" className="close" aria-label="Close" onClick={closePreviewModal}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p><strong>Kode Program Study:</strong> {previewProgram.kode}</p>
                            <p><strong>Nama Program Study:</strong> {previewProgram.nama}</p>
                            <p><strong>Jenjang:</strong> {previewProgram.jenjang?.jenjang}</p>
                            <p><strong>Akreditasi:</strong> {previewProgram.akreditasi?.akreditasi}</p>
                            <p><strong>Status:</strong> {previewProgram.status}</p>
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

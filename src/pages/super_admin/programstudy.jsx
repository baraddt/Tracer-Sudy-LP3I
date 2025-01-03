import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import axiosClient from '../../services/axiosClient';
import ProdyDelete from '../../components/compModals/prodyDelete';
import ModalFailed from '../../components/compModals/modalFailed';
import ModalSuccess from '../../components/compModals/modalsuccess';
import axios from 'axios';

export default function ProgramList() {
    const [programList, setProgramList] = useState([]);
    const [error, setError] = useState(null);
    const [newProgram, setNewProgram] = useState({
        kode: '',
        nama: '',
        id_pengguna: [],
        jenjang: '',
        akreditasi: '',
        status: '',
    });
    const [akreditasiOptions, setAkreditasiOptions] = useState([]);
    const [jenjangOptions, setJenjangOptions] = useState([]);
    const [kaprodiOptions, setKaprodiOptions] = useState([]);
    const [editProgram, setEditProgram] = useState(null);
    const [programToDelete, setProgramToDelete] = useState(null);
    const [previewProgram, setPreviewProgram] = useState(null);
    const [showModalTambah, setShowModalTambah] = useState(false);
    const [showModalEdit, setShowModalEdit] = useState(false);
    const [showModalPreview, setShowModalPreview] = useState(false);
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showFailedModal, setShowFailedModal] = useState(false);
    const [showFiltersModal, setShowFiltersModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [totalProdi, setTotalProdi] = useState(0);
    const [pageSize] = useState(5);

    // const dummyProgram = [
    //     { kodePs: '450052', programStudy: 'Administrasi Bisnis', jenjang: 'D3', akreditasi: 'Baik Sekali', status: 'Aktif' },
    //     { kodePs: '450053', programStudy: 'Manajemen Informatika', jenjang: 'D3', akreditasi: 'Baik Sekali', status: 'Aktif' },
    //     { kodePs: '450054', programStudy: 'Teknik Otomotif', jenjang: 'D2', akreditasi: 'Baik Sekali', status: 'Non-Aktif' },
    // ];

    // const fetchProgram = () => {
    //     setProgramList(dummyProgram);
    // };



    // fungsi untuk get data dari API
    const fetchData = async (page = 1) => {
        try {

            const storedData = localStorage.getItem(`prodyData_page_${page}`);
            if (storedData) {
                const parsedData = JSON.parse(storedData);
                setProgramList(parsedData.data);
                console.log("Data loaded from ls ${page}:", parsedData);
                return;

            }

            // const response = await axiosClient.get('/prodi/all');
            const response = await axiosClient.get(`/prodi/all?page=${page}&size=${pageSize}`);
            const { data, meta } = response.data

            setProgramList(data);
            setTotalPages(meta.totalPages);
            setTotalProdi(meta.totalProdi);
            setCurrentPage(meta.currentPage);

            console.log("Data fetch by API:", response.data);
            localStorage.setItem("prodyData", JSON.stringify(response.data))

        } catch (error) {
            console.error("Error feching data:", error.message);
        }
    }

    const goToPage = (page) => {
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page); // Trigger useEffect buat fetch data
    };

    useEffect(() => {
        fetchData(currentPage); // Panggil fetchUsers dengan currentPage
    }, [currentPage]);

    // fungsi untuk get akreditasi dari API
    const fetchAkreditasi = async () => {
        try {
            // const response = await axiosClient.get('/prodi/akreditasi/all');
            const response = await axiosClient.get('/prodi/akreditasi/all');

            setAkreditasiOptions(response.data.data || []);
        } catch (error) {
            console.error("Error feching akreditasi data:", error.message);
        }
    }


    // fungsi untuk get jenjang dari API

    const fetchJenjang = async () => {
        try {
            // const response = await axiosClient.get('/prodi/jenjang/all');
            const response = await axiosClient.get('/prodi/jenjang/all');

            setJenjangOptions(response.data.data || []);
        } catch (error) {
            console.error("Error feching jenjang data:", error.message);

        }
    };

    // fungsi untuk get kaprodi dari API

    const fetchKaprodi = async () => {
        try {
            const response = await axiosClient.get('/users/all');
            setKaprodiOptions(response.data.data || []);
            // console.log("ini data kaprodi:", response.data.data);

        } catch (error) {
            console.error("error feching kaprodi data:", error.message);

        }
    }

    // fungsi untuk refresh data
    const refreshData = async () => {
        try {
            await fetchData(); //panggil datanya
        } catch (error) {
            console.error("Error feching updated data:", error);

        }
    };

    //fungsi untuk menambah atau mengedit data agar langsung refresh
    const handleSaveData = async (data) => {
        try {
            setProgramList(data);

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
        fetchKaprodi();
    }, []);




    // fungsi CRUD

    // fungsi untuk menambah data programstudy lewat API
    const AddProgram = async () => {
        try {

            // const response = await axiosClient.post('/prodi/add', newProgram)
            const response = await axiosClient.post('/prodi/add', newProgram)
            setProgramList((prevList) => [...prevList, response.data]);
            fetchData();
            setNewProgram({ kode: '', nama: '', jenjang: '', akreditasi: '', status: '', id_pengguna: '' });
            setShowModalTambah(false);
            setShowSuccessModal(true);
        } catch (error) {
            setShowFailedModal(true);
            console.log('Response data:', error.response.data);
            console.error("Error Adding Program Study:", error.message);
            setError("Failed to add Program. Please Try Again..");

        }
    };

    // Fungsi untuk menghapus program study lewat APi
    const deleteProgram = async (programId) => {
        try {
            // const response = await axiosClient.delete(`/prodi/delete/${psdkuId}`)
            const response = await axiosClient.delete(`/prodi/delete/${programId}`);

            setProgramList((prevList) => prevList.filter((program) => program._id !== programId));

            console.log('Program Study deleted successfully:', response.data);
            setShowSuccessModal(true);
            setShowModalDelete(false);

        } catch (error) {
            setShowFailedModal(true);
            console.error('Error Delete Program Study');

        }
    };

    const handleDeleteClick = (programId) => {
        setProgramToDelete(programId); // Menyimpan data pengguna yang akan dihapus
        setShowModalDelete(true); // Menampilkan modal konfirmasi
    };

    // fungsi melihat detail program study dari API
    const getProgramById = async (programId) => {
        try {
            const response = await axiosClient.get(`/prodi/${programId}`);
            setPreviewProgram(response.data.data);
            setShowModalPreview(true);
            console.log(response.data);

        } catch (error) {
            console.error("Error feching Program Study By ID:", error.message);

        }
    };


    //fungsi untuk mengedit data melalui API

    const handleEditSubmit = async (event) => {
        event.preventDefault();

        console.log("Data yang akan dikirim:", editProgram);

        try {
            const response = await axiosClient.put(`/prodi/edit/${editProgram._id}`, editProgram);

            console.log("data yang terkirim:", editProgram);
            console.log('ProgramStudy updated Successfuly:', response.data);
            setShowModalEdit(false);
            setShowSuccessModal(true);
        } catch (error) {
            setShowFailedModal(true);
            console.error("Error updating Program Study:", error.message);
            setError(error.response?.data?.message || 'An error occurred');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProgram((prevProgram) => ({
            ...prevProgram,
            [name]: value,
        }));
    };

    const handleAddPengguna = (id) => {
        setNewProgram(prev => ({
            ...prev,
            id_pengguna: prev.id_pengguna.includes(id) ? prev.id_pengguna : [...prev.id_pengguna, id]
        }));
    };

    const handleRemovePengguna = (id) => {
        setNewProgram(prev => ({
            ...prev,
            id_pengguna: prev.id_pengguna.filter(item => item !== id)
        }));
    };

    const handleRemoveKaprodi = (kaprodiId) => {
        setEditProgram((prevProgram) => ({
            ...prevProgram,
            id_pengguna: prevProgram.id_pengguna.filter((id) => id !== kaprodiId),
        }));
    };
    

    const handleRemovePenggunaClick = (id) => {
        Swal.fire({
            title: "Yakin ingin menghapus?",
            text: "Data pengguna ini akan dihapus permanen!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Ya, hapus!",
            cancelButtonText: "Batal"
        }).then((result) => {
            if (result.isConfirmed) {
                // Panggil fungsi hapus jika user konfirmasi
                handleRemovePengguna(id);

                // Tampilkan alert sukses
                Swal.fire({
                    title: "Dihapus!",
                    text: "Data pengguna telah dihapus.",
                    icon: "success",
                    timer: 1500,
                    showConfirmButton: false
                });
            }
        });
    }
    const handleRemoveKaprodiClick = (id) => {
        Swal.fire({
            title: "Yakin ingin menghapus?",
            text: "Data pengguna ini akan dihapus permanen!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Ya, hapus!",
            cancelButtonText: "Batal"
        }).then((result) => {
            if (result.isConfirmed) {
                // Panggil fungsi hapus jika user konfirmasi
                handleRemoveKaprodi(id);

                // Tampilkan alert sukses
                Swal.fire({
                    title: "Dihapus!",
                    text: "Data pengguna telah dihapus.",
                    icon: "success",
                    timer: 1500,
                    showConfirmButton: false
                });
            }
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        AddProgram(); // Call the add function instead of updating the list directly
    };

    const openEditModal = (program) => {
        console.log('Data yang dipilih untuk diedit:', program);
        setEditProgram({
            ...program,
            jenjang: program.jenjang?._id || "",
            id_pengguna: program.id_pengguna || [],
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

        if (name === 'kaprodi') {
            setEditProgram((prevProgram) => {
                // Cek apakah ID pengguna sudah ada dalam array id_pengguna
                const updatedProgram = prevProgram.id_pengguna.includes(value)
                    ? prevProgram.id_pengguna
                    : [...prevProgram.id_pengguna, value]; // Menambahkan hanya ID pengguna (value)
                return { ...prevProgram, id_pengguna: updatedProgram };
            });
        } else {
            setEditProgram((prevProgram) => ({
                ...prevProgram,
                [name]: value,
            }));
        }
    };






    return (
        <div className="container mt-4" style={{ paddingLeft: '24px', paddingRight: '24px' }}>
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
                        <button className="me-2 border rounded bg-dark bg-opacity-50 p-2 text-light" type="button">Overview</button>
                    </Link>
                    <Link to="/super_admin/psdku">
                        <button className="me-2 border rounded bg-dark bg-opacity-50 p-2 text-light" type="button">PSDKU</button>
                    </Link>
                    <button className="border rounded bg-secondary bg-opacity-50 p-2 text-light" type="button">Program Study</button>
                </div>
            </div>
            <div className="container mt-4">
                <div className="row rounded table-reponsive-sm table-responsive-md bg-white p-3 align-items-center">
                    <div className="d-flex justify-content-between">
                        <h4 className='text-dark'>Daftar Program Study</h4>
                        <button className="btn btn-success mb-2" onClick={() => setShowModalTambah(true)}>
                            <i className="bi bi-plus text-light"></i> Tambah
                        </button>
                        {/* <button className='btn btn-info' onClick={() => setShowModalPreview(true)}>Cek Modal Preview</button>
                        <button className='btn btn-info' onClick={() => setShowModalDelete(true)}>Cek Modal Delete</button> */}
                    </div>
                    <table className="table mt-4">
                        <thead className='table'>
                            <tr>
                                <th className="cstm-bg fw-semibold text-dark text-start">No</th>
                                <th className="cstm-bg fw-semibold text-dark text-start">Kode</th>
                                <th className="cstm-bg fw-semibold text-dark text-start text-truncate">Program Study</th>
                                <th className="cstm-bg fw-semibold text-dark text-center">Jenjang</th>
                                <th className="cstm-bg fw-semibold text-dark text-center">Akreditasi</th>
                                <th className="cstm-bg fw-semibold text-dark text-center">Status</th>
                                <th className="cstm-bg fw-semibold text-dark text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {programList.length > 0 ? (
                                programList.map((program, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{program.kode}</td>
                                        <td className='text-truncate'>{program.nama || 'N/A'}</td>
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
                                                <i className="bi bi-trash-fill text-danger" onClick={() => handleDeleteClick(program._id)}></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="text-center text-dark">
                                        Tidak ada data Program Study.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <nav>
                    <ul className="pagination justify-content-end">
                        {/* Tombol Previous */}
                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                            <button className="page-link" onClick={() => goToPage(currentPage - 1)}>
                                <i className="bi bi-chevron-left"></i>
                            </button>
                        </li>

                        {/* Generate Halaman */}
                        {Array.from({ length: totalPages }, (_, i) => (
                            <li
                                key={i}
                                className={`page-item ${currentPage === i + 1 ? 'active bg-success text-white' : ''}`}
                            >
                                <button className="page-link" onClick={() => goToPage(i + 1)}>
                                    {i + 1}
                                </button>
                            </li>
                        ))}

                        {/* Tombol Next */}
                        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                            <button className="page-link" onClick={() => goToPage(currentPage + 1)}>
                                <i className="bi bi-chevron-right"></i>
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>

            {showModalTambah && (
                <div className="modal fade show d-block" style={{
                    position: 'fixed',
                    top: '60%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    display: showModalTambah ? 'block' : 'none',
                    animation: 'fadeIn 0.8s ease-out',
                }}>
                    <div className="modal-dialog">
                        <div className="modal-content" style={{ width: '600px' }}>
                            <div className="modal-header">
                                <h5 className="modal-title">Tambah Program Study</h5>
                                <button type="button" className="btn-close" onClick={() => setShowModalTambah(false)}></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleSubmit}>
                                    <div className='d-flex justify-content-between'>
                                        <div className="w-50 me-4">
                                            <label htmlFor="kode">Kode Prody :</label>
                                            <input
                                                type="text"
                                                inputMode='numeric'
                                                name="kode"
                                                value={newProgram.kode}
                                                onChange={handleInputChange}
                                                className="form-control mb-2"
                                                placeholder="Kode PS"
                                                required
                                            />
                                        </div>
                                        <div className="w-100">
                                            <label htmlFor="nama">Nama Prody :</label>
                                            <input
                                                type="text"
                                                name="nama"
                                                value={newProgram.nama}
                                                onChange={handleInputChange}
                                                className="form-control mb-2"
                                                placeholder="Program Study"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className='d-flex justify-content-between mb-2'>
                                        <div className="form-group w-50 me-4">
                                            <label htmlFor="kaprodi" className="form-label">Pilih Kaprodi :</label>
                                            <div className="input-group mb-2">
                                                <select
                                                    id="kaprodi"
                                                    value={newProgram.id_pengguna}
                                                    className="form-control"
                                                    onChange={(e) => handleAddPengguna(e.target.value)}
                                                >
                                                    <option value="">Pilih Kaprodi</option>
                                                    {kaprodiOptions.map((option) => (
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
                                            <span className="fw-semibold mb-2 d-block">Kaprodi yang Ditambahkan:</span>
                                            <ul className="list-group">
                                                {newProgram.id_pengguna.map((kaprodiId, index) => {
                                                    const kaprodi = kaprodiOptions.find(option => option._id === kaprodiId);
                                                    return kaprodi ? (
                                                        <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                                                            <span className='me-2'>{kaprodi.nama}</span>
                                                            <button
                                                                type="button"
                                                                className="btn btn-sm btn-danger"
                                                                onClick={() => handleRemovePenggunaClick(kaprodiId)}
                                                            >
                                                                -
                                                            </button>
                                                        </li>
                                                    ) : null;
                                                })}
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="mb-2">
                                        <label htmlFor="jenjang" className="form-label">Jenjang:</label>
                                        <div className="input-group">
                                            <select
                                                name="jenjang"
                                                value={newProgram.jenjang}
                                                onChange={handleInputChange}
                                                className="form-control"
                                                required
                                            >
                                                <option value="">Pilih Jenjang</option>
                                                {Array.isArray(jenjangOptions) && jenjangOptions.map((option) => (
                                                    <option key={option._id} value={option._id}>
                                                        {option.jenjang} {/* Menampilkan nama jenjang */}
                                                    </option>
                                                ))}
                                            </select>
                                            <span className="input-group-text">
                                                <i className="bi bi-chevron-down"></i>
                                            </span>
                                        </div>
                                    </div>

                                    <div className="mb-2">
                                        <label htmlFor="akreditasi" className="form-label">Akreditasi:</label>
                                        <div className="input-group">
                                            <select
                                                name="akreditasi"
                                                value={newProgram.akreditasi}
                                                onChange={handleInputChange}
                                                className="form-control"
                                                required
                                            >
                                                <option value="">Pilih Akreditasi</option>
                                                {Array.isArray(akreditasiOptions) && akreditasiOptions.map((option) => (
                                                    <option key={option._id} value={option._id}>
                                                        {option.akreditasi} {/* Menampilkan nama akreditasi */}
                                                    </option>
                                                ))}
                                            </select>
                                            <span className="input-group-text">
                                                <i className="bi bi-chevron-down"></i>
                                            </span>
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="status" className="form-label">Status:</label>
                                        <div className="input-group">
                                            <select
                                                name="status"
                                                value={newProgram.status}
                                                onChange={handleInputChange}
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
                                    <button type="submit" className="btn btn-success" onClick={() => handleSaveData(programList)}>
                                        Tambah
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
                                    <div className='d-flex justify-content-between'>
                                        <div className="mb-2 w-50">
                                            <label className="mb-2">Kaprodi</label>
                                            <div className="input-group">
                                                <select
                                                    name="kaprodi"
                                                    value={editProgram.id_pengguna}
                                                    onChange={handleEditChange}
                                                    className="form-control"
                                                >
                                                    {Array.isArray(kaprodiOptions) && kaprodiOptions.map((option) => (
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

                                        <div className="mt-2 mb-2">
                                            <span className="fw-semibold mb-2 d-block">Kaprodi yang Dipilih</span>
                                            <ul className="list-group">
                                                {editProgram.id_pengguna.map((kaprodiId, index) => {
                                                    const kaprodi = kaprodiOptions.find(option => option._id === kaprodiId);
                                                    return kaprodi ? (
                                                        <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                                                            <span className="me-2">{kaprodi.nama}</span>
                                                            <button
                                                                type="button"
                                                                className="btn btn-sm btn-danger ml-2 ms-4"
                                                                onClick={() => handleRemovePenggunaClick(kaprodiId)}
                                                            >
                                                                -
                                                            </button>
                                                        </li>
                                                    ) : null;
                                                })}
                                            </ul>
                                        </div>
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
                                            <option value="Non Aktif">Non-Aktif</option>
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
                            <div className="modal-body p-4">
                                <div className="text-center">
                                    {/* Nama */}
                                    <h5 className="fw-semibold mb-1">{previewProgram.nama}</h5>
                                    {/* Jabatan */}
                                    <p className="text-muted mb-4">
                                        {previewProgram.id_pengguna && previewProgram.id_pengguna.length > 0
                                            ? previewProgram.id_pengguna[0].nama
                                            : 'Belum Menambahkan Kaprodi'}
                                    </p>
                                </div>
                                {/* Info Tambahan */}
                                <hr />
                                <p className="text-center text-uppercase text-muted fw-bold mb-3">
                                    More Info
                                </p>
                                <div className="d-flex justify-content-between">
                                    <span className="fw-bold">Kode PS</span>
                                    <span>{previewProgram.kode}</span>
                                </div>
                                <div className="d-flex justify-content-between mt-2">
                                    <span className="fw-bold">Jenjang</span>
                                    <span>{previewProgram.jenjang?.jenjang}</span>
                                </div>
                                <div className="d-flex justify-content-between mt-2">
                                    <span className="fw-bold">Akreditasi</span>
                                    <span>{previewProgram.akreditasi?.akreditasi}</span>
                                </div>
                                <div className="d-flex justify-content-between mt-2">
                                    <span className="fw-bold">Status</span>
                                    <span className='text-success'>{previewProgram.status}</span>
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
            {programToDelete && (
                <ProdyDelete
                    show={showModalDelete}
                    onClose={() => setShowModalDelete(false)}
                    message="Apakah Anda yakin ingin menghapus Prody ini? Tindakan ini tidak bisa dibatalkan."
                    programId={programToDelete}
                    deleteProgram={deleteProgram} // Mengirimkan fungsi deleteUser ke modal
                />
            )}
        </div>
    );
}

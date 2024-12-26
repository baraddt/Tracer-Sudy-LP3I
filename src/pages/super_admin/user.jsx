import { useEffect, useState } from 'react';
import axios from 'axios';
import axiosClient from '../../services/axiosClient';
import _ from 'lodash';
import ModalSuccess from '../../components/compModals/modalsuccess';
import ModalFailed from '../../components/compModals/modalFailed';
import ModalConfirmDelete from '../../components/compModals/userDelete';
import ModalFilter from '../../components/compModals/modalFilter';

export default function User() {
    const [usersList, setUsersList] = useState([]);
    const [error, setError] = useState(null);
    const [newUser, setNewUser] = useState({
        nama: '',
        avatar: '',
        nip: '',
        jabatan: '',
        pendidikan: '',
        alamat: {
            detail: '',
            kelurahan: '',
            kecamatan: '',
            kota: '',
            provinsi: '',
            kode_pos: '',
        },
        tentang: '',
        email: '',
        password: '',
        roleId: '',
    });

    const [provinces, setProvinces] = useState([]);
    const [cities, setCities] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [villages, setVillages] = useState([]);

    // Fetch Provinsi
    const fetchProvinces = async () => {
        try {
            const response = await axios.get('https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json');
            // console.log("response:", response.data); // Log response data
            setProvinces(response.data); // Set state dengan data yang diterima
        } catch (error) {
            console.error('Error fetching provinces:', error.message);
        }
    };

    // Fetch Kota/Kabupaten berdasarkan Provinsi
    const fetchCities = async (provinceId) => {
        try {
            const response = await axios.get(`https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${provinceId}.json`);
            setCities(response.data); // Set state dengan data kota
        } catch (error) {
            console.error('Error fetching cities:', error.message);
        }
    };

    // Fetch Kecamatan berdasarkan Kota/Kabupaten
    const fetchDistricts = async (cityId) => {
        try {
            const response = await axios.get(`https://www.emsifa.com/api-wilayah-indonesia/api/districts/${cityId}.json`);
            setDistricts(response.data); // Set state dengan data kecamatan
        } catch (error) {
            console.error('Error fetching districts:', error.message);
        }
    };

    // Fetch Kelurahan/Desa berdasarkan Kecamatan
    const fetchVillages = async (districtId) => {
        try {
            const response = await axios.get(`https://www.emsifa.com/api-wilayah-indonesia/api/villages/${districtId}.json`);
            setVillages(response.data);
        } catch (error) {
            console.error('Error fetching villages:', error.message);
        }
    };

    useEffect(() => {
        fetchProvinces();
    }, []);

    const [showModal, setShowModal] = useState(false);
    const [editUsers, setEditUsers] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [userToDelete, setUserToDelete] = useState(null);
    const [showModalEdit, setShowModalEdit] = useState(false);
    const [showModalPreview, setShowModalPreview] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showFailedModal, setShowFailedModal] = useState(false);
    const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
    const [showFiltersModal, setShowFiltersModal] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [roleIdOptions, setRoleIdOptions] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [currentAvatar, setCurrentAvatar] = useState("");
    const [previewData, setPreviewData] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [totalUsers, setTotalUsers] = useState(0);
    const [pageSize] = useState(10);

    const fetchSearchResults = async (query) => {
        try {
            const params = {};

            if (/^\d+$/.test(query)) {
                params.nip = query;
            } else if (query.includes("@")) {
                // Jika query mengandung "@" (format email)
                params.email = query.trim();
            } else {
                params.nama = query;
            }

            const response = await axiosClient.get("/users/search", {
                params: params,
            });

            console.log("Full response:", response.data.data);
            setSearchResults(response.data.data || []);
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


    const fetchUsers = async (page = 1) => {
        try {
            const storedData = localStorage.getItem(`usersData_page_${page}`);

            if (storedData) {
                const parsedData = JSON.parse(storedData);

                if (parsedData && Array.isArray(parsedData.data)) {
                    setUsersList(parsedData.data);
                    console.log("Data loaded from Local:", parsedData);
                } else {
                    console.log("Data in localStorage tidak sesuai format yang diharapkan.");
                }
                return;
            }

            const response = await axiosClient.get(`/users/all?page=${page}&size=${pageSize}`);
            const { data, meta } = response.data;

            setUsersList(data);
            setTotalPages(meta.totalPages);
            setTotalUsers(meta.totalUsers);
            setCurrentPage(meta.currentPage);

            console.log("Data fetched from API:", response.data);

            // Simpan data ke localStorage
            localStorage.setItem("usersData", JSON.stringify(response.data));
        } catch (error) {
            console.error("Error fetching data:", error.message);
        }
    };


    const goToPage = (page) => {
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page); // Trigger useEffect buat fetch data
    };

    useEffect(() => {
        fetchUsers(currentPage); // Panggil fetchUsers dengan currentPage
    }, [currentPage]);

    // Fungsi API untuk mendapatkan data Role ID
    const fetchRoleId = async () => {
        try {
            // const response = await axiosClient.get('/users/role/all');
            const response = await axiosClient.get('/role/all');
            setRoleIdOptions(response.data.data); // Update state dengan data Role ID
        } catch (error) {
            console.error("Error fetching RoleId:", error.message);
        }
    };

    const refreshData = async () => {
        try {
            await fetchUsers();
        } catch (error) {
            console.error("Error feching updated data:", error.message);
        }
    };

    const handleSaveData = async (data) => {
        try {
            setUsersList(data);

            setTimeout(async () => {
                await refreshData();
            }, 3000);
        } catch (error) {
            console.error("Error saving data:", error);

        }
    };

    // useEffect untuk memanggil data API saat komponen pertama kali dirender
    useEffect(() => {
        fetchUsers();
        fetchRoleId();
    }, []);

    // Fungsi menambah data pengguna baru menggunakan API
    const addUser = async () => {
        try {
            // const response = await axiosClient.post('/users/adduser', newUser);
            const response = await axiosClient.post('/users/adduser', newUser);

            setUsersList((prevList) => {
                const updatedList = [...prevList, response.data];

                // Sync data terbaru ke localStorage
                localStorage.setItem("usersData", JSON.stringify(updatedList));

                return updatedList;
            });

            const updatedData = JSON.parse(localStorage.getItem("usersData"));
            console.log("Data after add in localStorage:", updatedData);


            setUsersList((prevList) => [...prevList, response.data]);
            fetchUsers();
            setNewUser({
                nama: '', avatar: '', nip: '', jabatan: '', pendidikan: '', alamat: { detail: '', kelurahan: '', kecamatan: '', kota: '', provinsi: '', kode_pos: '' }, email: '', password: '', roleId: ''
            });

            setShowModal(false);
            setShowSuccessModal(true);
        } catch (error) {
            setShowFailedModal(true);
            console.error("Error adding user:", error.message);
            console.log("Error response:", error.response?.data); // Debug: pesan error dari server jika ada
            setError("Failed to add User, Try Again");
        }
    };

    // Fungsi untuk mengedit data pengguna
    const handleEditSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axiosClient.put(
                // `/users/edituser/${editUsers._id}`, editUsers
                `/users/edituser/${editUsers._id}`, editUsers
            );
            console.log('Users updated successfully:', response.data);
            setShowModalEdit(false);
            setShowSuccessModal(true)
        } catch (error) {
            setShowFailedModal(true);
            setShowModalEdit(false);
            console.error('Error updating Users:', error);
            setError(error.response?.data?.message || 'An error occurred');
        }
    };

    // Fungsi untuk menghapus data pengguna
    const deleteUser = async (userId) => {
        try {
            const response = await axiosClient.delete(`/users/deleteuser/${userId}`);
            // Hapus user dari daftar setelah berhasil dihapus
            setUsersList((prevList) => prevList.filter((user) => user._id !== userId));
            console.log('User deleted successfully:', response.data);
            setShowSuccessModal(true);
        } catch (error) {
            setShowFailedModal(true);
            console.error('Error deleting user:', error.message);
        } finally {
            setShowConfirmDeleteModal(false); // Menutup modal setelah delete
        }
    };

    // fungsi melihat detail pengguna
    const getUserById = async (id) => {
        try {
            // const response = await axiosClient.get(`/users/${userId}`);
            const response = await axiosClient.get(`/users/${id}`);
            setPreviewData(response.data.data);
            setShowModalPreview(true);

        } catch (error) {
            console.error("Full error response:", error.response);
            console.error("Error fetching user details:", error);
        }
    };
    // fungsi untuk melihat preview pengguna
    const handlePreviewUser = (userId) => {
        // Panggil fungsi untuk mendapatkan data mahasiswa
        getUserById(userId);
    };


    const handleDeleteClick = (userId) => {
        console.log("User ID to delete:", userId);
        setUserToDelete(userId); // Menyimpan data pengguna yang akan dihapus
        setShowConfirmDeleteModal(true); // Menampilkan modal konfirmasi
    };



    // Fungsi untuk menangani perubahan pada form input
    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (["provinsi", "kota", "kecamatan", "kelurahan", "detail", "kode_pos"].includes(name)) {
            setNewUser((prevUser) => ({
                ...prevUser,
                alamat: {
                    ...prevUser.alamat, // Copy data alamat sebelumnya
                    [name]: value, // Update field tertentu di alamat
                },
            }));

            // Handle cascading dropdown
            if (name === "provinsi") {
                fetchCities(value); // Fetch kota berdasarkan ID provinsi
                setCities([]);
                setDistricts([]);
                setVillages([]);
            } else if (name === "kota") {
                fetchDistricts(value); // Fetch kecamatan berdasarkan ID kota
                setDistricts([]);
                setVillages([]);
            } else if (name === "kecamatan") {
                fetchVillages(value); // Fetch kelurahan berdasarkan ID kecamatan
                setVillages([]);
            }
        } else {
            // Update field lain di newUser (bukan alamat)
            setNewUser((prevUser) => ({
                ...prevUser,
                [name]: value,
            }));
        }
    };

    // Fungsi untuk menangani pengiriman form
    const handleSubmit = async (e) => {
        e.preventDefault();
        addUser();
    };

    const openEditModal = (users) => {
        console.log('Data Yang dipilih:', users);
        setEditUsers(users);
        setShowModalEdit(true);

    };

    const closeEditModal = () => {
        setShowModalEdit(false);
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditUsers((prevUsers) => ({
            ...prevUsers,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file); // Menyimpan file gambar yang dipilih
    };

    const handleApplyFilters = (filters) => {
        console.log("Filters applied:", filters);
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };


    return (
        <div className="container mt-4">
            <div className="rounded bg-white p-3">
                <h4 className="mb-4 fw-semibold text-dark">User</h4>
                {/* <div className='d-flex gap-2'>
                    <button className='btn btn-success' onClick={() => setShowSuccessModal(true)}>Cek Modal Success</button>
                    <button className='btn btn-danger' onClick={() => setShowFailedModal(true)}>Cek Modal Failed</button>
                    <button className='btn btn-danger' onClick={() => setShowModalPreview(true)}>Cek Modal Preview</button>
                    <button className='btn btn-danger' onClick={() => openEditModal(true)}>Cek Modal Edit</button>
                </div> */}
                {/* Tombol untuk membuka modal */}
                <div className="d-flex flex-column align-items-end mb-3">
                    <button className="btn btn-success mb-2" onClick={() => setShowModal(true)}>
                        <i className="bi bi-plus"></i>Tambah
                    </button>
                    <button className="btn btn-primary" onClick={() => setShowFiltersModal(true)}><i className="bi bi-filter"></i> Filter</button>
                </div>

                {/* Form pencarian pengguna */}
                <div className="d-flex mb-3 col-sm-4">
                    <input
                        type="search"
                        className="form-control me-2"
                        placeholder="Cari User"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)} // Update query saat mengetik
                    />
                    {/* <button className="btn btn-secondary d-flex align-items-center">
                        <i className="bi bi-search me-2"></i> Cari
                    </button> */}
                </div>
            </div>

            {/* Tabel data pengguna */}
            <div className="rounded table-reponsive-sm table-responsive-md mt-4 bg-white p-3">
                <table className="table">
                    <thead className='table'>
                        <tr>
                            <th className='cstm-bg fw-semibold text-dark text-center' scope="col">#ID</th>
                            <th className='cstm-bg fw-semibold text-dark' scope="col">Avatar</th>
                            <th className='cstm-bg fw-semibold text-dark text-truncate' scope="col">Nama</th>
                            <th className='cstm-bg fw-semibold text-dark text-truncate' scope="col">Jabatan</th>
                            <th className='cstm-bg fw-semibold text-dark text-truncate' scope="col">Pendidikan</th>
                            <th className='cstm-bg fw-semibold text-dark text-truncate' scope="col">Email</th>
                            <th className='cstm-bg fw-semibold text-dark text-center' scope="col">Status</th>
                            <th className='cstm-bg fw-semibold text-dark text-center' scope="col">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {searchQuery && searchQuery.length > 0 ? (
                            searchResults && searchResults.length > 0 ? (
                                searchResults.map((result, index) => (
                                    <tr key={result._id}>
                                        <td>{`#U${index + 201}`}</td>
                                        <td><img className='rounded-circle' src={result.avatar} alt="Avatar" width="50" height="50" /></td>
                                        <td className='text-truncate' style={{ maxWidth: '200px' }}>{result.nama}</td>
                                        <td className='text-truncate' style={{ maxWidth: '200px' }}>{result.jabatan || 'N/A'}</td>
                                        <td className='text-truncate' style={{ maxWidth: '200px' }}>{result.pendidikan || 'N/A'}</td>
                                        <td className='text-truncate' style={{ maxWidth: '200px' }}>{result.email}</td>
                                        <td className={`text-center ${result.is_active ? "text-success" : "text-danger"}`}>
                                            {result.is_active ? "Aktif" : "Tidak Aktif"}
                                        </td>
                                        <td className="text-center">
                                            <button className="btn-sm me-2 border-0 bg-transparent" onClick={() => handlePreviewMahasiswa(result._id)}>
                                                <i className="bi bi-eye-fill text-info"></i>
                                            </button>
                                            <button className="btn-sm me-2 border-0 bg-transparent" onClick={() => openEditModal(result)}>
                                                <i className="bi bi-pencil-fill text-primary"></i>
                                            </button>
                                            <button className="btn-sm border-0 bg-transparent" onClick={() => handleDeleteClick(result._id)}>
                                                <i className="bi bi-trash-fill text-danger"></i>
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
                            usersList.length > 0 ? (
                                usersList.map((users, index) => (
                                    <tr key={users._id}>
                                        <td>{`#U${index + 201}`}</td>
                                        <td><img className='rounded-circle' src={users.avatar} alt="Avatar" width="50" height="50" /></td>
                                        <td className='text-truncate' style={{ maxWidth: '200px' }}>{users.nama}</td>
                                        <td className='text-truncate' style={{ maxWidth: '200px' }}>{users.jabatan || 'N/A'}</td>
                                        <td className='text-truncate' style={{ maxWidth: '200px' }}>{users.pendidikan || 'N/A'}</td>
                                        <td className='text-truncate' style={{ maxWidth: '200px' }}>{users.email}</td>
                                        <td className={`text-center ${users.is_active ? 'text-success' : 'text-danger'}`}>
                                            {users.is_active ? 'Aktif' : 'Tidak Aktif'}
                                        </td>
                                        <td className='text-center'>
                                            <button className="btn-sm me-2 border-0 bg-transparent">
                                                <i className="bi bi-eye-fill text-info" onClick={() => handlePreviewUser(users._id)}></i>
                                            </button>
                                            <button className="btn-sm me-2 border-0 bg-transparent">
                                                <i className="bi bi-pencil-fill text-primary" onClick={() => openEditModal(users)}></i>
                                            </button>
                                            <button className="btn-sm border-0 bg-transparent" onClick={() => handleDeleteClick(users._id)}>
                                                <i className="bi bi-trash-fill text-danger"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="8" className="text-center text-dark">Tidak ada data pengguna.</td>
                                </tr>
                            )
                        )}
                    </tbody>
                </table>

                {/* pagination otomatis */}
                {/* {totalMahasiswa > 10 && (  // Cek apakah total mahasiswa lebih dari 10
                    <nav>
                        <ul className="pagination justify-content-end">
                            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                <button className="page-link" onClick={() => goToPage(currentPage - 1)}>
                                    <i className="bi bi-chevron-left"></i>
                                </button>
                            </li>
                            {Array.from({ length: totalPages }, (_, i) => (
                                <li key={i} className={`page-item ${currentPage === i + 1 ? 'active bg-success text-white' : ''}`}>
                                    <button className="page-link" onClick={() => goToPage(i + 1)}>
                                        {i + 1}
                                    </button>
                                </li>
                            ))}
                            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                <button className="page-link" onClick={() => goToPage(currentPage + 1)}>
                                    <i className="bi bi-chevron-right"></i>
                                </button>
                            </li>
                        </ul>
                    </nav>
                )} */}

                {/* pagination default */}
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

            {/* Modal untuk menambah pengguna */}
            <div className={`modal fade ${showModal ? 'show' : ''}`} style={{ position: 'fixed', top: '50%', left: '40%', transform: 'translate(-50%, -50%)', display: showModal ? 'block' : 'none' }} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden={!showModal}>
                <div className="modal-dialog">
                    <div className="modal-content" style={{ width: '800px' }}>
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Tambah Pengguna</h5>
                            <button type="button" className="btn-close" onClick={() => setShowModal(false)} aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmit}>
                                <div className='mb-3'>
                                    <label htmlFor="avatar" className='form-label'>Pilih Avatar :</label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        name="avatar"
                                        value={newUser.avatar}
                                        onChange={handleInputChange}
                                        className="form-control"
                                        placeholder="avatar"
                                        required
                                    />
                                </div>
                                <div className='d-flex justify-content-between mb-2'>
                                    <div className='w-50 me-2'>
                                        <label htmlFor="nama" className='mb-2'>Nama :</label>
                                        <input
                                            type="text"
                                            name="nama"
                                            value={newUser.nama}
                                            onChange={handleInputChange}
                                            className="form-control"
                                            placeholder="Nama"
                                            required
                                        />
                                    </div>
                                    <div className='w-50'>
                                        <label htmlFor="nip" className='mb-2'>NIP :</label>
                                        <input
                                            type="number"
                                            name="nip"
                                            value={newUser.nip}
                                            onChange={handleInputChange}
                                            className="form-control mb-2"
                                            placeholder="Nip"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className='d-flex justify-content-between mb-2'>
                                    <div className='w-50 me-2'>
                                        <label htmlFor="jabatan" className='mb-2'>Jabatan :</label>
                                        <input
                                            type="text"
                                            name="jabatan"
                                            value={newUser.jabatan}
                                            onChange={handleInputChange}
                                            className="form-control"
                                            placeholder="Jabatan"
                                            required
                                        />
                                    </div>
                                    <div className='w-50'>
                                        <label htmlFor="pendidikan" className='mb-2'>Pendidikan :</label>
                                        <input
                                            type="text"
                                            name="pendidikan"
                                            value={newUser.pendidikan}
                                            onChange={handleInputChange}
                                            className="form-control mb-2"
                                            placeholder="Pendidikan"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <div className="w-50 me-4">
                                        <label htmlFor="provinsi" className="form-label">Provinsi</label>
                                        <div className="input-group mb-2">
                                            <select
                                                name="provinsi"
                                                value={newUser.alamat.provinsi}
                                                onChange={handleInputChange}
                                                className="form-control"
                                                required
                                            >
                                                <option value="">Pilih Provinsi</option>
                                                {provinces.map((province) => (
                                                    <option key={province.id} value={province.id}>
                                                        {province.name}
                                                    </option>
                                                ))}
                                            </select>
                                            <span className="input-group-text">
                                                <i className="bi bi-chevron-down"></i>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="w-50">
                                        <label htmlFor="kota" className="form-label">Kota/Kabupaten</label>
                                        <div className="input-group mb-2">
                                            <select
                                                name="kota"
                                                value={newUser.alamat.kota}
                                                onChange={handleInputChange}
                                                className="form-control"
                                                required
                                            >
                                                <option value="">Pilih Kota/Kabupaten</option>
                                                {cities.map((city) => (
                                                    <option key={city.id} value={city.id}>
                                                        {city.name}
                                                    </option>
                                                ))}
                                            </select>
                                            <span className="input-group-text">
                                                <i className="bi bi-chevron-down"></i>
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="d-flex justify-content-between">
                                    <div className="w-50 me-4">
                                        <label htmlFor="kecamatan" className="form-label">Kecamatan</label>
                                        <div className="input-group mb-2">
                                            <select
                                                name="kecamatan"
                                                value={newUser.alamat.kecamatan}
                                                onChange={handleInputChange}
                                                className="form-control"
                                                required
                                            >
                                                <option value="">Pilih Kecamatan</option>
                                                {districts.map((district) => (
                                                    <option key={district.id} value={district.id}>
                                                        {district.name}
                                                    </option>
                                                ))}
                                            </select>
                                            <span className="input-group-text">
                                                <i className="bi bi-chevron-down"></i>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="w-50">
                                        <label htmlFor="kelurahan" className="form-label">Kelurahan</label>
                                        <div className="input-group mb-2">
                                            <select
                                                name="kelurahan"
                                                value={newUser.alamat.kelurahan}
                                                onChange={handleInputChange}
                                                className="form-control"
                                                required
                                            >
                                                <option value="">Pilih Kelurahan</option>
                                                {villages.map((village) => (
                                                    <option key={village.id} value={village.id}>
                                                        {village.name}
                                                    </option>
                                                ))}
                                            </select>
                                            <span className="input-group-text">
                                                <i className="bi bi-chevron-down"></i>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <div className="w-100 me-4">
                                        <label htmlFor="tanggal_sk" className="form-label">Detail</label>
                                        <input
                                            type="text"
                                            name="detail"
                                            value={newUser.alamat.detail}
                                            onChange={handleInputChange}
                                            className="form-control mb-2"
                                            placeholder="e.g Jl, Sukarno Hatta No 12"
                                            required
                                        />
                                    </div>
                                    <div className="w-50">
                                        <label htmlFor="tanggal_sk" className="form-label">Kode POS</label>
                                        <input
                                            type="text"
                                            name="kode_pos"
                                            value={newUser.alamat.kode_pos}
                                            onChange={handleInputChange}
                                            className="form-control mb-2"
                                            placeholder="e.g 403924"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className='d-flex justify-content-between mb-3'>
                                    <div className='w-50 me-2'>
                                        <label htmlFor="email" className='mb-2'>Email :</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={newUser.email}
                                            onChange={handleInputChange}
                                            className="form-control"
                                            placeholder="Email"
                                            required
                                        />
                                    </div>
                                    <div className="w-50">
                                        <label htmlFor="password" className="mb-2">Password :</label>
                                        <div className="input-group">
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                name="password"
                                                value={newUser.password}
                                                onChange={handleInputChange}
                                                className="form-control"
                                                placeholder="Password"
                                                required
                                            />
                                            <button
                                                type="button"
                                                onClick={togglePasswordVisibility}
                                                className="btn btn-outline-secondary"
                                            >
                                                {showPassword ? "🙈" : "👁️"}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className='mb-3'>
                                    <label htmlFor="roleId" className='mb-2'>Pilih Role :</label>
                                    <select
                                        name="roleId"
                                        value={newUser.roleId}
                                        onChange={handleInputChange}
                                        className="form-control"
                                        required
                                    >
                                        <option value="" disabled>Pilih Role</option>
                                        {Array.isArray(roleIdOptions) && roleIdOptions.map((option) => (
                                            <option key={option._id} value={option._id}>
                                                {option.role}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className='w-50 me-2'>
                                    <label htmlFor="nama" className='mb-2'>Tentang :</label>
                                    <input
                                        type="text"
                                        name="tentang"
                                        value={newUser.tentang}
                                        onChange={handleInputChange}
                                        className="form-control"
                                        placeholder="e.g. Seorang Dosen Mata Kuliah Inggris"
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn btn-success" onClick={() => handleSaveData(usersList)}>Tambah</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>


            {/* Edit Modal */}
            {showModalEdit && (
                <div className="modal fade show d-block" id="editModal" tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content" style={{ width: '550px' }}>
                            <div className="modal-header">
                                <h5 className="modal-title">Edit Users</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => closeEditModal(false)}
                                    aria-label="Close"
                                ></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleEditSubmit}>
                                    <div className="form-group mt-3 mb-2">
                                        <div className='form-group'>
                                            {editUsers.avatar && (
                                                <div className="preview-container mb-2" style={{ marginTop: "10px" }}>
                                                    <img
                                                        src={editUsers.avatar}
                                                        alt="Avatar Preview"
                                                        style={{
                                                            maxWidth: "150px",
                                                            maxHeight: "150px",
                                                            borderRadius: "8px",
                                                            border: "1px solid #ddd",
                                                        }}
                                                    />
                                                </div>
                                            )}
                                            <label>Avatar</label>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleFileChange}
                                                className="form-control"
                                            />
                                        </div>
                                    </div>
                                    <div className='d-flex gap-2'>
                                        <div className="mb-2">
                                            <label>Nama</label>
                                            <input
                                                type="text"
                                                name="nama"
                                                value={editUsers.nama}
                                                onChange={handleEditChange}
                                                className="form-control"
                                            />
                                        </div>
                                        <div className="mb-2 w-50">
                                            <label>Jabatan</label>
                                            <input
                                                type="text"
                                                name="jabatan"
                                                value={editUsers.jabatan}
                                                onChange={handleEditChange}
                                                className="form-control"
                                            />
                                        </div>
                                    </div>
                                    <div className='d-flex gap-2'>
                                        <div className="mb-2">
                                            <label>NIP</label>
                                            <input
                                                type="number"
                                                name="nip"
                                                value={editUsers.nip}
                                                onChange={handleEditChange}
                                                className="form-control"
                                            />
                                        </div>
                                        <div className="mb-2 w-50">
                                            <label>Pendidikan</label>
                                            <input
                                                type="text"
                                                name="pendidikan"
                                                value={editUsers.pendidikan}
                                                onChange={handleEditChange}
                                                className="form-control"
                                            />
                                        </div>
                                    </div>
                                    <div className='d-flex gap-2'>
                                        <div className="mb-2">
                                            <label htmlFor="email">Email</label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={editUsers.email}
                                                onChange={handleEditChange}
                                                className="form-control"
                                            />
                                        </div>
                                        <div className="mb-2">
                                            <label>Password</label>
                                            <div className="input-group">
                                                <input
                                                    type={showPassword ? "text" : "password"}
                                                    name="password"
                                                    value={editUsers.password}
                                                    onChange={handleEditChange}
                                                    className="form-control"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={togglePasswordVisibility}
                                                    className="btn btn-outline-secondary"
                                                >
                                                    {showPassword ? "🙈" : "👁️"}
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* <div className="mb-2">
                                        <label>Status</label>
                                        <select
                                            name="status"
                                            value={editUsers.status}
                                            onChange={handleEditChange}
                                            className="form-control"
                                            required
                                        >
                                            <option value="">Pilih Status</option>
                                            <option value="Aktif">Aktif</option>
                                            <option value="Non Aktif">Non-Aktif</option>
                                        </select>
                                    </div> */}

                                    <button type="submit" className="btn btn-primary" onClick={() => handleSaveData(usersList)}>
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
                            <div className="modal-content shadow-lg">
                                <div className="modal-body p-4">
                                    <div className="text-center">
                                        {/* Foto Profil */}
                                        <img
                                            src="/profile.jpg"
                                            alt='Gambar'
                                            className="rounded-circle border mb-3"
                                            style={{ width: "100px", height: "100px", objectFit: "cover" }}
                                        />
                                        {/* Nama */}
                                        <h5 className="fw-bold mb-1">{previewData.nama}</h5>
                                        {/* Jabatan */}
                                        <p className="text-muted mb-4">{previewData.jabatan}</p>
                                    </div>
                                    {/* Info Tambahan */}
                                    <hr />
                                    <p className="text-center text-uppercase text-muted fw-bold mb-3">
                                        More Info
                                    </p>
                                    <div className="d-flex justify-content-between">
                                        <span className="fw-bold">Pendidikan</span>
                                        <span>{previewData.pendidikan}</span>
                                    </div>
                                    <div className="d-flex justify-content-between mt-2">
                                        <span className="fw-bold">NIP</span>
                                        <span>{previewData.nip}</span>
                                    </div>
                                    <div className="d-flex justify-content-between mt-2">
                                        <span className="fw-bold">Email</span>
                                        <span>{previewData.email}</span>
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
            {userToDelete && (
                <ModalConfirmDelete
                    show={showConfirmDeleteModal}
                    onClose={() => setShowConfirmDeleteModal(false)}
                    message="Apakah Anda yakin ingin menghapus user ini? Tindakan ini tidak bisa dibatalkan."
                    userId={userToDelete}
                    deleteUser={deleteUser} // Mengirimkan fungsi deleteUser ke modal
                />
            )}

            <ModalFilter
                show={showFiltersModal}
                onClose={() => setShowFiltersModal(false)}
                onApply={handleApplyFilters}
            />
        </div>
    );
}

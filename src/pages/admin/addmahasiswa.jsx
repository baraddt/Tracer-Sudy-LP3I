import { useEffect, useState } from 'react';
import axiosClient from '../../services/axiosClient';

export default function User() {
    const [mahasiswaList, setMahasiswaList] = useState([]); // State untuk menyimpan data pengguna
    const [error, setError] = useState(null); // State untuk menangani error
    const [newMahasiswa, setNewMahasiswa] = useState({
        pribadi: {
            avatar: '',
            nim: '',
            nama: '',
            jk: '',
            ttl: '',
        },
        kampus: {
            prodi: '',
            kampus: '',
            tahun_lulusan: '',
        },
        akun: {
            email: '',
            password: '',
        }
    });

    const [showModal, setShowModal] = useState(false);
    const [prodiOptions, setProdiOptions] = useState([]);
    const [kampusOptions, setKampusOptions] = useState([]);
    const [tahunOptions, setTahunOptions] = useState([]);
    const [roleIdOptions, setRoleIdOptions] = useState([]);
    const [editMahasiswa, setEditMahasiswa] = useState(null);
    const [showModalEdit, setShowModalEdit] = useState(false);
    const [showModalPreview, setShowModalPreview] = useState(false);
    const [selectedMahasiswa, setSelectedMahasiswa] = useState(null);
    const [previewData, setPreviewData] = useState(null);
    const [currentPage, setCurrentPage] = useState(1); // Halaman aktif
    const [totalPages, setTotalPages] = useState(0); // Total halaman
    const [totalMahasiswa, setTotalMahasiswa] = useState(0); // Total mahasiswa
    const [pageSize] = useState(10); // Ukuran halaman (jumlah data per halaman)


    // Fungsi API Memanggil Data mahasiswa
    const fetchMahasiswa = async (page = 1) => {
        try {

            const response = await axiosClient.get('/mahasiswa/all', {
                params: {  // Kirim parameter untuk pagination
                    page: page,
                    pageSize: pageSize
                }
            });

            // Update daftar mahasiswa dan info pagination
            setMahasiswaList(response.data.data);
            setTotalPages(response.data.meta.totalPages);
            setTotalMahasiswa(response.data.meta.totalMahasiswa);
            setCurrentPage(response.data.meta.currentPage);

            console.log(response.data.data);  // Menampilkan data mahasiswa di console
        } catch (error) {
            console.error("Error fetching data:", error.message);
        }
    };

    const goToPage = (page) => {
        if (page < 1 || page > totalPages) return; // Pastikan halaman tidak keluar dari batas
        setCurrentPage(page);
    };

    useEffect(() => {
        fetchMahasiswa(currentPage); // Panggil fetchMahasiswa saat currentPage berubah
    }, [currentPage]); // Dependencies array agar hanya dipanggil ketika currentPage berubah


    // Fetch Prodi
    const fetchProdi = async () => {
        try {

            const response = await axiosClient.get('/prodi/all');

            setProdiOptions(response.data.data);

        } catch (err) {
            console.error("Error Fetching Data:", err.message);
        }
    };

    // Fetch Kampus
    const fetchKampus = async () => {
        try {

            const response = await axiosClient.get('/kampus/all');

            setKampusOptions(response.data.data);

        } catch (err) {
            console.error("Error Fetching Data:", err.message);
        }
    };

    // Fetch Tahun Lulusan
    const fetchTahun = async () => {
        try {

            const response = await axiosClient.get('/mahasiswa/tahun_lulusan/all');

            setTahunOptions(response.data.data);
            console.log(response.data);


        } catch (err) {
            console.error("Error Fetching Data:", err.message);
        }
    };

    // Fetch RoleId
    const fetchRoleId = async () => {
        try {

            const response = await axiosClient.get('/users/role/all');
            setRoleIdOptions(response.data.data);
            console.log(response.data);

        } catch (error) {
            console.error('Error fetching RoleId:', error.response ? error.response.data : error.message);
        }
    };

    const refreshData = async () => {
        try {
            await fetchMahasiswa();
        } catch (err) {
            console.error("Error feching mahasiswa data:", err.message);

        }
    };

    const handleSaveData = async (data) => {
        try {
            setMahasiswaList(data);  // Simpan data baru atau data yang diedit

            // Tunggu 3 detik dan refresh data
            setTimeout(async () => {
                await refreshData();
            }, 3000);
        } catch (error) {
            console.error("Error saving data:", error);
        }
    };


    // useEffect untuk memanggil data API saat komponen pertama kali dirender
    useEffect(() => {
        fetchMahasiswa();
        fetchProdi();
        fetchKampus();
        fetchTahun();
        fetchRoleId();
    }, []);

    // fungsi menambah data menggunakan API
    const addMahasiswa = async () => {
        try {
            const token = localStorage.getItem('token')
            const response = await axiosClient.post(
                '/mahasiswa/add',
                newMahasiswa
            );
            //     '/mahasiswa/add',
            //     newMahasiswa
            // );

            setMahasiswaList((prevList) => [...prevList, response.data]);

            // Reset form setelah berhasil menambahkan data
            setNewMahasiswa({
                pribadi: { avatar: '', nim: '', nama: '', jk: '', ttl: '' },
                kampus: { prodi: '', kampus: '', tahun_lulusan: '' },
                akun: { email: '', password: '' },
            });

            console.log("Mahasiswa berhasil ditambahkan:", response.data);
            setShowModal(false);
        } catch (error) {
            console.error("Error adding mahasiswa:", error.message);
            if (error.response?.data) {
                console.log("Response data:", error.response.data);
            }
            setError("Gagal menambahkan mahasiswa. Silakan coba lagi.");
        }
    };

    const handleEditSubmit = async (event) => {
        event.preventDefault();
        console.log("Data yang dikirimkan:", editMahasiswa); // Debugging: Periksa data yang akan dikirim
        try {
            const response = await axiosClient.put(`/mahasiswa/edit/${editMahasiswa.id}`, editMahasiswa);

            console.log('Mahasiswa updated successfully:', response.data);
            setShowModalEdit(false);
        } catch (error) {
            console.error("Error updating Mahasiswa:", error.message);
            setError(error.response?.data?.message || 'An error occurred');
        }
    };

    const handleDeleteMahasiswa = async (id) => {
        try {
            const response = await axiosClient.delete(`/mahasiswa/delete/${id}`);

            console.log('Mahasiswa deleted successfully:', response.data);
            // Lakukan tindakan setelah berhasil menghapus mahasiswa, misalnya memperbarui tampilan
        } catch (error) {
            console.error('Error deleting mahasiswa:', error.message);
            // Tangani error, misalnya tampilkan pesan error
        }
    };

    const getMahasiswaById = async (id) => {
        try {
            console.log('Memuat data mahasiswa dengan ID:', id);
            const response = await axiosClient.get(`/mahasiswa/${id}`);

            console.log('Data mahasiswa berhasil dimuat:', response.data);
            setPreviewData(response.data.data); // Simpan data untuk ditampilkan di modal
            setShowModalPreview(true); // Tampilkan modal
        } catch (error) {
            console.error('Gagal memuat data mahasiswa:', error.response?.data || error.message);
        }
    };

    const handlePreviewMahasiswa = (mahasiswaId) => {
        // Panggil fungsi untuk mendapatkan data mahasiswa
        getMahasiswaById(mahasiswaId);
    };




    // Fungsi untuk menangani perubahan pada form input
    const handleInputChange = (e, section) => {
        const { name, value } = e.target;

        setNewMahasiswa((prevMahasiswa) => ({
            ...prevMahasiswa,
            [section]: {
                ...prevMahasiswa[section],
                [name]: value,
            },
        }));
    };


    // Fungsi untuk menangani pengiriman form
    const handleSubmit = async (e) => {
        e.preventDefault(); // Mencegah reload halaman
        addMahasiswa();
    };

    const openEditModal = ({ _id, pribadi, kampus, akun }) => {
        console.log('Data yang dipilih untuk diedit:', { _id, pribadi, kampus, akun });
        if (!_id) {
            console.error("ID mahasiswa tidak ditemukan");
            return;
        }
        setEditMahasiswa({
            id: _id, // Pastikan ID tidak hilang
            pribadi: {
                avatar: pribadi.avatar || "",
                nim: pribadi.nim || "",
                nama: pribadi.nama || "",
                jk: pribadi.jk || "",
                ttl: pribadi.ttl || "",
            },
            kampus: {
                prodi: kampus.prodi || "",
                kampus: kampus.kampus || "",
                tahun_lulusan: kampus.tahun_lulusan || "",
            },
            akun: {
                email: akun.email || "",
                password: akun.password || "",
            },
        });
        setShowModalEdit(true);
    };




    const handleEditChange = (e, section) => {
        const { name, value } = e.target;

        setEditMahasiswa((prevMahasiswa) => ({
            ...prevMahasiswa,
            [section]: {
                ...prevMahasiswa[section],
                [name]: value,
            },
        }));
    };


    return (
        <div className="container mt-4">
            <div className="rounded bg-white p-3">
                <h4 className="text-black mb-4 fw-semibold">Mahasiswa</h4>

                {/* Tombol untuk membuka modal */}
                <div className="d-flex flex-column align-items-end mb-3">
                    <button className="btn btn-success mb-2" onClick={() => setShowModal(true)}>
                        <i className="bi bi-plus"></i>Tambah
                    </button>
                    <button className="btn btn-primary"><i className="bi bi-filter"></i> Filter</button>
                </div>

                {/* Form pencarian pengguna */}
                <div className="d-flex mb-3 col-sm-4">
                    <input
                        type="search"
                        className="form-control me-2"
                        placeholder="Cari User"
                    />
                    <button className="btn btn-secondary d-flex align-items-center">
                        <i className="bi bi-search me-2"></i> Cari
                    </button>
                </div>
            </div>

            {/* Tabel data pengguna */}
            <div className="rounded mt-4 bg-white p-3">
                <table className="table">
                    <thead>
                        <tr>
                            <th className='bg-secondary bg-opacity-25 text-center' scope="col">NIM</th>
                            <th className='bg-secondary bg-opacity-25' scope="col">Nama Lengkap</th>
                            <th className='bg-secondary bg-opacity-25' scope="col">Jenis Kelamin</th>
                            <th className='bg-secondary bg-opacity-25' scope="col">Program Study</th>
                            {/* <th className='bg-secondary bg-opacity-25' scope="col">Tahun Lulusan</th> */}
                            <th className='bg-secondary bg-opacity-25 text-center' scope="col">Status</th>
                            <th className='bg-secondary bg-opacity-25 text-center' scope="col">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mahasiswaList.length > 0 ? (
                            mahasiswaList.map((mahasiswa) => (
                                <tr key={mahasiswa._id}>
                                    <td>{mahasiswa.pribadi?.nim || 'N/A'}</td>
                                    <td>{mahasiswa.pribadi?.nama || 'N/A'}</td>
                                    <td>{mahasiswa.pribadi?.jk || 'N/A'}</td>
                                    <td>{mahasiswa.kampus?.prodi?.nama || 'N/A'}</td>
                                    <td className={`text-center ${mahasiswa.status ? 'text-success' : 'text-danger'}`}>
                                        {mahasiswa.status ? 'Aktif' : 'Tidak Aktif'}
                                    </td>
                                    <td className='text-center'>
                                        <button className="btn-sm me-2 border-0 bg-transparent" onClick={() => handlePreviewMahasiswa(mahasiswa._id)}>
                                            <i className="bi bi-eye-fill text-info"></i>
                                        </button>
                                        <button className="btn-sm me-2 border-0 bg-transparent" onClick={() => openEditModal(mahasiswa)}>
                                            <i className="bi bi-pencil-fill text-primary"></i>
                                        </button>
                                        <button className="btn-sm border-0 bg-transparent" onClick={() => handleDeleteMahasiswa(mahasiswa._id)}>
                                            <i className="bi bi-trash-fill text-danger"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="text-center">Tidak ada data pengguna.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
                
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

            </div>

            {/* Modal untuk menambah pengguna */}
            <div className={`modal fade ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden={!showModal}>
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Tambah Mahasiswa</h5>
                            <button type="button" className="btn-close" onClick={() => setShowModal(false)} aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    {/* Kolom 1: Data Pribadi */}
                                    <div className="col-md-4">
                                        <h4>Data Pribadi</h4>
                                        <div className="form-group">
                                            <label>Avatar</label>
                                            <input
                                                type="file"
                                                name="avatar"
                                                className="form-control"
                                                value={newMahasiswa.pribadi.avatar}
                                                onChange={(e) => handleInputChange(e, 'pribadi')}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>NIM</label>
                                            <input
                                                type="text"
                                                name="nim"
                                                className="form-control"
                                                value={newMahasiswa.pribadi.nim}
                                                onChange={(e) => handleInputChange(e, 'pribadi')}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Nama</label>
                                            <input
                                                type="text"
                                                name="nama"
                                                className="form-control"
                                                value={newMahasiswa.pribadi.nama}
                                                onChange={(e) => handleInputChange(e, 'pribadi')}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Jenis Kelamin</label>
                                            <select
                                                name="jk"
                                                className="form-control"
                                                value={newMahasiswa.pribadi.jk}
                                                onChange={(e) => handleInputChange(e, 'pribadi')}
                                            >
                                                <option value="">Pilih</option>
                                                <option value="Laki - Laki">Laki - Laki</option>
                                                <option value="Perempuan">Perempuan</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label>Tempat, Tanggal Lahir</label>
                                            <input
                                                type="text"
                                                name="ttl"
                                                className="form-control"
                                                value={newMahasiswa.pribadi.ttl}
                                                onChange={(e) => handleInputChange(e, 'pribadi')}
                                            />
                                        </div>
                                    </div>

                                    {/* Kolom 2: Data Kampus */}
                                    <div className="col-md-4">
                                        <h4>Data Kampus</h4>
                                        <div className="form-group mb-4">
                                            <select
                                                name="prodi"
                                                value={newMahasiswa.kampus.prodi}
                                                onChange={(e) => handleInputChange(e, 'kampus')}
                                                className="form-control mb-2"
                                                required
                                            >
                                                <option value="">Pilih prodi</option>
                                                {Array.isArray(prodiOptions) && prodiOptions.map((option) => (
                                                    <option key={option._id} value={option._id}>
                                                        {option.nama} {/* Menampilkan nama akreditasi */}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="form-group mt-4">
                                            <select
                                                name="kampus"
                                                value={newMahasiswa.kampus.psdku}
                                                onChange={(e) => handleInputChange(e, 'kampus')}
                                                className="form-control mb-2"
                                                required
                                            >
                                                <option value="">Pilih kampus</option>
                                                {Array.isArray(kampusOptions) && kampusOptions.map((option) => (
                                                    <option key={option._id} value={option._id}>
                                                        {option.psdku}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="form-group mt-4">
                                            <select
                                                name="tahun_lulusan"
                                                value={newMahasiswa.kampus.tahun_lulusan}
                                                onChange={(e) => handleInputChange(e, 'kampus')}
                                                className="form-control mb-2"
                                                required
                                            >
                                                <option value="">Pilih Tahun</option>
                                                {Array.isArray(tahunOptions) && tahunOptions.map((option) => (
                                                    <option key={option._id} value={option._id}>
                                                        {option.tahun_lulusan} {/* Menampilkan nama akreditasi */}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                    </div>

                                    {/* Kolom 3: Data Akun */}
                                    <div className="col-md-4">
                                        <h4>Data Akun</h4>
                                        <div className="form-group">
                                            <label>Email</label>
                                            <input
                                                type="email"
                                                name="email"
                                                className="form-control"
                                                value={newMahasiswa.akun.email}
                                                onChange={(e) => handleInputChange(e, 'akun')}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Password</label>
                                            <input
                                                type="password"
                                                name="password"
                                                className="form-control"
                                                value={newMahasiswa.akun.password}
                                                onChange={(e) => handleInputChange(e, 'akun')}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Tombol Submit */}
                                <div className="text-center mt-4">
                                    <button type="submit" className="btn btn-primary" onClick={() => handleSaveData(mahasiswaList)}>Tambah Mahasiswa</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`modal-backdrop fade ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }}></div>
            {showModalEdit && (
                <div className="modal fade show d-block">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Edit Mahasiswa</h5>
                                <button type="button" className="btn-close" onClick={() => setShowModalEdit(false)}></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleEditSubmit}>
                                    <div className="row">
                                        {/* Kolom 1: Data Pribadi */}
                                        <div className="col-md-4">
                                            <h4>Data Pribadi</h4>
                                            {/* <div className="form-group">
                                                <label>Avatar</label>
                                                <input
                                                    type="string"
                                                    name="avatar"
                                                    className="form-control"
                                                    value={editMahasiswa.pribadi.avatar}
                                                    onChange={handleEditChange}
                                                />
                                            </div> */}
                                            <div className="form-group">
                                                <label>NIM</label>
                                                <input
                                                    type="text"
                                                    name="nim"
                                                    className="form-control"
                                                    value={editMahasiswa.pribadi.nim}
                                                    onChange={(e) => handleEditChange(e, 'pribadi')}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>Nama</label>
                                                <input
                                                    type="text"
                                                    name="nama"
                                                    className="form-control"
                                                    value={editMahasiswa.pribadi.nama}
                                                    onChange={(e) => handleEditChange(e, 'pribadi')}
                                                />
                                            </div>
                                            {/* <div className="form-group">
                                                <label>Jenis Kelamin</label>
                                                <input
                                                    type="text"
                                                    name="jk"
                                                    className="form-control"
                                                    value={editMahasiswa.pribadi.jk}
                                                    onChange={(e) => handleEditChange(e, 'pribadi')}
                                                />
                                            </div> */}
                                            <div className="form-group">
                                                <label>Jenis Kelamin</label>
                                                <select
                                                    id="jk"
                                                    name="jk"
                                                    value={editMahasiswa.pribadi.jk}
                                                    className="form-control"
                                                    onChange={(e) => handleEditChange(e, 'pribadi')}
                                                >
                                                    <option value="">-- Pilih Jenis Kelamin --</option>
                                                    <option value="Laki - Laki">laki - Laki</option>
                                                    <option value="Perempuan">Perempuan</option>
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <label>Tempat, Tanggal Lahir</label>
                                                <input
                                                    type="text"
                                                    name="ttl"
                                                    className="form-control"
                                                    value={editMahasiswa.pribadi.ttl}
                                                    onChange={(e) => handleEditChange(e, 'pribadi')}
                                                />
                                            </div>
                                        </div>

                                        {/* Kolom 2: Data Kampus */}
                                        <div className="col-md-4">
                                            <h4>Data Kampus</h4>
                                            <div className="form-group">
                                                <label>Prodi</label>
                                                <select
                                                    name="prodi"
                                                    value={editMahasiswa.kampus.prodi}  // Pastikan ini sesuai dengan ID prodi yang dipilih
                                                    onChange={(e) => handleEditChange(e, 'kampus')}
                                                    className="form-control mb-2"
                                                    required
                                                >
                                                    <option value="">Pilih Prodi</option> {/* Menambahkan opsi default */}
                                                    {Array.isArray(prodiOptions) && prodiOptions.map((option) => (
                                                        <option key={option._id} value={option._id}>
                                                            {option.nama} {/* Menampilkan nama prodi */}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <label>Kampus</label>
                                                <select
                                                    name="kampus"
                                                    value={editMahasiswa.kampus.kampus}  // Pastikan ini sesuai dengan ID prodi yang dipilih
                                                    onChange={(e) => handleEditChange(e, 'kampus')}
                                                    className="form-control mb-2"
                                                    required
                                                >
                                                    <option value="">Pilih Kampus</option> {/* Menambahkan opsi default */}
                                                    {Array.isArray(kampusOptions) && kampusOptions.map((option) => (
                                                        <option key={option._id} value={option._id}>
                                                            {option.psdku} {/* Menampilkan nama prodi */}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <label>Tahun Lulusan</label>
                                                <select
                                                    name="tahun_lulusan"
                                                    value={editMahasiswa.kampus.tahun_lulusan}  // Pastikan ini sesuai dengan ID prodi yang dipilih
                                                    onChange={(e) => handleEditChange(e, 'kampus')}
                                                    className="form-control mb-2"
                                                    required
                                                >
                                                    <option value="">Pilih Tahun</option> {/* Menambahkan opsi default */}
                                                    {Array.isArray(tahunOptions) && tahunOptions.map((option) => (
                                                        <option key={option._id} value={option._id}>
                                                            {option.tahun_lulusan} {/* Menampilkan nama prodi */}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>


                                        </div>

                                        {/* Kolom 3: Data Akun */}
                                        <div className="col-md-4">
                                            <h4>Data Akun</h4>
                                            <div className="form-group">
                                                <label>Email</label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    className="form-control"
                                                    value={editMahasiswa.akun.email}
                                                    onChange={(e) => handleEditChange(e, 'akun')}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>Password</label>
                                                <input
                                                    type="password"
                                                    name="password"
                                                    className="form-control"
                                                    value={editMahasiswa.akun.password}
                                                    onChange={(e) => handleEditChange(e, 'akun')}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Tombol Submit */}
                                    <div className="text-center mt-4">
                                        <button type="submit" className="btn btn-primary" onClick={() => handleSaveData(mahasiswaList)}>
                                            Update Mahasiswa
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {/* Modal Priview */}
            {showModalPreview && previewData && previewData.pribadi && (
                <div className="modal fade show d-block">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Preview Mahasiswa</h5>
                                <button type="button" className="btn-close" onClick={() => setShowModalPreview(false)}></button>
                            </div>
                            <div className="modal-body">
                                {/* Menampilkan data mahasiswa */}
                                <p><strong>Nama:</strong> {previewData.pribadi.nama}</p>
                                <p><strong>NIM:</strong> {previewData.pribadi.nim}</p>
                                <p><strong>Jenis Kelamin:</strong> {previewData.pribadi.jk}</p>
                                <p><strong>Tempat & Tanggal Lahir:</strong> {previewData.pribadi.ttl}</p>
                                <p><strong>Prodi:</strong> {previewData.kampus.prodi._id}</p> {/* Ini dapat disesuaikan jika prodi perlu ditampilkan lebih lengkap */}
                                <p><strong>Email:</strong> {previewData.akun.email}</p>
                                <p><strong>Role ID:</strong> {previewData.akun.role_id}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}

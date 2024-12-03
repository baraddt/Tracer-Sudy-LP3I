import { useEffect, useState } from 'react';
import axios from 'axios';

export default function User() {
    const [usersList, setUsersList] = useState([]); // State untuk menyimpan data pengguna
    const [error, setError] = useState(null); // State untuk menangani error
    const [newUser, setNewUser] = useState({
        nama: '',
        avatar: '',
        nip: '',
        jabatan: '',
        pendidikan: '',
        email: '',
        password: '',
        roleId: '',
    });

    const [showModal, setShowModal] = useState(false); // State untuk mengatur tampilan modal
    const [editUsers, setEditUsers] = useState(null);
    const [showModalEdit, setShowModalEdit] = useState(false);
    const [showModalPreview, setShowModalPreview] = useState(false);
    const [roleIdOptions, setRoleIdOptions] = useState([]); // Role ID options
    const [selectedUser, setSelectedUser] = useState(null);
    const [previewData, setPreviewData] = useState(null);
    const [currentPage, setCurrentPage] = useState(1); // Halaman aktif
    const [totalPages, setTotalPages] = useState(0); // Total halaman
    const [totalUsers, setTotalUsers] = useState(0); // Total mahasiswa
    const [pageSize] = useState(10);
    // Fungsi API untuk mendapatkan data pengguna
    const fetchUsers = async () => {
        try {
            // const response = await axios.get('http://192.168.18.176:5000/users/all');
            const response = await axios.get('http://192.168.18.176:5000/users/all');

            // const data = response.data.data;
            // const totalUsers = response.data.meta.totalUsers;
            // const totalPages = response.data.meta.totalPages;

            setUsersList(response.data.data);
            setTotalPages(response.data.meta.totalPages);
            setTotalUsers(response.data.meta.totalMahasiswa);
            setCurrentPage(response.data.meta.currentPage);
        } catch (error) {
            console.error("Error fetching data:", error.message);
        }
    };

    const goToPage = (page) => {
        if (page < 1 || page > totalPages) return;
    };

    useEffect(() => {
        fetchUsers(currentPage);
    }, [currentPage]);

    // Fungsi API untuk mendapatkan data Role ID
    const fetchRoleId = async () => {
        try {
            // const response = await axios.get('http://192.168.18.176:5000/users/role/all');
            const response = await axios.get('http://192.168.18.176:5000/users/role/all');
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
        fetchUsers();  // Memanggil data pengguna pertama kali
        fetchRoleId(); // Memanggil data Role ID
    }, []); // [] memastikan hanya sekali saat komponen pertama kali dirender

    // Fungsi menambah data pengguna baru menggunakan API
    const addUser = async () => {
        try {
            // const response = await axios.post('http://192.168.18.176:5000/users/adduser', newUser);
            const response = await axios.post('http://192.168.18.176:5000/users/adduser', newUser);

            setUsersList((prevList) => [...prevList, response.data]);
            fetchUsers();
            setNewUser({
                nama: '', avatar: '', nip: '', jabatan: '', pendidikan: '', email: '', password: '', roleId: ''
            });

            setShowModal(false);
        } catch (error) {
            console.error("Error adding user:", error.message);
            console.log("Error response:", error.response?.data); // Debug: pesan error dari server jika ada
            setError("Failed to add User, Try Again");
        }
    };

    // Fungsi untuk mengedit data pengguna
    const handleEditSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.put(
                // `http://192.168.18.176:5000/users/edituser/${editUsers._id}`, editUsers
                `http://192.168.18.176:5000/users/edituser/${editUsers._id}`, editUsers
            );
            console.log('Users updated successfully:', response.data);
            setShowModalEdit(false);
        } catch (error) {
            console.error('Error updating Users:', error);
            setError(error.response?.data?.message || 'An error occurred');
        }
    };

    // Fungsi untuk menghapus data pengguna
    const deleteUser = async (userId) => {
        try {
            // const response = await axios.delete(`http://192.168.18.176:5000/users/delete/${userId}`);
            const response = await axios.delete(`http://192.168.18.176:5000/users/deleteuser/${userId}`);

            // Menghapus data pengguna dari state setelah dihapus dari API
            setUsersList((prevList) => prevList.filter((user) => user._id !== userId));

            console.log('User deleted successfully:', response.data);
        } catch (error) {
            console.error('Error deleting user:', error.message);
        }
    };

    // fungsi melihat detail pengguna
    const getUserById = async (userId) => {
        try {
            // const response = await axios.get(`http://192.168.18.176:5000/users/${userId}`);
            const response = await axios.get(`http://192.168.18.176:5000/users/${userId}`);
            return response.data.data; // Mengembalikan data pengguna dari respons

        } catch (error) {
            console.error("Full error response:", error.response);
            console.error("Error fetching user details:", error);
            return null;
        }
    };


    // fungsi untuk melihat preview pengguna
    const handlePreviewUser = async (userId) => {
        const userDetails = await getUserById(userId);
        if (userDetails) {
            setSelectedUser(userDetails);
            setShowModalPreview(true); // Membuka modal preview
        }
    };

    // Fungsi untuk menangani perubahan pada form input
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    // Fungsi untuk menangani pengiriman form
    const handleSubmit = async (e) => {
        e.preventDefault();
        addUser(); // Menambahkan pengguna baru saat form disubmit
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


    return (
        <div className="container mt-4">
            <div className="rounded bg-white p-3">
                <h4 className="text-black mb-4 fw-semibold">User</h4>

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
                            <th className='bg-secondary bg-opacity-25 text-center' scope="col">#ID</th>
                            <th className='bg-secondary bg-opacity-25' scope="col">Avatar</th>
                            <th className='bg-secondary bg-opacity-25' scope="col">Nama</th>
                            <th className='bg-secondary bg-opacity-25' scope="col">Jabatan</th>
                            <th className='bg-secondary bg-opacity-25' scope="col">Pendidikan</th>
                            <th className='bg-secondary bg-opacity-25' scope="col">Email</th>
                            <th className='bg-secondary bg-opacity-25 text-center' scope="col">Status</th>
                            <th className='bg-secondary bg-opacity-25 text-center' scope="col">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usersList.length > 0 ? (
                            usersList.map((users, index) => (
                                <tr key={users._id}>
                                    <td>{`#U${index + 201}`}</td>
                                    <td><img className='rounded-circle' src={users.avatar} alt="Avatar" width="50" height="50" /></td>
                                    <td>{users.nama}</td>
                                    <td>{users.jabatan || 'N/A'}</td>
                                    <td>{users.pendidikan || 'N/A'}</td>
                                    <td>{users.email}</td>
                                    <td className={`text-center ${users.is_active ? 'text-success' : 'text-danger'}`}>
                                        {users.is_active ? 'Aktif' : 'Tidak Aktif'}
                                    </td>
                                    <td className='text-center'>
                                        <button className="btn-sm me-2 border-0 bg-transparent">
                                            <i className="bi bi-eye-fill text-info" onClick={() => handlePreviewUser(users._Id)}></i>
                                        </button>
                                        <button className="btn-sm me-2 border-0 bg-transparent">
                                            <i className="bi bi-pencil-fill text-primary" onClick={() => openEditModal(users)}></i>
                                        </button>
                                        <button className="btn-sm border-0 bg-transparent">
                                            <i className="bi bi-trash-fill text-danger" onClick={() => deleteUser(users._id)}></i>
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
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Tambah Pengguna</h5>
                            <button type="button" className="btn-close" onClick={() => setShowModal(false)} aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmit}>
                                <input
                                    type="text"
                                    name="nama"
                                    value={newUser.nama}
                                    onChange={handleInputChange}
                                    className="form-control mb-2"
                                    placeholder="Nama"
                                    required
                                />
                                <input
                                    type="file"
                                    accept="image/*"
                                    name="avatar"
                                    value={newUser.avatar}
                                    onChange={handleInputChange}
                                    className="form-control mb-2"
                                    placeholder="avatar"
                                    required
                                />
                                <input
                                    type="number"
                                    name="nip"
                                    value={newUser.nip}
                                    onChange={handleInputChange}
                                    className="form-control mb-2"
                                    placeholder="Nip"
                                    required
                                />
                                <input
                                    type="text"
                                    name="jabatan"
                                    value={newUser.jabatan}
                                    onChange={handleInputChange}
                                    className="form-control mb-2"
                                    placeholder="Jabatan"
                                    required
                                />
                                <input
                                    type="text"
                                    name="pendidikan"
                                    value={newUser.pendidikan}
                                    onChange={handleInputChange}
                                    className="form-control mb-2"
                                    placeholder="Pendidikan"
                                    required
                                />
                                <input
                                    type="email"
                                    name="email"
                                    value={newUser.email}
                                    onChange={handleInputChange}
                                    className="form-control mb-2"
                                    placeholder="Email"
                                    required
                                />
                                <input
                                    type="password"
                                    name="password"
                                    value={newUser.password}
                                    onChange={handleInputChange}
                                    className="form-control mb-2"
                                    placeholder="Password"
                                    required
                                />
                                <select
                                    name="roleId"
                                    value={newUser.roleId}
                                    onChange={handleInputChange}
                                    className="form-control mb-2"
                                    required
                                >
                                    <option value="" disabled>Pilih Role</option>
                                    {Array.isArray(roleIdOptions) && roleIdOptions.map((option) => (
                                        <option key={option._id} value={option._id}>
                                            {option.role} {/* Menampilkan nama akreditasi */}
                                        </option>
                                    ))}
                                </select>

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
                        <div className="modal-content">
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
                                    {/* <div className="mb-2">
                                        <label>Avatar</label>
                                        <input
                                            type="file"
                                            name="avatar"
                                            value={editUsers.avatar} // Mengambil nilai dari state
                                            onChange={handleEditChange}
                                            className="form-control"
                                        />
                                    </div> */}
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
                                    <div className="mb-2">
                                        <label>Jabatan</label>
                                        <input
                                            type="text"
                                            name="jabatan"
                                            value={editUsers.jabatan}
                                            onChange={handleEditChange}
                                            className="form-control"
                                        />
                                    </div>
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
                                    <div className="mb-2">
                                        <label>Pendidikan</label>
                                        <input
                                            type="text"
                                            name="pendidikan"
                                            value={editUsers.pendidikan}
                                            onChange={handleEditChange}
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="mb-2">
                                        <label>Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={editUsers.email}
                                            onChange={handleEditChange}
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="mb-2">
                                        <label>password</label>
                                        <input
                                            type="password"
                                            name="password"
                                            value={editUsers.password}
                                            onChange={handleEditChange}
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="mb-2">
                                        <label>Role</label>
                                        <select
                                            name="roleId"
                                            value={editUsers.role}  // Nilai pengguna yang dipilih
                                            onChange={handleInputChange}  // Menangani perubahan pilihan
                                            className="form-control mb-2"
                                            required
                                        >
                                            {Array.isArray(roleIdOptions) && roleIdOptions.map((option) => (
                                                <option key={option._id} value={option._id}>
                                                    {option.role}  {/* Menampilkan nama pengguna */}
                                                </option>
                                            ))}
                                        </select>
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
                            <div className="modal-header">
                                <h5 className="modal-title">Preview PSDKU</h5>
                                <button type="button" className="btn-close" onClick={() => setShowModalPreview(false)}></button>
                            </div>
                            <div className="modal-body">
                                <p>Nama: {editUsers.nama}</p>
                                <p>NIP: {editUsers.nip}</p>
                                <p>Jabatan: {editUsers.jabatan}</p>
                                <p>Pendidikan: {editUsers.pendidikan}</p>
                                <p>Password: {editUsers.password}</p>
                                {/* Other fields for display */}
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}

import { useEffect, useState } from 'react';
import axios from 'axios';

export default function User() {
    const [usersList, setUsersList] = useState([]); // State untuk menyimpan data pengguna
    const [error, setError] = useState(null); // State untuk menangani error
    const [newUser, setNewUser] = useState({ // State untuk menyimpan data pengguna baru
        nama: '',
        jabatan: '',
        pendidikan: '',
        email: '',
        status: '',
    });
    const [showModal, setShowModal] = useState(false); // State untuk mengatur tampilan modal
    // const [currentPage, setCurrentPage] = useState(1);
    // const itemsPerPage = 5;

    // Fungsi API Memanggil Data User
    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://192.168.18.176:5000/users/all');
            setUsersList(response.data.data);
        } catch (error) {
            console.error("Error fetching data:", error.message);
        }
    };


    // useEffect untuk memanggil data API saat komponen pertama kali dirender
    useEffect(() => {
        fetchUsers();
    }, []);

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
        e.preventDefault(); // Mencegah reload halaman
        try {
            setUsers((prevUsers) => [...prevUsers, { ...newUser, _id: (prevUsers.length + 1).toString() }]);
            setNewUser({ // Reset form input
                nama: '',
                jabatan: '',
                pendidikan: '',
                email: '',
                status: '',
            });
            setShowModal(false); // Tutup modal setelah berhasil
        } catch (error) {
            setError(error.message); // Tangani error
        }
    };

    // Pagination
    // const totalPages = Math.ceil(users.length / itemsPerPage);
    // const startIndex = (currentPage - 1) * itemsPerPage;
    // const usersList = users.slice(startIndex, startIndex + itemsPerPage);

    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div className="container mt-4">
            <div className="rounded bg-white p-3">
                <h1 className="text-black mb-4 fw-semibold">User</h1>

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
                        type="text"
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
                                    <td>{users.avatar}</td>
                                    <td>{users.nama}</td>
                                    <td>{users.jabatan || 'N/A'}</td>
                                    <td>{users.pendidikan || 'N/A'}</td>
                                    <td>{users.email}</td>
                                    <td className={`text-center ${users.is_active ? 'text-success' : 'text-danger'}`}>
                                        {users.is_active ? 'Aktif' : 'Tidak Aktif'}
                                    </td>
                                    <td className='text-center'>
                                        <button className="btn btn-primary btn-sm me-2">
                                            <i className="bi bi-eye"></i>
                                        </button>
                                        <button className="btn btn-warning btn-sm me-2">
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
                                <td colSpan="7" className="text-center">Tidak ada data pengguna.</td>
                            </tr>
                        )}
                    </tbody>
                </table>

                {/* Pagination */}
                {/* <nav>
                    <ul className="pagination justify-content-end">
                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                            <button className="page-link" onClick={() => goToPage(currentPage - 1)}><i className="bi bi-chevron-left"></i></button>
                        </li>
                        {Array.from({ length: totalPages }, (_, i) => (
                            <li key={i} className={`page-item ${currentPage === i + 1 ? 'active bg-success text-white' : ''}`}>
                                <button className="page-link" onClick={() => goToPage(i + 1)}>
                                    {i + 1}
                                </button>
                            </li>
                        ))}
                        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                            <button className="page-link" onClick={() => goToPage(currentPage + 1)}><i className="bi bi-chevron-right"></i></button>
                        </li>
                    </ul>
                </nav> */}
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
                                <select
                                    name="status"
                                    value={newUser.status}
                                    onChange={handleInputChange}
                                    className="form-control mb-2"
                                    required
                                >
                                    <option value="" disabled>Pilih Status</option>
                                    <option value="Aktif">Aktif</option>
                                    <option value="Non-Aktif">Non-Aktif</option>
                                </select>

                                <button type="submit" className="btn btn-success">Tambah</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`modal-backdrop fade ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }}></div>
        </div>
    );
}

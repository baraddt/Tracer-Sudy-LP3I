import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function ProgramList() {
    const [programList, setProgramList] = useState([]);
    const [error, setError] = useState(null);
    const [newProgram, setNewProgram] = useState({
        kodePs: '',
        programStudy: '',
        jenjang: '',
        akreditasi: '',
        status: '',
    });
    const [editProgram, setEditProgram] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showModalEdit, setShowModalEdit] = useState(false);
    const [showModalPreview, setShowModalPreview] = useState(false);

    const dummyProgram = [
        // { kodePs: '450052', programStudy: 'Administrasi Bisnis', jenjang: 'D3', akreditasi: 'Baik Sekali', status: 'Aktif' },
        // { kodePs: '450053', programStudy: 'Manajemen Informatika', jenjang: 'D3', akreditasi: 'Baik Sekali', status: 'Aktif' },
        // { kodePs: '450054', programStudy: 'Teknik Otomotif', jenjang: 'D2', akreditasi: 'Baik Sekali', status: 'Non-Aktif' },
    ];

    const fetchProgram = () => {
        setProgramList(dummyProgram);
    };

    useEffect(() => {
        fetchProgram();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProgram((prevProgram) => ({
            ...prevProgram,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            setProgramList((prevList) => [
                ...prevList,
                { ...newProgram, _id: (prevList.length + 1).toString() },
            ]);
            setNewProgram({ kodePs: '', programStudy: '', jenjang: '', akreditasi: '', status: '' });
            setShowModal(false);
        } catch (error) {
            setError(error.message);
        }
    };

    const openEditModal = (program) => {
        setEditProgram(program);
        setShowModalEdit(true);
    };

    const openPreviewModal = (program) => {
        setEditProgram(program);
        setShowModalPreview(true);
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditProgram((prevProgram) => ({
            ...prevProgram,
            [name]: value,
        }));
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        setProgramList((prevList) =>
            prevList.map((program) =>
                program.kodePs === editProgram.kodePs ? editProgram : program
            )
        );
        setShowModalEdit(false);
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
                    <Link to="/kampus">
                        <button className="me-2 border rounded bg-dark bg-opacity-50 p-2 text-light" type="button">Overview</button>
                    </Link>
                    <Link to="/psdku">
                        <button className="me-2 border rounded bg-dark bg-opacity-50 p-2 text-light" type="button">PSDKU</button>
                    </Link>
                    <button className="border rounded bg-secondary bg-opacity-50 p-2 text-light" type="button">Program Study</button>
                </div>
            </div>
            <div className="container mt-4">
                <div className="row rounded bg-white p-3 align-items-center">
                    <div className="d-flex justify-content-between">
                        <h4>Daftar Program Study</h4>
                        <button className="btn btn-success mb-2" onClick={() => setShowModal(true)}>
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
                                        <td>{program.kodePs}</td>
                                        <td>{program.programStudy || 'N/A'}</td>
                                        <td className='text-center'>{program.jenjang || 'N/A'}</td>
                                        <td className='text-center'>{program.akreditasi || 'N/A'}</td>
                                        <td className={`text-center ${program.status === 'Aktif' ? 'text-success' : 'text-danger'}`}>
                                            {program.status || 'N/A'}
                                        </td>

                                        <td className='text-center'>
                                            <button className="btn btn-primary btn-sm me-2" onClick={() => openPreviewModal(program)}>
                                                <i className="bi bi-eye"></i>
                                            </button>
                                            <button className="btn btn-warning btn-sm me-2" onClick={() => openEditModal(program)}>
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
                                    <td colSpan="7" className="text-center">
                                        Tidak ada data Program Study.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            {showModal && (
                <div className="modal fade show d-block">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Tambah Program Study</h5>
                                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleSubmit}>
                                    <input
                                        type="text"
                                        name="kodePs"
                                        value={newProgram.kodePs}
                                        onChange={handleInputChange}
                                        className="form-control mb-2"
                                        placeholder="Kode PS"
                                        required
                                    />
                                    <input
                                        type="text"
                                        name="programStudy"
                                        value={newProgram.programStudy}
                                        onChange={handleInputChange}
                                        className="form-control mb-2"
                                        placeholder="Program Study"
                                        required
                                    />
                                    <input
                                        type="text"
                                        name="jenjang"
                                        value={newProgram.jenjang}
                                        onChange={handleInputChange}
                                        className="form-control mb-2"
                                        placeholder="Jenjang"
                                        required
                                    />
                                    <input
                                        type="text"
                                        name="akreditasi"
                                        value={newProgram.akreditasi}
                                        onChange={handleInputChange}
                                        className="form-control mb-2"
                                        placeholder="Akreditasi"
                                        required
                                    />
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
                                    <button type="submit" className="btn btn-primary">
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
                                            name="kodePs"
                                            value={editProgram.kodePs}
                                            onChange={handleEditChange}
                                            className="form-control"
                                            disabled
                                        />
                                    </div>
                                    <div className="mb-2">
                                        <label>Program Study</label>
                                        <input
                                            type="text"
                                            name="programStudy"
                                            value={editProgram.programStudy}
                                            onChange={handleEditChange}
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="mb-2">
                                        <label>Jenjang</label>
                                        <input
                                            type="text"
                                            name="jenjang"
                                            value={editProgram.jenjang}
                                            onChange={handleEditChange}
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="mb-2">
                                        <label>Akreditasi</label>
                                        <input
                                            type="text"
                                            name="akreditasi"
                                            value={editProgram.akreditasi}
                                            onChange={handleEditChange}
                                            className="form-control"
                                        />
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
                                <h5 className="modal-title">Preview Program Study</h5>
                                <button type="button" className="btn-close" onClick={() => setShowModalPreview(false)}></button>
                            </div>
                            <div className="modal-body">
                                <p>Kode PS: {editProgram.kodePs}</p>
                                <p>Program Study: {editProgram.programStudy}</p>
                                {/* Other fields for display */}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

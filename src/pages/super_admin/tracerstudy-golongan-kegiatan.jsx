import { useState, useEffect } from 'react';
import { Link, useNavigate, } from 'react-router-dom';
import axiosClient from '../../services/axiosClient';
import ModalSuccess from '../../components/compModals/modalsuccess';
import ModalSuccessDraft from '../../components/compModals/draftModals';
import ModalFailed from '../../components/compModals/modalFailed';

export default function () {
    const [dataTracerId, setDataTracerId] = useState(null);
    const [psdkuList, setPsdkuList] = useState([]);
    const [tahunList, setTahunList] = useState([]);
    const [error, setError] = useState(null);
    const [newSkala, setNewSkala] = useState({
        skala_kegiatan: '',
        tahun_lulusan: '',
        kampus: [],
        prodi: [],
    });

    const [tahunOptions, setTahunOptions] = useState([]);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showSuccessDraftModal, setShowSuccessDraftModal] = useState(false);
    const [showFailedModal, setShowFailedModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const tracerId = localStorage.getItem('tracerId'); // Ambil ID dari localStorage
        if (!tracerId) {
            console.error("Tracer ID tidak ditemukan di localStorage.");
            navigate('/super_admin/tracerstudyadd'); // Redirect ke step 1 jika ID tidak ditemukan
        } else {
            setDataTracerId(tracerId); // Simpan ke state
            console.log("Tracer ID diambil dari localStorage:", tracerId);
        }
    }, [navigate]);



    // memanggil dulu data tracernya
    // const fetchTracer = async () => {
    //     try {
    //         const response = await axiosClient.get('/tracerstudy/all');
    //         if (response.data.data && response.data.data.length > 0) {
    //             setDataTracerId(response.data.data[0]._id); // Mengambil ID dari data tracer pertama
    //             console.log("ID tracer yang diambil:", response.data.data[0]._id); // Memastikan ID sudah benar
    //         } else {
    //             console.error("Data tracer kosong atau tidak ditemukan");
    //         }
    //     } catch (error) {
    //         console.error("Error fetching data:", error.message);
    //     }
    // };




    // memangil psdku lewat API
    const fetchPsdku = async () => {
        try {
            // const response = await axiosClient.get('/kampus/all');
            const response = await axiosClient.get('/kampus/all');
            setPsdkuList(response.data.data);
            console.log("ini data nya :", response.data.data);


        } catch (error) {
            console.error("Error feching data:", error.message);

        }
    };

    // memanggil tahun lulusan melalui API
    const fetchTahun = async () => {
        try {
            // const response = await axiosClient.get('/mahasiswa/tahun_lulu')
            const response = await axiosClient.get('/mahasiswa/tahun_lulusan/all')

            setTahunOptions(response.data.data || []);

        } catch (error) {
            console.error("Error feching data:", error.message);

        }
    }


    useEffect(() => {
        fetchPsdku();
        fetchTahun();
    }, []);


    // fungsi mengirim data dari form ke API
    const addSkala = async () => {
        try {
            if (!dataTracerId) {
                throw new Error("ID tracer tidak ditemukan.");
            }

            // Ambil hanya prodiId dari kombinasi
            const prodiIds = newSkala.prodi.map((id) => id.split('-')[1]);

            const payload = {
                ...newSkala,
                prodi: prodiIds // Ganti prodi dengan array prodiId saja
            };

            const response = await axiosClient.put(
                `/tracerstudy/skalakegiatan/add/${dataTracerId}`,
                payload
            );

            console.log("Data skala kegiatan berhasil ditambahkan:", response.data);
            setShowSuccessModal(true);
            navigate('/super_admin/tracerstudy-bank-soal'); // Navigasi ke step berikutnya
        } catch (error) {
            setShowFailedModal(true);
            console.error("Error saat menambahkan skala kegiatan:", error.message);
            setError("Gagal menambahkan skala kegiatan. Silakan coba lagi.");
        }
    };


    useEffect(() => {
        if (tahunOptions.length > 0) {
            setNewSkala(prevState => ({
                ...prevState,
                tahun_lulusan: tahunOptions[0]._id // Inisialisasi dengan ID pertama
            }));
        }
    }, [tahunOptions]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        if (name === "skala_kegiatan" && value === "Nasional") {
            // Ambil semua ID PSDKU
            const allKampusIds = psdkuList.map((psdku) => psdku._id);
            // Ambil semua kombinasi ID PSDKU dan Prodi
            const allProdiIds = psdkuList.flatMap((psdku) =>
                psdku.prodi.map((prodi) => `${psdku._id}-${prodi._id}`)
            );

            setNewSkala((prevState) => ({
                ...prevState,
                skala_kegiatan: value,
                kampus: allKampusIds, // Masukkan semua ID PSDKU
                prodi: allProdiIds,  // Masukkan semua kombinasi ID PSDKU-Prodi
            }));
        } else if (name === "skala_kegiatan" && value === "PSDKU") {
            // Reset pilihan untuk manual check
            setNewSkala((prevState) => ({
                ...prevState,
                skala_kegiatan: value,
                kampus: [],
                prodi: [],
            }));
        } else {
            // Update field lainnya
            setNewSkala((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        }
    };



    // Fungsi untuk menangani perubahan checkbox kampus
    const handleKampusChange = (e, kampusId) => {
        setNewSkala((prevState) => {
            const kampus = prevState.kampus.includes(kampusId)
                ? prevState.kampus.filter((id) => id !== kampusId) // Hapus jika sudah ada
                : [...prevState.kampus, kampusId]; // Tambahkan jika belum ada
            return { ...prevState, kampus };
        });
    };

    // Fungsi untuk menangani perubahan checkbox prodi
    const handleProdiChange = (e, psdkuId, prodiId) => {
        const uniqueId = `${psdkuId}-${prodiId}`;
        setNewSkala((prevState) => {
            const prodi = prevState.prodi.includes(uniqueId)
                ? prevState.prodi.filter((id) => id !== uniqueId) // Hapus jika sudah ada
                : [...prevState.prodi, uniqueId]; // Tambahkan jika belum ada
            return { ...prevState, prodi };
        });
    };




    const handleSubmit = (e) => {
        e.preventDefault();
        const tracerIdFromLocalStorage = localStorage.getItem('tracerId'); // Ambil ID dari localStorage
        console.log("Tracer ID yang diambil dari localStorage:", tracerIdFromLocalStorage); // Tampilkan ID dari localStorage
        console.log("ID yang akan diedit:", dataTracerId); // Tampilkan ID yang ada di state

        // Proses selanjutnya
        addSkala();
    };

    const handleNavigateAndUpdate = async () => {
        try {
            // Fetch data terbaru
            const response = await axiosClient.get('/tracerstudy/all');
            const updatedTracerData = response.data;

            // Update localStorage
            localStorage.setItem("tracersData", JSON.stringify(updatedTracerData));
            console.log("Tracer data updated in localStorage:", updatedTracerData);

            // Redirect ke halaman /super_admin/tracerstudy
            navigate('/super_admin/tracerstudy');
        } catch (error) {
            console.error("Error updating tracer data:", error.message);
        }
    };






    return (
        <div className="container rounded my-4 bg-white">
            {/* Progress Steps */}
            <div className="row mb-4">
                <div className="col">
                    <ul className="nav mt-3 mb-4 justify-content-center gap-2">
                        <li className="nav-item">
                            <span className="badge btn-secondary px-4 py-2 rounded-pill">
                                Detail Kegiatan
                            </span>
                        </li>
                        <li className="nav-item mx-2">
                            <span className="badge btn-primary bg-opacity-50 px-4 py-2 rounded-pill">
                                Skala Kegiatan
                            </span>
                        </li>
                        <li className="nav-item">
                            <span className="badge btn-secondary px-4 py-2 rounded-pill">
                                Bank soal
                            </span>
                        </li>
                        <li className="nav-item">
                            <span className="badge btn-secondary px-4 py-2 rounded-pill">
                                Kriteria Atensi
                            </span>
                        </li>
                        <li className="nav-item">
                            <span className="badge btn-secondary px-4 py-2 rounded-pill">
                                Preview
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
            {/* Progress Steps */}
            {/* <div className="row mb-4">
                <div className="col">
                    <ul className="mt-3 gap-3 text-white nav nav-pills justify-content-center">
                        <li className="nav-item">
                            <span className="active border rounded bg-secondary bg-opacity-50 p-2">Detail Kegiatan</span>
                        </li>
                        <li className="nav-item">
                            <span className="active border rounded bg-primary bg-opacity-50 p-2">Skala Kegiatan</span>
                        </li>
                        <li className="nav-item">
                            <span className="active border rounded bg-secondary bg-opacity-50 p-2">Bank soal</span>
                        </li>
                        <li className="nav-item">
                            <span className="active border rounded bg-secondary bg-opacity-50 p-2">Kriteria Atensi</span>
                        </li>
                        <li className="nav-item">
                            <span className="active border rounded bg-secondary bg-opacity-50 p-2">Preview</span>
                        </li>
                    </ul>
                </div>
            </div> */}

            {/* Form */}
            <form onSubmit={handleSubmit}>

                {/* Tanggal Mulai & Tanggal Berakhir */}
                <div className="form-row d-flex">
                    <div className="form-group col-md-6 me-5">
                        <label className='mb-3'>Skala Kegiatan</label>
                        <select
                            name="skala_kegiatan"
                            value={newSkala.skala_kegiatan}
                            onChange={handleInputChange}
                            placeholder='Pilih Skala'
                            className="form-control mb-2"
                            required
                        >
                            <option value="" disabled>Pilih Skala</option>
                            <option value="Nasional">Nasional</option>
                            <option value="PSDKU">PSDKU</option>
                        </select>
                    </div>
                    <div className="form-group col-md-5 me-5">
                        <label className='mb-3'>Tahun Lulusan</label>
                        <select
                            name="tahun_lulusan"
                            value={newSkala.tahun_lulusan}  // Pastikan ini memiliki nilai yang sesuai
                            onChange={handleInputChange}    // Fungsi untuk menangani perubahan
                            className="form-control mb-2"
                            required
                        >
                            <option value="">Pilih Tahun Lulusan</option>
                            {tahunOptions && tahunOptions.length > 0 ? (
                                tahunOptions.map((option) => (
                                    <option key={option._id} value={option._id}>
                                        {option.tahun_lulusan} {/* Menampilkan tahun lulusan */}
                                    </option>
                                ))
                            ) : (
                                <option value="">Tahun belum tersedia</option>  // Menampilkan pesan jika tidak ada data
                            )}
                        </select>
                    </div>
                </div>
                {/* Table */}
                <div className="mt-4">
                    <h5>Sasaran Responden</h5>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Nama Lembaga</th>
                                <th className='text-center'>Jenjang</th>
                                <th>Program Studi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {psdkuList.length > 0 ? (
                                psdkuList.map((psdku) => (
                                    <tr key={psdku._id}>
                                        <td>
                                            <input
                                                type="checkbox"
                                                checked={newSkala.kampus.includes(psdku._id)} // Gunakan checked untuk status terpilih
                                                onChange={(e) => handleKampusChange(e, psdku._id)} // Panggil fungsi handleKampusChange
                                            /> {psdku.psdku}
                                        </td>
                                        <td>
                                            <div className="d-flex flex-column text-center">
                                                {psdku.prodi.map((item, index) => (
                                                    <label key={index}>{item.jenjang?.jenjang}</label>
                                                ))}
                                            </div>
                                        </td>
                                        <td>
                                            <div className="d-flex flex-column">
                                                {Array.isArray(psdku.prodi) && psdku.prodi.map((prodiItem) => {
                                                    const uniqueId = `${psdku._id}-${prodiItem._id}`; // Kombinasi unik
                                                    return (
                                                        <label key={uniqueId}>
                                                            <input
                                                                type="checkbox"
                                                                checked={newSkala.prodi.includes(uniqueId)} // Cek status unik
                                                                onChange={(e) => handleProdiChange(e, psdku._id, prodiItem._id)} // Kirim kombinasi unik
                                                            /> {prodiItem.nama}
                                                        </label>
                                                    );
                                                })}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="text-center">
                                        Belum Menambahkan data PSDKU.
                                    </td>
                                </tr>
                            )}
                        </tbody>

                    </table>
                </div>

                {/* Buttons */}
                <div className="d-flex justify-content-between mt-4">
                    <div>
                        <button type="button" className="btn btn-primary mb-3" onClick={() => setShowSuccessDraftModal(true)}>Simpan ke Draft</button>
                    </div>
                    <div>
                        <Link to='/super_admin/tracerstudyadd'>
                            <button type="button" className="btn btn-danger mb-3 me-3">Sebelumnnya</button>
                        </Link>
                        {/* <Link to='/super_admin/tracerstudy-bank-soal'> */}
                        <button type="submit" className="btn btn-success mb-3">Selanjutnya</button>
                        {/* </Link> */}
                    </div>
                </div>
            </form>
            
            {/* Modal Success */}
            <ModalSuccess
                show={showSuccessModal}
                message="Action Success !"
                onClose={() => setShowSuccessModal(false)}
            />

            {/* Modal Draft */}
            <ModalSuccessDraft
                show={showSuccessDraftModal}
                message="Tracer to Draft Is Success !"
                onClose={() => {
                    setShowSuccessDraftModal(false);
                    handleNavigateAndUpdate(); // Fungsi untuk navigate + update localStorage
                }}
            />

            {/* Modal Failed */}
            <ModalFailed
                show={showFailedModal}
                message="Action Failed ! Try Again."
                onClose={() => setShowFailedModal(false)}
            />
        </div>
    )
}


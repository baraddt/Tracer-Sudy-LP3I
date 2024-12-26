import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Swal from "sweetalert2";
import axiosClient from '../../services/axiosClient';
import axios from 'axios';
import PsdkuDelete from '../../components/compModals/psdkuDelete';
import ModalFailed from '../../components/compModals/modalFailed';
import ModalSuccess from '../../components/compModals/modalsuccess';

const dummyData = {
    provinsi: [
        { id: 1, nama: 'Jawa Barat' },
        { id: 2, nama: 'Jawa Tengah' }
    ],
    kota: {
        1: [
            { id: 1, nama: 'Bandung' },
            { id: 2, nama: 'Bogor' }
        ],
        2: [
            { id: 3, nama: 'Semarang' },
            { id: 4, nama: 'Solo' }
        ]
    },
    kecamatan: {
        1: [
            { id: 1, nama: 'Cipedes' },
            { id: 2, nama: 'Tegalega' }
        ],
        2: [
            { id: 3, nama: 'Tembalang' },
            { id: 4, nama: 'Candisari' }
        ],
        3: [
            { id: 5, nama: 'Jejeke' },
            { id: 6, nama: 'Cipedes' }
        ],
        4: [
            { id: 7, nama: 'Sihapur' },
            { id: 8, nama: 'Cihupar' }
        ]
    },
    kelurahan: {
        1: [
            { id: 1, nama: 'Panglayungan' },
            { id: 2, nama: 'Sukasari' }
        ],
        2: [
            { id: 3, nama: 'Sidoarum' },
            { id: 4, nama: 'Kalipancur' }
        ],
        3: [
            { id: 5, nama: 'SIhuhah' },
            { id: 6, nama: 'Cikalincur' }
        ],
        4: [
            { id: 7, nama: 'Cikucukur' },
            { id: 8, nama: 'Pangcukur' }
        ],
        5: [
            { id: 7, nama: 'Cikucukur' },
            { id: 8, nama: 'Pangcukur' }
        ],
        6: [
            { id: 7, nama: 'Kuharipan' },
            { id: 8, nama: 'Kuhuripan' }
        ],
        7: [
            { id: 7, nama: 'Cukukurur' },
            { id: 8, nama: 'Jihuas' }
        ],
        8: [
            { id: 7, nama: 'Cihamples' },
            { id: 8, nama: 'Cihukar' }
        ]
    }
};

export default function Psdku() {
    const [psdkuList, setPsdkuList] = useState([]);
    const [error, setError] = useState(null);
    const [newPsdku, setNewPsdku] = useState({
        banner: '',
        avatar: '',
        kode_pt: '',
        tanggal_berdiri: '',
        tanggal_sk: '',
        detail: '',
        kelurahan: '',
        kecamatan: '',
        kota: '',
        provinsi: '',
        kode_pos: '',
        psdku: '',
        prodi: [],
        // pengguna: [],
        akreditasi: '',
        // status: '',
    });

    const [akreditasiOptions, setAkreditasiOptions] = useState([]); // State untuk menyimpan opsi akreditasi
    const [penggunaOptions, setPenggunaOptions] = useState([]); // State untuk menyimpan opsi pengguna
    const [prodiOptions, setProdiOptions] = useState([]); // State untuk menyimpan opsi prodi
    const [psdkuToDelete, setPsdkuToDelete] = useState(null);
    const [bannerFile, setBannerFile] = useState(null);
    const [avatarFile, setAvatarFile] = useState(null);
    const [editPsdku, setEditPsdku] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showModalEdit, setShowModalEdit] = useState(false);
    const [previewPsdku, setPreviewPsdku] = useState(null);
    const [showModalPreview, setShowModalPreview] = useState(false);
    const [showFailedModal, setShowFailedModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showModalDelete, setShowModalDelete] = useState(false);

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


    // Fungsi untuk mengambil data dari API
    const fetchData = async () => {
        try {
            const storedData = localStorage.getItem("psdkuData");

            if (storedData) {
                const parsedData = JSON.parse(storedData);

                if (parsedData && Array.isArray(parsedData.data)) {
                    setPsdkuList(parsedData.data);
                    console.log("Data loaded from LS:", parsedData);
                } else {
                    console.log("Data in localStorage is not in the expected format.");
                    const response = await axiosClient.get('/kampus/all');
                    setPsdkuList(response.data.data);
                    localStorage.setItem("psdkuData", JSON.stringify(response.data));
                }
                return;
            }

            // fetch data lagi boyy kalo data ga sesuai atau gada di LS
            const response = await axiosClient.get('/kampus/all');
            setPsdkuList(response.data.data);
            console.log("Data fetched from API:", response.data);
            localStorage.setItem("psdkuData", JSON.stringify(response.data));

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
        fetchProvinces();
    }, []);

    useEffect(() => {
        fetchData();
        fetchAkreditasi();
        fetchPengguna();
        fetchProdi();
    }, []);


    const uploadImage = async (file) => {
        const formData = new FormData();
        formData.append('file', file);

        try {
            // Ganti URL ke /kampus/add
            const response = await axiosClient.post('/kampus/add', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            return response.data.path; // Kembalikan path gambar yang disimpan
        } catch (error) {
            console.error('Error uploading image:', error.message);
            throw error;
        }
    };


    //Fungsi CRUD

    // fungsi untuk menambah data ke API
    const addPsdku = async () => {
        try {
            const response = await axiosClient.post('/kampus/add', newPsdku);
            // const response = await axiosClient.post('https://9l47d23v-5000.asse.devtunnels.ms/kampus/add', newPsdku);
            setPsdkuList((prevList) => {
                const updatedList = [...prevList, response.data];

                // Sync data terbaru ke localStorage
                localStorage.setItem("psdkuData", JSON.stringify(updatedList));

                return updatedList;
            });

            const updatedData = JSON.parse(localStorage.getItem("psdkuData"));
            console.log("Data after add in localStorage:", updatedData);

            fetchData();
            // setNewPsdku({ kode_pt: '', tanggal_berdiri: '', tanggal_sk: '', alamat: '', psdku: '', prodi: [], pengguna: [], akreditasi: '' }); // Reset form
            setNewPsdku({ banner: '', avatar: '', kode_pt: '', tanggal_berdiri: '', tanggal_sk: '', detail: '', kelurahan: '', kecamatan: '', kota: '', provinsi: '', kode_pos: '', psdku: '', prodi: [], akreditasi: '' }); // Reset form
            setShowModal(false);
            setShowSuccessModal(true);

        } catch (error) {

            setShowFailedModal(true);
            console.log("Response data:", error.response.data);
            console.error("Error adding PSDKU:", error.message);
            setError("Failed to add PSDKU. Please try again.");
        }
    };

    const handleImageChange = (e, type) => {
        const file = e.target.files[0];
        if (file) {
            if (type === 'banner') {
                setBannerFile(file); // Simpan file banner yang dipilih
            } else if (type === 'avatar') {
                setAvatarFile(file); // Simpan file avatar yang dipilih
            }
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

            setPsdkuList((prevList) => {
                const updatedList = [...prevList, response.data];

                // Sync data terbaru ke localStorage
                localStorage.setItem("psdkuData", JSON.stringify(updatedList));

                return updatedList;
            });

            const updatedData = JSON.parse(localStorage.getItem("psdkuData"));
            console.log("Data after edit in localStorage:", updatedData);

            // console.log("data yang di kirim :", editPsdku);
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
            // Menghapus data psdku dari state setelah dihapus dari API
            setPsdkuList((prevList) => prevList.filter((psdku) => psdku._id !== psdkuId));


            localStorage.removeItem("psdkuData")

            console.log('Psdku deleted successfully:', response.data);
        } catch (error) {
            setShowFailedModal(true);
            console.error('Error deleting psdku:', error.message);
        }
    };

    const handleRemovePsdkuClick = (psdkuId) => {
        Swal.fire({
            title: "Yakin ingin menghapus?",
            text: "Data PSDKU ini akan dihapus permanen!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Ya, hapus!",
            cancelButtonText: "Batal"
        }).then((result) => {
            if (result.isConfirmed) {
                // Panggil fungsi hapus jika user konfirmasi
                deletePsdku(psdkuId);

                // Tampilkan alert sukses
                Swal.fire({
                    title: "Dihapus!",
                    text: "Data PSDKU telah dihapus.",
                    icon: "success",
                    timer: 1500,
                    showConfirmButton: false
                });
            }
        });
    };

    // const handleDeleteClick = (psdku) => {
    //     setPsdkuToDelete(psdku); // Menyimpan data pengguna yang akan dihapus
    //     setShowModalDelete(true); // Menampilkan modal konfirmasi
    // };

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
        setNewPsdku((prev) => ({ ...prev, [name]: value }));

        // Handle cascading dropdown
        if (name === 'provinsi') {
            fetchCities(value); // Fetch kota berdasarkan ID provinsi
            setCities([]);
            setDistricts([]);
            setVillages([]);
        } else if (name === 'kota') {
            fetchDistricts(value); // Fetch kecamatan berdasarkan ID kota
            setDistricts([]);
            setVillages([]);
        } else if (name === 'kecamatan') {
            fetchVillages(value); // Fetch kelurahan berdasarkan ID kecamatan
            setVillages([]);
        }
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
            // pengguna: psdku.pengguna || [], // Pastikan 'pengguna' adalah array
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
    // const handleEditRemovePengguna = (penggunaId) => {
    //     setEditPsdku((prevPsdku) => ({
    //         ...prevPsdku,
    //         pengguna: prevPsdku.pengguna.filter((id) => id !== penggunaId),
    //     }));
    // };
    // Fungsi untuk menghapus prodi dari array pada saat edit
    const handleEditRemoveProdi = (prodiId) => {
        setEditPsdku((prevPsdku) => ({
            ...prevPsdku,
            prodi: prevPsdku.prodi.filter((id) => id !== prodiId),
        }));
    };

    const handleRemoveClick = (prodiId) => {
        Swal.fire({
            title: "Yakin ingin menghapus?",
            text: "Data prodi ini akan dihapus permanen!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Ya, hapus!",
            cancelButtonText: "Batal"
        }).then((result) => {
            if (result.isConfirmed) {
                // Panggil fungsi hapus jika user konfirmasi
                handleNewRemoveProdi(prodiId);

                // Tampilkan alert sukses
                Swal.fire({
                    title: "Dihapus!",
                    text: "Data prodi telah dihapus.",
                    icon: "success",
                    timer: 1500,
                    showConfirmButton: false
                });
            }
        });
    };

    const handleRemovePenggunaClick = (penggunaId) => {
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
                handleNewRemovePengguna(penggunaId);

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
        } else if (name === 'detail' || name === 'kode_pos') {
            // Jika nama field adalah 'detail' atau 'kode_pos', update bagian 'alamat'
            setEditPsdku((prevPsdku) => ({
                ...prevPsdku,
                alamat: {
                    ...prevPsdku.alamat,
                    [name]: value, // update hanya field yang diubah
                },
            }));
        } else {
            // Untuk field lain
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
                        <thead className='table'>
                            <tr>
                                <th className="cstm-bg fw-semibold text-dark text-start">No</th>
                                <th className="cstm-bg fw-semibold text-dark text-start">Kode PT</th>
                                <th className="cstm-bg fw-semibold text-dark text-start text-truncate">PSDKU</th>
                                <th className="cstm-bg fw-semibold text-dark text-center">Akreditasi</th>
                                <th className="cstm-bg fw-semibold text-dark text-center">Status</th>
                                <th className="cstm-bg fw-semibold text-dark text-center">Action</th>
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
                                                <i className="bi bi-trash-fill text-danger" onClick={() => handleRemovePsdkuClick(psdku._id)}></i>
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
                <div className="modal fade show d-block" style={{ position: 'fixed', top: '50%', left: '43%', transform: 'translate(-50%, -50%)', animation: 'fadeIn 0.8s ease-out', }}>
                    <div className="modal-dialog">
                        <div className="modal-content" style={{ width: '800px' }}>
                            <div className="modal-header">
                                <h5 className="modal-title">Tambah PSDKU</h5>
                                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleSubmit}>
                                    <div className='d-flex justify-content-between'>
                                        <div className="form-group">
                                            <label>Banner</label>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                name="banner"
                                                value={newPsdku.banner}
                                                onChange={handleInputChange}
                                                className="form-control"
                                                placeholder="banner"
                                                required
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label>Avatar</label>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                name="avatar"
                                                value={newPsdku.avatar}
                                                onChange={handleInputChange}
                                                className="form-control"
                                                placeholder="avatar"
                                                required
                                            />
                                        </div>
                                    </div>
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
                                    <div className="d-flex justify-content-between">
                                        <div className="w-50 me-4">
                                            <label htmlFor="provinsi" className="form-label">Provinsi</label>
                                            <div className="input-group mb-2">
                                                <select
                                                    name="provinsi"
                                                    value={newPsdku.provinsi}
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
                                                    value={newPsdku.kota}
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
                                                    value={newPsdku.kecamatan}
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
                                                    value={newPsdku.kelurahan}
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
                                                value={newPsdku.detail}
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
                                                value={newPsdku.kode_pos}
                                                onChange={handleInputChange}
                                                className="form-control mb-2"
                                                placeholder="e.g 403924"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className='d-flex justify-content-between mb-2'>
                                        <div className="form-group w-50 me-4">
                                            <label htmlFor="prodi" className="form-label">Pilih Prodi :</label>
                                            <div className="input-group mb-2">
                                                <select
                                                    id="prodi"
                                                    // multiple
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
                                            <span className="fw-semibold mb-2 d-block">Prodi yang Ditambahkan:</span>
                                            <ul className="list-group">
                                                {newPsdku.prodi.map((prodiId, index) => {
                                                    const prodi = prodiOptions.find(option => option._id === prodiId);
                                                    return prodi ? (
                                                        <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                                                            <span className='me-2'>{prodi.nama}</span>
                                                            <button
                                                                type="button"
                                                                className="btn btn-sm btn-danger"
                                                                onClick={() => handleRemoveClick(prodiId)}
                                                            >
                                                                -
                                                            </button>
                                                        </li>
                                                    ) : null;
                                                })}
                                            </ul>
                                        </div>
                                    </div>
                                    {/* <div className='d-flex justify-content-between mb-2'>
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
                                            <span className='fw-semibold mb-2 d-block'>Pengguna yang Ditambahkan :</span>
                                            <ul className='list-group'>
                                                {newPsdku.pengguna.map((penggunaId, index) => {
                                                    const pengguna = penggunaOptions.find(option => option._id === penggunaId);
                                                    return pengguna ? (
                                                        <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                                                            {pengguna.nama}
                                                            <button
                                                                type="button"
                                                                className="btn btn-sm btn-danger ml-2 ms-5"
                                                                onClick={() => handleRemovePenggunaClick(penggunaId)}
                                                            >
                                                                -
                                                            </button>
                                                        </li>
                                                    ) : null;
                                                })}
                                            </ul>
                                        </div>
                                    </div> */}

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
                            <div className="modal-content" style={{ width: '800px' }}>
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
                                        <div className="form-group">
                                            {editPsdku.avatar && (
                                                <div className="preview-container mb-2" style={{ marginTop: "10px" }}>
                                                    <img
                                                        src={editPsdku.avatar}
                                                        alt="Banner Preview"
                                                        style={{
                                                            maxWidth: "150px",
                                                            maxHeight: "150px",
                                                            borderRadius: "8px",
                                                            border: "1px solid #ddd",
                                                        }}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                        <div className='d-flex gap-2'>
                                            <div className="mb-2 w-50">
                                                <label className='mb-2'>Kode PT</label>
                                                <input
                                                    type="text"
                                                    name="kode_pt"
                                                    value={editPsdku.kode_pt}
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
                                            <div className="mt-2 mb-2">
                                                <span className='fw-semibold mb-2 d-block'>Prodi yang Ditambahkan:</span>
                                                <ul className='list-group'>
                                                    {editPsdku.prodi.map((prodiId, index) => {
                                                        const prodi = prodiOptions.find(option => option._id === prodiId);
                                                        return prodi ? (
                                                            <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                                                                <span className='me-2'>{prodi.nama}</span>
                                                                <button
                                                                    type="button"
                                                                    className="btn btn-sm btn-danger ml-2 ms-4"
                                                                    onClick={() => handleRemoveClick(prodiId)}
                                                                >
                                                                    -
                                                                </button>
                                                            </li>
                                                        ) : null;
                                                    })}
                                                </ul>
                                            </div>
                                        </div>
                                        {/* <div className='d-flex justify-content-between'>
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
                                                <span className='fw-semibold mb-2 d-block'>Pengguna yang Ditambahkan:</span>
                                                <ul className='list-group'>
                                                    {editPsdku.pengguna.map((penggunaId, index) => {
                                                        const pengguna = penggunaOptions.find(option => option._id === penggunaId);
                                                        return pengguna ? (
                                                            <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                                                                <span>{pengguna.nama}</span>
                                                                <button
                                                                    type="button"
                                                                    className="btn btn-sm btn-danger ml-2 ms-4"
                                                                    onClick={() => handleRemovePenggunaClick(penggunaId)}
                                                                >
                                                                    -
                                                                </button>
                                                            </li>
                                                        ) : null;
                                                    })}
                                                </ul>
                                            </div>
                                        </div> */}
                                        {/* <div className="d-flex justify-content-between">
                                            <div className="w-50 me-4">
                                                <label htmlFor="provinsi" className="form-label">Provinsi</label>
                                                <div className="input-group mb-2">
                                                    <select
                                                        name="provinsi"
                                                        value={editPsdku.alamat.provinsi}
                                                        onChange={handleEditChange}
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
                                                        value={editPsdku.alamat.kota}
                                                        onChange={handleEditChange}
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
                                                        value={editPsdku.alamat.kecamatan}
                                                        onChange={handleEditChange}
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
                                                        value={editPsdku.alamat.kelurahan}
                                                        onChange={handleEditChange}
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
                                        </div> */}
                                        <div className="d-flex justify-content-between">
                                            <div className="w-100 me-4">
                                                <label htmlFor="tanggal_sk" className="form-label">Detail</label>
                                                <input
                                                    type="text"
                                                    name="detail"
                                                    value={editPsdku.alamat.detail}
                                                    onChange={handleEditChange}
                                                    className="form-control mb-2"
                                                    required
                                                />
                                            </div>
                                            <div className="w-50">
                                                <label htmlFor="tanggal_sk" className="form-label">Kode POS</label>
                                                <input
                                                    type="text"
                                                    name="kode_pos"
                                                    value={editPsdku.alamat.kode_pos}
                                                    onChange={handleEditChange}
                                                    className="form-control mb-2"
                                                    required
                                                />
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
                                        <h5 className="fw-bold mb-1">{previewPsdku.psdku}</h5>
                                        {/* Kode PT */}
                                        <p className="text-muted mb-4">{previewPsdku.kode_pt}</p>
                                    </div>
                                    {/* Info Tambahan */}
                                    <hr />
                                    <p className="text-center text-uppercase text-muted fw-bold mb-3">
                                        More Info
                                    </p>
                                    <div className="d-flex justify-content-between">
                                        <span className="fw-bold">Tgl Berdiri</span>
                                        <span>{previewPsdku.tanggal_berdiri}</span>
                                    </div>
                                    <div className="d-flex justify-content-between mt-2">
                                        <span className="fw-bold">Tgl SK</span>
                                        <span>{previewPsdku.tanggal_sk}</span>
                                    </div>
                                    <div className="d-flex justify-content-between mt-2">
                                        <span className="fw-bold">Alamat</span>
                                        <span>{previewPsdku.alamat?.detail}</span>
                                    </div>
                                    <hr />
                                    <p className="text-center text-uppercase text-muted fw-bold mb-3">
                                        Prodi And Kaprodi
                                    </p>
                                    {previewPsdku.prodi?.length > 0 ? (
                                        previewPsdku.prodi.map((item, index) => (
                                            <div key={index} className="d-flex justify-content-between">
                                                <span className="fw-bold">{item.nama}</span>
                                                {item.id_pengguna && item.id_pengguna.length > 0 ? (
                                                    <div>
                                                        {item.id_pengguna.map((pengguna, idx) => (
                                                            <span key={idx} className="text-muted">{pengguna.nama}</span>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <span className="text-muted">Belum Menambahkan Kaprodi</span>
                                                )}
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-center text-muted">Tidak ada data prodi</p>
                                    )}
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
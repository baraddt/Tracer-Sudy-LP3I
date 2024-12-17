import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axiosClient from '../../services/axiosClient';
import ModalSuccess from '../../components/compModals/modalsuccess';
import ModalSuccessDraft from '../../components/compModals/draftModals';
import ModalFailed from '../../components/compModals/modalFailed';
import ModalSuccessSoal from '../../components/compModals/soalModals';


export default function () {
    const navigate = useNavigate();
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showFailedModal, setShowFailedModal] = useState(false);
    const [showSuccessDraftModal, setShowSuccessDraftModal] = useState(false);
    const [showSuccessSoal, setShowSuccessSoal] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [editSoalId, setEditSoalId] = useState(null);
    const [dataTracerId, setDataTracerId] = useState(null);
    const [dataSoalId, setDataSoalId] = useState(null);
    const [bankSoalList, setBankSoalList] = useState([]);
    const [error, setError] = useState(null);
    const [newSoal, setNewSoal] = useState({
        soal: '',
        jawaban: []
    });
    const [options, setOptions] = useState(['', '', '', '']);
    const [weights, setWeights] = useState(['1', '1', '1', '1']);

    // useEffect(() => {
    //     const tracerId = localStorage.getItem('tracerId'); // Ambil ID dari localStorage
    //     if (!tracerId) {
    //         console.error("Tracer ID tidak ditemukan di localStorage.");
    //         navigate('/admin/tracerskala'); // Redirect ke step 1 jika ID tidak ditemukan
    //     } else {
    //         setDataTracerId(tracerId); // Simpan ke state
    //         console.log("Tracer ID diambil dari localStorage:", tracerId);
    //     }
    // }, [navigate]);

    // Fetch Tracer ID
    // const fetchTracer = async () => {
    //     try {
    //         const response = await axiosClient.get('/tracerstudy/all');
    //         if (response.data.data && response.data.data.length > 0) {
    //             setDataTracerId(response.data.data[0]._id);
    //             console.log("ID tracer yang diambil:", response.data.data[0]._id);
    //         } else {
    //             console.error("Data tracer kosong atau tidak ditemukan.");
    //         }
    //     } catch (error) {
    //         console.error("Error fetching data:", error.message);
    //     }
    // };

    // fetch bank soal untuk preview soal
    const fetchBankSoal = async () => {
        if (!dataTracerId) {
            console.error("ID Tracer belum tersedia.");
            return;
        }
        try {
            const response = await axiosClient.get(
                `/tracerstudy/bank_soal/get/${dataTracerId}`
                ,);
            if (response.data && response.data.data) {
                console.log("Data soal berhasil diambil:", response.data.data);
                setBankSoalList(response.data.data);
            } else {
                console.error("Bank soal kosong atau tidak ditemukan.");
            }
        } catch (error) {
            console.error("Error fetching data:", error.message);
        }
    };


    // Memanggil data tracer
    // useEffect(() => {
    //     fetchTracer();
    // }, []);

    // Memanggil bank soal setelah dataTracerId tersedia
    useEffect(() => {
        if (dataTracerId) {
            fetchBankSoal();
        }
    }, [dataTracerId]);

    // Fungsi untuk menambah soal ke API
    const addSoal = async (soalToSubmit) => {
        try {
            const response = await axiosClient.post(
                `/tracerstudy/banksoal/add/${dataTracerId}`,
                soalToSubmit
                ,);
            setShowSuccessSoal(true);
            console.log("Data soal berhasil ditambahkan:", response.data);
        } catch (error) {
            setShowFailedModal(true);
            console.error("Error adding soal:", error.message);
            setError("Gagal menambahkan soal. Coba lagi.");
        }
    };

    // edit soal
    const updateSoal = async (soalToSubmit) => {
        if (!editSoalId) {
            console.error("ID soal tidak valid atau belum terisi.");
            return;
        }

        try {
            const response = await axiosClient.put(
                `/tracerstudy/bank_soal/edit/${editSoalId}`, // Gunakan editSoalId yang valid
                soalToSubmit
                ,);
            setShowSuccessModal(true);
            console.log("Soal berhasil diperbarui:", response.data);
            setIsEditMode(false);
            setEditSoalId(null);
            setNewSoal({
                soal: '',
                jawaban: [], // Reset jawaban setelah edit
            });
            fetchBankSoal(); // Refresh data bank soal
        } catch (error) {
            setShowFailedModal(true);
            console.error("Gagal memperbarui soal:", error.message);
        }
    };




    // hapus soal

    const deleteSoal = async (soalId) => {
        // Pastikan soalId valid sebelum mengirim request
        if (!soalId) {
            console.error("ID soal tidak ditemukan");
            return;
        }

        try {
            // Mengirim request DELETE ke API
            const response = await axiosClient.delete(
                `/tracerstudy/bank_soal/delete/${soalId}`
                ,);

            // Update state bankSoalList dengan menghapus soal yang telah dihapus
            setBankSoalList((prevList) =>
                prevList.filter((soal) => soal._id !== soalId)
            );
            setShowSuccessModal(true);
            console.log("Soal Deleted Successfully", response.data);
        } catch (error) {
            setShowFailedModal(true);
            // Menangani error jika request gagal
            console.error("Error deleting soal:", error.message);
        }
    };

    // const deleteSoal = async (soalId) => {
    //     try {
    //         const response = await axiosClient.delete(``)
    //     }
    // }

    // Menangani perubahan input pertanyaan
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewSoal((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    // Menangani perubahan opsi jawaban
    const handleOptionChange = (index, value) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    // Menangani perubahan bobot jawaban
    const handleWeightChange = (index, value) => {
        const newWeights = [...weights];
        const numericValue = Number(value); // Konversi nilai ke angka

        if (numericValue >= 1 && numericValue <= 5) {
            newWeights[index] = numericValue; // Update bobot jika valid
        }
        setWeights(newWeights);
    };

    const handleEditSoal = (soal) => {
        if (soal && soal.id_soal) {  // Gunakan 'id_soal' bukan '_id'
            setNewSoal({
                soal: soal.soal,  // Set soal
                jawaban: soal.jawaban.map(jawaban => ({
                    jawaban: jawaban.jawaban,  // Set jawaban
                    bobot_jawaban: jawaban.bobot_jawaban  // Set bobot
                }))
            });

            // Set options dan weights dari soal yang diambil
            setOptions(soal.jawaban.map(jawaban => jawaban.jawaban));  // Set jawaban
            setWeights(soal.jawaban.map(jawaban => jawaban.bobot_jawaban));  // Set bobot

            // Set editSoalId dengan ID yang valid
            setEditSoalId(soal.id_soal);  // Gunakan 'id_soal' yang benar

            setIsEditMode(true);  // Ubah mode menjadi edit
        } else {
            console.error("Soal tidak memiliki ID yang valid", soal);
        }
    };





    // Menambahkan opsi jawaban
    const incrementOptions = () => {
        if (options.length < 5) { // Maksimal 5 opsi
            setOptions([...options, '']);
            setWeights([...weights, '1']);
        }
    };

    // Menghapus opsi jawaban
    const decrementOptions = () => {
        if (options.length > 2) { // Minimal 2 opsi
            setOptions(options.slice(0, -1));
            setWeights(weights.slice(0, -1));
        }
    };

    // Menangani submit form
    const handleSubmit = (e) => {
        e.preventDefault();

        // Ambil tracerId dari localStorage
        const tracerIdFromLocalStorage = localStorage.getItem('tracerId');
        console.log("Tracer ID yang diambil dari localStorage:", tracerIdFromLocalStorage); // Tampilkan ID dari localStorage
        console.log("ID yang akan diedit:", dataTracerId); // Tampilkan ID yang ada di state

        // Perbarui jawaban dan bobot
        const updatedJawaban = options.map((option, index) => ({
            jawaban: option,
            bobot_jawaban: Number(weights[index]),
        }));

        // Siapkan data soal untuk dikirim
        const soalToSubmit = {
            soal: newSoal.soal,
            jawaban: updatedJawaban,
        };

        console.log("ID soal yang diambil:", dataTracerId); // Log ID soal yang akan dikirim

        if (isEditMode) {
            soalToSubmit.id_soal = dataTracerId; // Gunakan dataTracerId jika dalam mode edit
            updateSoal(soalToSubmit);
        } else {
            addSoal(soalToSubmit);
        }

        // Reset form setelah submit
        resetForm();
    };





    const resetForm = () => {
        setNewSoal({
            soal: '',
            jawaban: [], // Reset jawaban setelah edit
        });
        setOptions(['', '', '', '']); // Reset opsi jawaban
        setWeights(['1', '1', '1', '1']); // Reset bobot jawaban
        setIsEditMode(false);  // Reset mode ke tambah
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
                            <span className="badge btn-secondary bg-opacity-50 px-4 py-2 rounded-pill">
                                Skala Kegiatan
                            </span>
                        </li>
                        <li className="nav-item">
                            <span className="badge btn-primary px-4 py-2 rounded-pill">
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
                            <span className="active border rounded bg-secondary bg-opacity-50 p-2">Skala Kegiatan</span>
                        </li>
                        <li className="nav-item">
                            <span className="active border rounded bg-primary bg-opacity-50 p-2">Bank soal</span>
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
                {/* Heading */}
                <div className="form-group">
                    <label style={{ fontSize: '19px' }}>Bank Soal</label>
                    <p className="text-secondary" style={{ fontSize: '13px' }}>Kumpulkan soal wajib yang ada untuk melakukan kegiatan Tracer Study</p>
                </div>

                {/* Input Pertanyaan */}
                <div className="form-group mb-3">
                    <label className='mb-3'>{isEditMode ? "Edit Pertanyaan" : "Tambah Pertanyaan"}</label>
                    <div className="input-group">
                        <input
                            type="text"
                            name='soal'
                            value={newSoal.soal}
                            onChange={handleInputChange}
                            className="form-control"
                            placeholder="Tambahkan Pertanyaan"
                        />
                        <button
                            type="button"
                            className="btn btn-outline-secondary ms-5 rounded"
                            onClick={decrementOptions}
                        >
                            -
                        </button>
                        <span className="input-group-text">{options.length}</span>
                        <button
                            type="button"
                            className="btn btn-outline-secondary rounded"
                            onClick={incrementOptions}
                        >
                            +
                        </button>
                    </div>
                </div>

                {/* Render Options */}
                <div className='mb-2 d-flex justify-content-between'>
                    <span>Jawaban</span>
                    <span>Bobot Jawaban</span>
                </div>
                {options.map((option, index) => (
                    <div className="row mb-2" key={index}>
                        <div className="col-8">
                            <input
                                type="text"
                                value={option}
                                onChange={(e) => handleOptionChange(index, e.target.value)}
                                className="form-control text-secondary"
                                placeholder={`Jawaban ${index + 1}`}
                            />
                        </div>
                        <div className="col-4">
                            <input
                                type="number"
                                value={weights[index]}
                                onChange={(e) => handleWeightChange(index, e.target.value)}
                                className="form-control text-secondary"
                                placeholder={`Bobot Jawaban`}
                            />
                        </div>
                    </div>
                ))}

                {/* Tambah Soal */}
                <div className='d-flex justify-content-end'>
                    <button type='submit' className='btn btn-success'>{isEditMode ? "Perbarui" : "Tambah"}</button>
                </div>
            </form>

            {/* Preview Section */}
            <div className="preview mt-5">
                <label style={{ fontSize: '19px' }}>Preview</label>
                <p className="text-secondary" style={{ fontSize: '13px' }}>
                    Tampilan pertanyaan dan opsi jawaban:
                </p>
                <div className="d-flex flex-wrap">
                    {Array.isArray(bankSoalList) && bankSoalList.length > 0 ? (
                        bankSoalList.map((item, index) => (
                            <div key={index} className="mb-4" style={{ width: '300px', marginRight: '20px' }}>
                                <p style={{ fontSize: '13px' }}>{index + 1}. {item.soal}</p>
                                <ul style={{ fontSize: '13px' }} className="list-unstyled">
                                    {item.jawaban.map((jawaban, optIndex) => (
                                        <li key={optIndex} className="d-flex align-items-center mb-2">
                                            <input type="radio" disabled className="me-2" />
                                            <label>{jawaban.jawaban}</label>
                                        </li>
                                    ))}
                                </ul>
                                {/* Tombol edit dan hapus */}
                                <div className='d-flex justify-content-end'>
                                    <button className='border-0 bg-transparent' onClick={() => handleEditSoal(item)}><i className='bi bi-pencil-fill'></i></button>
                                    <button className='border-0 bg-transparent' onClick={() => deleteSoal(item.id_soal)}>
                                        <i className='bi bi-trash-fill'></i>
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-muted">Belum ada soal yang ditambahkan untuk Tracer Study ini.</p>
                    )}
                </div>
            </div>


            {/* Buttons */}
            <div className="d-flex justify-content-between mt-4">
                <div>
                    <button type="button" className="btn btn-primary mb-3" onClick={() => setShowSuccessDraftModal(true)}>Simpan ke Draft</button>
                </div>
                <div>
                    <Link to='/admin/tracerskala'>
                        <button type="button" className="btn btn-danger mb-3 me-3">Sebelumnya</button>
                    </Link>
                    <Link to='/admin/traceratensi'>
                        <button type="submit" className="btn btn-success mb-3">Selanjutnya</button>
                    </Link>
                </div>
            </div>
            {/* Modal Success */}
            <ModalSuccess
                show={showSuccessModal}
                message="Action Success !"
                onClose={() => setShowSuccessModal(false)}
            />

            {/* Modal Success Soal */}
            <ModalSuccessSoal
                show={showSuccessSoal}
                message="Success Add Questions !"
                onClose={() => setShowSuccessSoal(false)}
            />

            {/* Modal Draft */}
            <ModalSuccessDraft
                show={showSuccessDraftModal}
                message="Tracer to Draft Is Success !"
                onClose={() => setShowSuccessDraftModal(false)}
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
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function () {

    const [ dataTracerId, setDataTracerId ] = useState(null);
    const [bankSoalList, setBankSoalList] = useState([]);
    const [error, setError] = useState(null);
    const [newSoal, setNewSoal] = useState({
        soal: '',
        jawaban: [
            {
                jawaban: '',
                bobot_jawaban: ""
            }
        ]
    });

    // memanggil dulu data tracernya
    const fetchTracer = async () => {
        try {
            const response = await axios.get('https://9l47d23v-5000.asse.devtunnels.ms/tracerstudy/all');
            if (response.data.data && response.data.data.length > 0) {
                setDataTracerId(response.data.data[0]._id);
                console.log("ID tracer yang diambil:", response.data.data[0]._id);

            } else {
                console.error("data tracer kosong atau tidak ditemukan");

            }
        } catch (error) {
            console.error("error feching data:", error.message);

        }
    };


    useEffect(() => {
        fetchTracer();
    }, []);


    // fungsi mengirim soal ke API
    const addSoal = async () => {
        try {
            const response = await axios.post(`https://9l47d23v-5000.asse.devtunnels.ms/tracerstudy/banksoal/add/${dataTracerId}`, newSoal);
            console.log("data soal yang berhasil ditambahkan:", response.data);


        } catch (error) {
            console.error("error adding soal:", error.message);
            setError("failed to add soal. try again.");

        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewSoal((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("ID yang akan ditambahkan soal:", dataTracerId);
        console.log("Data soal yang akan dikirim:", newSoal);   

        addSoal();
    };

    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState(['', '', '', '']); // Inisialisasi 4 opsi kosong
    const [weights, setWeights] = useState(['1', '1', '1', '1']); // Inisialisasi bobot dengan 4 nilai 1

    const incrementOptions = () => {
        if (options.length < 5) { // Maksimal 5 opsi
            setOptions([...options, `Jawaban ${options.length + 1}`]); // Tambah opsi baru
            setWeights([...weights, '1']); // Tambah bobot baru dengan nilai default 1
        }
    };

    const decrementOptions = () => {
        if (options.length > 2) { // Pastikan minimal ada satu opsi
            setOptions(options.slice(0, -1)); // Hapus opsi terakhir
            setWeights(weights.slice(0, -1)); // Hapus bobot terakhir
        }
    };

    const handleOptionChange = (index, value) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    const handleWeightChange = (index, value) => {
        const newWeights = [...weights];
        const numericValue = Number(value); // Konversi nilai ke angka

        // Validasi bobot
        if (numericValue >= 1 && numericValue <= 5) {
            newWeights[index] = numericValue; // Update bobot jika valid
        } else if (value === '') {
            newWeights[index] = ''; // Biarkan kosong jika input dihapus
        } else {
            newWeights[index] = 1; // Set ke 1 jika nilai di luar rentang
        }

        setWeights(newWeights);
    };



    const dummyData = [
        {
            question: "Seberapa relevan pendidikan Anda dengan kegiatan sehari-hari saat ini?",
            options: ["Sangat relevan", "Relevan", "Cukup relevan", "Tidak relevan"]
        },
        {
            question: "Apakah keterampilan yang Anda pelajari di pendidikan membantu dalam kegiatan sehari-hari?",
            options: ["Sangat membantu", "Membantu", "Cukup membantu", "Tidak membantu"]
        }
    ];

    return (
        <div className="container rounded my-4 bg-white">
            {/* Progress Steps */}
            <div className="row mb-4">
                <div className="col">
                    <ul className="mt-3 gap-3 text-white nav nav-pills justify-content-center">
                        <li className="nav-item">
                            <span className="active border rounded bg-secondary bg-opacity-50 p-2">Detail Kegiatan</span>
                        </li>
                        <li className="nav-item">
                            <span className="active border rounded bg-secondary bg-opacity-50 p-2">Golongan Kegiatan</span>
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
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit}>
                {/* heading */}
                <div className="form-group">
                    <label style={{ fontSize: '19px' }}>Bank Soal</label>
                    <p className="text-secondary" style={{ fontSize: '13px' }}>Kumpulkan soal wajib yang ada untuk melakukan kegiatan Tracer Study</p>
                </div>

                {/* Input Pertanyaan */}
                <div className="form-group mb-3">
                    <label className="mb-3">Pertanyaan Pilihan Ganda</label>
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
                {options.map((option, index) => (
                    <div className="row mb-2" key={index}>
                        <div className="col-8">
                            <input
                                type="text"
                                name='jawaban'
                                value={newSoal.jawaban.jawaban}
                                onChange={handleInputChange}
                                className="form-control text-secondary"
                                placeholder={`Jawaban ${index + 1}`}
                            />
                        </div>
                        <div className="col-4">
                            <input
                                type="number"
                                name='bobot_jawaban'
                                value={newSoal.jawaban.bobot_jawaban} // Pastikan ada state untuk bobot
                                onChange={handleInputChange}
                                className="form-control text-secondary"
                                placeholder={`Bobot Nilai Jawaban`}
                            />
                        </div>
                    </div>
                ))}

                {/* Tambah Soal */}
                <div className='d-flex justify-content-end'>
                    <button type='submit' className='btn btn-success'>Tambah</button>
                </div>
            </form>                                         

            {/* Preview Section */}
            {/* <div className="preview mt-5">
                <label style={{ fontSize: '19px' }}>Preview</label>
                <p className="text-secondary" style={{ fontSize: '13px' }}>
                    Tampilan pertanyaan dan opsi jawaban:
                </p>
                <div className="d-flex flex-wrap">
                    {dummyData.map((item, index) => (
                        <div key={index} className="mb-4" style={{ width: '300px', marginRight: '20px' }}>
                            <p style={{ fontSize: '13px' }}>{index + 1}. {item.question}</p>
                            <ul style={{ fontSize: '13px' }} className="list-unstyled">
                                {item.options.map((option, optIndex) => (
                                    <li key={optIndex} className="d-flex align-items-center mb-2">
                                        <input type="radio" disabled className="me-2" />
                                        <label>{option}</label>
                                    </li>
                                ))}
                                <div className='d-flex justify-content-end'>
                                    <button className='border-0 bg-transparent'><i className='bi bi-pencil-fill'></i></button>
                                    <button className='border-0 bg-transparent'><i className='bi bi-trash-fill'></i></button>
                                </div>
                            </ul>
                        </div>
                    ))}

                </div>
            </div> */}

            {/* Buttons */}
            <div className="d-flex justify-content-between mt-4">
                <div>
                    <button type="button" className="btn btn-primary mb-3">Simpan ke Draft</button>
                </div>
                <div>
                    <Link to='/super_admin/tracerstudy-golongan-kegiatan'>
                        <button type="button" className="btn btn-danger mb-3 me-3">Sebelumnnya</button>
                    </Link>
                    <Link to='/super_admin/tracerstudy-verifikasi-akhir'>
                        <button type="submit" className="btn btn-success mb-3">Selanjutnya</button>
                    </Link>
                </div>
            </div>

        </div>
    )
}
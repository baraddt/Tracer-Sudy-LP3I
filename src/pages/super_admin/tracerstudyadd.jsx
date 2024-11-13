import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import axios from 'axios';

export default function () {
    const [error, setError] = useState(null);
    const [dataTracerId, setDataTracerId] = useState(null); // Menyimpan ID data_tracer
    const [newKegiatan, setNewKegiatan] = useState({
        banner: '',
        nama_kegiatan: '',
        tanggal_mulai: '',
        tanggal_berakhir: '',
        latar_belakang: '',
        tujuan_kegiatan: '',
        manfaat_kegiatan: '',
    });

    const navigate = useNavigate();

    // Fungsi menambah detail kegiatan ke API
    const addKegiatan = async () => {
        try {
            // Hanya mengirimkan data tanpa mengambil data tambahan
            const response = await axios.post('https://9l47d23v-5000.asse.devtunnels.ms/tracerstudy/detailkegiatan/add', newKegiatan);

            // Setelah data berhasil ditambahkan, simpan ID (jika ada) dalam state
            if (response.data && response.data._id) {
                setDataTracerId(response.data._id);
            }

            // Reset form setelah pengiriman data
            setNewKegiatan({
                banner: '',
                nama_kegiatan: '',
                tanggal_mulai: '',
                tanggal_berakhir: '',
                latar_belakang: '',
                tujuan_kegiatan: '',
                manfaat_kegiatan: '',
            });

            console.log("Data kegiatan yang berhasil ditambahkan:", response.data);

            // Navigasi ke halaman step 2 (Skala Kegiatan)
            navigate('/super_admin/tracerstudy-golongan-kegiatan');

        } catch (error) {
            console.error("Error adding Kegiatan:", error.message);
            setError("Failed to add Kegiatan. Please try again.");
        }
    };

    // Fungsi untuk menangani perubahan input
    const handleInputChange = (name, value) => {
        setNewKegiatan((prevKegiatan) => ({
            ...prevKegiatan,
            [name]: value,
        }));
    };

    // Fungsi untuk menangani pengiriman form
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Data yang akan dikirim:", newKegiatan);
        addKegiatan();  // Kirimkan data tanpa memuat data lainnya
    }






    return (
        <div className="container rounded my-4 bg-white">
            {/* Progress Steps */}
            <div className="row mb-4">
                <div className="col">
                    <ul className="mt-3 gap-3 text-white nav nav-pills justify-content-center">
                        <li className="nav-item">
                            <span className="active border rounded bg-primary bg-opacity-50 p-2">Detail Kegiatan</span>
                        </li>
                        <li className="nav-item">
                            <span className="active border rounded bg-secondary bg-opacity-50 p-2">Skala Kegiatan</span>
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
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit}>
                {/* Banner/Flyer */}
                <div className="form-group">
                    <label style={{ fontSize: '19px' }}>Banner/Flyer</label>
                    <p className="text-secondary" style={{ fontSize: '13px' }}>Ukuran banner maximal 396x202</p>
                    <input
                        type="file"
                        name='banner'
                        value={newKegiatan.banner}
                        onChange={(e) => handleInputChange('banner', e.target.value)}
                        className="form-control mb-3 d-flex align-items-center justify-content-center border p-4"
                        style={{ height: "150px" }}
                    />
                </div>

                {/* Nama Kegiatan */}
                <div className="form-group mb-3">
                    <label className="mb-3">Nama Kegiatan</label>
                    <input type="text"
                        className="form-control"
                        placeholder="Masukkan nama kegiatan yang akan dilaksanakan"
                        name='nama_kegiatan'
                        value={newKegiatan.nama_kegiatan}
                        onChange={(e) => handleInputChange('nama_kegiatan', e.target.value)}
                    />
                </div>

                {/* Tanggal Mulai & Tanggal Berakhir */}
                <div className="form-row d-flex">
                    <div className="form-group col-md-6 me-5">
                        <label className="mb-3">Tanggal Mulai :</label>
                        <input
                            type="date"
                            className="form-control"
                            name='tanggal_mulai'
                            value={newKegiatan.tanggal_mulai}
                            onChange={(e) => handleInputChange('tanggal_mulai', e.target.value)}
                        />
                    </div>
                    <div className="form-group col-md-5">
                        <label className="mb-3">Tanggal Berakhir :</label>
                        <input
                            type="date"
                            className="form-control"
                            name='tanggal_berakhir'
                            value={newKegiatan.tanggal_berakhir}
                            onChange={(e) => handleInputChange('tanggal_berakhir', e.target.value)}
                        />
                    </div>
                </div>

                {/* Latar Belakang Kegiatan */}
                <div className="form-group mt-3">
                    <label className="mb-3">Latar Belakang Kegiatan</label>
                    <ReactQuill
                        value={newKegiatan.latar_belakang}
                        onChange={(value) => handleInputChange('latar_belakang', value)}
                        placeholder="Lengkapi deskripsi yang menjelaskan mengapa tracer study ini diadakan."
                    />
                </div>


                {/* Tujuan Kegiatan */}
                <div className="form-group mt-3">
                    <label className="mb-3">Tujuan Kegiatan</label>
                    <ReactQuill
                        value={newKegiatan.tujuan_kegiatan}
                        onChange={(value) => handleInputChange('tujuan_kegiatan', value)}
                        placeholder="Lengkapi deskripsi yang menjelaskan mengapa tracer study ini diadakan."
                    />
                </div>

                {/* Manfaat Kegiatan */}
                <div className="form-group mt-3">
                    <label className="mb-3">Manfaat Kegiatan</label>
                    <ReactQuill
                        value={newKegiatan.manfaat_kegiatan}
                        onChange={(value) => handleInputChange('manfaat_kegiatan', value)}
                        placeholder="Lengkapi deskripsi yang menjelaskan mengapa tracer study ini diadakan."
                    />
                </div>

                {/* Buttons */}
                <div className="d-flex justify-content-between mt-4">
                    <div>
                        <button type="button" className="btn btn-primary mb-3">Simpan ke Draft</button>
                    </div>
                    <div>
                        <Link to='/super_admin/tracerstudy'>
                            <button type="button" className="btn btn-danger mb-3 me-3">Batalkan</button>
                        </Link>
                        {/* <Link to='/super_admin/tracerstudy-golongan-kegiatan'> */}
                        <button type="submit" className="btn btn-success mb-3">Selanjutnya</button>
                        {/* </Link> */}
                    </div>
                </div>
            </form>
        </div>
    );
}

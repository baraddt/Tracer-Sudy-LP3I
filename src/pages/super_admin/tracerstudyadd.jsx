import { useState } from 'react';
import { Link } from 'react-router-dom';
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";

export default function () {
    const [formData, setFormData] = useState({
        namaKegiatan: '',
        tanggalMulai: '',
        tanggalBerakhir: '',
        latarBelakang: '',
        tujuanKegiatan: '',
        manfaatKegiatan: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        const newData = { ...formData, [name]: value };
        setFormData(newData);
        localStorage.setItem('formData', JSON.stringify(newData));
    };

    const handleQuillChange = (field, value) => {
        const newData = { ...formData, [field]: value };  // Perbaiki referensi formData
        setFormData(newData);
        localStorage.setItem('formData', JSON.stringify(newData));
    };

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
            <form>
                {/* Banner/Flyer */}
                <div className="form-group">
                    <label style={{ fontSize: '19px' }}>Banner/Flyer</label>
                    <p className="text-secondary" style={{ fontSize: '13px' }}>Ukuran banner maximal 396x202</p>
                    <input
                        type="file"
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
                        name='namaKegiatan'
                        value={formData.namaKegiatan}
                        onChange={handleChange}
                    />
                </div>

                {/* Tanggal Mulai & Tanggal Berakhir */}
                <div className="form-row d-flex">
                    <div className="form-group col-md-6 me-5">
                        <label className="mb-3">Tanggal Mulai :</label>
                        <input
                            type="date"
                            className="form-control"
                            name='tanggalMulai'
                            value={formData.tanggalMulai}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group col-md-5">
                        <label className="mb-3">Tanggal Berakhir :</label>
                        <input
                            type="date"
                            className="form-control"
                            name='tanggalBerakhir'
                            value={formData.tanggalBerakhir}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                {/* Latar Belakang Kegiatan */}
                <div className="form-group mt-3">
                    <label className="mb-3">Latar Belakang Kegiatan</label>
                    <ReactQuill
                        value={formData.latarBelakang}
                        onChange={(value) => handleQuillChange('latarBelakang', value)}
                        placeholder="Lengkapi deskripsi yang menjelaskan mengapa tracer study ini diadakan."
                    />
                </div>

                {/* Tujuan Kegiatan */}
                <div className="form-group mt-3">
                    <label className="mb-3">Tujuan Kegiatan</label>
                    <ReactQuill
                        value={formData.tujuanKegiatan}
                        onChange={(value) => handleQuillChange('tujuanKegiatan', value)}
                        placeholder="Lengkapi deskripsi yang menjelaskan mengapa tracer study ini diadakan."
                    />
                </div>

                {/* Manfaat Kegiatan */}
                <div className="form-group mt-3">
                    <label className="mb-3">Manfaat Kegiatan</label>
                    <ReactQuill
                        value={formData.manfaatKegiatan}
                        onChange={(value) => handleQuillChange('manfaatKegiatan', value)}
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
                        <Link to='/super_admin/tracerstudy-golongan-kegiatan'>
                            <button type="submit" className="btn btn-success mb-3">Selanjutnya</button>
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    );
}

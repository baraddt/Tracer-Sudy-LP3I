import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import axiosClient from '../../services/axiosClient';
import ModalSuccess from '../../components/compModals/modalsuccess';
import ModalSuccessDraft from '../../components/compModals/draftModals';
import ModalFailed from '../../components/compModals/modalFailed';

export default function () {
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showSuccessDraftModal, setShowSuccessDraftModal] = useState(false);
    const [showFailedModal, setShowFailedModal] = useState(false);
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
            // Kirim data kegiatan ke server, termasuk path gambar
            const response = await axiosClient.post(
                '/tracerstudy/detailkegiatan/add',
                newKegiatan);

            console.log("Response dari API:", response.data);

            // Pastikan ID tracer ditemukan di response
            if (response.data && response.data.data && response.data.data.id_tracer) {
                const tracerId = response.data.data.id_tracer; // Ambil ID tracer
                setDataTracerId(tracerId); // Simpan di state
                localStorage.setItem('tracerId', tracerId); // Simpan ke localStorage
                console.log("Tracer ID berhasil disimpan:", tracerId);
            } else {
                console.error("ID tracer tidak ditemukan di response.");
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

            setShowSuccessModal(true);
            // Navigasi ke step 2
            navigate('/admin/tracerskala');
        } catch (error) {
            setShowFailedModal(true);
            console.error("Error saat menambahkan kegiatan:", error.message);
            setError("Gagal menambahkan kegiatan. Silakan coba lagi.");
        }
    };


    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Simpan file di folder public/media
            const filePath = '/media/' + file.name; // Path relatif untuk file di public folder

            // Simulasi proses penyimpanan file di frontend
            const reader = new FileReader();
            reader.onloadend = () => {
                // Misalnya, menyimpan data file ke state
                setNewKegiatan({
                    ...newKegiatan,
                    banner: filePath // Mengirim path file ke server
                });
            };
            reader.readAsDataURL(file); // Membaca file sebagai URL data
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
    };






    return (
        <div className="container rounded my-4 bg-white">
            {/* Progress Steps */}
            <div className="row mb-4">
                <div className="col">
                    <ul className="nav mt-3 mb-4 justify-content-center gap-2">
                        <li className="nav-item">
                            <span className="badge btn-primary px-4 py-2 rounded-pill">
                                Detail Kegiatan
                            </span>
                        </li>
                        <li className="nav-item mx-2">
                            <span className="badge btn-secondary bg-opacity-50 px-4 py-2 rounded-pill">
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

            {/* Progress Steps
            <div className="row mb-4">
                <div className="col">
                    <ul className="mt-3 gap-3 text-white nav nav-pills justify-content-center">
                        <li className="nav-item">
                            <span class="badge badge-label bg-primary"><i class="mdi mdi-circle-medium"></i> Detail Kegiatan</span>
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
            </div> */}

            {/* Form */}
            <form onSubmit={handleSubmit}>

                {/* Banner/Flyer */}
                <div className="form-group">
                    <label style={{ fontSize: '19px' }}>Banner/Flyer</label>
                    <p className="text-secondary" style={{ fontSize: '13px' }}>Ukuran banner maksimal 396x202</p>
                    <input
                        type="file"
                        name="banner"
                        onChange={handleFileChange} // Menangani perubahan file
                        className="form-control mb-3 d-flex align-items-center justify-content-center border p-4"
                        style={{ height: "150px" }}
                    />
                </div>


                {/* Nama Kegiatan */}
                <div className="form-group mb-3">
                    <label className="mb-3">Nama Kegiatan</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Masukkan nama kegiatan yang akan dilaksanakan"
                        name="nama_kegiatan"
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
                            name="tanggal_mulai"
                            value={newKegiatan.tanggal_mulai}
                            onChange={(e) => handleInputChange('tanggal_mulai', e.target.value)}
                        />
                    </div>
                    <div className="form-group col-md-5">
                        <label className="mb-3">Tanggal Berakhir :</label>
                        <input
                            type="date"
                            className="form-control"
                            name="tanggal_berakhir"
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
                        value={
                            newKegiatan.manfaat_kegiatan ||
                            `
                              <Strong>Manfaat Untuk Kampus:</Strong>
                              <ol>
                                <li></li>
                                <li></li>
                                <li>...</li>
                              </ol>
                              <Strong>Manfaat Untuk Mahasiswa:</Strong>
                              <ol>
                                <li></li>
                                <li></li>
                                <li>...</li>
                              </ol>
                              <Strong>Manfaat Untuk Industri:</Strong>
                              <ol>
                                <li></li>
                                <li></li>
                                <li>...</li>
                              </ol>
                            `
                        }
                        onChange={(value) => handleInputChange('manfaat_kegiatan', value)}
                        placeholder="Manfaat Untuk Kampus"
                    />
                </div>

                {/* Buttons */}
                <div className="d-flex justify-content-between mt-4">
                    {/* <Link to='/super_admin/tracerstudy'> */}
                        <div>
                            <button type="button" className="btn btn-primary mb-3" onClick={() => setShowSuccessDraftModal(true)}>Simpan ke Draft</button>
                        </div>
                    {/* </Link> */}
                    <div>
                        <Link to='/admin/tracerstudy'>
                            <button type="button" className="btn btn-danger mb-3 me-3">Batalkan</button>
                        </Link>
                        {/* <Link to='/super_admin/tracerstudy-golongan-kegiatan'> */}
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
                onClose={() => setShowSuccessDraftModal(false)}
            />

            {/* Modal Failed */}
            <ModalFailed
                show={showFailedModal}
                message="Action Failed ! Try Again."
                onClose={() => setShowFailedModal(false)}
            />
        </div>
    );
}

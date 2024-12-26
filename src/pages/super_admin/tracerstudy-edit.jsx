import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axiosClient from '../../services/axiosClient';
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import ModalSuccess from '../../components/compModals/modalsuccess';
import ModalSuccessDraft from '../../components/compModals/draftModals';
import ModalFailed from '../../components/compModals/modalFailed';

export default function TracerStudyDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [tracerDetail, setTracerDetail] = useState(null);
    const [error, setError] = useState(null);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showSuccessDraftModal, setShowSuccessDraftModal] = useState(false);
    const [showFailedModal, setShowFailedModal] = useState(false);

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


    useEffect(() => {
        const fetchDetail = async () => {
            try {
                const response = await axiosClient.get(`/tracerstudy/${id}`);
                setTracerDetail(response.data.data);
            } catch (error) {
                setError('Error fetching tracer study data'); // Menangani error jika ada masalah saat fetch
                console.error("Error fetching tracer detail:", error.message);
            }
        };

        if (id) {
            fetchDetail(); // Panggil API jika ID tersedia
        }
    }, [id]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!tracerDetail) {
        return <div>Loading...</div>; // Tampilkan loading jika data belum tersedia
    };

    const handleEditDetail = async (event) => {
        event.preventDefault();

        try {
            // Data detail yang akan di-update
            const updatedDetail = tracerDetail.id_detail;

            // Kirim data ke API untuk update detail
            const response = await axiosClient.put(
                `/tracerstudy/edit/${tracerDetail.id_detail._id}`,
                updatedDetail
            );

            console.log("Response dari API:", response.data);
            setShowSuccessModal(true);

            // Redirect ke halaman edit skala kegiatan dengan membawa tracerId
            navigate(`/super_admin/tracerstudy-editskala/${id}`);
        } catch (error) {
            setShowFailedModal(true);
            console.error("Error saat mengedit detail kegiatan:", error.message);
            setError("Gagal memperbarui detail kegiatan.");
        }
    };




    return (
        <div className="container rounded my-4 bg-white p-4">
            <div className="row mb-4">
                <div className="col">
                    <ul className="nav mt-3 mb-4 justify-content-center gap-2">
                        <li className="nav-item">
                            <span className="badge btn-primary px-4 py-2 rounded-pill">
                                Detail Kegiatan
                            </span>
                        </li>
                        <Link to={`/super_admin/tracerstudy-editskala/${id}`}>
                            <li className="nav-item mx-2">
                                <span className="badge btn-secondary bg-opacity-50 px-4 py-2 rounded-pill">
                                    Skala Kegiatan
                                </span>
                            </li>
                        </Link>
                        <Link to={`/super_admin/tracerstudy-editbank/${id}`}>
                            <li className="nav-item">
                                <span className="badge btn-secondary px-4 py-2 rounded-pill">
                                    Bank soal
                                </span>
                            </li>
                        </Link>
                        <Link to={`/super_admin/tracerstudy-editatensi/${id}`}>
                            <li className="nav-item">
                                <span className="badge btn-secondary px-4 py-2 rounded-pill">
                                    Kriteria Atensi
                                </span>
                            </li>
                        </Link>
                        <li className="nav-item">
                            <span className="badge btn-secondary px-4 py-2 rounded-pill">
                                Preview
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
            <h2 className='mb-5'>Edit Tracer Study</h2>

            <form onSubmit={handleEditDetail}>
                <div className="form-group">
                    {tracerDetail.id_detail.banner && (
                        <div className="preview-container mb-2" style={{ marginTop: "10px" }}>
                            <img
                                src={tracerDetail.id_detail.banner}
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
                <div className="form-group">
                    <label style={{ fontSize: '19px' }}>Masukan Banner/Flyer Yang Baru</label>
                    <p className="text-secondary" style={{ fontSize: '13px' }}>Ukuran banner maksimal 396x202</p>
                    <input
                        type="file"
                        name="banner"
                        // onChange={handleFileChange} // Menangani perubahan file
                        className="form-control mb-3 d-flex align-items-center justify-content-center border p-4"
                        style={{ height: "150px" }}
                    />
                </div>

                <div className="form-group">
                    {/* Nama Kegiatan */}
                    <div className="form-group mb-3">
                        <label className="mb-3">Nama Kegiatan</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Masukkan nama kegiatan yang akan dilaksanakan"
                            name="nama_kegiatan"
                            value={tracerDetail.id_detail.nama_kegiatan}
                            onChange={(e) =>
                                setTracerDetail({
                                    ...tracerDetail,
                                    id_detail: { ...tracerDetail.id_detail, nama_kegiatan: e.target.value },
                                })
                            }
                        />
                    </div>
                    {/* Tanggal Mulai & Tanggal Berakhir */}
                    <div className="form-row d-flex">
                        <div className="form-group col-md-6 me-5">
                            <label className="mb-3">Tanggal Mulai Baru :</label>
                            <input
                                type="date"
                                className="form-control"
                                name="tanggal_mulai"
                                onChange={(e) =>
                                    setTracerDetail({
                                        ...tracerDetail,
                                        id_detail: { ...tracerDetail.id_detail, tanggal_mulai: e.target.value },
                                    })
                                }
                            />
                        </div>
                        <div className="form-group col-md-5">
                            <label className="mb-3">Tanggal Berakhir Baru :</label>
                            <input
                                type="date"
                                className="form-control"
                                name="tanggal_berakhir"
                                onChange={(e) =>
                                    setTracerDetail({
                                        ...tracerDetail,
                                        id_detail: { ...tracerDetail.id_detail, tanggal_berakhir: e.target.value },
                                    })
                                }
                            />
                        </div>
                    </div>
                </div>

                {/* Latar Belakang Kegiatan */}
                <div className="form-group mt-3">
                    <label className="mb-3">Latar Belakang Kegiatan</label>
                    <ReactQuill
                        value={tracerDetail.id_detail.latar_belakang}
                        onChange={(value) =>
                            setTracerDetail({
                                ...tracerDetail,
                                id_detail: { ...tracerDetail.id_detail, latar_belakang: value },
                            })
                        }
                        placeholder="Lengkapi deskripsi yang menjelaskan mengapa tracer study ini diadakan."
                    />
                </div>

                {/* Tujuan Kegiatan */}
                <div className="form-group mt-3">
                    <label className="mb-3">Tujuan Kegiatan</label>
                    <ReactQuill
                        value={tracerDetail.id_detail.tujuan_kegiatan}
                        onChange={(value) =>
                            setTracerDetail({
                                ...tracerDetail,
                                id_detail: { ...tracerDetail.id_detail, tujuan_kegiatan: value },
                            })
                        }
                        placeholder="Lengkapi deskripsi yang menjelaskan mengapa tracer study ini diadakan."
                    />
                </div>

                {/* Manfaat Kegiatan */}
                <div className="form-group mt-3">
                    <label className="mb-3">Manfaat Kegiatan</label>
                    <ReactQuill
                        value={tracerDetail.id_detail.manfaat_kegiatan}
                        onChange={(value) =>
                            setTracerDetail({
                                ...tracerDetail,
                                id_detail: { ...tracerDetail.id_detail, manfaat_kegiatan: value },
                            })
                        }
                        placeholder="Lengkapi deskripsi yang menjelaskan mengapa tracer study ini diadakan."
                    />
                </div>
                {/* Buttons untuk aksi */}
                <div className="d-flex justify-content-between mt-4">
                    <div>
                        <button type="button" className="btn btn-primary mb-3" onClick={() => setShowSuccessDraftModal(true)}>Simpan ke Draft</button>
                    </div>
                    <div>
                        <Link to='/super_admin/tracerstudy'>
                            <button type="button" className="btn btn-danger mb-3 me-3">Kembali</button>
                        </Link>
                        <button type="submit" className="btn btn-success mb-3">Selanjutnya</button>
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
    );
}

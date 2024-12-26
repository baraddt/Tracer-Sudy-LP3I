import React, { useEffect, useState } from "react";
import axiosClient from "../../services/axiosClient";
import { Link, useNavigate } from 'react-router-dom';
import ModalSuccess from "../../components/compModals/modalsuccess";
import ModalFailed from "../../components/compModals/modalFailed";
import ModalSuccessDraft from "../../components/compModals/draftModals";
import { useParams } from "react-router-dom";

export default function () {
    const { id } = useParams();
    const navigate = useNavigate();
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showSuccessDraftModal, setShowSuccessDraftModal] = useState(false);
    const [showFailedModal, setShowFailedModal] = useState(false);
    const [dataTracerId, setDataTracerId] = useState(null);
    const [dataAtensi, setDataAtensi] = useState([]);
    const [dataHorizontal, setDataHorizontal] = useState([]);
    const [newAtensi, setNewAtensi] = useState({
        atensi_horizontal: [],
        atensi_vertikal: [],
    });

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

    const fetchVertikal = async () => {
        try {
            const response = await axiosClient.get('/tracerstudy/atensi_vertikal/all');
            setDataAtensi(response.data.data);
            console.log("data atensi vertikal", response.data.data);

        } catch (error) {
            console.error("Error fetching data:", error.message);
        }
    };

    const fetchHorizontal = async () => {
        try {
            const response = await axiosClient.get('/tracerstudy/atensi_horizontal/all');
            setDataHorizontal(response.data.data);
            console.log("atensi horizontal:", response.data.data);


        } catch (error) {
            console.error("Error feching data:", error.message);

        }
    };

    useEffect(() => {
        // fetchTracer();
        fetchVertikal();
        fetchHorizontal();
    }, []);

    // mengirim atensi ke API tracerSTudy
    const AddAtensi = async () => {
        try {
            if (!id) {
                throw new Error("ID tracer tidak ditemukan.");
            }

            console.log("Data yang akan dikirim ke API:", newAtensi);

            const response = await axiosClient.post(
                `/tracerstudy/atensi/apply/${id}`,
                newAtensi
            );

            setShowSuccessModal(true);
            console.log("Atensi yang berhasil diedit:", response.data);
        } catch (error) {
            setShowFailedModal(true);
            console.error("Error edit atensi:", error.message);
        }
    };



    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewSkala((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Masukkan semua ID atensi_horizontal dan atensi_vertikal ke state newAtensi
        setNewAtensi({
            atensi_horizontal: dataHorizontal.map((item) => item._id), // Mengambil ID dari data horizontal
            atensi_vertikal: dataAtensi.map((item) => item._id), // Mengambil ID dari data vertikal
        });

        // Debugging log untuk memastikan data sudah terisi
        console.log("Data yang akan dikirim:", {
            atensi_horizontal: dataHorizontal.map((item) => item._id),
            atensi_vertikal: dataAtensi.map((item) => item._id),
        });
    };

    useEffect(() => {
        if (newAtensi.atensi_horizontal.length > 0 || newAtensi.atensi_vertikal.length > 0) {
            AddAtensi();  
        }
    }, [newAtensi]); 




    return (
        <div className="container rounded my-4 bg-white">
            {/* Progress Steps */}
            <div className="row mb-4">
                <div className="col">
                    <ul className="nav mt-3 mb-4 justify-content-center gap-2">
                        <Link to={`/super_admin/tracerstudy-edit/${id}`}>
                            <li className="nav-item">
                                <span className="badge btn-secondary px-4 py-2 rounded-pill">
                                    Detail Kegiatan
                                </span>
                            </li>
                        </Link>
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
                        <li className="nav-item">
                            <span className="badge btn-primary px-4 py-2 rounded-pill">
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


            {/* heading */}
            <div className="form-group">
                <label style={{ fontSize: '19px', color: '#00426D' }}>Kriteria Ketentuan Hasil Evaluasi Tracer Study</label>
                <p className="text-secondary" style={{ fontSize: '13px' }}>Standar yang digunakan menilai keberhasilan lulusan suatu Institusi pendidikan
                    dalam memasuki dunia kerja, melanjutkan pendidikan,
                    atau mengembangkan karir mereka setelah lulus</p>
            </div>

            <form onSubmit={handleSubmit}>
                {/* Table Atensi Horizontal */}
                <div className="mt-4">
                    <h4 className='text-center mb-4'>Atensi Horizontal</h4>
                    <table className="table">
                        <thead>
                            <tr>
                                <th className='fw-semibold'>Kriteria</th>
                                <th className='fw-semibold'>Deksripsi</th>
                                <th className='fw-semibold'>Min</th>
                                <th className='fw-semibold'>Max</th>
                                <th className='fw-semibold'>Atensi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataHorizontal.length > 0 ? (
                                dataHorizontal.map((item, index) => (
                                    <tr key={index}>
                                        <td
                                            className={`text-white text-center d-inline-block p-5 ${item.kriteria === "Sangat Tidak Selaras"
                                                ? "bg-danger"
                                                : item.kriteria === "Tidak Selaras"
                                                    ? "bg-warning"
                                                    : item.kriteria === "Cukup Selaras"
                                                        ? "bg-success"
                                                        : item.kriteria === "Selaras"
                                                            ? "bg-info"
                                                            : item.kriteria === "Sangat Selaras"
                                                                ? "bg-primary"
                                                                : "bg-black"
                                                }`}
                                            style={{ width: "150px", height: "150px" }}
                                        >
                                            {item.kriteria}
                                        </td>

                                        <td
                                            className="text-dark pb-5"
                                            style={{
                                                wordWrap: "break-word",
                                                whiteSpace: "normal",
                                                overflow: "hidden",
                                                height: "auto",
                                                maxWidth: "200px",
                                            }}
                                        >
                                            {item.deskripsi || "Tidak ada deskripsi"}
                                        </td>
                                        <td
                                            className="text-dark pb-5"
                                            style={{
                                                wordWrap: "break-word",
                                                whiteSpace: "normal",
                                                overflow: "hidden",
                                                height: "auto",
                                                maxWidth: "200px",
                                            }}
                                        >
                                            {item.min}
                                        </td>
                                        <td
                                            className="text-dark pb-5"
                                            style={{
                                                wordWrap: "break-word",
                                                whiteSpace: "normal",
                                                overflow: "hidden",
                                                height: "auto",
                                                maxWidth: "200px",
                                            }}
                                        >
                                            {item.max}
                                        </td>
                                        <td
                                            className="text-dark pb-5"
                                            style={{
                                                wordWrap: "break-word",
                                                whiteSpace: "normal",
                                                overflow: "hidden",
                                                height: "auto",
                                                maxWidth: "200px",
                                            }}
                                        >
                                            {item.atensi || "Tidak ada evaluasi"}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="text-center">Data tidak ditemukan</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                {/* Table Atensi Horizontal */}
                <div className="mt-5">
                    <h4 className="text-center mb-4">Atensi Vertical</h4>
                    <table className="table">
                        <thead>
                            <tr>
                                <th className='fw-semibold'>Kriteria</th>
                                <th className='fw-semibold'>Deksripsi</th>
                                <th className='fw-semibold'>Min</th>
                                <th className='fw-semibold'>Max</th>
                                {/* <th className='fw-semibold'>Logika</th> */}
                                <th className='fw-semibold'>Atensi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataAtensi.length > 0 ? (
                                dataAtensi.map((item, index) => (
                                    <tr key={index}>
                                        <td
                                            className={`text-white text-center d-inline-block p-5 ${item.kriteria === "Rendah"
                                                ? "bg-danger"
                                                : item.kriteria === "Sama"
                                                    ? "bg-warning"
                                                    : item.kriteria === "Tinggi"
                                                        ? "bg-primary"
                                                        : "bg-black"
                                                }`}
                                            style={{ width: "150px", height: "150px" }}
                                        >
                                            {item.kriteria}
                                        </td>

                                        <td
                                            className="text-dark pb-5"
                                            style={{
                                                wordWrap: "break-word",
                                                whiteSpace: "normal",
                                                overflow: "hidden",
                                                height: "auto",
                                                maxWidth: "200px",
                                            }}
                                        >
                                            {item.deskripsi || "Tidak ada deskripsi"}
                                        </td>
                                        {/* <td
                                            className="text-dark pb-5"
                                            style={{
                                                wordWrap: "break-word",
                                                whiteSpace: "normal",
                                                overflow: "hidden",
                                                height: "auto",
                                                maxWidth: "200px",
                                            }}
                                        >
                                            {item.logika || "Tidak ada evaluasi"}
                                        </td> */}
                                        <td
                                            className="text-dark pb-5"
                                            style={{
                                                wordWrap: "break-word",
                                                whiteSpace: "normal",
                                                overflow: "hidden",
                                                height: "auto",
                                                maxWidth: "200px",
                                            }}
                                        >
                                            {item.atensi || "Tidak ada evaluasi"}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="text-center">Data tidak ditemukan</td>
                                </tr>
                            )}
                        </tbody>

                    </table>
                    <div className="text-end mb-5">
                        <button type="button" className="btn btn-success" onClick={handleSubmit}>
                            Terapkan Atensi
                        </button>
                    </div>

                </div>
            </form>


            {/* Buttons */}
            <div className="d-flex justify-content-between mt-4">
                <div>
                    <button type="button" className="btn btn-primary mb-3" onClick={() => setShowSuccessDraftModal(true)}>Simpan ke Draft</button>
                </div>
                <div>
                    <Link to='/super_admin/tracerstudy-bank-soal'>
                        <button type="button" className="btn btn-danger mb-3 me-3">Sebelumnnya</button>
                    </Link>
                    <Link to={`/super_admin/tracerstudy-getpreview/${id}`}>
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
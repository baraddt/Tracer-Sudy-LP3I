import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosClient from '../../services/axiosClient';


export default function () {
    const [tracerList, setTracerList] = useState(null);
    const [respondenList, setRespondenList] = useState([]);
    const [dataTracerId, setDataTracerId] = useState(null);
    const [error, setError] = useState(null);


    const fetchData = async () => {
        try {
            const tracerIdFromLocalStorage = localStorage.getItem('tracerId');  // Ambil tracerId dari localStorage
            if (tracerIdFromLocalStorage) {
                setDataTracerId(tracerIdFromLocalStorage);  // Set tracerId dari localStorage
                console.log("Tracer ID yang diambil dari localStorage:", tracerIdFromLocalStorage);
                // Panggil fetchDetailData dengan tracerId yang diambil
                await fetchDetailData(tracerIdFromLocalStorage);
            } else {
                console.error("Tracer ID tidak ditemukan di localStorage");
            }
        } catch (error) {
            console.error("Error fetching data:", error.message);
        }
    };

    // Fungsi untuk mengambil detail berdasarkan _id (tracerId)
    const fetchDetailData = async (id) => {
        try {
            // Mengambil data detail berdasarkan tracerId
            const response = await axiosClient.get(`/tracerstudy/${id}`);
            setTracerList(response.data.data);  // Menyimpan data yang diterima ke state
            console.log("Data tracer detail:", response.data.data);  // Untuk debugging
        } catch (error) {
            console.error("Error fetching detail data:", error.message);
            setError(error.message);  // Menyimpan error ke state jika terjadi kesalahan
        }
    };

    useEffect(() => {
        fetchData();  // Panggil fungsi untuk mengambil data utama saat pertama kali render
    }, []);

    const fetchResponden = async () => {
        try {
            const response = await axiosClient.get('');
            setRespondenList(response.data.data);

            console.log(response.data);

        } catch (err) {
            console.error("Error Feching Responden :", err.message);

        }
    };

    useEffect(() => {
        fetchData();
        fetchResponden();
    }, []);

    const handlePublish = async () => {
        try {
            const tracerId = localStorage.getItem("tracerId");
            if (!tracerId) {
                console.error("Tracer ID tidak ditemukan.");
                return;
            }


            const response = await axiosClient.post(
                `/tracerstudy/${tracerId}/publish?status=Berlangsung`
            );

            if (response.status === 200) {
                console.log("Status berhasil diubah menjadi Berlangsung:", response.data);

                // Perbarui data status lokal
                setTracerList((prev) => ({
                    ...prev,
                    status: "Berlangsung",
                }));

                const response = await axiosClient.get('/tracerstudy/all');
                const updatedTracerData = response.data;

                // Update localStorage
                localStorage.setItem("tracersData", JSON.stringify(updatedTracerData));
                console.log("Tracer data updated in localStorage:", updatedTracerData);

                // Navigasi ke halaman Tracer Study
                navigate('/super_admin/tracerstudy');
            } else {
                console.error("Gagal mengubah status. Respons:", response);
            }
        } catch (error) {
            console.error("Terjadi kesalahan saat mengubah status:", error.message);
        }
    };


    const handleCancel = async () => {
        try {
            const tracerId = localStorage.getItem("tracerId");
            if (!tracerId) {
                console.error("Tracer ID tidak ditemukan.");
                return;
            }

            const response = await axiosClient.post(
                `/tracerstudy/${tracerId}/publish?status=Dibatalkan`
            );

            if (response.status === 200) {
                console.log("Status berhasil diubah menjadi Dibatalkan:", response.data);

                // Perbarui data status lokal
                setTracerList((prev) => ({
                    ...prev,
                    status: "Dibatalkan",
                }));

                // Navigasi ke halaman Tracer Study
                navigate('/super_admin/tracerstudy');
            } else {
                console.error("Gagal mengubah status. Respons:", response);
            }
        } catch (error) {
            console.error("Terjadi kesalahan saat mengubah status:", error.message);
        }
    };


    return (
        <div className="container rounded my-4 bg-white">
            {error && <p>{error}</p>}
            {tracerList ? (
                <>
                    {/* Banner/Flyer */}
                    <div className="form-group">
                        <label className='border rounded bg-primary bg-opacity-25 p-1 mt-2' style={{ fontSize: '13px', color: '#00426D' }}>
                            <i className='bi bi-circle-fill me-2'></i>Preview
                        </label>
                        <p className="mt-5" style={{ fontSize: '25px', color: '#00426D' }}>
                            {tracerList.id_detail.nama_kegiatan}
                        </p>
                        <p className="text-secondary" style={{ fontSize: '15px' }}>
                            Dibuat oleh | {tracerList.id_pembuat.nama} | {new Date(tracerList.createdAt).toLocaleString()}
                        </p>
                    </div>

                    {/* Skala Kegiatan */}
                    <div>
                        <label className='border rounded bg-primary bg-opacity-25 p-1 me-2' style={{ color: '#00426D' }}>
                            {tracerList.skala_kegiatan.skala_kegiatan}
                        </label>
                    </div>

                    {/* Button Navigasi*/}
                    <div className='d-flex gap-5 mt-4'>
                        <Link to='/super_admin/tracerstudy-preview'>
                            <button className='border-0 bg-transparent'>Detail Kegiatan</button>
                        </Link>

                        <Link to='/super_admin/tracerstudy-preview-kuesioner'>
                            <button className='border-0 bg-transparent'>Kuesioner</button>
                        </Link>

                        <Link to='/super_admin/tracerstudy-preview-responden'>
                            <button className='border-0 border-bottom bg-transparent'>Responden</button>
                        </Link>
                    </div>

                    {/* table responden */}

                    <div className='mt-4'>
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Responden</th>
                                    <th>Perguruan Tinggi</th>
                                    <th>Program Study</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {respondenList.length > 0 ? (
                                    respondenList.map((responden, index) => (
                                        <tr key={responden._id}>
                                            <td>{`#R${index + 201}`}</td>
                                            {/* <td><img className='rounded-circle' src={responden.avatar} alt="Avatar" width="50" height="50" /></td> */}
                                            <td>{responden.nama}</td>
                                            <td>{responden.psdku || 'N/A'}</td>
                                            <td>{responden.prodi || 'N/A'}</td>
                                            <td className={`text-center ${responden.is_submited ? 'text-success' : 'text-danger'}`}>
                                                {responden.is_submited ? 'Submited' : 'Not Yet'}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="7" className="text-center bg-danger bg-opacity-50">Belum ada data Responden.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    {/* Buttons */}
                    <div className="d-flex justify-content-between mt-4">
                        <div>
                            <button type="button" className="btn btn-primary mb-3">Simpan ke Draft</button>
                        </div>
                        <div>
                            <button
                                type="button"
                                className="btn btn-danger me-3"
                                onClick={handleCancel}
                                disabled={tracerList?.status === "Dibatalkan"}

                            >
                                {tracerList?.status === "Dibatalkan" ? "Sudah Dibatalkan" : "Batalkan"}
                            </button>

                            {/* Tombol Publish */}
                            <button
                                className="btn btn-primary"
                                onClick={handlePublish}
                                disabled={tracerList?.status === "Berlangsung"}
                            >
                                {tracerList?.status === "Berlangsung" ? "Sudah Dipublish" : "Publish"}
                            </button>
                        </div>
                    </div>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    )
}
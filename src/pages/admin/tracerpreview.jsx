import { useEffect, useState } from 'react';
import axiosClient from '../../services/axiosClient';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const TracerStudyDetail = () => {
    const navigate = useNavigate();
    const [tracerList, setTracerList] = useState(null);  // Menyimpan data tracer
    const [dataTracerId, setDataTracerId] = useState(null);  // Menyimpan ID tracer yang diambil dari localStorage
    const [error, setError] = useState(null);  // Menyimpan error jika ada

    // Fungsi untuk mengambil data utama dari API (optional jika ingin mengambil data tracer lain)
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
            const response = await axiosClientClient.get(`/tracerstudy/${id}`);
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


    const handlePublish = async () => {
        try {
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

                // Navigasi ke halaman Tracer Study
                navigate('/admin/tracerstudy');
            } else {
                console.error("Gagal mengubah status. Respons:", response);
            }
        } catch (error) {
            console.error("Terjadi kesalahan saat mengubah status:", error.message);
        }
    };


    const handleCancel = async () => {
        try {
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
                navigate('/admin/tracerstudy');
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
                            Dibuat oleh | Kampus Utama Politeknik LP3I | {new Date(tracerList.createdAt).toLocaleString()}
                        </p>
                    </div>

                    {/* Skala Kegiatan */}
                    <div>
                        <label className='border rounded bg-primary bg-opacity-25 p-1 me-2' style={{ color: '#00426D' }}>
                            {tracerList.skala_kegiatan.skala_kegiatan}
                        </label>
                    </div>

                    {/* Button Navigasi */}
                    <div className='d-flex gap-5 mt-4'>
                        <Link to='/admin/tracer-preview'>
                            <button className='border-0 border-bottom bg-transparent'>Detail Kegiatan</button>
                        </Link>
                        <Link to='/admin/tracer-preview-kuesioner'>
                            <button className='border-0 bg-transparent'>Kuesioner</button>
                        </Link>
                        <Link to='/admin/tracer-preview-responden'>
                            <button className='border-0 bg-transparent'>Responden</button>
                        </Link>
                    </div>

                    {/* Deskripsi */}
                    <div className='ms-2 mt-4'>
                        <h6>Latar Belakang Kegiatan</h6>
                        <div dangerouslySetInnerHTML={{ __html: tracerList.id_detail.latar_belakang }} />
                        <h6 className='mt-4'>Tujuan Kegiatan</h6>
                        <div dangerouslySetInnerHTML={{ __html: tracerList.id_detail.tujuan_kegiatan }} />

                        <h6 className='mb-5'>Manfaat Kegiatan</h6>
                        <div dangerouslySetInnerHTML={{ __html: tracerList.id_detail.manfaat_kegiatan }} />

                    </div>

                    {/* table sasaran responden */}
                    <div className="mt-4">
                        <h5>Sasaran Responden</h5>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Nama Lembaga</th>
                                    <th className="text-center">Jenjang</th>
                                    <th>Program Studi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* Iterasi melalui kampus */}
                                {tracerList.skala_kegiatan.kampus.map((kampus, index) => (
                                    <tr key={index}>
                                        {/* Menampilkan Nama Lembaga (psdku) */}
                                        <td>{kampus.psdku}</td>

                                        {/* Menampilkan Jenjang */}
                                        <td className="text-center">
                                            {kampus.prodi.map((prodiId, prodiIdx) => {
                                                // Mencari jenjang berdasarkan prodiId
                                                const prodi = tracerList.skala_kegiatan.prodi.find(
                                                    (item) => item._id === prodiId
                                                );
                                                return prodi ? (
                                                    <div key={prodiIdx}>
                                                        <label>{prodi.jenjang}</label>
                                                    </div>
                                                ) : null; // Tidak menampilkan apapun jika data jenjang tidak ditemukan
                                            })}
                                        </td>

                                        {/* Menampilkan Program Studi */}
                                        <td>
                                            {kampus.prodi.map((prodiId, prodiIdx) => {
                                                // Mencari prodi berdasarkan prodiId
                                                const prodi = tracerList.skala_kegiatan.prodi.find(
                                                    (item) => item._id === prodiId
                                                );
                                                return prodi ? (
                                                    <div key={prodiIdx}>
                                                        <label>{prodi.nama}</label>
                                                    </div>
                                                ) : null; // Tidak menampilkan apapun jika data prodi tidak ditemukan
                                            })}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Buttons */}
                    <div className="d-flex justify-content-between mt-4">
                        <Link to='/admin/tracerstudy'>
                            <div>
                                <button type="button" className="btn btn-primary mb-3">Simpan ke Draft</button>
                            </div>
                        </Link>
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
    );
};

export default TracerStudyDetail;

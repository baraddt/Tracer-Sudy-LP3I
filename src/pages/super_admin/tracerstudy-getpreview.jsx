import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axiosClient from '../../services/axiosClient';

export default function TracerStudyPreview() {
    const navigate = useNavigate();
    const { id } = useParams(); // Ambil ID dari URL
    const [tracerDetail, setTracerDetail] = useState(null);

    useEffect(() => {
        const fetchDetail = async () => {
            try {
                const response = await axiosClient.get(`/tracerstudy/${id}`);
                setTracerDetail(response.data.data); // Simpan detail ke state
            } catch (error) {
                console.error("Error fetching tracer detail:", error.message);
            }
        };

        if (id) {
            fetchDetail(); // Panggil API jika ID tersedia
        }
    }, [id]);

    return (
        <div className="container rounded my-4 bg-white">
            {tracerDetail ? (
                <div>
                    {/* Banner/Flyer */}
                    <div className="form-group">
                        <label className='border rounded bg-primary bg-opacity-25 p-1 mt-2' style={{ fontSize: '13px', color: '#00426D' }}>
                            <i className='bi bi-circle-fill me-2'></i>Preview
                        </label>
                        <p className="mt-5" style={{ fontSize: '25px', color: '#00426D' }}>
                            {tracerDetail.id_detail.nama_kegiatan}
                        </p>
                        <p className="text-secondary" style={{ fontSize: '15px' }}>
                            Dibuat oleh | Kampus Utama Politeknik LP3I | {new Date(tracerDetail.createdAt).toLocaleString()}
                        </p>
                    </div>

                    {/* Skala Kegiatan */}
                    <div>
                        <label className='border rounded bg-primary bg-opacity-25 p-1 me-2' style={{ color: '#00426D' }}>
                            {tracerDetail.skala_kegiatan.skala_kegiatan}
                        </label>
                    </div>

                    {/* Button Navigasi */}
                    <div className='d-flex gap-5 mt-4'>
                        <button className='border-0 border-bottom bg-transparent'>Detail Kegiatan</button>

                        <button className='border-0 bg-transparent' onClick={() => {
                            navigate(`/super_admin/tracerstudy-getpreview-kuesioner/${id}`)
                        }}>Kuesioner</button>

                        <button className='border-0 bg-transparent' onClick={() => {
                            navigate(`/super_admin/tracerstudy-getpreview-responden/${id}`)
                        }}>Responden</button>

                        <button className='border-0 bg-transparent' onClick={() => {
                            navigate(`/super_admin/tracerstudy-getpreview-kriteria/${id}`)
                        }}>Kriteria Ketuntasasn Hasil</button>
                    </div>

                    {/* Deskripsi */}
                    <div className='ms-2 mt-4'>
                        <h6>Latar Belakang Kegiatan</h6>
                        <div dangerouslySetInnerHTML={{ __html: tracerDetail.id_detail.latar_belakang }} />
                        <h6 className='mt-4'>Tujuan Kegiatan</h6>
                        <div dangerouslySetInnerHTML={{ __html: tracerDetail.id_detail.tujuan_kegiatan }} />

                        <h6 className='mb-2'>Manfaat Kegiatan</h6>
                        <div dangerouslySetInnerHTML={{ __html: tracerDetail.id_detail.manfaat_kegiatan }} />
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
                                {tracerDetail.skala_kegiatan.kampus.map((kampus, index) => (
                                    <tr key={index}>
                                        {/* Menampilkan Nama Lembaga (psdku) */}
                                        <td>{kampus.psdku}</td>

                                        {/* Menampilkan Jenjang */}
                                        <td className="text-center">
                                            {kampus.prodi.map((prodiId, prodiIdx) => {
                                                // Mencari jenjang berdasarkan prodiId
                                                const prodi = tracerDetail.skala_kegiatan.prodi.find(
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
                                                const prodi = tracerDetail.skala_kegiatan.prodi.find(
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
                        <div>
                            <button type="button" className="btn btn-primary mb-3">Simpan ke Draft</button>
                        </div>
                        <div>
                            <Link to='/super_admin/tracerstudy'>
                                <button type="button" className="btn btn-danger mb-3 me-3">Kembali</button>
                            </Link>
                            <Link to='/super_admin/tracerstudy'>
                                <button type="submit" className="btn btn-success mb-3">Publikasi</button>
                            </Link>
                        </div>
                    </div>



                    {/* <p><strong>Nama Kegiatan:</strong> {tracerDetail.id_detail.nama_kegiatan}</p>
                    <p><strong>Nama Kegiatan:</strong> {tracerDetail.id_detail.latar_belakang}</p>
                    <p><strong>Nama Kegiatan:</strong> {tracerDetail.id_detail.tujuan_kegiatan}</p>
                    <p><strong>Nama Kegiatan:</strong> {tracerDetail.id_detail.manfaat_kegiatan}</p>
                    <p><strong>Tanggal Mulai:</strong> {tracerDetail.id_detail.tanggal_mulai || 'N/A'}</p>
                    <p><strong>Tanggal Berakhir:</strong> {tracerDetail.id_detail.tanggal_berakhir || 'N/A'}</p>
                    <p><strong>Status:</strong> {tracerDetail.status}</p> */}
                    {/* Tambahkan detail lain yang dibutuhkan */}
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

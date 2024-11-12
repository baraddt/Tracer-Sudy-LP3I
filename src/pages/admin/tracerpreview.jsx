import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function () {
    // const [formData, setFormData] = useState(null);

    // useEffect(() => {
    //     // ambil data dari localStorage ni
    //     const storedData = localStorage.getItem('formData');

    //     // jika datanya ada maka akan di panggil
    //     if (storedData) {
    //         setFormData(JSON.parse(storedData));
    //     }
    // }, []);

    // if (!formData) {
    //     return <div>Loading data...</div>;
    // }




    return (
        <div className="container rounded my-4 bg-white">


            {/* Banner/Flyer */}
            <div className="form-group">
                <label className='border rounded bg-primary bg-opacity-25 p-1 mt-2' style={{ fontSize: '13px', color: '#00426D' }}><i className='bi bi-circle-fill me-2'></i>Preview</label>
                <p className="mt-5" style={{ fontSize: '25px', color: '#00426D' }}>asdasd</p>
                <p className="text-secondary" style={{ fontSize: '15px' }}>Dibuat oleh | Kampus Utama Politeknik LP3I | 13 Oktober 2024 13:45:53</p>
            </div>

            {/* Skala Kegiatan */}
            <div>
                <label className='border rounded bg-primary bg-opacity-25 p-1 me-2' style={{ color: '#00426D' }}>PSDKU</label>
            </div>

            {/* Button Navigasi*/}
            <div className='d-flex gap-5 mt-4'>

                <Link to='/admin/tracerpreview'>
                    <button className='border-0 border-bottom bg-transparent'>Detail Kegiatan</button>
                </Link>

                <Link to='/admin/previewkuesioner'>
                    <button className='border-0 bg-transparent'>Kuesioner</button>
                </Link>

                <Link to='/admin/previewresponden'>
                    <button className='border-0 bg-transparent'>Responden</button>
                </Link>
            </div>

            {/* Deskripsi */}
            <div className='ms-2 mt-4'>
                <h6>Latar Belakang Kegiatan</h6>
                <p className="text-secondary">WKNEKWNEK</p>
                <h6 className='mt-4'>Tujuan Kegiatan</h6>
                <p className='text-secondary'>asdasda<br />
                </p>

                <h6>Manfaat Kegiatan</h6>
                <p>Bagi Politeknik LP3I :</p>
                <p className='text-secondary'>asdasdasd<br />
                </p>

                <p>Bagi Alumni :</p>
                <p className='text-secondary'>asdasd<br />
                </p>

                <p>Bagi Industri :</p>
                <p className='text-secondary'>asdasd<br />
                </p>
            </div>

            {/* Table Responden */}
            <div className="mt-4">
                <h5>Sasaran Responden</h5>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Nama Lembaga</th>
                            <th className='text-center'>Jenjang</th>
                            <th>Program Studi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Repeat this <tr> for each institution as needed */}
                        <tr>
                            <td>
                                Politeknik LP3I Kampus Bandung
                            </td>
                            <td>
                                <div className="d-flex flex-column text-center">
                                    <label>D2</label>
                                    <label>D3</label>
                                    <label>D4</label>
                                </div>
                            </td>
                            <td>
                                <div className="d-flex flex-column">
                                    <label>Administrasi Bisnis</label>
                                    <label>Manajemen Informatika</label>
                                    <label>Akuntansi</label>
                                    <label>Bisnis Digital</label>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Buttons */}
            <div className="d-flex justify-content-between mt-4">
                <div>
                    <button type="button" className="btn btn-primary mb-3">Simpan ke Draft</button>
                </div>
                <div>
                    <Link to='/admin/traceratensi'>
                        <button type="button" className="btn btn-danger mb-3 me-3">Batalkan</button>
                    </Link>
                    <Link to='/admin/tracerstudy'>
                        <button type="submit" className="btn btn-success mb-3">Publikasi</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
import { Link } from 'react-router-dom';
import "react-quill/dist/quill.snow.css";

export default function () {
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
                            <span className="active border rounded bg-secondary bg-opacity-50 p-2">Bank soal</span>
                        </li>
                        <li className="nav-item">
                            <span className="active border rounded bg-primary bg-opacity-50 p-2">Kriteria Atensi</span>
                        </li>
                        <li className="nav-item">
                            <span className="active border rounded bg-secondary bg-opacity-50 p-2">Preview</span>
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

            {/* Table */}
            <div className="mt-4">
                <h5>Sasaran Responden</h5>
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
                        <tr>
                            <th className="bg-danger text-white fw-normal text-center d-inline-block p-5" style={{ width: '150px', height: '150px' }}>Sangat Tidak Selaras</th>
                            <th className='fw-normal pb-5' style={{
                                wordWrap: 'break-word',
                                whiteSpace: 'normal',
                                overflow: 'hidden',
                                height: 'auto',
                                maxWidth: '200px'
                            }}>
                                Menunjukan bahwa mayoritas lulusan bekerja  dibidang
                                yang sangat tidak relevan dengan program studi
                                yang mereka ambil.
                            </th>
                            <th className='fw-normal'>0</th>
                            <th className='fw-normal'>20</th>
                            <th className='fw-normal pb-5' style={{
                                wordWrap: 'break-word',
                                whiteSpace: 'normal',
                                overflow: 'hidden',
                                height: 'auto',
                                maxWidth: '200px'
                            }}>
                                Evaluasi mendalam terhadap kurikulum dan metode pengajaran.
                                Identifikasi faktor-faktor penyebab lulusan kesulitan dalam mendapatkan pekerjaan yang relevan.
                            </th>
                        </tr>
                        <tr>
                            <th className="text-white fw-normal text-center d-inline-block p-5" style={{ backgroundColor: '#F06548', width: '150px', height: '150px' }}>Tidak Selaras</th>
                            <th className='fw-normal pb-5' style={{
                                wordWrap: 'break-word',
                                whiteSpace: 'normal',
                                overflow: 'hidden',
                                height: 'auto',
                                maxWidth: '200px'
                            }}>
                                Menunjukan bahwa mayoritas lulusan bekerja  dibidang
                                yang sangat tidak relevan dengan program studi
                                yang mereka ambil.
                            </th>
                            <th className='fw-normal'>20</th>
                            <th className='fw-normal'>40</th>
                            <th className='fw-normal pb-5' style={{
                                wordWrap: 'break-word',
                                whiteSpace: 'normal',
                                overflow: 'hidden',
                                height: 'auto',
                                maxWidth: '200px'
                            }}>
                                Evaluasi mendalam terhadap kurikulum dan metode pengajaran.
                                Identifikasi faktor-faktor penyebab lulusan kesulitan dalam mendapatkan pekerjaan yang relevan.
                            </th>
                        </tr>
                        <tr>
                            <th className="text-white fw-normal text-center d-inline-block p-5" style={{ backgroundColor: '#0AB39C', width: '150px', height: '150px' }}>Cukup Selaras</th>
                            <th className='fw-normal pb-5' style={{
                                wordWrap: 'break-word',
                                whiteSpace: 'normal',
                                overflow: 'hidden',
                                height: 'auto',
                                maxWidth: '200px'
                            }}>
                                Menunjukan bahwa mayoritas lulusan bekerja  dibidang
                                yang sangat tidak relevan dengan program studi
                                yang mereka ambil.
                            </th>
                            <th className='fw-normal'>40</th>
                            <th className='fw-normal'>60</th>
                            <th className='fw-normal pb-5' style={{
                                wordWrap: 'break-word',
                                whiteSpace: 'normal',
                                overflow: 'hidden',
                                height: 'auto',
                                maxWidth: '200px'
                            }}>
                                Evaluasi mendalam terhadap kurikulum dan metode pengajaran.
                                Identifikasi faktor-faktor penyebab lulusan kesulitan dalam mendapatkan pekerjaan yang relevan.
                            </th>
                        </tr>
                        <tr>
                            <th className="text-white fw-normal text-center d-inline-block p-5" style={{ backgroundColor: '#00AEB6', width: '150px', height: '150px' }}>Selaras</th>
                            <th className='fw-normal pb-5' style={{
                                wordWrap: 'break-word',
                                whiteSpace: 'normal',
                                overflow: 'hidden',
                                height: 'auto',
                                maxWidth: '200px'
                            }}>
                                Menunjukan bahwa mayoritas lulusan bekerja  dibidang
                                yang sangat tidak relevan dengan program studi
                                yang mereka ambil.
                            </th>
                            <th className='fw-normal'>60</th>
                            <th className='fw-normal'>80</th>
                            <th className='fw-normal pb-5' style={{
                                wordWrap: 'break-word',
                                whiteSpace: 'normal',
                                overflow: 'hidden',
                                height: 'auto',
                                maxWidth: '200px'
                            }}>
                                Evaluasi mendalam terhadap kurikulum dan metode pengajaran.
                                Identifikasi faktor-faktor penyebab lulusan kesulitan dalam mendapatkan pekerjaan yang relevan.
                            </th>
                        </tr>
                        <tr>
                            <th className="text-white fw-normal text-center d-inline-block p-5" style={{ backgroundColor: '#00426D', width: '150px', height: '150px' }}>Sangat Selaras</th>
                            <th className='fw-normal pb-5' style={{
                                wordWrap: 'break-word',
                                whiteSpace: 'normal',
                                overflow: 'hidden',
                                height: 'auto',
                                maxWidth: '200px'
                            }}>
                                Menunjukan bahwa mayoritas lulusan bekerja  dibidang
                                yang sangat tidak relevan dengan program studi
                                yang mereka ambil.
                            </th>
                            <th className='fw-normal'>80</th>
                            <th className='fw-normal'>100</th>
                            <th className='fw-normal pb-5' style={{
                                wordWrap: 'break-word',
                                whiteSpace: 'normal',
                                overflow: 'hidden',
                                height: 'auto',
                                maxWidth: '200px'
                            }}>
                                Evaluasi mendalam terhadap kurikulum dan metode pengajaran.
                                Identifikasi faktor-faktor penyebab lulusan kesulitan dalam mendapatkan pekerjaan yang relevan.
                            </th>
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
                    <Link to='/super_admin/tracerstudy-bank-soal'>
                        <button type="button" className="btn btn-danger mb-3 me-3">Sebelumnnya</button>
                    </Link>
                    <Link to='/super_admin/tracerstudy-preview'>
                        <button type="submit" className="btn btn-success mb-3">Selanjutnya</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
import { Link } from 'react-router-dom';
import "react-quill/dist/quill.snow.css";

export default function () {
    return (
        <div className="container rounded my-4 bg-white">


            {/* Banner/Flyer */}
            <div className="form-group">
                <label className='border rounded bg-primary bg-opacity-25 p-1 mt-2' style={{ fontSize: '13px', color: '#00426D' }}><i className='bi bi-circle-fill me-2'></i>Preview</label>
                <p className="mt-5" style={{ fontSize: '25px', color: '#00426D' }}>Analisis Kesuksesan alumni terhadap dunia lain</p>
                <p className="text-secondary" style={{ fontSize: '15px' }}>Dibuat oleh | Kampus Utama Politeknik LP3I | 13 Oktober 2024 13:45:53</p>
            </div>

            {/* Skala Kegiatan */}
            <div>
                <label className='border rounded bg-primary bg-opacity-25 p-1 me-2' style={{ color: '#00426D' }}>PSDKU</label>
                <label className='border rounded bg-primary bg-opacity-25 p-1' style={{ color: '#00426D' }}>Nasional</label>
            </div>

            {/* Button Navigasi*/}
            <div className='d-flex gap-5 mt-4'>

                <Link to='/super_admin/tracerstudy-preview'>
                    <button className='border-0 border-bottom bg-transparent'>Detail Kegiatan</button>
                </Link>

                <Link to='/super_admin/tracerstudy-preview-kuesioner'>
                    <button className='border-0 bg-transparent'>Kuesioner</button>
                </Link>

                <Link to='/super_admin/tracerstudy-preview-responden'>
                    <button className='border-0 bg-transparent'>Responden</button>
                </Link>
            </div>

            {/* Deskripsi */}
            <div className='ms-2 mt-4'>
                <h6>Latar Belakang Kegiatan</h6>
                <p className='text-secondary'>Tracer Study merupakan salah satu metode yang digunakan oleh institusi pendidikan tinggi
                    untuk melacak dan menganalisis perkembangan karir para alumninya setelah lulus dari kampus.
                    Politeknik LP3I, sebagai salah satu institusi pendidikan vokasi terkemuka,
                    berkomitmen untuk mencetak lulusan yang siap bersaing di dunia kerja. Melalui kegiatan Tracer Study,
                    Politeknik LP3I berupaya memahami bagaimana alumni menerapkan keterampilan dan pengetahuan yang mereka
                    peroleh serta bagaimana relevansi pendidikan yang mereka terima terhadap karir mereka saat ini.</p>

                <h6 className='mt-4'>Latar Belakang Kegiatan</h6>
                <p className='text-secondary'>1. Mengukur tingkat keberhasilan alumni Politeknik LP3I dalam mendapatkan pekerjaan di bidang yang sesuai dengan jurusan mereka. <br />
                    2. Menganalisis relevansi kurikulum pendidikan yang diterapkan oleh Politeknik LP3I dengan tuntutan dunia kerja saat ini. <br />
                    3. Mengidentifikasi keterampilan dan kompetensi yang paling dibutuhkan oleh para alumni dalam dunia kerja, baik soft skills maupun hard skills. <br />
                    4. Mengetahui tingkat kepuasan alumni terhadap proses pendidikan dan pelatihan yang mereka terima selama di Politeknik LP3I. <br />
                    5. Menggunakan data dan masukan dari alumni untuk perbaikan dan pengembangan kurikulum yang lebih sesuai dengan kebutuhan industri. <br />
                </p>

                <h6>Manfaat Kegiatan</h6>
                <p>Bagi Politeknik LP3I :</p>
                <p className='text-secondary'>1. Sebagai bahan evaluasi dan pengembangan kurikulum agar lebih relevan dengan kebutuhan pasar kerja. <br />
                    2. Menjadi referensi untuk meningkatkan kualitas pengajaran dan pelatihan. <br />
                    3. Mempererat hubungan antara kampus dengan alumni serta industri. <br />
                </p>

                <p>Bagi Alumni :</p>
                <p className='text-secondary'>1. Sebagai bahan evaluasi dan pengembangan kurikulum agar lebih relevan dengan kebutuhan pasar kerja. <br />
                    2. Menjadi referensi untuk meningkatkan kualitas pengajaran dan pelatihan. <br />
                    3. Mempererat hubungan antara kampus dengan alumni serta industri. <br />
                </p>

                <p>Bagi Industri :</p>
                <p className='text-secondary'>1. Sebagai bahan evaluasi dan pengembangan kurikulum agar lebih relevan dengan kebutuhan pasar kerja. <br />
                    2. Menjadi referensi untuk meningkatkan kualitas pengajaran dan pelatihan. <br />
                    3. Mempererat hubungan antara kampus dengan alumni serta industri. <br />
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
                        <tr>
                            <td>
                                <label>Politeknik LP3I</label>
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
                                    <label>Manajemen Informatika</label>
                                    <label>Akuntansi</label>
                                    <label>Bisnis Digital</label>
                                    <label>Hubungan Masyarakat</label>
                                </div>
                            </td>
                        </tr>
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
                        <tr>
                            <td>
                                Politeknik LP3I Kampus Tasikmalaya
                            </td>
                            <td>
                                <div className="d-flex flex-column text-center">
                                    <label>D2</label>
                                    <label>D3</label>
                                </div>
                            </td>
                            <td>
                                <div className="d-flex flex-column">
                                    <label>Manajement Pemasaran</label>
                                    <label>Manajement Keuangan Perbangkan</label>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Politeknik LP3I Kampus Pekanbaru
                            </td>
                            <td>
                                <div className="d-flex flex-column text-center">
                                    <label>D2</label>
                                    <label>D2</label>
                                    <label>D2</label>
                                </div>
                            </td>
                            <td>
                                <div className="d-flex flex-column">
                                    <label>Administrasi Bisnis</label>
                                    <label>Manajemen Informatika</label>
                                    <label>Komputerisansi Akuntasi</label>
                                    <label>Hubungan Masyarakat</label>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Politeknik LP3I Kampus Cirebon
                            </td>
                            <td>
                                <div className="d-flex flex-column text-center">
                                    <label>D3</label>
                                    <label>D3</label>
                                </div>
                            </td>
                            <td>
                                <div className="d-flex flex-column">
                                    <label>Manajemen Informatika</label>
                                    <label>Teknik Komputer</label>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Politeknik LP3I Kampus Cirebon
                            </td>
                            <td>
                                <div className="d-flex flex-column text-center">
                                    <label>D3</label>
                                    <label>D3</label>
                                </div>
                            </td>
                            <td>
                                <div className="d-flex flex-column">
                                    <label>Manajemen Informatika</label>
                                    <label>Teknik Komputer</label>
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
                    <Link to='/super_admin/tracerstudy-verifikasi-akhir'>
                        <button type="button" className="btn btn-danger mb-3 me-3">Batalkan</button>
                    </Link>
                    <Link to='/super_admin/tracerstudy'>
                        <button type="submit" className="btn btn-success mb-3">Publikasi</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
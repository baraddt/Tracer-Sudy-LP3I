import { Link } from 'react-router-dom';

export default function () {
    return (
        <div className="container py-5">
            <h2 className="mb-4">Form Pengisian Kuesioner</h2>
            <div className="row">
                {/* Left Section */}
                <div className="col-md-8">
                    <div className="form-container p-4 rounded shadow-sm bg-white">
                        <div className="question-box mb-4">
                            <p>1. Apakah keterampilan yang Anda pelajari di pendidikan membantu dalam kegiatan sehari-hari ?</p>
                        </div>
                        <div className="row ">
                            <label htmlFor="pilihanA" className="mt-3"><input type="radio" id="pilihanA" name="pertanyaan" /> A. Sangat Membantu</label>
                            <label htmlFor="pilihanB" className="mt-4"><input type="radio" id="pilihanB" name="pertanyaan" /> B. Cukup Membantu</label>
                            <label htmlFor="pilihanC" className="mt-4"><input type="radio" id="pilihanC" name="pertanyaan" /> C. Membantu</label>
                            <label htmlFor="pilihanD" className="mt-4"><input type="radio" id="pilihanD" name="pertanyaan" /> D. Tidak Membantu</label>
                            <label htmlFor="pilihanE" className="mt-4"><input type="radio" id="pilihanE" name="pertanyaan" /> E. Sangat Tidak Membantu</label>
                        </div>
                        <div className="mt-4 text-end">
                            <button className="btn btn-outline-secondary me-2">Sebelumnya</button>
                            <button className="btn btn-outline-success">Selanjutnya</button>
                        </div>
                    </div>
                </div>

                {/* Right Section */}
                <div className="col-md-4">
                    {/* Answers Section */}
                    <div className="form-container p-4 mb-4 rounded shadow-sm bg-white">
                        <h5>Jawaban</h5>
                        <div className="row-cols-5">
                            <span className="btn btn-success m-2">1</span>
                            <span className="btn btn-success m-2">2</span>
                            <span className="btn btn-success m-2">3</span>
                            <span className="btn btn-success m-2">4</span>
                            <span className="btn btn-success m-2">5</span>
                            <span className="btn btn-success m-2">6</span>
                            <span className="btn btn-success m-2">7</span>
                            <span className="btn btn-success m-2">8</span>
                            <span className="btn btn-success m-2">9</span>
                            <span className="btn btn-success m-2">10</span>
                            <span className="btn btn-success m-2">11</span>
                            <span className="btn btn-success m-2">12</span>
                            <span className="btn btn-success m-2">13</span>
                            <span className="btn btn-success m-2">14</span>
                            <span className="btn btn-success m-2">15</span>
                            <span className="btn btn-success m-2">16</span>
                            <span className="btn btn-success m-2">17</span>
                            <span className="btn btn-success m-2">18</span>
                            <span className="btn btn-success m-2">19</span>
                            <span className="btn btn-success m-2">20</span>
                        </div>
                        <Link to='/pengguna/dashboard'>
                        <button className="btn btn-success w-100 mt-3">Selesai</button>
                        </Link>
                    </div>

                    {/* Objectives Section */}
                    <div className="form-container p-4 rounded shadow-sm bg-light">
                        <h5>Tujuan Kegiatan:</h5>
                        <ol className="mt-2">
                            <li>Memperoleh data terkait status pekerjaan alumni, keselarasan studi dengan pekerjaan, dan pencapaian karier.</li>
                            <li>Menganalisis relevansi kurikulum dengan tuntutan dunia kerja dan tren industri.</li>
                            <li>Menjadi dasar evaluasi dalam penyusunan strategi pengembangan kampus.</li>
                            <li>Membangun hubungan berkelanjutan antara alumni dan kampus.</li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    )
}
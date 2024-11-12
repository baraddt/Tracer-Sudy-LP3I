import { Link } from 'react-router-dom';

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
                            <span className="active border rounded bg-primary bg-opacity-50 p-2">SKala Kegiatan</span>
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
            </div>

            {/* Form */}
            <form>

                {/* Tanggal Mulai & Tanggal Berakhir */}
                <div className="form-row d-flex">
                    <div className="form-group col-md-6 me-5">
                        <label className='mb-3'>Skala Kegiatan</label>
                        <select
                            name="Skala"
                            placeholder='Pilih Skala'
                            className="form-control mb-2"
                            required
                        >
                            <option value="" disable>Pilih Skala</option>
                            <option value="PSDKU">PSDKU</option>
                        </select>
                    </div>
                    <div className="form-group col-md-5">
                        <label className='mb-3'>Tahun Lulusan</label>
                        <select
                            name="Tahun Lulusan"
                            placeholder='Pilih Tahun Lulusan'
                            className="form-control mb-2"
                            required
                        >
                            <option value="" disable>Pilih Tahun</option>
                            <option value="">2019</option>
                            <option value="">2020</option>
                            <option value="">2021</option>
                            <option value="">2022</option>
                            <option value="">2023</option>
                            <option value="">2024</option>
                            <option value="">2025</option>
                            <option value="">2026</option>
                            <option value="">2027</option>
                        </select>
                    </div>
                </div>
                {/* Table */}
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
                                    <input type="checkbox" /> Politeknik LP3I Kampus Bandung
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
                                        <label><input type="checkbox" /> Administrasi Bisnis</label>
                                        <label><input type="checkbox" /> Manajemen Informatika</label>
                                        <label><input type="checkbox" /> Akuntansi</label>
                                        <label><input type="checkbox" /> Bisnis Digital</label>
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
                        <Link to='/admin/traceradd'>
                            <button type="button" className="btn btn-danger mb-3 me-3">Sebelumnnya</button>
                        </Link>
                        <Link to='/admin/tracerbanksoal'>
                            <button type="submit" className="btn btn-success mb-3">Selanjutnya</button>
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    )
}
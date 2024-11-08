import { Link } from 'react-router-dom'

export default function () {
    return (
        <div className="container mt-4">
            <div className="rounded bg-white p-3">
                {/* Tombol untuk membuka modal */}
                <div className="d-flex flex-column align-items-end mb-3">
                    <Link to='/super_admin/tracerstudyadd'>
                        <button className="btn btn-success mb-2">
                            <i className="bi bi-plus"></i>Tambah
                        </button>
                    </Link>
                    <button className="btn btn-primary"><i className="bi bi-filter"></i> Filter</button>
                </div>

                {/* Form pencarian Tracer */}
                <div className="d-flex mb-3 col-12">
                    <input
                        type="search"
                        className="form-control me-2"
                        placeholder="Cari Kegiatan Yang Pernah Di Lakukan"
                    />
                    <input
                        type="date"
                        className="form-control me-2 w-50"
                        placeholder="Pilih Tanggal Mulai"
                    />
                    <input
                        type="date"
                        className="form-control me-2 w-50"
                        placeholder="Pilih Tanggal Berakhir"
                    />
                    <button className="btn btn-secondary d-flex align-items-center">
                        <i className="bi bi-search me-2"></i> Cari
                    </button>
                </div>
            </div>
            <div className="container mt-4">
                <div className="row rounded bg-white p-3 align-items-center">
                    <table className="table mt-4">
                        <thead>
                            <tr>
                                <th className="text-dark bg-secondary bg-opacity-50">#ID</th>
                                <th className="text-dark bg-secondary bg-opacity-50">Nama Kegiatan</th>
                                <th className="text-dark bg-secondary bg-opacity-50">Tanggal Mulai</th>
                                <th className="text-dark bg-secondary bg-opacity-50">Tanggal Berakhir</th>
                                <th className="text-dark bg-secondary bg-opacity-50 text-center">Status</th>
                                <th className="text-dark bg-secondary bg-opacity-50 text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    #TR001
                                </td>
                                <td>
                                    Analisis Kesuksesan Dengan Dunia Kerja
                                </td>
                                <td>
                                    14 Oktober 2024
                                </td>
                                <td>
                                    24 Desember 2024
                                </td>
                                <td className="text-center">
                                    <span className="border rounded bg-primary bg-opacity-25 text-center p-1" style={{ fontSize: '13px' }}>Berlangsung</span>
                                </td>
                                <td className="text-end">
                                    <button className="me-2 border-0 bg-transparent"><i className="bi bi-eye-fill text-success"></i></button>
                                    <button className="me-2 border-0 bg-transparent">
                                        <i className="bi bi-pencil-fill text-primary"></i>
                                    </button>

                                    <button className="border border-0 bg-transparent"><i className="bi bi-trash-fill text-danger"></i></button>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    #TR002
                                </td>
                                <td>
                                    Analisis Alumni Terhadap Pekerjaan
                                </td>
                                <td>
                                    14 Januari 2024
                                </td>
                                <td>
                                    24 Maret 2024
                                </td>
                                <td className="text-center text-success">
                                    <span className="border rounded bg-success bg-opacity-25 p-1" style={{ fontSize: "13px" }}>Selesai</span>
                                </td>
                                <td className="text-end">
                                    <button className="me-2 border-0 bg-transparent"><i className="bi bi-file-earmark-pdf-fill text-danger"></i></button>
                                    <button className="me-2 border-0 bg-transparent"><i className="bi bi-eye-fill text-success"></i></button>
                                    <button className="me-2 border-0 bg-transparent"><i className="bi bi-pencil-fill text-primary"></i></button>
                                    <button className="border-0 bg-transparent"><i className="bi bi-trash-fill text-danger"></i></button>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    #TR003
                                </td>
                                <td>
                                    Analisis Kampus Terhadap Kurikulum
                                </td>
                                <td>
                                    14 Juni 2024
                                </td>
                                <td>
                                    24 September 2024
                                </td>
                                <td className="text-center text-secondary">
                                    <span className="border rounded bg-secondary bg-opacity-25 p-1" style={{ fontSize: "13px" }}>Draft</span>
                                </td>
                                <td className="text-end">
                                    <button className="me-2 border-0 bg-transparent"><i className="bi bi-eye-fill text-success"></i></button>
                                    <button className="me-2 border-0 bg-transparent"><i className="bi bi-pencil-fill text-primary"></i></button>
                                    <button className="border-0 bg-transparent"><i className="bi bi-trash-fill text-danger"></i></button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
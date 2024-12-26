export default function () {
    return (
        <div className="container mt-4">
            <div className="rounded bg-white p-3">
                <h4 className="mb-4 fw-semibold text-dark">Arsip Pengaduan</h4>

                {/* Tombol untuk membuka modal */}
                <div className="d-flex flex-column align-items-end mb-3">
                    <button className="btn btn-primary"><i className="bi bi-filter"></i> Filter</button>
                </div>

                {/* Form pencarian pengguna */}
                <div className="d-flex mb-3 col-sm-4">
                    <input
                        type="search"
                        className="form-control me-2"
                        placeholder="Cari Pengaduan"
                    />
                    <button className="btn btn-secondary d-flex align-items-center">
                        <i className="bi bi-search me-2"></i> Cari
                    </button>
                </div>
            </div>
            <div className="table-responsive-sm table-responsive-md rounded mt-4 bg-white p-3">
                <table className="table">
                    <thead className="table">
                        <tr>
                            <th className='text-dark text-center cstm-bg fw-semibold' scope="col">#ID</th>
                            <th className='text-dark text-center cstm-bg fw-semibold' scope="col">Pengguna</th>
                            <th className='text-dark text-center cstm-bg fw-semibold text-truncate' scope="col">Judul Permasalahan</th>
                            <th className='text-dark text-center cstm-bg fw-semibold' scope="col">Status</th>
                            <th className='text-dark text-center cstm-bg fw-semibold' scope="col">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th className="text-center fw-normal">#AP001</th>
                            <th className="text-center fw-normal"><img src="/profile.jpg" alt="" width='autuo' height='50px' /> Atep Riandhi</th>
                            <th className="text-center fw-normal">Kesulitan Pada Saat Login</th>
                            <th className="text-center text-success fw-normal">Selesai</th>
                            <th className="text-center fw-normal">
                                <button className="border-0 bg-transparent"><i className="bi bi-file-earmark-pdf-fill text-danger"></i></button>
                                <button className="border-0 bg-transparent"><i className="bi bi-eye-fill text-success"></i></button>
                            </th>
                        </tr>
                        <tr>
                            <th className="text-center fw-normal">#AP002</th>
                            <th className="text-center fw-normal"><img src="/profile.jpg" alt="" width='autuo' height='50px' /> Atep Riandhi</th>
                            <th className="text-center fw-normal">Kesulitan Pada Saat Login</th>
                            <th className="text-center text-success fw-normal">Selesai</th>
                            <th className="text-center fw-normal">
                                <button className="border-0 bg-transparent"><i className="bi bi-file-earmark-pdf-fill text-danger"></i></button>
                                <button className="border-0 bg-transparent"><i className="bi bi-eye-fill text-success"></i></button>
                            </th>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}
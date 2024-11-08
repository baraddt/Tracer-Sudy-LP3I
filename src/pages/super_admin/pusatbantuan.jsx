export default function () {
    return (
        <div className="container mt-4">
            <div className="rounded bg-white p-3">
                <h4 className="text-black mb-4 fw-semibold">Pusat Bantuan</h4>

                {/* Tombol untuk membuka modal */}
                <div className="d-flex flex-column align-items-end mb-3">
                    <button className="btn btn-primary"><i className="bi bi-filter"></i> Filter</button>
                </div>

                {/* Form pencarian pengguna */}
                <div className="d-flex mb-3 col-sm-4">
                    <input
                        type="search"
                        className="form-control me-2"
                        placeholder="Cari User"
                    />
                    <button className="btn btn-secondary d-flex align-items-center">
                        <i className="bi bi-search me-2"></i> Cari
                    </button>
                </div>
            </div>
            <div className="rounded mt-4 bg-white p-3">
                <table className="table">
                    <thead>
                        <tr>
                            <th className='bg-secondary bg-opacity-25 text-center fw-semibold' scope="col">#ID</th>
                            <th className='bg-secondary bg-opacity-25 text-center fw-semibold' scope="col">Pengadu</th>
                            <th className='bg-secondary bg-opacity-25 text-center fw-semibold' scope="col">Role</th>
                            <th className='bg-secondary bg-opacity-25 text-center fw-semibold' scope="col">Email</th>
                            <th className='bg-secondary bg-opacity-25 text-center fw-semibold' scope="col">Status</th>
                            <th className='bg-secondary bg-opacity-25 text-center fw-semibold' scope="col">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th className="text-center fw-normal">#P001</th>
                            <th className="text-center fw-normal">Atep Riandhi</th>
                            <th className="text-center fw-normal">Super Admin</th>
                            <th className="text-center fw-normal">Atep@gmail.com</th>
                            <th className="text-center text-success fw-normal">Selesai</th>
                            <th className="text-center fw-normal">
                                <button className="border-0 bg-transparent"><i className="bi bi-file-earmark-pdf-fill text-danger"></i></button>
                                <button className="border-0 bg-transparent"><i className="bi bi-eye-fill text-success"></i></button>
                            </th>
                        </tr>
                        <tr>
                            <th className="text-center fw-normal">#P002</th>
                            <th className="text-center fw-normal">Atep Riandhi Pahmi</th>
                            <th className="text-center fw-normal">Super Admin</th>
                            <th className="text-center fw-normal">Atep@gmail.com</th>
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
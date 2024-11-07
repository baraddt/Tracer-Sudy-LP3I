export default function () {
    return (
        <div className="container mt-4">
            <div className="bg-white rounded p-3">
                <h4 className="text-center">Pusat Bantuan</h4>
                <div className="d-flex justify-content-between">
                    <div>
                        <label className="me-5 col-auto">
                            Nama
                            <input
                                className="form-control rounded"
                                placeholder="Masukkan Nama"
                            />
                        </label>
                        <label>
                            Email <br />
                            <input
                                className="form-control rounded"
                                placeholder="Masukkan Email Aktif !"
                            />
                        </label> <br />
                        <label className="mt-5">
                            Judul Permasalahan <br />
                            <input
                                className="form-control rounded"
                                placeholder="Masukkan Judul"
                            />
                        </label> <br />
                        <label className="mt-5">
                            Deskripsi <br />
                            <textarea
                                className="form-control rounded"
                                placeholder="Masukkan Deskripsi Dengan Jelas"
                                rows="4"
                                style={{ width: '250%' }}
                            />
                        </label>

                    </div>
                    <img className="me-5" src="/pusatbantuan.png" alt="" width='auto' height='150px' />
                </div>
                <div className="text-end p-2 me-5 mt-5">
                    <button className="btn btn-success p-2 col-md-3">Kirim</button>
                </div>
            </div>
        </div>
    )
}
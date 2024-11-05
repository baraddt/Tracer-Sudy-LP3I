export default function () {
    return (
        <div className="container mt-4">
            <div className="rounded bg-white p-3">
                <h1 className="text-black mb-4 fw-semibold">Tracer Study</h1>

                {/* Tombol untuk membuka modal */}
                <div className="d-flex flex-column align-items-end mb-3">
                    <button className="btn btn-success mb-2" onClick={() => setShowModal(true)}>
                        <i className="bi bi-plus"></i>Tambah
                    </button>
                    <button className="btn btn-primary"><i className="bi bi-filter"></i> Filter</button>
                </div>

                {/* Form pencarian Tracer */}
                <div className="d-flex mb-3 col-12">
                    <input
                        type="text"
                        className="form-control me-2"
                        placeholder="Cari Kegiatan Yang Pernah Di Lakukan"
                    />
                    <input
                        type="text"
                        className="form-control me-2"
                        placeholder="Pilih Tanggal Mulai"
                    />
                    <input
                        type="text"
                        className="form-control me-2"
                        placeholder="Pilih Tanggal Berakhir"
                    />
                    <button className="btn btn-secondary d-flex align-items-center">
                        <i className="bi bi-search me-2"></i> Cari
                    </button>
                </div>
                <div>
                    
                </div>
            </div>
        </div>
    )
}
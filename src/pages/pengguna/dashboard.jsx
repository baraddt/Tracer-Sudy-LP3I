export default function () {
    return (
        <div className="container mt-1">
            <div className="row rounded bg-white p-3 align-items-center"
                style={{
                    backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('/background-pengguna.jpg')",
                    backgroundSize: 'cover',
                    width: 'auto',
                    height: '520px',
                    backgroundPosition: "top",
                    color: "white",
                }}>

                <div>
                    <h3>Ayo Berpartisipasi di <br />
                        Tracer Study LP3I !
                    </h3>
                    <p>"Masa Lalu Tercatat, Masa Depan Terarah"</p>
                </div>
            </div>
            <div className="mt-4">
                <h4>Daftar Kegiatan Tracer Study</h4>
            </div>
            <div className="d-flex gap-5 justify-content-center mt-4">

                {/* Card Total Responden */}
                <div className="card col-md-2 d-flex align-items-center justify-content-center p-2 shadow-sm text-white" style={{ backgroundColor: '#00426D' }}>
                    <div className="d-flex align-items-center">
                        <i className="bi bi-clock-fill display-6 me-3" style={{ fontSize: '2rem' }}></i>
                        <div className="text-start">
                            <h6 className="rounded bg-primary bg-opacity-50 p-1"><i className="bi bi-circle-fill me-2"></i>Berlangsung</h6>
                            <h6 className="mt-4"><i className="bi bi-4-square display-6 me-2"></i>Kuesioner</h6>
                        </div>
                    </div>
                </div>

                {/* Card Bekerja */}
                <div className="card col-md-2 d-flex align-items-center justify-content-center p-2 shadow-sm text-white" style={{ backgroundColor: '#F7964B' }}>
                    <div className="d-flex align-items-center">
                        <i className="bi bi-calendar4 display-6 me-3" style={{ fontSize: '2rem' }}></i>
                        <div className="text-start">
                            <h6 className="rounded bg-warning bg-opacity-50 p-1"><i className="bi bi-circle-fill me-2"></i>Akan Datang</h6>
                            <h6 className="mt-4"><i className="bi bi-5-square display-6 me-2"></i>Kuesioner</h6>
                        </div>
                    </div>
                </div>

                {/* Card Wiraswasta */}
                <div className="card col-md-2 d-flex align-items-center justify-content-center p-2 shadow-sm text-white" style={{ backgroundColor: '#E80000' }}>
                    <div className="d-flex align-items-center">
                        <i className="bi bi-hourglass-bottom display-2 me-3" style={{ fontSize: '2rem' }}></i>
                        <div className="text-start">
                            <h6 className="rounded bg-danger p-1"><i className="bi bi-circle-fill me-2"></i>Berakhir</h6>
                            <h6 className="mt-4"><i className="bi bi-4-square display-6 me-2"></i>Kuesioner</h6>
                        </div>
                    </div>
                </div>

                {/* Card Mencari Kerja */}
                <div className="card col-md-2 d-flex align-items-center justify-content-center p-2 shadow-sm text-white" style={{ backgroundColor: '#0AB39C' }}>
                    <div className="d-flex align-items-center">
                        <i className="bi bi-check2-all display-6 me-3" style={{ fontSize: '2rem' }}></i>
                        <div className="text-start">
                            <h6 className="rounded bg-success bg-opacity-50 p-1"><i className="bi bi-circle-fill me-2"></i>Selesai</h6>
                            <h6 className="mt-4"><i className="bi bi-1-square display-6 me-2"></i>Kuesioner</h6>
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-center mt-4">
                <button className="btn btn-success">Selengkapnya</button>
            </div>
        </div>
    )
}
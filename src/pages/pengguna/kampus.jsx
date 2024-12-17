export default function () {
    return (
        <div className="container mt-4">
            <div
                className="row rounded bg-white p-3 align-items-center"
                style={{
                    backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/covercampus.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    color: "white",
                }}
            >
                {/* Foto di Kiri */}
                <div className="col-md-3 text-center">
                    <img
                        src="/logo-lp3i.png"
                        alt="Profile"
                        className="img-fluid rounded"
                        width="150"
                        height="150"
                    />
                </div>

                {/* Informasi di Kanan */}
                <div className="col-9 p-sm-4 p-md-5 p-4">
                    <div className="d-flex justify-content-between align-items-center">
                        <h1 className="mb-0">Politeknik LP3I Tasikmalaya</h1>
                    </div>

                    <p className="mt-3">046053</p>
                    <p className="mt-5">
                        <i className="bi bi-geo-alt-fill"></i> Jl. Pahlawan No.59, Sukaluyu, <br />
                        Kec. Cibeunying Kaler, Kota Bandung, Jawa Barat 40123
                    </p>
                </div>
            </div>
            <div className="mt-5 p-4 p-sm-0 p-md-0">
                <div className="d-flex row gap-5 justify-content-center mt-4">

                    {/* Card Tracer */}
                    <div className="card col-md-3 p-2 shadow-sm">
                        <img src="/kampus-bandung.jpg" alt="" />
                        <span className="mt-3 text-center">Politeknik LP3I Bandung</span>
                        <span className="mt-3 text-center text-secondary">Jl. Pahlawan No.59, Sukaluyu, Kec. Cibeunying Kaler, Kota Bandung, Jawa Barat 40123</span>
                        <button className="mt-5 rounded btn btn-info col-md-12">See More</button>
                    </div>

                    <div className="card col-md-3 d-flex justify-content-center p-2 shadow-sm">
                        <img src="/kampus-cimahi.jpg" alt="" />
                        <span className="mt-3 text-center">Politeknik LP3I Cimahi</span>
                        <span className="mt-3 text-center text-secondary">Jl. Terusan No.14 A, Cimahi, Kec. Cimahi Tengah, Kota Cimahi, Jawa Barat 40525</span>
                        <button className="mt-5 rounded btn btn-info col-md-12">See More</button>
                    </div>

                    <div className="card col-md-3 d-flex justify-content-center p-2 shadow-sm">
                        <img src="/kampus-tasikmalaya.jpg" alt="" />
                        <span className="mt-3 text-center">Politeknik LP3I Tasikmalaya</span>
                        <span className="mt-3 text-center text-secondary">Jl. Ir. H. Juanda No.KM. 2, RW.No. 106, Panglayungan, Kec. Cipedes, Kab. Tasikmalaya, Jawa Barat 46151</span>
                        <button className="mt-5 rounded btn btn-info col-md-12">See More</button>
                    </div>

                    <div className="card col-md-3 d-flex justify-content-center p-2 shadow-sm">
                        <img src="/kampus-cirebon.jpg" alt="" />
                        <span className="mt-3 text-center">Politeknik LP3I Cirebon</span>
                        <span className="mt-3 text-center text-secondary">Jl. Tuparev No.514, Pilangsari, Kec. Kedawung, Kabupaten Cirebon, Jawa Barat 45153</span>
                        <button className="mt-5 rounded btn btn-info col-md-12">See More</button>
                    </div>

                    <div className="card col-md-3 d-flex justify-content-center p-2 shadow-sm">
                        <img src="/kampus-langsa.jpg" alt="" />
                        <span className="mt-3 text-center">Politeknik LP3I langsa</span>
                        <span className="mt-3 text-center text-secondary">Jl. Jenderal Ahmad Yani, Paya Bujok Seuleumak, Kec. Langsa Baro, Kota Langsa, Aceh 24355</span>
                        <button className="mt-5 rounded btn btn-info col-md-12">See More</button>
                    </div>

                    <div className="card col-md-3 d-flex justify-content-center p-2 shadow-sm">
                        <img src="/kampus-pekanbaru.jpg" alt="" />
                        <span className="mt-3 text-center">Politeknik LP3I Pekanbaru</span>
                        <span className="mt-3 text-center text-secondary">Jl. Taman Sari No.11, Tengkerang Sel., Kec. Bukit Raya, Kota Pekanbaru, Riau 28125</span>
                        <button className="mt-5 rounded btn btn-info col-md-12">See More</button>
                    </div>

                    <div className="card col-md-3 d-flex justify-content-center p-2 shadow-sm">
                        <img src="/kampus-padang.jpg" alt="" />
                        <span className="mt-3 text-center">Politeknik LP3I Padang</span>
                        <span className="mt-3 text-center text-secondary">Jl. By Pass No.km.7, Pisang, Kec. Pauh, Kota Padang, Sumatera Barat 25147</span>
                        <button className="mt-5 rounded btn btn-info col-md-12">See More</button>
                    </div>

                    <div className="card col-md-3 d-flex justify-content-center p-2 shadow-sm">
                        <img src="/kampus-medan.jpg" alt="" />
                        <span className="mt-3 text-center">Politeknik LP3I Medan</span>
                        <span className="mt-3 text-center text-secondary">Jl. Amaliun No.37, Kota Matsum IV, Medan Area, Kota Medan, Sumatera Utara 20215</span>
                        <button className="mt-5 rounded btn btn-info col-md-12">See More</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
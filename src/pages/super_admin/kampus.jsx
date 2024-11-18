import { Link } from 'react-router-dom';

export default function () {
    return (
        <div className="container mt-4" style={{ paddingLeft: '24px', paddingRight: '24px' }}>
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
                <div className="col-md-9">
                    <div className="d-flex justify-content-between align-items-center">
                        <h4 className="mb-0">Politeknik Lembaga Pendidikan dan Pengembangan Profesi Indonesia</h4>
                        <p className="mb-0 ms-3 me-5 col-md-2">
                            318/KPT/I/2019 <br /> No. SK Pendirian
                        </p>
                        <p className="mb-0">
                            Baik <br /> Akreditasi
                        </p>
                    </div>

                    <p className="mt-3">046053</p>
                    <p className="mt-5">
                        <i className="bi bi-geo-alt-fill"></i> Jl. Pahlawan No.59, Sukaluyu, <br />
                        Kec. Cibeunying Kaler, Kota Bandung, Jawa Barat 40123
                    </p>
                </div>
                <div className="mt-5 d-flex justify-content-between">
                    <div>
                        <button className="me-2 border rounded bg-secondary bg-opacity-50 p-2 text-light" type="button">Overview</button>
                        <Link to="/super_admin/psdku">
                            <button
                                className="me-2 border rounded bg-dark bg-opacity-50 p-2 text-light"
                                type="button"
                            >
                                PSDKU
                            </button>
                        </Link>
                        <Link to="/super_admin/programstudy" className='me-5'>
                            <button className="border rounded p-2  bg-dark bg-opacity-50 text-light" type="button">Program Study</button>
                        </Link>
                    </div>
                    <div>
                        <Link to="/super_admin/kampusedit">
                            <button className="ms-5 border rounded p-2 bg-success bg-opacity-75 text-light" type="button">Edit Informasi</button>
                        </Link>
                    </div>

                </div>
            </div>
            <div className="container mt-2">
                <div className="d-flex justify-content-between">
                    {/* Info di Kiri */}
                    <div
                        className="d-flex justify-content-between align-items-center bg-light p-2 rounded me-3"
                        style={{ flex: 1.3 }} // Mengatur proporsi ukuran Info
                    >
                        <div className="me-5">
                            <h4>Info</h4>
                            <h6 className="mt-4">Kode PT</h6>
                            <h6 className="mt-4">Status</h6>
                            <h6 className="mt-4">Akreditasi</h6>
                            <h6 className="mt-4">Tanggal Berdiri</h6>
                            <h6 className="mt-4">No SK.Pendirian</h6>
                            <h6 className="mt-4">Tgl Sk.Pendirian</h6>
                            <h6 className="mt-4">Kontak</h6>
                            <h6 className="mt-4">Alamat</h6>
                        </div>
                        <div className="text-secondary mt-5">
                            <h6 className="mt-sm-5">045052</h6>
                            <h6 className="mt-4">Aktif</h6>
                            <h6 className="mt-4">Baik Sekali</h6>
                            <h6 className="mt-4">30 April 2019</h6>
                            <h6 className="mt-4">318/KPT/I/2019</h6>
                            <h6 className="mt-4">30 April 2019</h6>
                            <h6 className="mt-4">(020) 2560482</h6>
                            <h6 className="mt-4">
                                Jl. Pahlawan No.59, Sukaluyu, <br />
                                Kec. Cibeunying Kaler, <br /> Kota Bandung, Jawa Barat 40123
                            </h6>
                        </div>
                    </div>

                    {/* About di Kanan */}
                    <div className="bg-light p-2 rounded" style={{ flex: 2 }}>
                        <h4 className="mt-2">About</h4>
                        <p
                            className="fw-normal text-secondary"
                            style={{ lineHeight: "1.6", marginBottom: "1rem", fontSize: '13px' }}
                        >
                            Politeknik LP3I merupakan perguruan tinggi vokasi yang fokus mencetak lulusan siap kerja.
                            Sejak berdiri pada tahun 1989, LP3I berkomitmen menghubungkan dunia pendidikan dengan industri.
                            Kampus ini tersebar di berbagai kota besar di Indonesia, menawarkan program studi di bidang bisnis, teknologi, dan keuangan.

                            <br /><br />

                            Keunggulan LP3I terletak pada pendekatan "Link and Match" antara teori dan praktik.
                            Mahasiswa tidak hanya belajar di kelas tetapi juga mengikuti magang di perusahaan mitra.
                            Hal ini memberi pengalaman langsung dan mempersiapkan mereka menghadapi kebutuhan dunia kerja.

                            <br /><br />

                            Selain itu, LP3I menekankan pengembangan soft skills seperti komunikasi dan etika profesional.
                            Kompetensi ini sangat penting bagi mahasiswa agar siap bersaing di lingkungan kerja yang dinamis.
                            Dengan demikian, lulusan LP3I memiliki daya saing yang tinggi di pasar tenaga kerja.
                        </p>

                    </div>
                </div>
            </div>
        </div>

    );
}

import { Link } from 'react-router-dom';
import getRoleName from '../../services/roleCheck';

export default function () {

    const user = JSON.parse(localStorage.getItem('user'));
    const userRoleId = user ? user.role : ''; // Ambil role ID dari user di localStorage

    // Dapatkan nama role berdasarkan ID
    const userRole = getRoleName(userRoleId);

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
                <div className="col-9">
                    <div className="d-row d-md-flex d-sm-row justify-content-between align-items-center">
                        <h1 className="mb-3 mb-sm-3 mb-md-0 text-light">Politeknik LP3I Tasikmalaya</h1>
                        <p className="mb-0 text-light">
                            318/KPT/I/2019 <br /> No. SK Pendirian
                        </p>
                        <div>
                            <p className="mb-0 text-light">
                                Baik <br /> Akreditasi
                            </p>
                        </div>
                    </div>

                    <p className="mt-3 text-light">046053</p>
                    <p className="mt-5 text-light">
                        <i className="bi bi-geo-alt-fill"></i> Jl. Ir. H. Juanda No.106, Panglayungan, <br />
                        Kec. Cipedes Kota Tasikmalaya, Jawa Barat 46151
                    </p>
                </div>
                <div className="mt-5 d-row d-sm-flex d-md-flex justify-content-md-between justify-content-sm-between">
                    <div>
                        <button className="me-2 border rounded bg-secondary bg-opacity-50 p-2 text-light" type="button">Overview</button>
                        <Link to={userRole === 'Admin' ? '/admin/programstudy' : '/PA/paprogramstudy'} className='me-5'>
                            <button className="border rounded p-2 bg-dark bg-opacity-50 text-light" type="button">Program Study</button>
                        </Link>
                    </div>
                    <div>
                        <Link to="/admin/psdkuedit" style={{ textDecoration: 'none' }}>
                            <button className="ms-5 border rounded p-2 bg-success bg-opacity-75 text-white d-none d-sm-inline" type="button">Edit Informasi</button>
                        </Link>
                    </div>

                </div>
            </div>
            <div className="container mt-2">
                <div className="d-flex flex-column flex-md-row justify-content-between">
                    {/* Info di Kiri */}
                    <div
                        className="d-flex flex-column flex-sm-row justify-content-between align-items-start bg-light p-2 rounded mb-3 mb-md-0 me-md-3"
                        style={{ flex: 1.5 }}
                    >
                        <div className="me-5">
                            <h4 className="text-dark">Info</h4>
                            <h6 className="mt-4 text-dark">Kode PT</h6>
                            <h6 className="mt-4 text-dark">Status</h6>
                            <h6 className="mt-4 text-dark">Akreditasi</h6>
                            <h6 className="mt-4 text-dark text-truncate">Tanggal Berdiri</h6>
                            <h6 className="mt-4 text-dark text-truncate">No SK.Pendirian</h6>
                            <h6 className="mt-4 text-dark text-truncate">Tgl Sk.Pendirian</h6>
                            <h6 className="mt-4 text-dark">Kontak</h6>
                            <h6 className="mt-4 text-dark">Alamat</h6>
                        </div>
                        <div className="text-secondary mt-custom-5">
                            <h6 className="mt-3">045052</h6>
                            <h6 className="mt-4">Aktif</h6>
                            <h6 className="mt-4">Baik Sekali</h6>
                            <h6 className="mt-4">30 April 2019</h6>
                            <h6 className="mt-4">318/KPT/I/2019</h6>
                            <h6 className="mt-4">30 April 2019</h6>
                            <h6 className="mt-4">(020) 2560482</h6>
                            <h6 className="mt-4">
                                Jl. Ir. H. Juanda No.106, Panglayungan, <br />
                                Kec. Cipedes Kota Tasikmalaya, Jawa Barat 46151
                            </h6>
                        </div>
                    </div>

                    {/* About di Kanan */}
                    <div className="bg-light p-2 rounded" style={{ flex: 2 }}>
                        <h4 className="mt-2 text-dark">About</h4>
                        <p
                            className="fw-normal text-secondary"
                            style={{ lineHeight: "1.6", marginBottom: "1rem", fontSize: '13px' }}
                        >
                            Politeknik LP3I Tasikmalaya adalah salah satu kampus vokasi unggulan
                            di bawah naungan Politeknik LP3I, yang berkomitmen mencetak lulusan
                            siap kerja dan berdaya saing. Berdiri di kota Tasikmalaya, kampus ini
                            menawarkan program studi yang relevan dengan kebutuhan industri, terutama
                            di bidang bisnis, teknologi, dan keuangan.

                            <br /><br />

                            Keunggulan Politeknik LP3I Tasikmalaya terletak pada pendekatan khas "Link and Match,"
                            yang menyelaraskan pembelajaran di kampus dengan praktik nyata di dunia kerja. Mahasiswa
                            tidak hanya dibekali dengan teori, tetapi juga mendapat pengalaman langsung melalui program
                            magang di berbagai perusahaan mitra lokal maupun nasional. Program ini dirancang untuk
                            mempersiapkan lulusan agar siap menghadapi tantangan dunia industri yang dinamis.

                            <br /><br />

                            Selain fokus pada kompetensi teknis, Politeknik LP3I Tasikmalaya juga menekankan pengembangan
                            soft skills seperti kemampuan komunikasi, kerja sama tim, dan etika profesional. Keterampilan
                            ini menjadi modal penting bagi mahasiswa untuk bersaing di pasar tenaga kerja.
                        </p>
                    </div>
                </div>
            </div>
        </div>

    );
}

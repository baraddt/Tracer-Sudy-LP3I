import { Link } from 'react-router-dom';

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
                <div className="d-flex mt-2 text-center justify-content-between">
                    <h4>Profile</h4>
                    <button className="mt-6 border rounded p-2  bg-success bg-opacity-75 text-light" type="button">Edit Informasi</button>
                </div>
            </div>
            <div className="container mt-2">
                <div className="d-flex justify-content-between">
                    {/* Info di Kiri */}
                    <div
                        className="d-flex justify-content-between align-items-center bg-light p-2 rounded me-3"
                        style={{ flex: 1 }} // Mengatur proporsi ukuran Info
                    >
                        <div className="me-5">
                            <h4>Info</h4>
                            <div className='ms-6'>
                                <img src="/photo-profil.jpg" className='rounded-circle' alt="" width='150px' height='auto' />
                            </div>
                            <div className='d-flex'>
                                <div className="me-5">
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
                        </div>
                    </div>

                    {/* About di Kanan */}
                    <div className="bg-light p-2 rounded" style={{ flex: 2 }}>
                        <h4 className="mt-2">About</h4>
                        <h6
                            className="text-secondary"
                            style={{ lineHeight: "1.6", marginBottom: "1rem" }}
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
                        </h6>

                    </div>
                </div>
            </div>
        </div>

    );
}

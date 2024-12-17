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
                <div className="mt-2 text-end">
                    <button className="mt-6 border rounded p-2  btn btn-primary text-light" type="button"><i className='bi bi-pencil me-2'></i>Change Cover</button>
                </div>
            </div>
            <div className="container mt-2">
                <div className="d-flex justify-content-between">
                    {/* Info di Kiri */}
                    <div
                        className="d-flex justify-content-between bg-white p-2 rounded me-3"
                        style={{ width: '50px', height: '250px', flex: 1 }} // Mengatur proporsi ukuran Info
                    >
                        <div className='d-flex justify-content-between p-2'>
                            <img src="/logo-lp3i.png" alt="" width='150px' height='auto' />
                            <input type="file" />
                        </div>


                    </div>

                    {/* About di Kanan */}
                    <div className="bg-white p-2 rounded" style={{ flex: 2 }}>
                        <h4 className="mt-2">Edit Info</h4><hr />
                        {/* Kode PT */}
                        <div className="form-group mb-3">
                            <label className="mb-1">Kode PT</label>
                            <input type="text" className="form-control w-25" placeholder="045052" readOnly />
                        </div>

                        {/* Nama Perguruan Tinggi */}
                        <div className="form-group mb-3">
                            <label className="mb-1">Nama Perguruan Tinggi</label>
                            <input type="text" className="form-control w-75" placeholder="Politeknik Lembaga Pendidikan dan Profesi Indonesia" readOnly />
                        </div>

                        {/* Akreditasi, Tanggal Berdiri, No. SK Pendirian, Tgl. SK Pendirian */}
                        <div className="form-group row mb-3">
                            <div className="col-md-3">
                                <label className="mb-1">Akreditasi</label>
                                <select className="form-control">
                                    <option>Baik</option>
                                    <option>Sangat Baik</option>
                                </select>
                            </div>
                            <div className="col-md-3">
                                <label className="mb-1">Tanggal Berdiri</label>
                                <input type="date" className="form-control" />
                            </div>
                            <div className="col-md-3">
                                <label className="mb-1">No. SK Pendirian</label>
                                <input type="text" className="form-control" placeholder="318/RT/I/2019" />
                            </div>
                            <div className="col-md-3">
                                <label className="mb-1">Tgl. SK Pendirian</label>
                                <input type="date" className="form-control" />
                            </div>
                        </div>

                        {/* Kontak */}
                        <div className="form-group mb-3">
                            <label className="mb-1">Kontak</label>
                            <input type="text" className="form-control w-50" placeholder="078675764123" />
                        </div>

                        {/* Provinsi, Kota/Kabupaten, Kecamatan, Kelurahan */}
                        <div className="form-group mb-3 d-flex">
                            <div className="col-md-5 me-4">
                                <label className="mb-1">Provinsi</label>
                                <select className="form-control">
                                    <option>Jawa Barat</option>
                                </select>
                            </div>
                            <div className="col-md-6">
                                <label className="mb-1">Kota/Kabupaten</label>
                                <select className="form-control">
                                    <option>Bandung</option>
                                </select>
                            </div>
                        </div>
                        <div className='form-group mb-3 d-flex'>
                            <div className="col-md-5 me-4">
                                <label className="mb-1">Kecamatan</label>
                                <select className="form-control">
                                    <option>Cimahi</option>
                                </select>
                            </div>
                            <div className="col-md-6">
                                <label className="mb-1">Kelurahan</label>
                                <select className="form-control">
                                    <option>Cibiru</option>
                                </select>
                            </div>
                        </div>

                        {/* About */}
                        <div className="form-group mb-4">
                            <label className="mb-1">About</label>
                            <textarea className="form-control" rows="4">Politeknik LP3I merupakan perguruan tinggi vokasi yang fokus mencetak lulusan siap kerja. Sejak berdiri pada tahun 1989, LP3I berkomitmen menghubungkan dunia pendidikan dengan industri. Kampus ini tersebar di berbagai kota besar di Indonesia, menawarkan program studi di bidang bisnis, teknologi, dan keuangan.

                                Keunggulan LP3I terletak pada pendekatan "Link and Match" antara teori dan praktik. Mahasiswa tidak hanya belajar di kelas tetapi juga mengikuti magang di perusahaan mitra. Hal ini memberi pengalaman langsung dan mempersiapkan mereka menghadapi kebutuhan dunia kerja.

                                Selain itu, LP3I menekankan pengembangan soft skills seperti komunikasi dan etika profesional. Kompetensi ini sangat penting bagi mahasiswa agar siap bersaing di lingkungan kerja yang dinamis. Dengan demikian, lulusan LP3I memiliki daya saing yang tinggi di pasar tenaga kerja.</textarea>
                        </div>

                        {/* Buttons */}
                        <div className="text-end">
                            <button type="button" className="btn btn-danger me-4">Cancel</button>
                            <Link to='/super_admin/kampus'>
                                <button type="button" className="btn btn-success">Update</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

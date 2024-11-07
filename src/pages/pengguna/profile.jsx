export default function () {
    return (
        <div className="container mt-4">

            <div className="row">
                {/* Right Section */}
                <div className="col-md-4">
                    <div className="d-flex bg-white">
                        <div className="p-2">
                            <img className="rounded-circle" src="/photo-profil.jpg" alt="" width='auto' height='100px' />
                        </div>
                        <div className="row p-2 mt-2">
                            <span>Atep Riandi Pahmi</span>
                            <span>202202134</span>
                            <span>Politeknik LP3I Tasik</span>
                        </div>
                    </div>

                    <div className="d-flex justify-content-between bg-white mt-4 p-2 rounded me-3 col-12">
                        <div className="me-5 col-5">
                            <h4>Info Pribadi</h4>
                            <h6 className="mt-5">Program Study</h6>
                            <h6 className="mt-4">Jenjang</h6>
                            <h6 className="mt-4">Jenis Kelamin</h6>
                            <h6 className="mt-4">Email</h6>
                            <h6 className="mt-4">Password</h6>
                            <h6 className="mt-4">Tempat tgl Lahir</h6>
                            <h6 className="mt-4">Alamat</h6>
                        </div>
                        <div className="text-secondary mt-5 col-6">
                            <h6 className="mt-sm-3">Manajement Informatika</h6>
                            <h6 className="mt-4">D3</h6>
                            <h6 className="mt-4">Laki Laki 50%</h6>
                            <h6 className="mt-4">atep@gmail.com</h6>
                            <h6 className="mt-4">********</h6>
                            <h6 className="mt-4">30 April 2019</h6>
                            <h6 className="mt-4">
                                Jl. Pahlawan No.59, Sukaluyu, <br />
                                Kec. Cibeunying Kaler, <br /> Kota Bandung, Jawa Barat 40123
                            </h6>
                        </div>
                    </div>
                </div>
                {/* Left Section */}
                <div className="col-md-8">
                    <div className="form-container p-4 rounded shadow-sm bg-white">
                        <div className="mb-4">
                            <h4>Info Status</h4> <hr />
                            <div className="row-cols-2 gap-3">
                                <label>Program Study</label>
                                <label>Kondisi Saat Ini</label>
                                <label className="mt-1 text-secondary">Manajement Informatika</label>
                                <label className="mt-1 text-secondary">Bekerja</label>
                                <label className="mt-5">Bidang Pekerjaan</label>
                                <label>Kategori Pekerjaan</label>
                                <label className="mt-1 text-secondary">Teknik Informasi</label>
                                <label className="mt-1 text-secondary">IT Support</label>
                                <label className="mt-5">Jenis Pekerjaan</label>
                                <label>Status Pekerjaan</label>
                                <label className="mt-1 text-secondary">Software Developer</label>
                                <label className="mt-1 text-secondary">Part Time</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
import { Link } from 'react-router-dom';

export default function () {
    return (
        <div className="container mt-4">

            {/* Berlangsung */}
            <div className="bg-light p-2">
                <span className="border rounded bg-primary bg-opacity-25 p-1" style={{ color: '#00426D' }}><i className="bi bi-circle-fill me-2"></i>Berlangsung</span>
                <div className="d-flex row gap-5 justify-content-center mt-4">

                    {/* Card Tracer */}
                    <div className="card col-md-3 d-flex justify-content-center p-2 shadow-sm">
                        <img src="/bannertraser.jpg" alt="" />
                        <span className="mt-3">Politeknik LP3I Tasikmalaya</span>
                        <span className="mt-3">Tracer Study Alumni</span>
                        <span className="mt-3 text-danger">10-10-2020 - 11-02-2019</span>
                        <span className="text-secondary mt-3">* Skala Kegiatan</span>
                        <span className="">PSDKU</span>
                        <span className="text-secondary mt-3">* Tahun Lulusan</span>
                        <span>2014 - 2015</span>
                        <Link to='/pengguna/formtracer'>
                            <button className="mt-4 rounded btn btn-success col-md-12">Mulai</button>
                        </Link>
                    </div>

                    <div className="card col-md-3 d-flex justify-content-center p-2 shadow-sm">
                        <img src="/bannertraser.jpg" alt="" />
                        <span className="mt-3">Politeknik LP3I Bandung</span>
                        <span className="mt-3">Tracer Study Alumni</span>
                        <span className="mt-3 text-danger">10-10-2012 - 11-02-2013</span>
                        <span className="text-secondary mt-3">* Skala Kegiatan</span>
                        <span className="">Nasional</span>
                        <span className="text-secondary mt-3">* Tahun Lulusan</span>
                        <span>2016 - 2019</span>
                        <Link to='/pengguna/formtracer'>
                            <button className="mt-4 rounded btn btn-success col-md-12">Mulai</button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Akan Datang */}
            <div className="bg-light mt-4 p-2">
                <span className="border rounded bg-warning bg-opacity-25 p-1" style={{ color: '#F06548' }}><i className="bi bi-circle-fill me-2"></i>Akan Datang</span>
                <div className="d-flex row gap-5 justify-content-center mt-4">

                    {/* Card Tracer */}
                    <div className="card col-md-3 d-flex justify-content-center p-2 shadow-sm">
                        <img src="/bannertraser.jpg" alt="" />
                        <span className="mt-3">Politeknik LP3I Tasikmalaya</span>
                        <span className="mt-3">Tracer Study Alumni</span>
                        <span className="mt-3 text-danger">10-10-2020 - 11-02-2019</span>
                        <span className="text-secondary mt-3">* Skala Kegiatan</span>
                        <span className="">PSDKU</span>
                        <span className="text-secondary mt-3">* Tahun Lulusan</span>
                        <span>2014 - 2015</span>
                    </div>
                </div>
            </div>

            {/* Berakhir */}
            <div className="bg-light mt-4 p-2">
                <span className="border rounded bg-danger bg-opacity-25 p-1" style={{ color: '#E80000' }}><i className="bi bi-circle-fill me-2"></i>Berakhir</span>
                <div className="d-flex row gap-5 justify-content-center mt-4">

                    {/* Card Tracer */}
                    <div className="card col-md-3 d-flex justify-content-center p-2 shadow-sm">
                        <img src="/bannertraser.jpg" alt="" />
                        <span className="mt-3">Politeknik LP3I Tasikmalaya</span>
                        <span className="mt-3">Tracer Study Alumni</span>
                        <span className="mt-3 text-danger">10-10-2020 - 11-02-2019</span>
                        <span className="text-secondary mt-3">* Skala Kegiatan</span>
                        <span className="">PSDKU</span>
                        <span className="text-secondary mt-3">* Tahun Lulusan</span>
                        <span>2014 - 2015</span>
                    </div>

                    {/* Card Tracer */}
                    <div className="card col-md-3 d-flex justify-content-center p-2 shadow-sm">
                        <img src="/bannertraser.jpg" alt="" />
                        <span className="mt-3">Politeknik LP3I Tasikmalaya</span>
                        <span className="mt-3">Tracer Study Alumni</span>
                        <span className="mt-3 text-danger">10-10-2020 - 11-02-2019</span>
                        <span className="text-secondary mt-3">* Skala Kegiatan</span>
                        <span className="">PSDKU</span>
                        <span className="text-secondary mt-3">* Tahun Lulusan</span>
                        <span>2014 - 2015</span>
                    </div>

                    {/* Card Tracer */}
                    <div className="card col-md-3 d-flex justify-content-center p-2 shadow-sm">
                        <img src="/bannertraser.jpg" alt="" />
                        <span className="mt-3">Politeknik LP3I Tasikmalaya</span>
                        <span className="mt-3">Tracer Study Alumni</span>
                        <span className="mt-3 text-danger">10-10-2020 - 11-02-2019</span>
                        <span className="text-secondary mt-3">* Skala Kegiatan</span>
                        <span className="">PSDKU</span>
                        <span className="text-secondary mt-3">* Tahun Lulusan</span>
                        <span>2014 - 2015</span>
                    </div>
                </div>
            </div>

            {/* Selesai */}
            <div className="bg-light mt-4 p-2">
                <span className="border rounded bg-success bg-opacity-25 p-1" style={{ color: '#0AB39C' }}><i className="bi bi-circle-fill me-2"></i>Selesai</span>
                <div className="d-flex row gap-5 justify-content-center mt-4">

                    {/* Card Tracer */}
                    <div className="card col-md-3 d-flex justify-content-center p-2 shadow-sm">
                        <img src="/bannertraser.jpg" alt="" />
                        <span className="mt-3">Politeknik LP3I Tasikmalaya</span>
                        <span className="mt-3">Tracer Study Alumni</span>
                        <span className="mt-3 text-danger">10-10-2020 - 11-02-2019</span>
                        <span className="text-secondary mt-3">* Skala Kegiatan</span>
                        <span className="">PSDKU</span>
                        <span className="text-secondary mt-3">* Tahun Lulusan</span>
                        <span>2014 - 2015</span>
                        <button className="btn btn-primary mt-3">Preview</button>
                    </div>

                    {/* Card Tracer */}
                    <div className="card col-md-3 d-flex justify-content-center p-2 shadow-sm">
                        <img src="/bannertraser.jpg" alt="" />
                        <span className="mt-3">Politeknik LP3I Tasikmalaya</span>
                        <span className="mt-3">Tracer Study Alumni</span>
                        <span className="mt-3 text-danger">10-10-2020 - 11-02-2019</span>
                        <span className="text-secondary mt-3">* Skala Kegiatan</span>
                        <span className="">PSDKU</span>
                        <span className="text-secondary mt-3">* Tahun Lulusan</span>
                        <span>2014 - 2015</span>
                        <button className="btn btn-primary mt-3">Preview</button>
                    </div>

                    {/* Card Tracer */}
                    <div className="card col-md-3 d-flex justify-content-center p-2 shadow-sm">
                        <img src="/bannertraser.jpg" alt="" />
                        <span className="mt-3">Politeknik LP3I Tasikmalaya</span>
                        <span className="mt-3">Tracer Study Alumni</span>
                        <span className="mt-3 text-danger">10-10-2020 - 11-02-2019</span>
                        <span className="text-secondary mt-3">* Skala Kegiatan</span>
                        <span className="">PSDKU</span>
                        <span className="text-secondary mt-3">* Tahun Lulusan</span>
                        <span>2014 - 2015</span>
                        <button className="btn btn-primary mt-3">Preview</button>
                    </div>
                    {/* Card Tracer */}
                    <div className="card col-md-3 d-flex justify-content-center p-2 shadow-sm">
                        <img src="/bannertraser.jpg" alt="" />
                        <span className="mt-3">Politeknik LP3I Tasikmalaya</span>
                        <span className="mt-3">Tracer Study Alumni</span>
                        <span className="mt-3 text-danger">10-10-2020 - 11-02-2019</span>
                        <span className="text-secondary mt-3">* Skala Kegiatan</span>
                        <span className="">PSDKU</span>
                        <span className="text-secondary mt-3">* Tahun Lulusan</span>
                        <span>2014 - 2015</span>
                        <button className="btn btn-primary mt-3">Preview</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
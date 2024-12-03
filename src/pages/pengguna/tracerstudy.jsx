import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosClient from '../../services/axiosClient';


export default function () {
    const [events, setEvents] = useState([]); // Menyimpan data event

    // Mengambil data event dari API
    const fetchEvent = async () => {
        try {
            const response = await axiosClient.get('/mahasiswa/tracer_mahasiswa/all')
            setEvents(response.data.data);
            console.log(response.data.data);

        } catch (err) {
            console.error("Error Feching Data:", err.message);

        }
    };

    useEffect(() => {
        fetchEvent();
    }, []);

    return (
        <div className="container mt-4">

            {/* Berlangsung */}
            <div className="bg-light p-2">
                <span className="border rounded bg-primary bg-opacity-25 p-1" style={{ color: '#00426D' }}>
                    <i className="bi bi-circle-fill me-2"></i>Berlangsung
                </span>
                <div className="d-flex row gap-5 justify-content-center mt-4">
                    {/* Mapping data events untuk menampilkan kartu */}
                    {events.length > 0 ? (
                        events.map((event, index) => (
                            <div key={index} className="card col-md-3 d-flex justify-content-center p-2 shadow-sm">
                                <img
                                    src={event?.id_detail?.banner ? `http://192.168.18.176:5000/${event.id_detail.banner}` : '/media/'}
                                    alt={event?.id_detail?.nama_kegiatan || 'Gambar tidak tersedia'}
                                    style={{ maxWidth: '100%', height: 'auto' }} // Untuk memastikan gambar responsif
                                />
                                <span className="mt-3">{event.id_detail.nama_kegiatan}</span>
                                <span className="mt-3">{event.id_detail.kategori_kegiatan}</span>
                                <span className="mt-3 text-danger">
                                    {new Date(event.id_detail.tanggal_mulai).toLocaleDateString()} -{" "}
                                    {new Date(event.id_detail.tanggal_berakhir).toLocaleDateString()}
                                </span>
                                {/* <span className="text-secondary mt-3">* Skala Kegiatan</span>
                                
                                <span className="text-secondary mt-3">* Tahun Lulusan</span> */}
                                {/* <span>{event.skala_kegiatan.tahun_lulusan}</span> */}
                                <Link to={`/pengguna/formtracer/${event._id}`}>
                                    <button className="mt-4 rounded btn btn-success col-md-12">Mulai</button>
                                </Link>
                            </div>
                        ))
                    ) : (
                        <div>Tidak ada event yang tersedia</div>
                    )}
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
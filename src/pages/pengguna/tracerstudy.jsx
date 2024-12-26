import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosClient from '../../services/axiosClient';

export default function CompletedEvents() {
    const [completedEvents, setCompletedEvents] = useState([]);

    // Fetch kegiatan yang sudah diselesaikan
    const fetchCompletedEvents = async () => {
        try {
            const response = await axiosClient.get('/tracerstudy/completed'); // Sesuaikan endpoint API
            if (response.data && response.data.data) {
                setCompletedEvents(response.data.data);
            } else {
                console.error("Tidak ada kegiatan yang selesai ditemukan.");
            }
        } catch (error) {
            console.error("Error fetching completed events:", error.message);
        }
    };

    // Memanggil fetchCompletedEvents saat komponen mount
    useEffect(() => {
        fetchCompletedEvents();
    }, []);

    return (
        <div className="container mt-4">
            {/* Selesai */}
            <div className="bg-light mt-4 p-2">
                <span className="border rounded bg-success bg-opacity-25 p-1" style={{ color: '#0AB39C' }}>
                    <i className="bi bi-circle-fill me-2"></i>Selesai
                </span>
                <div className="d-flex row gap-5 justify-content-center mt-4">
                    {/* Cek jika ada kegiatan yang sudah selesai */}
                    {completedEvents.length > 0 ? (
                        completedEvents.map((event, index) => (
                            <div key={index} className="card col-md-3 col-9 col-sm-8 d-flex justify-content-center p-2 shadow-sm">
                                <img
                                    src={event?.id_detail?.banner ? `http://192.168.18.176:5000/${event.id_detail.banner}` : '/media/'}
                                    alt={event?.id_detail?.nama_kegiatan || 'Gambar tidak tersedia'}
                                    style={{ maxWidth: '100%', height: 'auto' }}
                                />
                                <span className="mt-3">{event.id_detail.nama_kegiatan}</span>
                                <span className="mt-3">{event.id_detail.kategori_kegiatan}</span>
                                <span className="mt-3 text-danger">
                                    {new Date(event.id_detail.tanggal_mulai).toLocaleDateString()} -{" "}
                                    {new Date(event.id_detail.tanggal_berakhir).toLocaleDateString()}
                                </span>
                                <span className="text-secondary mt-3">* Skala Kegiatan</span>
                                <span>{event.skala_kegiatan || 'Skala Kegiatan Tidak Tersedia'}</span>
                                <span className="text-secondary mt-3">* Tahun Lulusan</span>
                                <span>{event.tahun_lulusan || 'Tahun Lulusan Tidak Tersedia'}</span>
                                <Link to={`/pengguna/formtracer/${event._id}`}>
                                    <div className="text-center">
                                        <button className="btn btn-primary mt-3 col-md-12 col-12 col-sm-12">Preview</button>
                                    </div>
                                </Link>
                            </div>
                        ))
                    ) : (
                        <div>Tidak ada kegiatan yang selesai.</div>
                    )}
                </div>
            </div>
        </div>
    );
}

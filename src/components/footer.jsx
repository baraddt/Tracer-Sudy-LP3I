import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-light py-4 mt-lg-5">
            <div className="container">
                <div className="row">
                    {/* Kolom Kiri: Logo, Tagline, dan Sosial Media */}
                    <div className="col-md-4 d-flex flex-column align-items-start">
                        <div className="d-flex align-items-center mb-5">
                            <img
                                src="/logo-lp3i.png"
                                alt="Logo LP3I"
                                width="auto"
                                height="50"
                                className="me-3"
                            />
                            <img
                                src="/tagline-lp3i.png"
                                alt="Tagline"
                                width="auto"
                                height="50"
                            />
                        </div>

                        {/* Ikon Sosial Media */}
                        <div className="d-flex">
                            <i className='bi bi-instagram me-4'></i>
                            <i className='bi bi-facebook me-4'></i>
                            <i className='bi bi-youtube me-4'></i>
                            <i className='bi bi-twitter me-4'></i>
                            <i className='bi bi-linkedin me-4'></i>
                            <i className='bi bi-geo-alt-fill'></i>
                        </div>
                    </div>

                    {/* Kolom Tengah: Teks Navigasi */}
                    <div className="col-md-4 text-center">
                        <p className="mb-1" style={{ color : '#00426D'}}>Telusuri</p>
                        <p className="mb-1" style={{ color : '#00426D'}}>Tentang Politeknik LP3I</p>
                        <p className="mb-1" style={{ color : '#00426D'}}>Program Study</p>
                    </div>

                    {/* Kolom Kanan: Kosong atau Konten Tambahan */}
                    <div className="col-md-4 d-flex justify-content-end">
                        <img src="/slogan-lp3i.png" alt="Slogan LP3I" width="auto" height="80" />
                    </div>

                </div>

                {/* Copyright */}
                <div className="row mt-4">
                    <div className="col text-center">
                        <p className="float-start mb-0">
                            &copy; {new Date().getFullYear()} Channa Striatas Mediatek. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

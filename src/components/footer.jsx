import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-light py-4 mt-lg-5 mt-5">
            <div className="container">
                <div className="container">
                    <div className="row d-flex align-items-center">
                        {/* Kolom Kiri */}
                        <div className="col-12 col-md-4 d-flex flex-column align-items-md-start align-items-sm-center align-items-center mb-4 mb-md-0">
                            <div className="d-flex align-items-center mb-3">
                                <img
                                    src="/logo-lp3i.png"
                                    alt="Logo LP3I"
                                    height="50"
                                    className="me-3"
                                />
                                <img
                                    src="/tagline-lp3i.png"
                                    alt="Tagline"
                                    height="50"
                                />
                            </div>
                            <div className="d-flex">
                                <i className="bi bi-instagram me-3"></i>
                                <i className="bi bi-facebook me-3"></i>
                                <i className="bi bi-youtube me-3"></i>
                                <i className="bi bi-twitter me-3"></i>
                                <i className="bi bi-linkedin me-3"></i>
                                <i className="bi bi-geo-alt-fill"></i>
                            </div>
                        </div>

                        {/* Kolom Tengah */}
                        <div className="col-12 col-md-4 text-center mb-4 mb-md-0">
                            <p className="mb-1" style={{ color: "#00426D" }}>Telusuri</p>
                            <p className="mb-1" style={{ color: "#00426D" }}>Tentang Politeknik LP3I</p>
                            <p className="mb-1" style={{ color: "#00426D" }}>Program Study</p>
                        </div>

                        {/* Kolom Kanan */}
                        <div className="col-12 col-md-4 d-flex justify-content-center justify-content-sm-center justify-content-md-end">
                            <img
                                src="/slogan-lp3i.png"
                                alt="Slogan LP3I"
                                height="80"
                            />
                        </div>
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

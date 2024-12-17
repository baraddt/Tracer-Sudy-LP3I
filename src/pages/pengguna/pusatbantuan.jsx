import React, { useState } from 'react';

export default function HelpCenter() {
    const [showModal, setShowModal] = useState(false);

    const handleSend = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    const [dataFaq, setDataFaq] = useState([
        {
            que: 'Apa itu FAQ?',
            answ: 'FAQ adalah singkatan dari Frequently Asked Questions atau daftar pertanyaan yang sering diajukan.'
        },
        {
            que: 'Bagaimana cara mencari informasi di FAQ?',
            answ: 'Anda dapat menggunakan kolom pencarian di atas untuk menemukan pertanyaan yang relevan dengan cepat.'
        },
        {
            que: 'Apa yang harus dilakukan jika tidak menemukan jawaban?',
            answ: 'Jika Anda tidak menemukan jawaban, Anda dapat menghubungi tim kami melalui halaman kontak.'
        }
    ])

    return (
        // <div className='text-center mt-5'>
        //     <h1 className='blinking-color-changing-text'>This Page is Maintenance</h1>
        // </div>
        // <div className="container mt-4">
        //     <div className="bg-white rounded p-3">
        //         <h4 className="text-center">Pusat Bantuan</h4>
        //         <div className="d-flex justify-content-between">
        //             <div>
        //                 <label className="me-5 col-auto">
        //                     Nama
        //                     <input
        //                         className="form-control rounded"
        //                         placeholder="Masukkan Nama"
        //                     />
        //                 </label>
        //                 <label>
        //                     Email <br />
        //                     <input
        //                         className="form-control rounded"
        //                         placeholder="Masukkan Email Aktif !"
        //                     />
        //                 </label> <br />
        //                 <label className="mt-5">
        //                     Judul Permasalahan <br />
        //                     <input
        //                         className="form-control rounded"
        //                         placeholder="Masukkan Judul"
        //                     />
        //                 </label> <br />
        //                 <label className="mt-5">
        //                     Deskripsi <br />
        //                     <textarea
        //                         className="form-control rounded"
        //                         placeholder="Masukkan Deskripsi Dengan Jelas"
        //                         rows="4"
        //                         style={{ width: '250%' }}
        //                     />
        //                 </label>
        //             </div>
        //             <img className="me-5" src="/pusatbantuan.png" alt="" width='auto' height='150px' />
        //         </div>
        //         <div className="text-end p-2 me-5 mt-5">
        //             <button onClick={handleSend} className="btn btn-success p-2 col-md-3">Kirim</button>
        //         </div>
        //     </div>

        //     {/* Modal */}
        //     {showModal && (
        //         <>
        //             <div className="modal d-block" tabIndex="-1" style={{ zIndex: 1055 }}>
        //                 <div className="modal-dialog modal-dialog-centered">
        //                     <div className="modal-content text-center">
        //                         <div className="modal-header bg-primary text-white">
        //                             <h5 className="modal-title">Pengiriman Berhasil</h5>
        //                             <button type="button" className="btn-close" onClick={handleClose}></button>
        //                         </div>
        //                         <div className="modal-body">
        //                             {/* Animasi centang hijau menggunakan SVG */}
        //                             <svg
        //                                 xmlns="http://www.w3.org/2000/svg"
        //                                 width="100"
        //                                 height="100"
        //                                 viewBox="0 0 24 24"
        //                                 className="checkmark-animation"
        //                             >
        //                                 <path
        //                                     fill="none"
        //                                     d="M0 0h24v24H0z"
        //                                 />
        //                                 <path
        //                                     fill="none"
        //                                     stroke="#28a745"
        //                                     strokeWidth="2"
        //                                     strokeLinecap="round"
        //                                     strokeLinejoin="round"
        //                                     d="M5 13l4 4L19 7"
        //                                 />
        //                             </svg>
        //                             <p className="mt-3">Terima kasih! Permasalahan Anda telah terkirim.</p>
        //                         </div>
        //                         <div className="modal-footer">
        //                             <button type="button" className="btn btn-secondary" onClick={handleClose}>
        //                                 Tutup
        //                             </button>
        //                         </div>
        //                     </div>
        //                 </div>
        //             </div>
        //             <div className="modal-backdrop show" style={{ position: 'fixed', zIndex: 1040 }}></div>
        //         </>
        //     )}
        // </div>

        <div className="container mt-4">
            <div className="bg-white rounded p-3">
                <h4 className="text-center">Frequently Asked Questions (FAQ)</h4>
                <div className="d-flex justify-content-between">
                    <div>
                        <label className="me-5 col-auto">
                            Pertanyaan Umum
                            <input
                                className="form-control rounded"
                                placeholder="Cari Pertanyaan"
                            />
                        </label>
                    </div>
                </div>
                <div className="mt-4">
                    <h5>Daftar Pertanyaan</h5>
                    <div className="accordion" id="faqAccordion">
                        {dataFaq.map((item, index) => {
                            return (
                                <div className="accordion-item" key={index}>
                                    <h2 className="accordion-header" id={`heading${index}`}>
                                        <button
                                            className="accordion-button"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target={`#collapse${index}`}
                                            aria-expanded="true"
                                            aria-controls={`collapse${index}`}
                                        >
                                            {item.que}
                                        </button>
                                    </h2>
                                    <div
                                        id={`collapse${index}`}
                                        className="accordion-collapse collapse show"
                                        aria-labelledby={`heading${index}`}
                                        data-bs-parent="#faqAccordion"
                                    >
                                        <div className="accordion-body">
                                            {item.answ}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

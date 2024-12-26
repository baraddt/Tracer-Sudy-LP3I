import React from 'react';
import { useLocation } from 'react-router-dom';
import { jsPDF } from 'jspdf';

const PdfViewer = () => {
    const { state } = useLocation();
    const { tracerDetail } = state || {};

    const generatePdf = () => {
        if (!tracerDetail) {
            console.error('Tracer detail not found');
            return;
        }

        const doc = new jsPDF();

        // Tambahkan konten ke dalam PDF
        doc.text("Data Tracer", 20, 20);
        // Cek apakah tracerDetail memiliki data yang diperlukan
        doc.text(`${tracerDetail.id_detail.nama_kegiatan}`, 20, 30);
        doc.text(`${tracerDetail.id_detail.tanggal_berakhir}`, 20, 60);
        doc.text(`${tracerDetail.id_detail.tanggal_mulai}`, 20, 70);
        doc.text(`Skala Kegiatan: ${tracerDetail.skala_kegiatan.skala_kegiatan}`, 20, 40);

        // Membuka PDF di tab baru untuk preview
        const pdfOutput = doc.output('bloburl');
        const newTab = window.open(pdfOutput, '_blank');  // Membuka PDF di tab baru

        // Memberikan kesempatan untuk mendownload PDF setelah preview
        newTab.onload = () => {
            newTab.document.title = "Preview Tracer Report";
            const downloadButton = newTab.document.createElement('button');
            downloadButton.innerHTML = 'Download PDF';
            downloadButton.className = 'btn btn-success';
            downloadButton.onclick = () => {
                doc.save('tracer-report.pdf');
            };
            newTab.document.body.appendChild(downloadButton);  // Menambahkan tombol download
        };
    };

    return (
        <div className="p-4">
            <div className="bg-white shadow rounded p-4 text-center" style={{ maxWidth: '600px', width: '100%' }}>
                <h5 className="mb-3">Preview Laporan Tracer</h5>
                <button className="btn btn-success" onClick={generatePdf}>
                    <i className="bi bi-file-earmark-pdf"></i> Preview PDF
                </button>
            </div>
        </div>
    );
};

export default PdfViewer;

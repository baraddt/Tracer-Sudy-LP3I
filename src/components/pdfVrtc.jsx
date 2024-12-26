import React, { useRef, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const PdfVrtc = () => {
    const location = useLocation();
    const { dataVertical } = location.state || {}; // Ambil dataTabel dari state

    const contentRef = useRef(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (dataVertical) {
            // Delay 1 detik untuk menyiapkan PDF setelah data diterima
            setTimeout(() => {
                generatePDF();
            }, 1000); // Delay 1 detik
        }
    }, [dataVertical]);

    const generatePDF = async () => {
        setLoading(true);

        try {
            const element = contentRef.current;

            // Ukuran halaman PDF (A4)
            const pageWidth = 210; // dalam mm untuk A4
            const pageHeight = 297; // dalam mm untuk A4
            const marginLeft = 10; // Margin kiri
            const marginTop = 10; // Margin atas
            const marginBottom = 10; // Margin bawah
            const contentWidth = pageWidth - marginLeft * 2; // Lebar konten
            const contentHeight = pageHeight - marginTop - marginBottom; // Tinggi konten

            // Render elemen HTML ke canvas dengan html2canvas
            const canvas = await html2canvas(element, {
                scale: 2, // Memperbaiki resolusi untuk PDF
                useCORS: true,
            });

            const imgData = canvas.toDataURL('image/png');
            const imgWidth = contentWidth; // Gambar disesuaikan ke area konten
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

            const pdf = new jsPDF('p', 'mm', 'a4');

            let y = marginTop; // Posisi vertikal dimulai dengan margin atas
            let pageNumber = 1;

            // Proses gambar dan menambahkannya ke PDF
            while (y < imgHeight) {
                pdf.addImage(
                    imgData,
                    'PNG',
                    marginLeft, // Margin kiri untuk setiap halaman
                    y, // Posisi vertikal untuk setiap halaman
                    imgWidth,
                    imgHeight
                );

                // Tambahkan footer dengan nomor halaman
                pdf.text(
                    `Halaman ${pageNumber}`,
                    pageWidth / 2,
                    pageHeight - marginBottom, // Margin bawah untuk footer
                    { align: 'center' }
                );

                // Perbarui posisi y untuk halaman berikutnya
                y += contentHeight;

                // Jika masih ada konten yang perlu ditambahkan, buat halaman baru
                if (y < imgHeight) {
                    pdf.addPage(); // Tambahkan halaman baru
                    pageNumber++;
                    y = marginTop; // Reset posisi vertikal untuk halaman berikutnya
                }
            }

            // Output PDF sebagai Blob URL untuk pratinjau
            const pdfUrl = pdf.output('bloburl');
            window.open(pdfUrl, '_blank'); // Buka di tab baru
        } catch (error) {
            console.error('Error generating PDF:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="container mt-4" ref={contentRef}>
                {/* Tabel dengan dataTabel */}
                <h1 className="text-center mb-4">Laporan Tracer Study Keselarasan Vertical</h1>
                <table className="table mt-4">
                    <thead className="table-secondary">
                        <tr>
                            <th rowSpan="2" className='fw-semibold text-dark text-truncate'>Tahun Lulusan</th>
                            <th rowSpan="2" className='fw-semibold text-dark'>Jenjang</th>
                            <th rowSpan="2" className='fw-semibold text-dark text-truncate'>Program Studi</th>
                            <th colSpan="6" className='text-center fw-semibold text-dark'>Keselarasan Vertical</th>
                        </tr>
                        <tr>
                            <th colSpan="2" className="text-center fw-semibold text-dark" style={{ fontSize: '14px' }}>Tinggi</th>
                            <th colSpan="2" className="text-center fw-semibold text-dark" style={{ fontSize: '14px' }}>Sama</th>
                            <th colSpan="2" className="text-center fw-semibold text-dark" style={{ fontSize: '14px' }}>Rendah</th>
                        </tr>
                        <tr>
                            <th colSpan="3"></th>
                            <th className="text-center fw-semibold text-dark" style={{ fontSize: '14px' }}>Jumlah</th>
                            <th className="text-center fw-semibold text-dark" style={{ fontSize: '14px' }}>Persentase</th>
                            <th className="text-center fw-semibold text-dark" style={{ fontSize: '14px' }}>Jumlah</th>
                            <th className="text-center fw-semibold text-dark" style={{ fontSize: '14px' }}>Persentase</th>
                            <th className="text-center fw-semibold text-dark" style={{ fontSize: '14px' }}>Jumlah</th>
                            <th className="text-center fw-semibold text-dark" style={{ fontSize: '14px' }}>Persentase</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataVertical.map((item, index) => (
                            <tr key={index}>
                                <td className="text-dark">{item.tahun}</td>
                                <td className="text-dark">{item.jenjang}</td>
                                <td className="text-dark text-truncate">{item.program}</td>
                                <td className="text-center text-dark">{item.tinggiJumlah}</td>
                                <td className="text-center text-dark">{item.tinggiPersen}</td>
                                <td className="text-center text-dark">{item.samaJumlah}</td>
                                <td className="text-center text-dark">{item.samaPersen}</td>
                                <td className="text-center text-dark">{item.rendahJumlah}</td>
                                <td className="text-center text-dark">{item.rendahPersen}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PdfVrtc;

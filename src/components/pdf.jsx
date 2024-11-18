import React, { useRef, useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const App = () => {
    const contentRef = useRef(null);
    const [loading, setLoading] = useState(false);

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
                {/* Konten yang akan dirender ke PDF */}
                <h1 className="text-center mb-4">Laporan Tracer Study</h1>
                <div>
                    <h2>A. Latar Belakang</h2>
                    <p>
                        Tracer Study merupakan salah satu metode yang digunakan oleh institusi
                        pendidikan tinggi untuk melacak dan menganalisis perkembangan karir para
                        alumninya setelah lulus dari kampus. Politeknik LP3I, sebagai salah satu
                        institusi pendidikan vokasi terkemuka, berkomitmen untuk mencetak lulusan
                        yang siap bersaing di dunia kerja. Melalui kegiatan Tracer Study, Politeknik
                        LP3I berupaya memahami bagaimana alumni menerapkan keterampilan dan
                        pengetahuan yang mereka peroleh serta bagaimana relevansi pendidikan yang
                        mereka terima terhadap karir mereka saat ini.
                    </p>
                    <h2>B. Tujuan Kegiatan</h2>
                    <p>
                        Tracer Study bertujuan untuk mendapatkan informasi yang berguna bagi
                        peningkatan kualitas pendidikan dan kurikulum di Politeknik LP3I. Dengan
                        mengetahui perjalanan karir alumni, institusi dapat menyesuaikan program
                        pendidikan agar lebih relevan dengan kebutuhan pasar kerja.
                    </p>
                    <h2>C. Manfaat Kegiatan</h2>
                    <p>
                        Hasil dari Tracer Study ini diharapkan dapat memberikan gambaran yang jelas
                        mengenai relevansi pendidikan di Politeknik LP3I dengan dunia kerja. Selain
                        itu, kegiatan ini juga membantu dalam pengembangan jaringan alumni yang
                        mendukung kemajuan institusi.
                    </p>
                </div>
            </div>

            {/* Tombol untuk menghasilkan PDF */}
            <div className="text-center mt-5">
                <button
                    onClick={generatePDF}
                    className="btn btn-primary"
                    disabled={loading}
                >
                    {loading ? 'Menyiapkan PDF...' : 'Lihat Dokumen'}
                </button>
            </div>
        </div>
    );
};

export default App;

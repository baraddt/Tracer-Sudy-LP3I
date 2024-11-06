import { Link } from 'react-router-dom';
import "react-quill/dist/quill.snow.css";

export default function () {


    const dummyData = [
        {
            question: "Seberapa relevan pendidikan Anda dengan kegiatan sehari-hari saat ini?",
            options: ["Sangat relevan", "Relevan", "Cukup relevan", "Tidak relevan"]
        },
        {
            question: "Apakah keterampilan yang Anda pelajari di pendidikan membantu dalam kegiatan sehari-hari?",
            options: ["Sangat membantu", "Membantu", "Cukup membantu", "Tidak membantu"]
        },
        {
            question: "Seberapa sering Anda menggunakan pengetahuan dari pendidikan dalam pekerjaan Anda?",
            options: ["Sangat sering", "Sering", "Jarang", "Tidak pernah"]
        },
        {
            question: "Apakah keterampilan komunikasi yang Anda pelajari di pendidikan berguna dalam kehidupan sehari-hari?",
            options: ["Sangat berguna", "Berguna", "Cukup berguna", "Tidak berguna"]
        },
        {
            question: "Seberapa besar pengaruh pendidikan Anda dalam membantu mengatasi masalah di tempat kerja?",
            options: ["Sangat besar", "Besar", "Cukup besar", "Tidak besar"]
        },
        {
            question: "Seberapa relevan kemampuan berpikir kritis dari pendidikan dengan tantangan yang Anda hadapi saat ini?",
            options: ["Sangat relevan", "Relevan", "Cukup relevan", "Tidak relevan"]
        },
        {
            question: "Apakah pendidikan Anda memberikan keterampilan teknis yang membantu dalam menyelesaikan tugas sehari-hari?",
            options: ["Sangat membantu", "Membantu", "Cukup membantu", "Tidak membantu"]
        }
    ];

    return (
        <div className="container rounded my-4 bg-white">


            {/* Banner/Flyer */}
            <div className="form-group">
                <label className='border rounded bg-primary bg-opacity-25 p-1 mt-2' style={{ fontSize: '13px', color: '#00426D' }}><i className='bi bi-circle-fill me-2'></i>Preview</label>
                <p className="mt-5" style={{ fontSize: '25px', color: '#00426D' }}>Analisis Kesuksesan alumni terhadap dunia lain</p>
                <p className="text-secondary" style={{ fontSize: '15px' }}>Dibuat oleh | Kampus Utama Politeknik LP3I | 13 Oktober 2024 13:45:53</p>
            </div>

            {/* Skala Kegiatan */}
            <div>
                <label className='border rounded bg-primary bg-opacity-25 p-1 me-2' style={{ color: '#00426D' }}>PSDKU</label>
                <label className='border rounded bg-primary bg-opacity-25 p-1' style={{ color: '#00426D' }}>Nasional</label>
            </div>

            {/* Button Navigasi*/}
            <div className='d-flex gap-5 mt-4'>
                <Link to='/super_admin/tracerstudy-preview'>
                    <button className='border-0 bg-transparent'>Detail Kegiatan</button>
                </Link>

                <Link to='/super_admin/tracerstudy-preview-kuesioner'>
                    <button className='border-0 border-bottom bg-transparent'>Kuesioner</button>
                </Link>

                <Link to='/super_admin/tracerstudy-preview-responden'>
                    <button className='border-0 bg-transparent'>Responden</button>
                </Link>
            </div>


            {/* Preview Section */}
            <div className="preview mt-5">
                <label style={{ fontSize: '19px' }}>Preview</label>
                <p className="text-secondary" style={{ fontSize: '13px' }}>
                    Tampilan pertanyaan dan opsi jawaban:
                </p>
                <div className="d-flex flex-wrap">
                    {dummyData.map((item, index) => (
                        <div key={index} className="mb-4" style={{ width: '300px', marginRight: '20px' }}>
                            <p style={{ fontSize: '13px' }}>{index + 1}. {item.question}</p>
                            <ul style={{ fontSize: '13px' }} className="list-unstyled">
                                {item.options.map((option, optIndex) => (
                                    <li key={optIndex} className="d-flex align-items-center mb-2">
                                        <input type="radio" disabled className="me-2" />
                                        <label>{option}</label>
                                    </li>
                                ))}
                                <div className='d-flex justify-content-end'>
                                    <button className='border-0 bg-transparent'><i className='bi bi-pencil-fill'></i></button>
                                    <button className='border-0 bg-transparent'><i className='bi bi-trash-fill'></i></button>
                                </div>
                            </ul>
                        </div>
                    ))}
                </div>
            </div>


            {/* Buttons */}
            <div className="d-flex justify-content-between mt-4">
                <div>
                    <button type="button" className="btn btn-primary mb-3">Simpan ke Draft</button>
                </div>
                <div>
                    <Link to='/super_admin/tracerstudy-verifikasi-akhir'>
                        <button type="button" className="btn btn-danger mb-3 me-3">Batalkan</button>
                    </Link>
                    <Link to='/super_admin/tracerstudy'>
                        <button type="submit" className="btn btn-success mb-3">Publikasi</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
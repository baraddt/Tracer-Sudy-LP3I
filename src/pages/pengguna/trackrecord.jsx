import { Link } from 'react-router-dom';

export default function () {
    const questions = [
        {
            question: "Apakah materi kampus relevan dengan kebutuhan industri?",
            options: ["Sangat Selaras", "Selaras", "Cukup Selaras", "Kurang Selaras", "Tidak Selaras"],
        },
        {
            question: "Seberapa baik kampus mempersiapkan mahasiswa untuk dunia kerja?",
            options: ["Sangat Baik", "Baik", "Cukup Baik", "Kurang Baik", "Tidak Baik"],
        },
        {
            question: "Apakah kurikulum kampus Anda mencakup teknologi terbaru yang digunakan di industri?",
            options: ["Sangat Selaras", "Selaras", "Cukup Selaras", "Kurang Selaras", "Tidak Selaras"],
        },
        {
            question: "Apakah materi yang diajarkan di kampus sesuai dengan kebutuhan soft skill di industri?",
            options: ["Sangat Sesuai", "Sesuai", "Cukup Sesuai", "Kurang Sesuai", "Tidak Sesuai"],
        },
        {
            question: "Apakah fasilitas kampus mendukung pembelajaran berbasis industri?",
            options: ["Sangat Mendukung", "Mendukung", "Cukup Mendukung", "Kurang Mendukung", "Tidak Mendukung"],
        },
        {
            question: "Apakah fasilitas kampus mendukung pembelajaran berbasis industri?",
            options: ["Sangat Mendukung", "Mendukung", "Cukup Mendukung", "Kurang Mendukung", "Tidak Mendukung"],
        },
        {
            question: "Apakah fasilitas kampus mendukung pembelajaran berbasis industri?",
            options: ["Sangat Mendukung", "Mendukung", "Cukup Mendukung", "Kurang Mendukung", "Tidak Mendukung"],
        },
        {
            question: "Apakah fasilitas kampus mendukung pembelajaran berbasis industri?",
            options: ["Sangat Mendukung", "Mendukung", "Cukup Mendukung", "Kurang Mendukung", "Tidak Mendukung"],
        },
        {
            question: "Apakah fasilitas kampus mendukung pembelajaran berbasis industri?",
            options: ["Sangat Mendukung", "Mendukung", "Cukup Mendukung", "Kurang Mendukung", "Tidak Mendukung"],
        },
        {
            question: "Apakah fasilitas kampus mendukung pembelajaran berbasis industri?",
            options: ["Sangat Mendukung", "Mendukung", "Cukup Mendukung", "Kurang Mendukung", "Tidak Mendukung"],
        },
        {
            question: "Apakah fasilitas kampus mendukung pembelajaran berbasis industri?",
            options: ["Sangat Mendukung", "Mendukung", "Cukup Mendukung", "Kurang Mendukung", "Tidak Mendukung"],
        },
        {
            question: "Apakah fasilitas kampus mendukung pembelajaran berbasis industri?",
            options: ["Sangat Mendukung", "Mendukung", "Cukup Mendukung", "Kurang Mendukung", "Tidak Mendukung"],
        },
        {
            question: "Apakah fasilitas kampus mendukung pembelajaran berbasis industri?",
            options: ["Sangat Mendukung", "Mendukung", "Cukup Mendukung", "Kurang Mendukung", "Tidak Mendukung"],
        },
        {
            question: "Apakah fasilitas kampus mendukung pembelajaran berbasis industri?",
            options: ["Sangat Mendukung", "Mendukung", "Cukup Mendukung", "Kurang Mendukung", "Tidak Mendukung"],
        },
        {
            question: "Apakah fasilitas kampus mendukung pembelajaran berbasis industri?",
            options: ["Sangat Mendukung", "Mendukung", "Cukup Mendukung", "Kurang Mendukung", "Tidak Mendukung"],
        },
        {
            question: "Apakah fasilitas kampus mendukung pembelajaran berbasis industri?",
            options: ["Sangat Mendukung", "Mendukung", "Cukup Mendukung", "Kurang Mendukung", "Tidak Mendukung"],
        },
    ];
    return (
        <div className="container mt-4">
            <div className="bg-white rounded p-3">
                <h4 className="text-dark">Track Record Anda di Event :</h4>
                <span className="text-dark">"Survey Keselarasan Kampus dengan Industri"</span>
            </div>
            <div className="bg-white rounded p-3 mt-4">
                <h4 className="text-dark">*Dibawah ini adalah soal dan jawaban anda terkait event yang anda ikuti :</h4><hr />
                <div className="container">
                    <div className="row">
                        {questions.map((item, index) => (
                            <div className="col-4 mb-4" key={index}>
                                <div className="card p-3 h-100">
                                    <span className="fw-regular text-dark">{index + 1}. {item.question}</span>
                                    {item.options.map((option, idx) => (
                                        <span key={idx} className="ms-3 d-block fw-regular text-dark">{String.fromCharCode(65 + idx)}. {option}</span>
                                    ))}
                                    <div className="mt-3">
                                        <span className="fw-regular text-dark">*Jawaban: </span>
                                        <span>{String.fromCharCode(65 + item.options.length - 1)}. {item.options[item.options.length - 1]}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <Link to='/pengguna/tracerstudy'>
                        <button className="btn btn-primary">Kembali</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
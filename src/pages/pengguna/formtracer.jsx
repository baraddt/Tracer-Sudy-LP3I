import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosClient from '../../services/axiosClient';

export default function FormTracer() {
    const { id_tracer } = useParams(); // Ambil id_tracer dari URL
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch soal berdasarkan id_tracer
        const fetchQuestions = async () => {
            try {
                const response = await axiosClient.get(`/mahasiswa/soal_mahasiswa/${id_tracer}`);
                setQuestions(response.data.data);
                console.log(response.data.data);

            } catch (error) {
                console.error("Error fetching questions:", error);
            }
        };

        fetchQuestions(); // Panggil API jika ID tersedia
    }, [id_tracer]);

    const handleQuickNavigation = (index) => {
        setCurrentQuestion(index);
    };

    const handleNext = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        }
    };

    const handlePrevious = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
        }
    };

    const handleAnswer = (questionId, answer) => {
        setAnswers({
            ...answers,
            [questionId]: answer,
        });
    };


    const handleSubmit = async () => {
        try {

            // Menyiapkan data yang akan dikirimkan
            const dataToSend = {
                jawaban: questions.map((question) => {
                    const selectedAnswer = answers[question._id];
                    const selectedOption = question.jawaban.find(option => option.jawaban === selectedAnswer);

                    // Pastikan data yang dikirim mengikuti format yang diminta
                    return {
                        id_soal: question._id,
                        jawaban: selectedAnswer,
                        bobot_jawaban: selectedOption ? selectedOption.bobot_jawaban : 0,
                    };
                })
            };

            // Debugging: Menampilkan data yang akan dikirim
            console.log('Data yang akan dikirim:', dataToSend);

            // Kirim data ke server
            const response = await axiosClient.post(`/mahasiswa/submit`, dataToSend);

            // Respons dari server
            console.log('Respons dari server:', response.data);

            // Redirect setelah submit jika berhasil
            navigate('/pengguna/dashboard');

        } catch (error) {
            console.error("Error submitting answers:", error);
            if (error.response) {
                console.error('Respons error:', error.response.data);
            } else {
                console.error('Error message:', error.message);
            }
        }
    };

    return (
        <div className="container py-5">
            <h2 className="mb-4">Form Pengisian Kuesioner</h2>
            <div className="row">
                {/* Left Section */}
                <div className="col-md-8">
                    <div className="form-container p-4 rounded shadow-sm bg-white">
                        {Array.isArray(questions) && questions.length > 0 ? (
                            <>
                                <div className="question-box mb-4">
                                    <p>{currentQuestion + 1}. {questions[currentQuestion].soal}</p>
                                </div>
                                <div className="row">
                                    {Array.isArray(questions[currentQuestion].jawaban) && questions[currentQuestion].jawaban.map((option, index) => (
                                        <label key={index} className="mt-3">
                                            <input
                                                type="radio"
                                                name={`question-${questions[currentQuestion]._id}`} // Gunakan _id sebagai nama untuk radio button
                                                value={option.jawaban}
                                                className='me-2'
                                                onChange={() => handleAnswer(questions[currentQuestion]._id, option.jawaban)}
                                                checked={answers[questions[currentQuestion]._id] === option.jawaban}
                                            /> {option.jawaban}
                                        </label>
                                    ))}
                                </div>
                                <div className="mt-4 text-end">
                                    <button
                                        className="btn btn-outline-secondary me-2"
                                        onClick={handlePrevious}
                                        disabled={currentQuestion === 0}
                                    >
                                        Sebelumnya
                                    </button>
                                    {currentQuestion === questions.length - 1 ? (
                                        <button className="btn btn-success" onClick={handleSubmit}>
                                            Selesai
                                        </button>
                                    ) : (
                                        <button
                                            className="btn btn-outline-success"
                                            onClick={handleNext}
                                            disabled={currentQuestion === questions.length - 1}
                                        >
                                            Selanjutnya
                                        </button>
                                    )}
                                </div>
                            </>
                        ) : (
                            <p>Loading...</p> // Tampilkan pesan loading jika questions belum terisi dengan benar
                        )}
                    </div>
                </div>

                {/* Right Section */}
                <div className="col-md-4">
                    {/* Answers Section */}
                    <div className="form-container p-4 mt-4 rounded shadow-sm bg-white">
                        <h5>Jawaban</h5>
                        <div className="d-flex flex-wrap">
                            {Array.isArray(questions) && questions.length > 0 ? (
                                questions.map((question, index) => (
                                    <span
                                        key={question._id} // Gunakan _id untuk key unik
                                        className={`btn m-2 ${answers[question._id] ? 'btn-success' : 'btn-danger'}`}
                                        onClick={() => handleQuickNavigation(index)} // Navigasi cepat ke soal tertentu
                                    >
                                        {index + 1}
                                    </span>
                                ))
                            ) : (
                                <p>Loading...</p> // Tampilkan pesan loading jika questions belum terisi dengan benar
                            )}
                        </div>

                        {currentQuestion === questions.length - 1 && (
                            <button className="btn btn-success w-100 mt-3" onClick={handleSubmit}>
                                Selesai
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
import React, { useState } from "react";
import Swal from "sweetalert2";

const AdminFAQ = () => {
    const [faqList, setFaqList] = useState([]);
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [editIndex, setEditIndex] = useState(null);

    const handleRemoveClick = (index) => {
        Swal.fire({
            title: "Yakin ingin menghapus?",
            text: "Data FAQ ini akan dihapus permanen!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Ya, hapus!",
            cancelButtonText: "Batal"
        }).then((result) => {
            if (result.isConfirmed) {
                // Panggil fungsi hapus jika user konfirmasi
                handleDeleteFAQ(index);

                // Tampilkan alert sukses
                Swal.fire({
                    title: "Dihapus!",
                    text: "Data FAQ telah dihapus.",
                    icon: "success",
                    timer: 1500,
                    showConfirmButton: false
                });
            }
        });
    };

    // Tambah atau Simpan FAQ
    const handleAddOrSaveFAQ = () => {
        if (question && answer) {
            if (editIndex !== null) {
                // Mode Edit
                const updatedFAQ = [...faqList];
                updatedFAQ[editIndex] = { que: question, answ: answer };
                setFaqList(updatedFAQ);
                setEditIndex(null);
            } else {
                // Mode Tambah
                setFaqList([...faqList, { que: question, answ: answer }]);
            }
            setQuestion(""); // Reset input pertanyaan
            setAnswer(""); // Reset input jawaban
        }
    };

    // Fungsi Edit FAQ
    const handleEditFAQ = (index) => {
        setQuestion(faqList[index].que);
        setAnswer(faqList[index].answ);
        setEditIndex(index);
    };

    // Fungsi Delete FAQ
    const handleDeleteFAQ = (index) => {
        const updatedFAQ = faqList.filter((_, i) => i !== index);
        setFaqList(updatedFAQ);
    };

    return (
        <div className="container mt-4">
            {/* Bagian Judul */}
            <div className="rounded bg-white p-3">
                <h4 className="mb-4 fw-semibold text-dark">
                    {editIndex !== null ? "Edit FAQ" : "Tambah FAQ"}
                </h4>

                {/* Form Input Pertanyaan dan Jawaban */}
                <div className="mb-3">
                    <label className="form-label">Pertanyaan</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Masukkan pertanyaan"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Jawaban</label>
                    <textarea
                        className="form-control"
                        placeholder="Masukkan jawaban"
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                    ></textarea>
                </div>

                {/* Tombol Tambah atau Simpan FAQ */}
                <div className="d-flex justify-content-end">
                    <button
                        className={`btn ${editIndex !== null ? "btn-warning" : "btn-success"}`}
                        onClick={handleAddOrSaveFAQ}
                    >
                        <i className={`bi ${editIndex !== null ? "bi-pencil" : "bi-plus"}`}></i>
                        {editIndex !== null ? " Simpan Perubahan" : " Tambah FAQ"}
                    </button>
                </div>
            </div>

            {/* Bagian Tabel FAQ */}
            <div className="rounded mt-4 bg-white p-3">
                <h5 className="mb-3 fw-semibold">Daftar FAQ</h5>
                {faqList.length === 0 ? (
                    <p className="text-muted">Belum ada FAQ yang ditambahkan.</p>
                ) : (
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Pertanyaan</th>
                                <th>Jawaban</th>
                                <th>Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {faqList.map((item, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.que}</td>
                                    <td>{item.answ}</td>
                                    <td>
                                        <button
                                            className="btn btn-warning btn-sm me-2"
                                            onClick={() => handleEditFAQ(index)}
                                        >
                                            <i className="bi bi-pencil"></i> Edit
                                        </button>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => handleRemoveClick(index)}
                                        >
                                            <i className="bi bi-trash"></i> Hapus
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default AdminFAQ;

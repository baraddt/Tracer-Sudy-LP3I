import { Link } from 'react-router-dom';

export default function () {
    return (
        <div className="container d-flex vh-100 align-items-center justify-content-center">
            <div className="card shadow p-4" style={{ maxWidth: "400px", width: "100%" }}>
                <div className="card-body">
                    <h4 className="card-title text-center mb-3">Verifikasi Kode</h4>
                    <p className="card-text text-center text-secondary">
                        Masukkan kode verifikasi yang telah kami kirim ke email atau nomor telepon Anda.
                    </p>
                    <form>
                        <div className="d-flex justify-content-center gap-2 mb-4">
                            <input
                                type="text"
                                maxLength="1"
                                className="form-control text-center"
                                style={{ width: "50px", height: "50px", fontSize: "1.5rem" }}
                                aria-label="Kode Verifikasi 1"
                            />
                            <input
                                type="text"
                                maxLength="1"
                                className="form-control text-center"
                                style={{ width: "50px", height: "50px", fontSize: "1.5rem" }}
                                aria-label="Kode Verifikasi 2"
                            />
                            <input
                                type="text"
                                maxLength="1"
                                className="form-control text-center"
                                style={{ width: "50px", height: "50px", fontSize: "1.5rem" }}
                                aria-label="Kode Verifikasi 3"
                            />
                            <input
                                type="text"
                                maxLength="1"
                                className="form-control text-center"
                                style={{ width: "50px", height: "50px", fontSize: "1.5rem" }}
                                aria-label="Kode Verifikasi 4"
                            />
                        </div>
                        <Link to='/newPw'>
                            <button type="submit" className="btn btn-primary w-100 mb-3">
                                Verifikasi
                            </button>
                        </Link>
                        <div className="text-center">
                            <small className="text-secondary">Tidak menerima kode?</small>{" "}
                            <a href="#" className="text-decoration-none">
                                Kirim ulang
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default function () {
    return (
        <div className="container d-flex vh-100 align-items-center justify-content-center">
            <div className="card shadow p-4" style={{ maxWidth: "400px", width: "100%" }}>
                <div className="card-body">
                    <h4 className="card-title text-center mb-3">Atur Kata Sandi Baru</h4>
                    <p className="card-text text-center text-secondary">
                        Silakan masukkan kata sandi baru Anda dan konfirmasi kembali.
                    </p>
                    <form>
                        <div className="mb-3">
                            <label htmlFor="newPassword" className="form-label">
                                Kata Sandi Baru
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                id="newPassword"
                                placeholder="Masukkan kata sandi baru"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="confirmPassword" className="form-label">
                                Konfirmasi Kata Sandi
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                id="confirmPassword"
                                placeholder="Masukkan kembali kata sandi baru"
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100 mb-3">
                            Simpan Kata Sandi
                        </button>
                        <div className="text-center">
                            <a href="/" className="text-decoration-none">
                                Kembali ke Login
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
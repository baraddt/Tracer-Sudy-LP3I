import { Link } from 'react-router-dom';
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";

export default function () {
    return (
        <div className="container rounded my-4 bg-white">
            {/* Progress Steps */}
            <div className="row mb-4">
                <div className="col">
                    <ul className="mt-3 gap-3 text-white nav nav-pills justify-content-center">
                        <li className="nav-item">
                            <span className="active border rounded bg-secondary bg-opacity-50 p-2">Detail Kegiatan</span>
                        </li>
                        <li className="nav-item">
                            <span className="active border rounded bg-secondary bg-opacity-50 p-2">Golongan Kegiatan</span>
                        </li>
                        <li className="nav-item">
                            <span className="active border rounded bg-secondary bg-opacity-50 p-2">Bank soal</span>
                        </li>
                        <li className="nav-item">
                            <span className="active border rounded bg-secondary bg-opacity-50 p-2">Kriteria Atensi</span>
                        </li>
                        <li className="nav-item">
                            <span className="active border rounded bg-primary bg-opacity-50 p-2">Preview</span>
                        </li>
                    </ul>
                </div>
            </div>
            
            {/* Banner/Flyer */}
            <div className="form-group">
                <label style={{ fontSize: '19px' }}>Banner/Flyer</label>
                <p className="text-secondary" style={{ fontSize: '13px' }}>Ukuran banner maximal 396x202</p>
                <input type="file" className="form-control mb-3 d-flex align-items-center justify-content-center border p-4" style={{ height: "150px" }} />
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
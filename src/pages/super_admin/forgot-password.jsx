import { Link } from 'react-router-dom';

export default function () {
    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="col-md-6 col-lg-4">
                <div className="card bg-white p-4">
                    <h4 className="text-center" style={{ color: '#00426D' }}>Forgot Password?</h4>
                    <span className="mt-5">Input Your Active Email!</span>

                    <div className="form-group my-3">
                        <input type="email" className="form-control" placeholder="Insert Your Email" />
                    </div>
                    <Link to='/'>
                        <button className="btn btn-success btn-block w-100">Reset Password</button>
                    </Link>
                    <button className="btn btn-link mt-2 text-start">Pusat Bantuan</button>
                </div>
            </div>
        </div>
    );
}

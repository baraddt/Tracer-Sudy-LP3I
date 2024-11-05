import { Link } from 'react-router-dom';

export default function () {
    return (
        <div className="container mt-4">
            <div
                className="row rounded bg-white p-3 align-items-center"
                style={{
                    backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/covercampus.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    color: "white",
                }}
            >
                {/* Foto di Kiri */}


                {/* Informasi di Kanan */}

                <div className="mt-5">


                    <button className="ms-5 border rounded p-2  bg-success bg-opacity-75 text-light" type="button">Change Cover</button>



                </div>
            </div>
            <div className="container mt-2">
                <div className="d-flex justify-content-between">
                    {/* Info di Kiri */}
                    <div
                        className="d-flex justify-content-between bg-light p-2 rounded me-3"
                        style={{ flex: 1 }} // Mengatur proporsi ukuran Info
                    >
                        <div
                            className="d-flex justify-content-center align-items-center bg-light p-4 rounded me-3"
                            style={{ height: "100%", minHeight: "300px", flex: 1 }}
                        >
                            <div className="text-center">
                                <img
                                    src="/logo-lp3i.png"
                                    alt="Profile"
                                    className="img-fluid rounded mb-3"
                                    width="150"
                                    height="150"
                                />
                                <button className="btn btn-info text-white">
                                    <i className="bi bi-camera me-2"></i> Change Profile Picture
                                </button>
                            </div>
                        </div>


                    </div>

                    {/* About di Kanan */}
                    <div className="bg-light p-2 rounded" style={{ flex: 2 }}>
                        <h4 className="mt-2">About</h4>
                        

                    </div>
                </div>
            </div>
        </div>

    );
}

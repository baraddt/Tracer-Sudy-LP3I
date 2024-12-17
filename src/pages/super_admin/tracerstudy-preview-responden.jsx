import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosClient from '../../services/axiosClient';


export default function () {
    const [tracerList, setTracerList] = useState(null);
    const [respondenList, setRespondenList] = useState([]);
    const [error, setError] = useState(null);


    const fetchData = async () => {
        try {
            const response = await axiosClient.get(`/tracerstudy/all`);
            const data = response.data.data;

            if (data.length > 0) {
                const id = data[0]._id;
                fetchDetailData(id);
            } else {
                setError('No data Found');
            }
        } catch (error) {
            console.error("Error feching data:", error.message);
            setError(error.message);

        }
    };

    const fetchDetailData = async (id) => {
        try {
            const response = await axiosClient.get(`/tracerstudy/${id}`);
            setTracerList(response.data.data);
        } catch (error) {
            console.error("Error feching detail data:", error.message);
            setError(error.message);

        }
    };

    const fetchResponden = async () => {
        try {
            const response = await axiosClient.get('');
            setRespondenList(response.data.data);

            console.log(response.data);
            
        } catch (err) {
            console.error("Error Feching Responden :", err.message);
            
        }
    };

    useEffect(() => {
        fetchData();
        fetchResponden();
    }, []);



    return (
        <div className="container rounded my-4 bg-white">
            {error && <p>{error}</p>}
            {tracerList ? (
                <>
                    {/* Banner/Flyer */}
                    <div className="form-group">
                        <label className='border rounded bg-primary bg-opacity-25 p-1 mt-2' style={{ fontSize: '13px', color: '#00426D' }}>
                            <i className='bi bi-circle-fill me-2'></i>Preview
                        </label>
                        <p className="mt-5" style={{ fontSize: '25px', color: '#00426D' }}>
                            {tracerList.id_detail.nama_kegiatan}
                        </p>
                        <p className="text-secondary" style={{ fontSize: '15px' }}>
                            Dibuat oleh | Kampus Utama Politeknik LP3I | {new Date(tracerList.createdAt).toLocaleString()}
                        </p>
                    </div>

                    {/* Skala Kegiatan */}
                    <div>
                        <label className='border rounded bg-primary bg-opacity-25 p-1 me-2' style={{ color: '#00426D' }}>
                            {tracerList.skala_kegiatan.skala_kegiatan}
                        </label>
                    </div>

                    {/* Button Navigasi*/}
                    <div className='d-flex gap-5 mt-4'>
                        <Link to='/super_admin/tracerstudy-preview'>
                            <button className='border-0 bg-transparent'>Detail Kegiatan</button>
                        </Link>

                        <Link to='/super_admin/tracerstudy-preview-kuesioner'>
                            <button className='border-0 bg-transparent'>Kuesioner</button>
                        </Link>

                        <Link to='/super_admin/tracerstudy-preview-responden'>
                            <button className='border-0 border-bottom bg-transparent'>Responden</button>
                        </Link>
                    </div>

                    {/* table responden */}

                    <div className='mt-4'>
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Responden</th>
                                    <th>Perguruan Tinggi</th>
                                    <th>Program Study</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {respondenList.length > 0 ? (
                                    respondenList.map((responden, index) => (
                                        <tr key={responden._id}>
                                            <td>{`#R${index + 201}`}</td>
                                            {/* <td><img className='rounded-circle' src={responden.avatar} alt="Avatar" width="50" height="50" /></td> */}
                                            <td>{responden.nama}</td>
                                            <td>{responden.psdku || 'N/A'}</td>
                                            <td>{responden.prodi || 'N/A'}</td>
                                            <td className={`text-center ${responden.is_submited ? 'text-success' : 'text-danger'}`}>
                                                {responden.is_submited ? 'Submited' : 'Not Yet'}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="7" className="text-center bg-danger bg-opacity-50">Belum ada data Responden.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
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
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    )
}
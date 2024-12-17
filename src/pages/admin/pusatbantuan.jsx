import axiosClient from "../../services/axiosClient";
import _ from 'lodash';
import axios from 'axios';
import { useState, useEffect } from "react";
import ModalFilter from "../../components/compModals/modalFilter";


export default function () {
    const [pusatBantuanList, setPusatBantuanList] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [showFiltersModal, setShowFiltersModal] = useState(false);

    const fetchSearchResults = async (query) => {
        try {
            const response = await axios.get(`https://api.example.com/mahasiswa?q=${query}`);
            setSearchResults(response.data.results);
        } catch (error) {
            console.error("Error saat mencari data:", error);
            setSearchResults([]);
        }
    };

    const debouncedSearch = _.debounce((query) => {
        fetchSearchResults(query);
    }, 500);

    useEffect(() => {
        if (searchQuery) {
            debouncedSearch(searchQuery);
        } else {
            setSearchResults([]); // Kosongkan hasil jika query kosong
        }

        // Cleanup untuk debounce
        return () => debouncedSearch.cancel();
    }, [searchQuery]);


    // const fetchpusatBantuan = async () => {
    //     try {
    //         const response = await axios.get('http://192.168.18.223:5000/pusatBantuan/all');
    //         setpusatBantuanList(response.data.data);
    //     } catch (err) {
    //         console.error("error feching data:", err.message);
    //     }
    // };

    const fetchPusatBantuan = async () => {
        try {
            // const response = await axios.get('http://192.168.18.223:5000/users/role/all');
            const response = await axios.get('http://192.168.18.223:5000/pusatBantuan/all');
            setPusatBantuanList(response.data.data); // Update state dengan data Role ID
        } catch (error) {
            console.error("Error fetching pusatBantuan:", error.message);
        }
    };

    useEffect(() => {
        fetchPusatBantuan();
    }, []);

    const handleApplyFilters = (filters) => {
        console.log("Filters applied:", filters);
    };



    return (
        <div className="container mt-4">
            <div className="rounded bg-white p-3">
                <h4 className="mb-4 fw-semibold text-dark">Pusat Bantuan</h4>

                {/* Tombol untuk membuka modal */}
                <div className="d-flex flex-column align-items-end mb-3">
                    <button className="btn btn-primary" onClick={() => setShowFiltersModal(true)}><i className="bi bi-filter"></i> Filter</button>
                </div>

                {/* Form pencarian pengguna */}
                <div className="d-flex mb-3 col-sm-4">
                    <input
                        type="search"
                        className="form-control me-2"
                        placeholder="Cari Pengadu"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)} // Update query saat mengetik
                    />
                    {/* <button className="btn btn-secondary d-flex align-items-center">
                        <i className="bi bi-search me-2"></i> Cari
                    </button> */}
                </div>
            </div>
            <div className="rounded mt-4 bg-white p-3">
                <table className="table">
                    <thead className="table-secondary">
                        <tr>
                            <th className='text-dark text-center fw-semibold' scope="col">#ID</th>
                            <th className='text-dark text-center fw-semibold' scope="col">Pengadu</th>
                            <th className='text-dark text-center fw-semibold' scope="col">Role</th>
                            <th className='text-dark text-center fw-semibold' scope="col">Email</th>
                            <th className='text-dark text-center fw-semibold' scope="col">Status</th>
                            <th className='text-dark text-center fw-semibold' scope="col">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {searchQuery && searchQuery.length > 0 ? (
                            // Jika ada query pencarian, tampilkan hasil pencarian (searchResults)
                            searchResults.length > 0 ? (
                                searchResults.map((pusatBantuan) => (
                                    <tr key={pusatBantuan._id}>
                                        <td>{`#PG${index + 201}`}</td>
                                        <td>{pusatBantuan.Pengadu}</td>
                                        <td>{pusatBantuan.role || 'N/A'}</td>
                                        <td>{pusatBantuan.email || 'N/A'}</td>
                                        <td>{pusatBantuan.status}</td>
                                        <td className='text-center'>
                                            <button className="btn-sm me-2 border-0 bg-transparent">
                                                <i className="bi bi-eye-fill text-info" onClick={() => handlePreviewUser(pusatBantuan._id)}></i>
                                            </button>
                                            <button className="btn-sm me-2 border-0 bg-transparent">
                                                <i className="bi bi-eye-fill text-info" onClick={() => handlePreviewUser(pusatBantuan._id)}></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="text-center text-dark">Tidak ada hasil pencarian.</td>
                                </tr>
                            )
                        ) : (
                            // Jika tidak ada query pencarian, tampilkan data awal
                            pusatBantuanList.length > 0 ? (
                                pusatBantuanList.map((pusatBantuan, index) => (
                                    <tr key={pusatBantuan._id}>
                                        <td>{`#PG${index + 201}`}</td>
                                        <td>{pusatBantuan.Pengadu}</td>
                                        <td>{pusatBantuan.role || 'N/A'}</td>
                                        <td>{pusatBantuan.email || 'N/A'}</td>
                                        <td>{pusatBantuan.status}</td>
                                        <td className='text-center'>
                                            <button className="btn-sm me-2 border-0 bg-transparent">
                                                <i className="bi bi-eye-fill text-info" onClick={() => handlePreviewUser(pusatBantuan._id)}></i>
                                            </button>
                                            <button className="btn-sm me-2 border-0 bg-transparent">
                                                <i className="bi bi-eye-fill text-info" onClick={() => handlePreviewUser(pusatBantuan._id)}></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="8" className="text-center text-dark">Tidak ada Data Pengadu.</td>
                                </tr>
                            )
                        )}
                    </tbody>
                </table>
            </div>
            <ModalFilter
                show={showFiltersModal}
                onClose={() => setShowFiltersModal(false)}
                onApply={handleApplyFilters}
            />
        </div>
    )
}
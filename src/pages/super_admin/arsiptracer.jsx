import axiosClient from "../../services/axiosClient";
import _ from 'lodash';
import axios from 'axios';
import { useState, useEffect } from "react";
import ModalFilter from "../../components/compModals/modalFilter";


export default function () {
    const [arsipList, setArsipList] = useState([]);
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


    // const fetchArsip = async () => {
    //     try {
    //         const response = await axios.get('http://192.168.18.223:5000/arsip/all');
    //         setArsipList(response.data.data);
    //     } catch (err) {
    //         console.error("error feching data:", err.message);
    //     }
    // };

    const fetchArsip = async () => {
        try {
            // const response = await axios.get('http://192.168.18.223:5000/users/role/all');
            const response = await axios.get('http://192.168.18.223:5000/arsip/all');
            setArsipList(response.data.data); // Update state dengan data Role ID
        } catch (error) {
            console.error("Error fetching arsip:", error.message);
        }
    };

    useEffect(() => {
        fetchArsip();
    }, []);

    const handleApplyFilters = (filters) => {
        console.log("Filters applied:", filters);
    };



    return (
        <div className="container mt-4">
            <div className="rounded bg-white p-3">
                <h4 className="mb-4 fw-semibold text-dark">Arsip Tracer</h4>

                {/* Tombol untuk membuka modal */}
                <div className="d-flex flex-column align-items-end mb-3">
                    <button className="btn btn-primary" onClick={() => setShowFiltersModal(true)}><i className="bi bi-filter"></i> Filter</button>
                </div>

                {/* Form pencarian pengguna */}
                <div className="d-flex mb-3 col-sm-4">
                    <input
                        type="search"
                        className="form-control me-2"
                        placeholder="Cari User"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)} // Update query saat mengetik
                    />
                    {/* <button className="btn btn-secondary d-flex align-items-center">
                        <i className="bi bi-search me-2"></i> Cari
                    </button> */}
                </div>
            </div>
            <div className="table-responsive-sm table-responsive-md rounded mt-4 bg-white p-3">
                <table className="table">
                    <thead className="table-secondary">
                        <tr>
                            <th className='text-dark text-center fw-semibold' scope="col">#ID</th>
                            <th className='text-dark text-center fw-semibold text-truncate' scope="col">Nama Kegiatan</th>
                            <th className='text-dark text-center fw-semibold text-truncate' scope="col">Tanggal Mulai</th>
                            <th className='text-dark text-center fw-semibold text-truncate' scope="col">Tanggal Berakhir</th>
                            <th className='text-dark text-center fw-semibold text-truncate' scope="col">Skala Kegiatan</th>
                            <th className='text-dark text-center fw-semibold text-truncate' scope="col">Tahun Lulusan</th>
                            <th className='text-dark text-center fw-semibold' scope="col">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {searchQuery && searchQuery.length > 0 ? (
                            // Jika ada query pencarian, tampilkan hasil pencarian (searchResults)
                            searchResults.length > 0 ? (
                                searchResults.map((arsip) => (
                                    <tr key={arsip._id}>
                                        <td>{`#AT${index + 201}`}</td>
                                        <td>{arsip.kegiatan}</td>
                                        <td>{arsip.tanggal_mulai || 'N/A'}</td>
                                        <td>{arsip.tanggal_berakhir || 'N/A'}</td>
                                        <td>{arsip.skala}</td>
                                        <td>{arsip.tahun_lulusan}</td>
                                        <td className='text-center'>
                                            <button className="btn-sm me-2 border-0 bg-transparent">
                                                <i className="bi bi-eye-fill text-info" onClick={() => handlePreviewUser(arsip._id)}></i>
                                            </button>
                                            <button className="btn-sm me-2 border-0 bg-transparent">
                                                <i className="bi bi-eye-fill text-info" onClick={() => handlePreviewUser(arsip._id)}></i>
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
                            arsipList.length > 0 ? (
                                arsipList.map((arsip, index) => (
                                    <tr key={arsip._id}>
                                        <td>{`#AT${index + 201}`}</td>
                                        <td>{arsip.kegiatan}</td>
                                        <td>{arsip.tanggal_mulai || 'N/A'}</td>
                                        <td>{arsip.tanggal_berakhir || 'N/A'}</td>
                                        <td>{arsip.skala}</td>
                                        <td>{arsip.tahun_lulusan}</td>
                                        <td className='text-center'>
                                            <button className="btn-sm me-2 border-0 bg-transparent">
                                                <i className="bi bi-eye-fill text-info" onClick={() => handlePreviewUser(arsip._id)}></i>
                                            </button>
                                            <button className="btn-sm me-2 border-0 bg-transparent">
                                                <i className="bi bi-eye-fill text-info" onClick={() => handlePreviewUser(arsip._id)}></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="8" className="text-center text-dark">Tidak ada Data Arsip.</td>
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
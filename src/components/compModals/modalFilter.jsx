import React, { useState } from 'react';

const ModalFilter = ({ show, onClose, onApply }) => {
    const [filters, setFilters] = useState({
        name: '',
        category: '',
        dateFrom: '',
        dateTo: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleApply = () => {
        onApply(filters); // Callback ke parent dengan data filter
        onClose(); // Tutup modal setelah apply
    };

    return (
        <div className={`modal fade ${show ? 'show' : ''}`} style={{ display: show ? 'block' : 'none' }} tabIndex="-1" role="dialog">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Filter Data</h5>
                        <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="mb-3">
                            <label className="form-label">Nama</label>
                            <input
                                type="text"
                                name="name"
                                value={filters.name}
                                onChange={handleChange}
                                className="form-control"
                                placeholder="Cari berdasarkan nama"
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Kategori</label>
                            <select
                                name="category"
                                value={filters.category}
                                onChange={handleChange}
                                className="form-control"
                            >
                                <option value="">Pilih Kategori</option>
                                <option value="category1">Kategori 1</option>
                                <option value="category2">Kategori 2</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Tanggal</label>
                            <div className="d-flex gap-2">
                                <input
                                    type="date"
                                    name="dateFrom"
                                    value={filters.dateFrom}
                                    onChange={handleChange}
                                    className="form-control"
                                />
                                <input
                                    type="date"
                                    name="dateTo"
                                    value={filters.dateTo}
                                    onChange={handleChange}
                                    className="form-control"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onClose}>
                            Reset
                        </button>
                        <button type="button" className="btn btn-primary" onClick={handleApply}>
                            Apply
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalFilter;

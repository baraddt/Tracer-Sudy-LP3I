import React from 'react';

const ModalConfirmDelete = ({ show, onClose, onConfirm, message, tracer, deleteTracer }) => {
    return (
        <div className={`modal fade ${show ? 'show' : ''}`} style={{ display: show ? 'block' : 'none' }} tabIndex="-1" role="dialog">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">
                            <i className="bi bi-exclamation-triangle-fill me-2 text-danger"></i> Delete Kegiatan
                        </h5>

                        <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
                    </div>
                    <div className="modal-body text-center">
                        <p>{message}</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onClose}>
                            Cancel
                        </button>
                        {/* Tombol Confirm Delete */}
                        <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() => deleteTracer(tracer._id)} // Menambahkan deleteUser di sini
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalConfirmDelete;

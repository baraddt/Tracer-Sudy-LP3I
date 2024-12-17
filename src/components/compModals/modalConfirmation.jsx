import React from 'react';
import './ModalConfirmation.css'; // Optional: kalau mau styling tambahan

const ModalConfirmation = ({ show, title, message, onConfirm, onClose }) => {
    return (
        <div className={`modal fade ${show ? 'show' : ''}`} style={{ display: show ? 'block' : 'none' }} tabIndex="-1" role="dialog">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header bg-primary text-white">
                        <h5 className="modal-title">{title || "Konfirmasi"}</h5>
                        <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <p>{message || "Apakah Anda yakin ingin melanjutkan tindakan ini?"}</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onClose}>
                            Cancel
                        </button>
                        <button type="button" className="btn btn-primary" onClick={onConfirm}>
                            Confirm
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalConfirmation;

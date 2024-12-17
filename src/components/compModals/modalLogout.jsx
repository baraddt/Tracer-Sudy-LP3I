import React from 'react';
import { CSSTransition } from 'react-transition-group';
import './modalStyle.css';

const ModalLogout = ({ show, onLogout, onCancel }) => {
    return (
        <CSSTransition
            in={show}
            timeout={300}
            classNames="modal"
            unmountOnExit
        >
            <div className="modal-wrapper">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content border-danger border p-2 bg-light text-dark rounded">
                        <div className="modal-header bg-danger rounded text-white d-flex justify-content-between p-2">
                            <h5 className="modal-title">
                                <i className="bi bi-exclamation-triangle-fill me-2"></i> Logout
                            </h5>
                        </div>
                        <div className="modal-body text-center">
                            <i className="bi bi-exclamation-circle-fill text-danger fs-1"></i>
                            <p className="mt-3">Apakah Anda yakin ingin logout? Semua sesi aktif akan ditutup.</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary me-3" onClick={onCancel}>
                                Cancel
                            </button>
                            <button type="button" className="btn btn-danger" onClick={onLogout}>
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </CSSTransition>
    );
};

export default ModalLogout;
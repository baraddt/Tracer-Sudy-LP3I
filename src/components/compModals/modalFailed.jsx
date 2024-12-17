import React, { useEffect, useState } from 'react';
import './ModalFailed.css'; // Import CSS untuk styling tambahan

const ModalFailed = ({ show, message, onClose }) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (show) {
            
            const timer = setTimeout(() => {
                setIsLoading(false);
            }, 500); 
            return () => clearTimeout(timer); 
        } else {
            setIsLoading(true); 
        }
    }, [show]);

    return (
        <div className={`modal fade ${show ? 'show' : ''}`} style={{ display: show ? 'block' : 'none' }} tabIndex="-1" role="dialog">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content text-center p-4">
                    <div className="modal-body">
                        {isLoading ? (
                            <div className="spinner-container">
                                {/* Spinner Loading Bootstrap */}
                                <div className="spinner-border text-info" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                                <p className="mt-3">Processing...</p>
                            </div>
                        ) : (
                            <div className="failed-container">
                                {/* Ikon silang */}
                                <div className="crossmark-container">
                                    <i className="crossmark">✘</i>
                                </div>
                                <p className="mt-3">{message}</p>
                            </div>
                        )}
                    </div>
                    <div className="modal-footer justify-content-center">
                        <button type="button" className="btn btn-info" onClick={onClose}>
                            Ok
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalFailed;

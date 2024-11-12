{showSuccessModal && (
    <div className="modal fade show" tabIndex="-1" style={{ display: 'block' }} aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Success</h5>
                    <button type="button" className="btn-close" onClick={() => setShowSuccessModal(false)}></button>
                </div>
                <div className="modal-body">
                    <p>User updated successfully!</p>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-success" onClick={() => setShowSuccessModal(false)}>Close</button>
                </div>
            </div>
        </div>
    </div>
)}

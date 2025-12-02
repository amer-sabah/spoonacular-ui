import React from 'react';
import { useTranslation } from 'react-i18next';

const ErrorModal = ({ 
  show, 
  error, 
  onClose, 
  closeButtonText, 
  type = 'danger', // danger, warning, info
  showCloseButton = true 
}) => {
  const { t } = useTranslation();

  if (!show || !error) {
    return null;
  }

  const headerClass = type === 'warning' ? 'bg-warning text-dark' : 'bg-danger text-white';
  const closeButtonClass = type === 'warning' ? '' : 'btn-close-white';

  return (
    <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className={`modal-header ${headerClass}`}>
            <h5 className="modal-title">
              <i className="bi bi-exclamation-triangle-fill me-2"></i>
              {error.title}
            </h5>
            {showCloseButton && (
              <button 
                type="button" 
                className={`btn-close ${closeButtonClass}`} 
                onClick={onClose}
                aria-label="Close"
              ></button>
            )}
          </div>
          <div className="modal-body">
            <p className="mb-3">{error.message}</p>
            <div className="alert alert-info mb-0">
              <i className="bi bi-info-circle me-2"></i>
              {error.action}
            </div>
          </div>
          <div className="modal-footer">
            <button 
              type="button" 
              className="btn btn-secondary" 
              onClick={onClose}
            >
              {closeButtonText || t('buttons.close')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorModal;

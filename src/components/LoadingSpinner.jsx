
import React from 'react';

const LoadingSpinner = () => {
  return (
    <>
      <link 
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" 
        rel="stylesheet" 
      />
      <link 
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" 
        rel="stylesheet" 
      />
      
      <style>
        {`
          .custom-primary {
            background-color: #347aeb !important;
          }
          .text-custom-primary {
            color: #347aeb !important;
          }
          .spinner-custom {
            border-color: #347aeb;
            border-right-color: transparent;
          }
        `}
      </style>

      <div className="d-flex justify-content-center align-items-center min-vh-100" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="text-center">
          <div className="spinner-border spinner-custom mb-3" style={{ width: '3rem', height: '3rem' }} role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <h5 className="text-custom-primary mb-2">Loading Prepaid Services</h5>
          <p className="text-muted">Please wait while we fetch your data...</p>
          <div className="mt-4">
            <i className="fas fa-credit-card text-custom-primary fs-1 opacity-25"></i>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoadingSpinner;

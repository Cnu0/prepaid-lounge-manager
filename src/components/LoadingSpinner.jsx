
import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      <div className="text-center">
        <div className="spinner-border text-primary" style={{ width: '3rem', height: '3rem' }} role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <div className="mt-3">
          <h5 className="text-muted">Loading Prepaid Services...</h5>
          <p className="text-muted">Please wait while we fetch your data</p>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;

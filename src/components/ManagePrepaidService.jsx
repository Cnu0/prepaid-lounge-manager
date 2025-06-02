
import React, { useEffect, useState } from 'react';
import LoadingSpinner from './LoadingSpinner';
import { toast } from '../hooks/use-toast';

const ManagePrepaidService = () => {
  const [mockUsers, setMockUsers] = useState([
    {
      prepaidId: 'P001',
      userId: 'U101',
      userName: 'John Smith',
      loungeId: 'L001',
      prepaidAmount: 500.00,
      remainingBalance: 350.50,
      status: 'active'
    },
    {
      prepaidId: 'P002',
      userId: 'U102',
      userName: 'Sarah Johnson',
      loungeId: 'L001',
      prepaidAmount: 1000.00,
      remainingBalance: 980.00,
      status: 'active'
    },
    {
      prepaidId: 'P003',
      userId: 'U103',
      userName: 'Mike Davis',
      loungeId: 'L002',
      prepaidAmount: 200.00,
      remainingBalance: 0.00,
      status: 'expired'
    },
    {
      prepaidId: 'P004',
      userId: 'U104',
      userName: 'Emma Wilson',
      loungeId: 'L001',
      prepaidAmount: 750.00,
      remainingBalance: 425.75,
      status: 'active'
    },
  ]);

  const [mockLoungeInfo, setMockLoungeInfo] = useState([
    {
      loungeId: 'L001',
      loungeName: 'VIP Executive Lounge',
      discountPercentage: 10,
      minimumTopUp: 50,
      additionalInfo: 'Loyalty program members get an extra 5% off.',
    },
  ]);

  const [mockLoading, setMockLoading] = useState(false);
  const [mockError, setMockError] = useState(null);

  const users = mockUsers;
  const loading = mockLoading;
  const error = mockError;
  const loungeInfo = mockLoungeInfo;

  const [selectedLounge, setSelectedLounge] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    discountPercentage: '',
    minimumTopUp: '',
    additionalInfo: '',
  });

  useEffect(() => {
    setMockLoading(true);
    setTimeout(() => {
      setMockLoading(false);
    }, 1000);
  }, []);

  const lounge = loungeInfo[0];

  const handleEditClick = () => {
    if (!lounge) return;
    setSelectedLounge({
      ...lounge,
      loungeId: lounge.loungeId,
    });

    setForm({
      discountPercentage: lounge.discountPercentage || '',
      minimumTopUp: lounge.minimumTopUp || '',
      additionalInfo: lounge.additionalInfo || '',
    });
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (!selectedLounge?.loungeId) return;

    const loungeId = selectedLounge.loungeId;

    setMockLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 800));

      setMockLoungeInfo(prevInfo =>
        prevInfo.map(l =>
          l.loungeId === loungeId
            ? { ...l, ...form }
            : l
        )
      );

      toast({
        title: 'Success!',
        description: `Changes saved for ${lounge.loungeName}`,
      });
      setShowModal(false);
    } catch (err) {
      console.error('Simulated save failed', err);
      toast({
        title: 'Error',
        description: 'Failed to update lounge info',
        variant: 'destructive',
      });
      setMockError('Simulated error during save.');
    } finally {
      setMockLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const badgeClass = status === 'active' ? 'bg-success' : 'bg-danger';
    return <span className={`badge ${badgeClass}`}>{status.toUpperCase()}</span>;
  };

  if (loading) return <LoadingSpinner />;
  if (error) return (
    <div className="container mt-5">
      <div className="alert alert-danger" role="alert">
        <i className="fas fa-exclamation-triangle me-2"></i>
        {error}
      </div>
    </div>
  );

  return (
    <>
      {/* Bootstrap CSS */}
      <link 
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" 
        rel="stylesheet" 
      />
      <link 
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" 
        rel="stylesheet" 
      />
      <script 
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"
      ></script>

      <div className="container-fluid py-4" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
        {/* Header */}
        <div className="row mb-4">
          <div className="col-12">
            <div className="card border-0 shadow-sm">
              <div className="card-body bg-primary text-white" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                <div className="d-flex align-items-center">
                  <i className="fas fa-credit-card fa-2x me-3"></i>
                  <div>
                    <h1 className="mb-1">Prepaid Services Management</h1>
                    <p className="mb-0 opacity-75">Manage customer prepaid accounts and lounge settings</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Lounge Info Card */}
        {lounge && (
          <div className="row mb-4">
            <div className="col-12">
              <div className="card border-0 shadow-sm">
                <div className="card-header bg-white border-bottom">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h5 className="mb-0 text-primary">
                        <i className="fas fa-cog me-2"></i>
                        Lounge Settings
                      </h5>
                    </div>
                    <button 
                      className="btn btn-outline-primary btn-sm"
                      onClick={handleEditClick}
                      style={{ transition: 'all 0.3s ease' }}
                    >
                      <i className="fas fa-edit me-1"></i>
                      Edit Settings
                    </button>
                  </div>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-4">
                      <div className="d-flex align-items-center mb-2">
                        <i className="fas fa-building text-primary me-2"></i>
                        <strong>Lounge:</strong>
                        <span className="ms-2">{lounge.loungeName}</span>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="d-flex align-items-center mb-2">
                        <i className="fas fa-percentage text-success me-2"></i>
                        <strong>Discount:</strong>
                        <span className="badge bg-success ms-2">{lounge.discountPercentage}%</span>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="d-flex align-items-center mb-2">
                        <i className="fas fa-dollar-sign text-warning me-2"></i>
                        <strong>Min Top-Up:</strong>
                        <span className="badge bg-warning text-dark ms-2">${lounge.minimumTopUp}</span>
                      </div>
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="col-12">
                      <div className="d-flex align-items-start">
                        <i className="fas fa-info-circle text-info me-2 mt-1"></i>
                        <div>
                          <strong>Additional Info:</strong>
                          <p className="mb-0 ms-2 text-muted">{lounge.additionalInfo}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Statistics Cards */}
        <div className="row mb-4">
          <div className="col-md-4 mb-3">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body text-center">
                <div className="d-flex align-items-center justify-content-center mb-3">
                  <div className="rounded-circle d-flex align-items-center justify-content-center" 
                       style={{ width: '60px', height: '60px', backgroundColor: '#e3f2fd' }}>
                    <i className="fas fa-users fa-2x text-primary"></i>
                  </div>
                </div>
                <h2 className="display-4 mb-2 text-primary">{users.length}</h2>
                <p className="text-muted mb-0">Total Prepaids</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body text-center">
                <div className="d-flex align-items-center justify-content-center mb-3">
                  <div className="rounded-circle d-flex align-items-center justify-content-center" 
                       style={{ width: '60px', height: '60px', backgroundColor: '#e8f5e8' }}>
                    <i className="fas fa-money-bill-wave fa-2x text-success"></i>
                  </div>
                </div>
                <h2 className="display-4 mb-2 text-success">
                  ${users.reduce((sum, user) => sum + parseFloat(user.prepaidAmount || 0), 0).toFixed(2)}
                </h2>
                <p className="text-muted mb-0">Total Prepaid Value</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body text-center">
                <div className="d-flex align-items-center justify-content-center mb-3">
                  <div className="rounded-circle d-flex align-items-center justify-content-center" 
                       style={{ width: '60px', height: '60px', backgroundColor: '#fff3e0' }}>
                    <i className="fas fa-wallet fa-2x text-warning"></i>
                  </div>
                </div>
                <h2 className="display-4 mb-2 text-warning">
                  ${users.reduce((sum, user) => sum + parseFloat(user.remainingBalance || 0), 0).toFixed(2)}
                </h2>
                <p className="text-muted mb-0">Total Remaining Value</p>
              </div>
            </div>
          </div>
        </div>

        {/* Prepaid List */}
        <div className="row">
          <div className="col-12">
            <div className="card border-0 shadow-sm">
              <div className="card-header bg-white border-bottom">
                <h5 className="mb-0 text-primary">
                  <i className="fas fa-list me-2"></i>
                  Prepaid Customers
                </h5>
              </div>
              <div className="card-body p-0">
                {users.length === 0 ? (
                  <div className="p-4">
                    <div className="alert alert-info mb-0" role="alert">
                      <i className="fas fa-info-circle me-2"></i>
                      No prepaid users found.
                    </div>
                  </div>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-hover mb-0">
                      <thead style={{ backgroundColor: '#f8f9fa' }}>
                        <tr>
                          <th className="border-0 text-muted fw-semibold">
                            <i className="fas fa-hashtag me-1"></i>Prepaid ID
                          </th>
                          <th className="border-0 text-muted fw-semibold">
                            <i className="fas fa-user me-1"></i>Customer
                          </th>
                          <th className="border-0 text-muted fw-semibold">
                            <i className="fas fa-credit-card me-1"></i>Prepaid Amount
                          </th>
                          <th className="border-0 text-muted fw-semibold">
                            <i className="fas fa-coins me-1"></i>Remaining Balance
                          </th>
                          <th className="border-0 text-muted fw-semibold">
                            <i className="fas fa-info me-1"></i>Status
                          </th>
                          <th className="border-0 text-muted fw-semibold">
                            <i className="fas fa-cogs me-1"></i>Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map((user, index) => (
                          <tr key={user.prepaidId} style={{ 
                            transition: 'all 0.3s ease',
                            backgroundColor: index % 2 === 0 ? '#fff' : '#fafafa'
                          }}>
                            <td className="align-middle">
                              <span className="badge bg-primary">#{user.prepaidId}</span>
                            </td>
                            <td className="align-middle">
                              <div>
                                <div className="fw-semibold text-dark">{user.userName}</div>
                                <small className="text-muted">
                                  <i className="fas fa-id-badge me-1"></i>
                                  User #{user.userId} • Lounge #{user.loungeId}
                                </small>
                              </div>
                            </td>
                            <td className="align-middle">
                              <span className="fw-bold text-success">${user.prepaidAmount.toFixed(2)}</span>
                            </td>
                            <td className="align-middle">
                              <span className={`fw-bold ${user.remainingBalance > 0 ? 'text-primary' : 'text-danger'}`}>
                                ${user.remainingBalance.toFixed(2)}
                              </span>
                            </td>
                            <td className="align-middle">
                              {getStatusBadge(user.status)}
                            </td>
                            <td className="align-middle">
                              <button
                                className="btn btn-outline-primary btn-sm"
                                onClick={() =>
                                  toast({
                                    title: 'Customer Details',
                                    description: `Viewing details for ${user.userName}`,
                                  })
                                }
                                style={{ transition: 'all 0.3s ease' }}
                              >
                                <i className="fas fa-eye me-1"></i>
                                View Details
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Modal for editing lounge info */}
        {showModal && (
          <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-lg">
              <div className="modal-content border-0 shadow">
                <div className="modal-header bg-primary text-white">
                  <h5 className="modal-title">
                    <i className="fas fa-edit me-2"></i>
                    Edit Lounge #{selectedLounge?.loungeId}
                  </h5>
                  <button 
                    type="button" 
                    className="btn-close btn-close-white" 
                    onClick={() => setShowModal(false)}
                  ></button>
                </div>
                <div className="modal-body p-4">
                  <form>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label fw-semibold">
                          <i className="fas fa-percentage text-primary me-2"></i>
                          Discount Percentage
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          name="discountPercentage"
                          value={form.discountPercentage}
                          onChange={handleInputChange}
                          placeholder="Enter discount percentage"
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label fw-semibold">
                          <i className="fas fa-dollar-sign text-primary me-2"></i>
                          Minimum Top-Up
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          name="minimumTopUp"
                          value={form.minimumTopUp}
                          onChange={handleInputChange}
                          placeholder="Enter minimum top-up amount"
                        />
                      </div>
                    </div>
                    <div className="mb-3">
                      <label className="form-label fw-semibold">
                        <i className="fas fa-info-circle text-primary me-2"></i>
                        Additional Information
                      </label>
                      <textarea
                        className="form-control"
                        rows={4}
                        name="additionalInfo"
                        value={form.additionalInfo}
                        onChange={handleInputChange}
                        placeholder="Enter additional information about the lounge"
                      />
                    </div>
                  </form>
                </div>
                <div className="modal-footer bg-light">
                  <button 
                    type="button" 
                    className="btn btn-secondary"
                    onClick={() => setShowModal(false)}
                  >
                    <i className="fas fa-times me-1"></i>
                    Cancel
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-primary"
                    onClick={handleSave} 
                    disabled={mockLoading}
                  >
                    {mockLoading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Saving...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-save me-1"></i>
                        Save Changes
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ManagePrepaidService;

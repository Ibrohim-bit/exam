import React, { useState } from 'react';
import AuthModal from './AuthModal';

const ProtectedRoute = ({ children, isAuthenticated, register, login }) => {
  const [showModal, setShowModal] = useState(!isAuthenticated);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      {isAuthenticated ? children : (
        <>
          <AuthModal isOpen={showModal} onClose={handleCloseModal} register={register} login={login} />
          <div style={{ textAlign: 'center', padding: '50px' }}>
            <h2>Please register or login to access this page.</h2>
            <button onClick={() => setShowModal(true)}>Register/Login</button>
          </div>
        </>
      )}
    </>
  );
};

export default ProtectedRoute;
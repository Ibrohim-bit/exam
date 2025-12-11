import React, { useState } from 'react';
import './AuthModal.css';
import { FaUser, FaEnvelope, FaLock, FaSignInAlt, FaExchangeAlt, FaTimes } from 'react-icons/fa';

const AuthModal = ({ isOpen, onClose, register, login }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (isLogin) {
      if (login(email, password)) {
        onClose();
        setEmail('');
        setPassword('');
        setName('');
      } else {
        setError('Invalid email or password');
      }
    } else {
      if (email && password && name) {
        register(email, password, name);
        onClose();
        setEmail('');
        setPassword('');
        setName('');
      } else {
        setError('Please fill all fields');
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}><FaTimes /></button>
        <h2>{isLogin ? 'Login' : 'Register'}</h2>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="input-container">
              <FaUser className="input-icon" />
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <label htmlFor="name" className="label">Name</label>
              <div className="underline"></div>
            </div>
          )}
          <div className="input-container">
            <FaEnvelope className="input-icon" />
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="email" className="label">Email</label>
            <div className="underline"></div>
          </div>
          <div className="input-container">
            <FaLock className="input-icon" />
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label htmlFor="password" className="label">Password</label>
            <div className="underline"></div>
          </div>
          {error && <p className="error">{error}</p>}
          <button type="submit" className="submit-btn">
            <FaSignInAlt /> {isLogin ? 'Login' : 'Register'}
          </button>
        </form>
        <button onClick={() => {
          setIsLogin(!isLogin);
          setEmail('');
          setPassword('');
          setName('');
          setError('');
        }} className="switch-btn">
          <FaExchangeAlt /> Switch to {isLogin ? 'Register' : 'Login'}
        </button>
      </div>
    </div>
  );
};

export default AuthModal;
import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './layout.css';

function Layout({ children, cart, isAuthenticated, logout }) {
  return (
    <div className="layout">
      <Header cart={cart} isAuthenticated={isAuthenticated} logout={logout} />
      <main className="main-content">
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default Layout;

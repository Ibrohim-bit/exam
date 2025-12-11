import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { products } from '../../data/products';
import { FaEye, FaStar } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import AuthModal from '../../components/AuthModal';
import "./Home.css";

function Home({ isAuthenticated, skipAuth, register, login, recentlyViewed }) {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const hasSkipped = localStorage.getItem('hasSkipped');
    const storedUser = localStorage.getItem('currentUser');
    if (!isAuthenticated && !hasSkipped && !storedUser) {
      setShowModal(true);
    }
  }, [isAuthenticated]);

  // Check on mount to prevent modal from showing if user is already authenticated
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    const hasSkipped = localStorage.getItem('hasSkipped');
    if (storedUser || hasSkipped) {
      setShowModal(false);
    }
  }, []);

  const handleSkip = () => {
    skipAuth();
    localStorage.setItem('hasSkipped', 'true');
    setShowModal(false);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const recentProducts = recentlyViewed.map(id => products.find(p => p.id === id)).filter(Boolean);

  const popularProducts = [...products]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 8);

  return (
    <div className="home">
      <h1>Welcome to Computer Store</h1>
      <p>Explore our products!</p>

      <div className="popular-products-section">
        <div className="section-header">
          <h2>Most Popular Products</h2>
          <Link to="/products" className="view-all-link">View All Products →</Link>
        </div>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          navigation
          pagination={{ clickable: false }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 }
          }}
          className="popular-swiper"
        >
          {popularProducts.map(product => (
            <SwiperSlide key={product.id}>
              <Link to={`/products/${product.id}`} className="popular-product-card">
                <div className="product-image-container">
                  <img src={product.image} alt={product.name} />
                </div>
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p className="category">{product.category}</p>
                  <div className="rating-price">
                    <div className="rating">
                      <FaStar className="star-icon" />
                      <span>{product.rating}</span>
                    </div>
                    <div className="price">${product.price}</div>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {recentProducts.length > 0 && (
        <div className="recently-viewed">
          <h2><FaEye /> Recently Viewed</h2>
          <div className="recent-products">
            {recentProducts.map(product => (
              <Link key={product.id} to={`/products/${product.id}`} className="recent-product">
                <img src={product.image} alt={product.name} />
                <p>{product.name}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
      <AuthModal isOpen={showModal} onClose={handleClose} register={register} login={login} />
      {showModal && (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <button className="skip-btn" onClick={handleSkip}>Skip Registration</button>
        </div>
      )}
    </div>
  );
}

export default Home;

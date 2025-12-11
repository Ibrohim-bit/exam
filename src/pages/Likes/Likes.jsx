import React from 'react';
import { Link } from 'react-router-dom';
import { products } from '../../data/products';
import { FaHeart, FaHistory } from 'react-icons/fa';
import './Likes.css';

function Likes({ productLikes, recentlyViewed }) {
  const likedProducts = products.filter(product => productLikes[product.id]);
  const viewedProducts = recentlyViewed.map(id => products.find(p => p.id === id)).filter(Boolean);

  return (
    <div className="likes">
      <h1><FaHeart /> My Liked Products</h1>
      {likedProducts.length === 0 ? (
        <p>You haven't liked any products yet.</p>
      ) : (
        <div className="liked-products">
          {likedProducts.map(product => (
            <div key={product.id} className="liked-product">
              <Link to={`/products/${product.id}`}>
                <img src={product.image} alt={product.name} />
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p>Price: ${product.price}</p>
              </Link>
            </div>
          ))}
        </div>
      )}

      <div className="recently-viewed-section">
        <h2><FaHistory /> Recently Viewed Products</h2>
        {viewedProducts.length === 0 ? (
          <p>You haven't viewed any products yet.</p>
        ) : (
          <div className="viewed-products">
            {viewedProducts.map(product => (
              <div key={product.id} className="viewed-product">
                <Link to={`/products/${product.id}`}>
                  <img src={product.image} alt={product.name} />
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <p>Price: ${product.price}</p>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Likes;
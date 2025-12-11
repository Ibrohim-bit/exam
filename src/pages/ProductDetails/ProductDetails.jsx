import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { products } from '../../data/products';
import { FaHeart, FaRegHeart, FaArrowLeft } from 'react-icons/fa';
import './ProductDetails.css';

function ProductDetails({ addToCart, cart, productLikes, toggleLike, addToRecentlyViewed }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const product = products.find(p => p.id === parseInt(id));

  const getCurrentQuantity = () => {
    const item = cart.find(item => item.id === product.id);
    return item ? item.quantity : 0;
  };

  const handleAddToCart = () => {
    const currentInCart = getCurrentQuantity();
    if (currentInCart + quantity > product.stock) {
      alert('Not enough stock available');
      return;
    }
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    setQuantity(1);
  };

  useEffect(() => {
    if (product) {
      addToRecentlyViewed(product.id);
    }
  }, [product, addToRecentlyViewed]);

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="product-details">
      <button className="back-btn" onClick={() => navigate(-1)}>
        <FaArrowLeft /> Back
      </button>
      <img src={product.image} alt={product.name} />
      <div className="like-icon" onClick={() => toggleLike(product.id)}>
        {productLikes[product.id] ? <FaHeart color="red" /> : <FaRegHeart />}
      </div>
      <h1>{product.name}</h1>
      <p>{product.detailedDescription}</p>
      <p>Category: {product.category}</p>
      <p>Price: ${product.price}</p>
      <p>Rating: {product.rating} / 5</p>
      <p>Stock: {product.stock} available</p>
      <h3>Specifications:</h3>
      <ul>
        {product.specs.map((spec, index) => (
          <li key={index}>{spec}</li>
        ))}
      </ul>
      <div className="quantity-selector1">
        <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
        <span>{quantity}</span>
        <button onClick={() => setQuantity(Math.min(product.stock - getCurrentQuantity(), quantity + 1))}>+</button>
      </div>
      <button onClick={handleAddToCart} disabled={product.stock === 0 || quantity === 0}>
        {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
      </button>
    </div>
  );
}

export default ProductDetails;
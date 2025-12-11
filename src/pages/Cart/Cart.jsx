import React, { useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import './Cart.css';

function Cart({ cart, removeFromCart, updateQuantity, getTotal }) {
  const [checkoutMessage, setCheckoutMessage] = useState('');

  const handleCheckout = () => {
    if (cart.length > 0) {
      setCheckoutMessage('Thank you for your purchase! Your order has been placed.');
      // In a real app, clear cart after successful checkout
      // For demo, just show message
    }
  };

  return (
    <div>
      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-items">
            {cart.map(item => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} />
                <div className="item-details">
                  <h3>{item.name}</h3>
                  <p>Price: ${item.price}</p>
                  <div className="quantity-controls">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                  </div>
                  <button onClick={() => removeFromCart(item.id)}><FaTrash /></button>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-total">
            <h2>Total: ${getTotal()}</h2>
            <button className="checkout-btn" onClick={handleCheckout}>Checkout</button>
            {checkoutMessage && <p className="checkout-message">{checkoutMessage}</p>}
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
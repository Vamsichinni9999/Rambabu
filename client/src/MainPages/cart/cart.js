import React, { useState, useEffect } from 'react';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Retrieve cart items from localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(cart);
  }, []);

  const handleRemoveItem = (id) => {
    // Remove item from cart
    const updatedCart = cartItems.filter(item => item._id !== id);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  if (cartItems.length === 0) {
    return <div>Your cart is empty</div>;
  }

  return (
    <div>
      <h1>Cart</h1>
      {cartItems.map((item) => (
        <div key={item._id} className="cart-item">
          <img src={item.images} alt={item.title} className='cart-img'/>
          <h2>{item.title}</h2>
          <p>${item.price}</p>
          <p>Quantity: {item.quantity}</p>
          <button onClick={() => handleRemoveItem(item._id)}>Remove</button>
        </div>
      ))}
    </div>
  );
};

export default Cart;

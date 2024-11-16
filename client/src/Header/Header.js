import React, { useState, useEffect } from 'react';
import { IoMdMenu } from "react-icons/io";
import { FaWindowClose } from "react-icons/fa";
import { IoMdCart } from "react-icons/io";
import { Link } from 'react-router-dom';


const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Fetch cart count from localStorage when component mounts
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    // Calculate the total number of items in the cart
    const totalCount = cart.reduce((acc, item) => acc + item.quantity, 0);
    setCartCount(totalCount); // Set the cart count state
  }, []);

  return (
    <header className="header">
      <div className='menu' onClick={toggleMenu}>
        {menuOpen ? <FaWindowClose size={30} /> : <IoMdMenu size={30} />}
      </div>
      <div className='logo'>
        <Link to='/'>
          <h1>
            Blink<span>it</span>
          </h1>
        </Link>
      </div>
      <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
        <li><Link to='/'>Products</Link></li>
        <li><Link to='/login'>Login or Register</Link></li>
      </ul>
      <div className='cart-icon'>
        {/* Dynamically update the cart count */}
        <span className='cart-count'>{cartCount}</span>
        <Link to='/cart'><IoMdCart size={30} color="#ffcc00" /></Link>
      </div>
    </header>
  );
}

export default Header;

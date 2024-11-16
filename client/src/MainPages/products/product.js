import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProductList = () => {
  const URL='http://localhost:3000/'
  const navigate = useNavigate();
  
  // State to store the list of products, loading, and error states
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(() => {
    const token = localStorage.getItem('accesstoken');
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }

    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${URL}api/products`);
        const productsData = response.data.data;
        setProducts(productsData);
        setLoading(false);
      } catch (error) {
        setError('Error fetching products');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleViewClick = (id) => {
    navigate(`/detail/${id}`);
  };

  // Function to add products to the cart
  const handleClick = (product) => {
    if (!isLoggedIn) {
      navigate('/login');
    } else {
      // Get the existing cart from localStorage
      let cart = JSON.parse(localStorage.getItem('cart')) || [];

      // Check if the product is already in the cart
      const existingProduct = cart.find(item => item._id === product._id);

      if (existingProduct) {
        // If it exists, update the quantity
        existingProduct.quantity += 1;
      } else {
        // If it's not in the cart, add it with a quantity of 1
        cart.push({ ...product, quantity: 1 });
      }

      // Store the updated cart in localStorage
      localStorage.setItem('cart', JSON.stringify(cart));

      // Optionally, navigate to the cart page after adding
      navigate('/cart');
    }
  };

  if (loading) {
    return <div>Loading products...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <div className='banner'>
        <img className='banner-img' src='banner.webp' alt='banner image'/>
      </div>
      <div className="product-list">
        {products.map((product) => (
          <div className="card" key={product._id}>
            <img src={product.images} alt={product.title} className='p-img' />
            <h1>{product.title}</h1>
            <p className="price">${product.price}</p>
            <p>{product.content}</p>
            <button className='btn-cart' onClick={() => handleClick(product)}>Add to cart</button>
            <button className='btn-view' onClick={() => handleViewClick(product._id)}>View</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;

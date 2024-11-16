import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Use useNavigate for programmatic navigation
import axios from 'axios';

const DeatilProducts = () => {
  const URL='http://localhost:3000/'
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [count, setCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const token = localStorage.getItem('accesstoken');
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }

    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${URL}api/products/${id}`);
        setProduct(response.data.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching product');
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <div>Loading product details...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const handleClick = () => {
    if (!isLoggedIn) {
      navigate('/login');
    } else {
      setCount(count + 1);
    }
  };

  return product ? (
    <div className='product'>
      <div className="product-detail">
        <img src={product.images} alt={product.title} className="p-img" />
        <h1>{product.title}</h1>
        <p className="price">${product.price}</p>
        <p>{product.content}</p>
        <p>{product.description}</p>
        <p>Sold: {count}</p>
        <button className="btn-cart" onClick={handleClick}>Buy Now</button>
      </div>
    </div>
  ) : <div>No product found</div>;
};

export default DeatilProducts;

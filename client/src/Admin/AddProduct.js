import React, { useState, useEffect } from 'react';  
import axios from 'axios';  


const ProductManagement = () => {  
    const URL='http://localhost:3000/'
    const [products, setProducts] = useState([]);  
    const [product, setProduct] = useState({ product_id: '', title: '', price: '', description: '', content: '', images: [], category: '' });  
    const [editing, setEditing] = useState(false);  
    const [error, setError] = useState('');  

    const apiUrl = `${URL}api/products`;   

    const getToken = () => {  
        return localStorage.getItem('accesstoken');  
    };  
    const setAuthHeader = () => {  
        const token = getToken();  
        if (token) {  
            axios.defaults.headers.common['Authorization'] = `${token}`;  
        } else {  
            delete axios.defaults.headers.common['Authorization'];  
        }  
    };  

    useEffect(() => {  
        setAuthHeader();  
        fetchProducts();  
    }, []);  

    const fetchProducts = async () => {  
        try {  
            const response = await axios.get(apiUrl);  
            setProducts(response.data.data);  
        } catch (err) {  
            console.error('Error fetching products:', err);  
            setError('Failed to fetch products');  
        }  
    };  

    const handleInputChange = (e) => {  
        const { name, value } = e.target;  
        setProduct({ ...product, [name]: value });  
    };  

    const handleSubmit = async (e) => {  
        e.preventDefault();  
        try {  
            if (editing) {  
                // Update product  
                await axios.put(`${apiUrl}/${product._id}`, product);  
            } else {  
                // Create product  
                await axios.post(apiUrl, product);  
            }  
            setProduct({ product_id: '', title: '', price: '', description: '', content: '', images: [], category: '' });  
            setEditing(false);  
            fetchProducts();  
        } catch (err) {  
            console.error('Error saving product:', err);  
            setError('Failed to save product');  
        }  
    };  

    const handleEdit = (product) => {  
        setProduct(product);  
        setEditing(true);  
    };  

    const handleDelete = async (id) => {  
        try {  
            await axios.delete(`${apiUrl}/${id}`);  
            fetchProducts();  
        } catch (err) {  
            console.error('Error deleting product:', err);  
            setError('Failed to delete product');  
        }  
    };  

    return (  
        <div className='adminproductpage'>
        <div className='adminproduct'>
            <h1>Product Management</h1>  
            {error && <div style={{ color: 'red' }}>{error}</div>}  
            <form className='adminproductform' onSubmit={handleSubmit}>  
            <img className='regimg' src='img1.jpg'/>
                <input type="text" name="product_id" value={product.product_id} placeholder="Product ID" onChange={handleInputChange} required />  
                <input type="text" name="title" value={product.title} placeholder="Title" onChange={handleInputChange} required />  
                <input type="number" name="price" value={product.price} placeholder="Price" onChange={handleInputChange} required />  
                <input name="description" value={product.description} placeholder="Description" onChange={handleInputChange}/>  
                <input name="content" value={product.content} placeholder="Content" onChange={handleInputChange}/>
                <input type="text" name="images" value={product.images} placeholder="Images (comma separated)" onChange={(e) => setProduct({ ...product, images: e.target.value.split(',') })} />  
                <input type="text" name="category" value={product.category} placeholder="Category" onChange={handleInputChange} required />  
                <button type="submit">{editing ? 'Update Product' : 'Create Product'}</button>  
            </form>  
            <ul className='adminproductcard'>
            {products.map((prod) => (
                <li className='cardadmin' key={prod._id}>
                <p className='adminname'>{prod.title} ${prod.price}</p>
                <div className='button-group'>
                    <button className='admiedit' onClick={() => handleEdit(prod)}>Edit</button>
                    <button className='admidelete' onClick={() => handleDelete(prod._id)}>Delete</button>
                </div>
                </li>
            ))}
            </ul>
            </div>  
        </div> 
    );  
};  

export default ProductManagement;
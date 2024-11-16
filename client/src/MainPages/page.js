import React from 'react'
import { Route,Routes } from 'react-router-dom'
import ProductList from './products/product.js'
import Register from '../Login/Register.js'
import Login from '../Login/Login.js'
import Cart from './cart/cart.js'
import DetailProducts from '../MainPages/DetailProduct/DeatilProducts.js'
import AddProduct from '../Admin/AddProduct.js'
import Admin from '../Admin/Admin.js'
import MyComponent from '../Admin/AddProduct.js'
const page = () => {
  return (
    <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/detail/:id" element={<DetailProducts/>} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/AddProduct" element={<MyComponent />} />
    </Routes>
  )
}

export default page
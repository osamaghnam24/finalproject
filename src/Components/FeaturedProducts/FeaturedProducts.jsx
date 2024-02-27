import React, { useContext, useEffect, useState } from 'react';
import styles from './FeaturedProducts.module.css';
import axios from 'axios';
import {ThreeDots} from 'react-loader-spinner'
import { Link } from 'react-router-dom';
import ProductDetails from '../ProductDetails/ProductDetails';
import { useQuery } from 'react-query';
import { CartContext } from '../../Context/CartContext';
import toast, { Toaster } from 'react-hot-toast';
import { WhishListContex } from '../../Context/WhishListContext';


export default function FeaturedProducts() {
  
  function getProduct() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
  }
  let {data,isLoading,isFetching,isError}=useQuery('FeaturedProduct',getProduct)

  let {addToWhishList}= useContext(WhishListContex)
  async function postToWhishList(id) {
    
    let {data}= await addToWhishList(id)
  if (data.status=='success') {
    toast.success(data.message)
  }
    
  }
  let {addToCart}= useContext(CartContext)
  async function postToCart(id) {
    let {data}= await addToCart(id)
  if (data.status=='success') {
    toast.success(data.message)
  }
  }

  return <>
    <div className="title text-center fw-bold py-5 text-main">
    <h1 className='fw-bold'>FeaturedProducts</h1>
    </div>
    {isLoading?
     <div className="row">
      <ThreeDots
     visible={true}
     height="100"
     width="100"
     color="#4fa94d"
     radius="9"
     ariaLabel="three-dots-loading"
     wrapperStyle={{}}
     wrapperClass=" d-flex justify-content-center mt-5"
 /> 
     </div>
    :<div className="row gy-4">
    {data?.data.data.map(product=> 
       <div key={product.id} className="col-md-3 products">
     <div className="product p-2">
       <div className="icon">
       <button className="btn" onClick={()=>postToWhishList(product.id)}><i className='fa-solid fa-heart fs-3 '></i></button>
        </div>
     <Link className="nav-link" to={`/productdetails/${product.id}`}>
        <img src={product.imageCover} className='w-100' alt={product.title} />
        <span className=' '>{product.category.name}</span>
        <h3 className='h5'>{product.title.split(' ').splice(0,2).join(' ')}</h3>
        <div className="d-flex py-3 justify-content-between align-items-center">
          <span>{product.price} EGP</span>
          <span className='font-sm'>
          <i className='fas fa-star rating-color me-1'></i>
            {product.ratingsAverage} EGP</span>
        </div>
        </Link>
        <button onClick={()=>postToCart(product.id)} className='btn bg-main text-light w-100'> Add TO Cart</button>
      </div>
      
    </div>)}
  </div>
  }
    
  </>
}

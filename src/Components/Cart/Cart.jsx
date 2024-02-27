import React, { useContext, useEffect, useState } from 'react';
import styles from './Cart.module.css';
import { CartContext } from '../../Context/CartContext';
import { ThreeDots } from 'react-loader-spinner';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

export default function Cart() {
  let {getCartItems , deleteCartItems ,updateCartItems}= useContext(CartContext);
  const [cart, setCart] = useState(null)
  const [loading, setLoading] = useState(true)

   async function getItems() {
    let {data}=await getCartItems()
    setCart(data)
    setLoading(false)
   }

   async function deleteItems(id) {
    setLoading(true)
    let {data}= await deleteCartItems(id)
    setCart(data)
    setLoading(false)
   }
   async function updateItems(id , count) {
    if (count < 1) {
        setLoading(true)
        let {data}= await deleteCartItems(id)
        setCart(data)
        setLoading(false)
    }else{
         setLoading(true)
         let {data}= await updateCartItems(id , count)
         setCart(data)
         setLoading(false)
    }
    
   }

   useEffect(()=>{
    getItems() 
   },[])

  return <>
    <div className="title text-center fw-bold py-5 text-main">
    <h1 className='fw-bold'> Cart </h1>
    </div>
    <div className="bg-main-light p-2 mt-5">
    {loading?<div className="loading"> 
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
  </div>:cart? <>
          <Helmet>
                <meta charSet="utf-8" />
                <title>Cart Shop</title>
            </Helmet>
    <p className='text-main'>Number Of Cart : {cart.numOfCartItems}</p>
  <p className='text-main'>Total Price : {cart.data.totalCartPrice}</p>
  {cart.data.products.map(product=>  <div key={product.product.id} className="row p-2 m-0 border-1 bottom">
    <div className="col-md-1">
      <div className="img">
      <img src={product.product.imageCover} className='w-100' alt={product.product.title} />
      </div>
    </div>
    <div className="col-md-10">
      <div className="item">
        <h3 className='h5 fw-bold'>{product.product.title.split(' ').splice(0,3).join(' ')}</h3>
        <p className='text-main fw-bold'>Price : {product.price} EGP</p>
        <button onClick={()=>deleteItems(product.product.id)} className='btn'><i className='fas fa-trash-can text-danger'></i> remove</button>
      </div>
    </div>
    <div className="col-md-1">
      <div className="count">
        <button onClick={()=> updateItems(product.product.id , product.count+1 )} className=' brdr p-1'>+</button>
        <span className='mx-2'>{product.count}</span>
        <button onClick={()=> updateItems(product.product.id , product.count-1 )} className=' brdr p-1'>-</button>

      </div>
    </div>
  </div>)}
  <Link to={`/shippingaddress/${cart.data._id}`} className='btn bg-main text-light nav-link w-25 p-2 m-3' >OnLine Pay</Link>
   </> : <h2 className='fw-bold' >Cart is Empty..........</h2> }
    </div>   
    

  </>
}

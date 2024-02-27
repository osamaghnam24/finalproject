import React, { useContext } from 'react';
import styles from './ShippingAddress.module.css';
import { useFormik } from 'formik';
import { useParams } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';

export default function ShippingAddress() {
  let {checkOutSession}= useContext(CartContext)
  let {cartId}= useParams()
  async function checkOut(values) {
      let {data} =await checkOutSession(cartId , values)
      console.log(data)
      if (data.status == 'success') {
        window.location.href = data.session.url
      }
  }

  let formik = useFormik({
    initialValues:{
      details:'',
      phone:'',
      city:''
    }, onSubmit:checkOut
  })
  return <>
    <h1>ShippingAddress</h1>
      <div className="w-75 mx-auto mt-5">
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="details"> details</label>
          <input onChange={formik.handleChange} type="text" id='details' name='details' className='form-control' />
          <label htmlFor="phone"> phone</label>
          <input onChange={formik.handleChange} type="tel" id='phone' name='phone' className='form-control' />
          <label htmlFor="city"> city</label>
          <input onChange={formik.handleChange} type="text" id='city' name='city' className='form-control' />
          <button className='btn bg-main text-light mt-3' type='submit'>Check Out</button>
        </form>
      </div>
  </>
}

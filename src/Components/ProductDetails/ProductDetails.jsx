import React, { useContext, useEffect, useState } from 'react';
import styles from './ProductDetails.module.css';
import axios from 'axios';
import {ThreeDots} from 'react-loader-spinner'
import { useParams } from 'react-router-dom';
import Slider from "react-slick";
import { Helmet } from 'react-helmet';
import toast from 'react-hot-toast';
import { CartContext } from '../../Context/CartContext';
import { useQuery } from 'react-query';


export default function ProductDetails() {
  var settings = {
    dots: false,
    infinite: true,
    autoplay:true,
    autoplaySpeed:2000,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(true);

  let {id}=useParams()
  async function getProductDetails(id) {
    let {data}= await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
    
    setDetails(data.data);
    setLoading(false);
  }
  // let {addToCart}= useContext(CartContext)
  // async function postToCart(id) {
  //   let {data}= await addToCart(id)
  //   console.log(data);
  // }
  
  useEffect(()=>{
    getProductDetails(id)
  },[])

  return <>
    <div className="title text-center fw-bold py-5 text-main">
    <h1 >ProductDetails</h1>
    </div>
      {loading?
     <div className="">
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
    :
    <>
    <Helmet>
                <meta charSet="utf-8" />
                <title>{details.title}</title>
            </Helmet>
            <div className="row align-items-center">
      <div className="col-md-4">
      <Slider {...settings}>
      {details.images.map(image=> <img src={image} key={details.id} className='w-100' alt={details.title}/>)}
    </Slider>
      </div>
       <div className="col-md-8">
        <div className="details">
          <h3 className='h5'>{details.title}</h3>
          <p className='py-3'>{details.description}</p>
          <span className='font-sm text-main'>{details.category.name}</span>
          <div className="d-flex py-3 justify-content-between align-items-center">
            <span>{details.price} EGP</span>
            <span className='font-sm'>
              <i className='fas fa-star rating-color me-1'></i>
              {details.ratingsAverage}
            </span>
          </div>
          <button  className='btn bg-main text-light w-100'> Add TO Cart</button>

        </div>
       </div>
    </div>
    </>
    }  
    </>
}

    
    
 
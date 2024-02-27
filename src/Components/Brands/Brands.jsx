import React, { useEffect, useState } from 'react';
import styles from './Brands.module.css';
import axios from 'axios';
import {ThreeDots} from 'react-loader-spinner'
import { useQuery } from 'react-query';
import { Helmet } from 'react-helmet';

export default function Brands() {

  
  function getBrands() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`) // get to API
  }
  let {data,isLoading,isFetching,isError}=useQuery('Brands',getBrands)
  return <>
    
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
     wrapperClass=""
 /> 
     </div>
    :<>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Brands Cart</title>
            </Helmet>
    <div className="title text-center fw-bold py-5 text-main">
    <h1 className='fw-bold'>All Brands</h1>
    </div>
    <div className="row gy-4">
    {data?.data.data.map((brand)=>
    <div key={brand.id} className="col-md-3"> 
          <div class="brand">
          <img src={brand.image} className='w-100' alt={brand.name} />
          <div className="text-brands text-center py-4">
          <span>{brand.name}</span>
          </div>
           
          </div>
    </div>)}

  </div>
  </>
  }
  </>
}

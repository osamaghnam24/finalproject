import React, { useEffect, useState } from 'react';
import styles from './Categories.module.css';
import axios from 'axios';
import {ThreeDots} from 'react-loader-spinner'
import { useQuery } from 'react-query';
import { Helmet } from 'react-helmet';


export default function Categories() {

  function getCategory() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
  }
  let {data,isLoading,isFetching,isError}=useQuery('Categories',getCategory)
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
    : <>

            <Helmet>
                <meta charSet="utf-8" />
                <title>Categories Cart</title>
            </Helmet>
    <div className="title text-center fw-bold py-5 text-main">
    <h1 className='fw-bold'>All Categories</h1>
    </div>
    <div className="row gy-4">
      {data?.data.data.map((category , index)=>
      <div key={index} className="col-md-4"> 
            <div class="card">
            <img src={category.image} className='w-100 ' alt={category.name} /> 
                  <div class="card-body">
                  <h2 className='text-center py-4 fw-bold text-main'>{category.name}</h2>
                  </div>
             
            </div>
      </div>)}

    </div>
    </>
    }

  </>
}

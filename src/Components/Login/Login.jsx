import React, { useContext } from 'react';
import styles from './Login.module.css';
import { useFormik } from 'formik';
import * as yup from 'yup'
import axios from 'axios';
import { useState } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';


export default function Login() {
  const [loading, setLoading] = useState(false)
  const [apiError, setApiError] = useState(false)
  let {setUserToken}= useContext(UserContext)
  let navigate=useNavigate()

 async function loginSubmit(values){
  setLoading(true)
      let {data}= await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`,values)
      .catch((err)=>{setApiError(err.response.data.message)
      setLoading(false)
      })
    if(data.message=='success'){
      setLoading(false)
      localStorage.setItem('user token',data.token)
      setUserToken(data.token)
      navigate('/')
    }
  }

  let validationSchema =yup.object({
      email:yup.string().required('Email is required').email('invalid email'),
      password:yup.string().required('Password is required').matches(/^[A-Z][\w]{5,8}$/,'password invalid ex(Osama123)')

  })
  
  let formik=useFormik({
    initialValues:{
      
    email:'',
    password:'',

    },validationSchema,
    onSubmit:loginSubmit
  })
  return <>
   <div className="w-75 mx-auto py-4">
    <h2>login Now</h2>
    <form onSubmit={formik.handleSubmit}>
      {apiError?<div className="alert alert-danger">{apiError}</div>:null}


      <label htmlFor="email">Email:  </label>
      <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="email" id='email' name='email' className='form-control mb-3' />
      {formik.errors.email && formik.touched.email?<div className="alert alert-danger py-2">{formik.errors.email}</div>:null}

      <label htmlFor="password">password:  </label>
      <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="password" id='password' name='password' className='form-control mb-3' />
      {formik.errors.password && formik.touched.password?<div className="alert alert-danger py-2">{formik.errors.password}</div>:null}


      {loading?<button  type='button' className='btn'>
      <ThreeDots
          visible={true}
          height="80"
          width="80"
          color="#4fa94d"
          radius="9"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClass=""
      />
      </button>:      <button disabled={!(formik.isValid && formik.dirty)}  type='submit' className='btn bg-main text-light'>login</button>
    }
    <Link className="nav-link py-3 " to="/register">register now</Link>
    </form>

   </div>
  </>
}

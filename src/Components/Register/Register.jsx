import React from 'react';
import styles from './Register.module.css';
import { useFormik } from 'formik';
import * as yup from 'yup'
import axios from 'axios';
import { useState } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


export default function Register() {
  const [loading, setLoading] = useState(false)
  const [apiError, setApiError] = useState(false)
  let navigate=useNavigate()

 async function registerSubmit(values){
  setLoading(true)
      let {data}= await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`,values)
      .catch((err)=>{setApiError(err.response.data.message)
      setLoading(false)
      })
    if(data.message=='success'){
      setLoading(false)
      navigate('/login')
    }
  }

  let validationSchema =yup.object({
      name:yup.string().required('Name is required').min(3,'min length is 3').max(10,'max length is 10'),
      email:yup.string().required('Email is required').email('invalid email'),
      password:yup.string().required('Password is required').matches(/^[A-Z][\w]{5,8}$/,'password invalid ex(Osama123)'),
      rePassword:yup.string().required('Password is required').oneOf([yup.ref('password')], 'password and rePassword not mactch'),
      phone:yup.string().required('phone is required').matches(/^01[0125][0-9]{8}$/ ,'we need egyptian number')

  })
  
  let formik=useFormik({
    initialValues:{
      name: '',
    email:'',
    password:'',
    rePassword:'',
    phone:''

    },validationSchema,
    onSubmit:registerSubmit
  })
  return <>
   <div className="w-75 mx-auto py-4">
    <h2>Register Now</h2>
    <form onSubmit={formik.handleSubmit}>
      {apiError?<div className="alert alert-danger">{apiError}</div>:null}

      <label htmlFor="name">Name:  </label>
      <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="text" id='name' name='name' className='form-control mb-3' />
        {formik.errors.name && formik.touched.name?<div className="alert alert-danger py-2">{formik.errors.name}</div>:null}


      <label htmlFor="email">Email:  </label>
      <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="email" id='email' name='email' className='form-control mb-3' />
      {formik.errors.email && formik.touched.email?<div className="alert alert-danger py-2">{formik.errors.email}</div>:null}

      <label htmlFor="password">password:  </label>
      <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="password" id='password' name='password' className='form-control mb-3' />
      {formik.errors.password && formik.touched.password?<div className="alert alert-danger py-2">{formik.errors.password}</div>:null}

      <label htmlFor="rePassword">rePassword:  </label>
      <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="password" id='rePassword' name='rePassword' className='form-control mb-3' />
      {formik.errors.rePassword && formik.touched.rePassword?<div className="alert alert-danger py-2">{formik.errors.rePassword}</div>:null}

      <label htmlFor="phone">phone:  </label>
      <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="tel" id='phone' name='phone' className='form-control mb-3' />
      {formik.errors.phone && formik.touched.phone?<div className="alert alert-danger py-2">{formik.errors.phone}</div>:null}

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
      </button>:      <button disabled={!(formik.isValid && formik.dirty)}  type='submit' className='btn bg-main text-light'>Register</button>
      }
      <Link className="nav-link py-3 " to="/login">login now</Link>
    </form>

   </div>
  </>
}

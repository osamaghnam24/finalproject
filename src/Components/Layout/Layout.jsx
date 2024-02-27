import React from 'react';
import styles from './Layout.module.css';
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { Offline } from "react-detect-offline";

export default function Layout() {
  return <>
  <Navbar/>

  <div className="container">
    <Offline> <div className="offLine"><h2 className='fw-bold'> Only shown offline (surprise!)</h2></div> </Offline>
  <Outlet></Outlet>
  </div>

  
  <Footer/>
  </>
}

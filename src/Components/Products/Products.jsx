import React from 'react';
import styles from './Products.module.css';
import FeaturedProducts from '../FeaturedProducts/FeaturedProducts';
import { Helmet } from 'react-helmet';

export default function Products() {
  return <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Product Cart </title>
            </Helmet>
    <FeaturedProducts/>
  </>
}
